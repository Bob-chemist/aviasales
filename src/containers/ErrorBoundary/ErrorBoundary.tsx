import React, { Component } from 'react';
import ErrorIndicator from '../../components/ErrorIndicator';

export default class ErrorBoundary extends Component {
  state = {
    hasError: null,
  };

  componentDidCatch(error: Error) {
    this.setState({
      hasError: error,
    });
  }

  render() {
    return this.state.hasError
      ? (<ErrorIndicator info={this.state.hasError} />)
      : (this.props.children);
  }
}
