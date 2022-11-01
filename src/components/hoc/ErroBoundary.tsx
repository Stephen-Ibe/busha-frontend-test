import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    throw new Error(`"Uncaught error: " ${error} ${errorInfo}`);
  }

  public render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <main>
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()} type='button'>
            Reload
          </button>
        </main>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
