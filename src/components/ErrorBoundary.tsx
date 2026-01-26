import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Error Boundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error)
      ) : (
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          flexDirection: 'column',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#ff6b6b' }}>
            Application Error
          </h1>
          <pre style={{
            backgroundColor: '#2a2a2a',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '600px',
            overflow: 'auto',
            textAlign: 'left',
            fontSize: '12px',
            color: '#e0e0e0',
            margin: '16px 0',
          }}>
            {this.state.error.message}
          </pre>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '16px' }}>
            Please check your .env.local file and ensure all required Firebase environment variables are set.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
