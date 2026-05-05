import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-destructive/10 text-destructive mb-4">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
            <p className="text-muted-foreground text-sm">
              An unexpected error has occurred. We've been notified and are working to fix it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                <RefreshCw size={16} />
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                className="gap-2"
              >
                <Home size={16} />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
