import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Trash2, Clock, Mail, Calendar, User } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

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
        try {
            await api.delete(`/contacts/${id}`); // Assumes delete endpoint exists
            setMessages(messages.filter(m => m.id !== id));
        } catch (error) {
            console.error('Failed to delete message', error);
        }
    };


    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Inquiries & Messages
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        View and manage messages from your portfolio contact form
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <Card className={`hover:border-primary/30 transition-all shadow-sm relative group rounded-md border-l-4 ${msg.status === 'new' ? 'border-l-primary' : 'border-l-muted'}`}>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-foreground">{msg.subject}</h3>
                                            {msg.status === 'new' && (
                                                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-2 py-0 rounded-sm">
                                                    NEW
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                                            <div className="flex items-center gap-1.5 text-primary">
                                                <User size={12} />
                                                {msg.name}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={12} />
                                                {msg.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {new Date(msg.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleDelete(msg.id)}
                                            className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-md text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed border border-border/50">
                                    {msg.message}
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}

                {messages.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-20 border-dashed bg-muted/20 rounded-md">
                        <p className="text-muted-foreground font-medium text-sm">No messages found.</p>
                    </Card>
                )}
            </div>
        </section>
    );
};

export default MessageList;
