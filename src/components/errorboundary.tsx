import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: '' });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center px-6 text-center max-w-lg mx-auto">
          <span className="text-6xl mb-4">🌾</span>
          <h2 className="text-xl font-bold text-brown">Something went wrong</h2>
          <p className="text-brown-light mt-2 text-sm">
            The app encountered an unexpected error. Your data is safe.
          </p>
          {this.state.error && (
            <p className="text-xs text-stale mt-2 bg-cream rounded-lg p-3 max-w-xs break-all">
              {this.state.error}
            </p>
          )}
          <div className="flex gap-3 mt-6">
            <button onClick={this.handleReset} className="btn-primary">
              Try Again
            </button>
            <button
              onClick={() => {
                const fixedKeys = ['farm-gate-farms', 'pilot-feedback'];
                fixedKeys.forEach((key) => localStorage.removeItem(key));
                Object.keys(localStorage)
                  .filter((key) => key.startsWith('visit-notes-'))
                  .forEach((key) => localStorage.removeItem(key));
                window.location.reload();
              }}
              className="px-4 py-3 rounded-xl border-2 border-cream-dark text-brown-light text-sm hover:bg-cream-dark transition-colors"
            >
              Reset & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
