import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Trash2, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/contacts');
            setMessages(res.data.data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`/contacts/${id}`); // Assumes delete endpoint exists
                setMessages(messages.filter(m => m.id !== id));
            } catch (error) {
                console.error('Failed to delete message', error);
                // alert('Failed to delete message'); // Suppress if endpoint missing
            }
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'new' ? 'read' : 'new';
        try {
            // Assumes PATCH or PUT endpoint for status
            // Keeping it simple for UI now, might need backend adjust if route not generic
            // For now just toggle UI locally or skip if no endpoint
            // Implementation depends on backend route availability for update
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Messages</h2>
            </div>

            <div className="grid gap-6">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`bg-card border-l-4 p-6 rounded-r-xl shadow-sm ${msg.status === 'new' ? 'border-primary' : 'border-muted'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{msg.subject}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <span className="font-medium text-primary">{msg.name}</span>
                                    <span>&bull;</span>
                                    <span>{msg.email}</span>
                                    <span>&bull;</span>
                                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {msg.status === 'new' && (
                                    <span className="flex items-center gap-1 text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
                                        <Clock size={12} /> New
                                    </span>
                                )}
                                {/* Delete button */}
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete Message"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg text-foreground/90 whitespace-pre-wrap">
                            {msg.message}
                        </div>
                    </motion.div>
                ))}

                {messages.length === 0 && (
                    <div className="text-center py-20 bg-card/50 rounded-xl border border-dashed border-border px-4">
                        <p className="text-muted-foreground">No messages found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageList;
