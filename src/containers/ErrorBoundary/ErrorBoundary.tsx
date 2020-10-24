import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorIndicator from '../../components/ErrorIndicator';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: string | null;
}
export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    return this.state.hasError
      ? (<ErrorIndicator info={this.state.hasError} />)
      : (this.props.children);
  }
}
