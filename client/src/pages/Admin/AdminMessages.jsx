import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Loader2, Calendar, Trash2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [sending, setSending] = useState(false);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/contacts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data.data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleReply = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/contacts/${replyingTo.id}/reply`, {
                replyMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Reply sent successfully!');
            setReplyingTo(null);
            setReplyMessage("");
            fetchMessages(); // Refresh status
        } catch (error) {
            console.error("Failed to send reply", error);
            alert('Failed to send reply. Please check server logs.');
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <Mail className="text-primary" /> Messages
            </h1>

            <div className="grid gap-4">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-colors shadow-sm relative group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-foreground">{msg.subject}</h3>
                                    <p className="text-sm text-primary font-medium">{msg.name} <span className="text-muted-foreground font-normal">({msg.email})</span></p>
                                    {msg.phone && <p className="text-sm text-muted-foreground mt-1">Phone: {msg.phone}</p>}
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="text-xs text-muted-foreground flex items-center gap-1 bg-muted/50 px-2 py-1 rounded">
                                        <Calendar size={12} />
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </div>
                                    {msg.status === 'replied' && (
                                        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Replied</span>
                                    )}
                                </div>
                            </div>
                            <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap mb-4">
                                {msg.message}
                            </p>

                            <div className="flex justify-end mt-4">
                                {msg.status === 'replied' ? (
                                    <button
                                        disabled
                                        className="px-4 py-2 bg-green-500/20 text-green-500 text-sm font-bold rounded-lg cursor-not-allowed flex items-center gap-2"
                                    >
                                        <Send size={16} /> Replied
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setReplyingTo(msg)}
                                        className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Reply via Email
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-10">No messages found.</p>
                )}
            </div>

            {/* Reply Modal */}
            {replyingTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border p-6 rounded-2xl w-full max-w-lg shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4">Reply to {replyingTo.name}</h2>
                        <form onSubmit={handleReply}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={`Re: ${replyingTo.subject}`}
                                    disabled
                                    className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-muted-foreground"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    rows={6}
                                    className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none resize-none"
                                    placeholder="Write your reply here..."
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setReplyingTo(null)}
                                    className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                                >
                                    {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                                    Send Reply
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
