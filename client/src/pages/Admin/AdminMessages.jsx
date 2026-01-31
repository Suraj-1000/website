import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Mail, Loader2, Calendar, Trash2, Send, MessageSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [sending, setSending] = useState(false);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/contacts');
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
            await api.post(`/contacts/${replyingTo.id}/reply`, {
                replyMessage
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
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <Mail className="text-primary" /> Messages
                </h1>
                <Badge variant="outline" className="px-3 py-1">
                    {messages.length} Total
                </Badge>
            </div>

            <div className="grid gap-6">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="hover:border-primary/50 transition-all shadow-sm relative group">
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-bold">{msg.subject}</CardTitle>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-primary font-semibold flex items-center gap-2">
                                                <Users size={14} />
                                                {msg.name}
                                                <span className="text-muted-foreground font-normal">({msg.email})</span>
                                            </p>
                                            {msg.phone && <p className="text-xs text-muted-foreground">Phone: {msg.phone}</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="text-[10px] font-medium text-muted-foreground flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full border border-border/50 uppercase tracking-wider">
                                            <Calendar size={10} />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                        {msg.status === 'replied' && (
                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                                Replied
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground bg-muted/20 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap mb-4 border border-border/30">
                                        {msg.message}
                                    </p>

                                    <div className="flex justify-end pt-2">
                                        {msg.status === 'replied' ? (
                                            <Button disabled variant="secondary" className="gap-2 bg-emerald-500/10 text-emerald-500">
                                                <Send size={16} /> Replied
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => setReplyingTo(msg)}
                                                className="gap-2 shadow-lg shadow-primary/20"
                                            >
                                                Reply via Email
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <Card className="p-12 text-center">
                        <MessageSquare className="mx-auto text-muted-foreground mb-4" size={48} />
                        <CardTitle className="text-muted-foreground">No messages found.</CardTitle>
                    </Card>
                )}
            </div>

            {/* Reply Modal */}
            {replyingTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg"
                    >
                        <Card className="shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Reply to {replyingTo.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleReply} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Subject</label>
                                        <Input
                                            type="text"
                                            value={`Re: ${replyingTo.subject}`}
                                            disabled
                                            className="bg-muted/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Message</label>
                                        <Textarea
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            rows={6}
                                            className="resize-none"
                                            placeholder="Write your reply here..."
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 pt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setReplyingTo(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={sending}
                                            className="gap-2"
                                        >
                                            {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                                            Send Reply
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
