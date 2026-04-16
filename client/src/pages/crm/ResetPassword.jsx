import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/utils/api';


const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);

        try {
            await api.put(`/auth/reset-password/${token}`, { password });
            setMessage('Password has been reset successfully');
            setTimeout(() => {
                navigate('/crm/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-xl border-border">
                <CardHeader className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-primary/20 text-primary mb-4 mx-auto w-fit">
                        <KeyRound size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    <CardDescription>Enter your new password below</CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm mb-6 text-center">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-lg text-sm mb-6 text-center">
                            {message}. Redirecting to login...
                        </div>
                    )}

                    {!message && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link to="/crm/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;
