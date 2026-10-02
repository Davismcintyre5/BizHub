import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { ErrorState } from '@/components/ui/ErrorState';

interface Props {
  children: React.ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    // Sentry will be wired here
    void error;
  }

  reset = (): void => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <BoundaryView
          message={this.state.error?.message}
          onRetry={this.reset}
        />
      );
    }
    return this.props.children;
  }
}

function BoundaryView({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}): React.ReactElement {
  const theme = useTheme();
  return (
    <View
      style={[styles.root, { backgroundColor: theme.colors.background }]}
    >
      <ErrorState message={message} onRetry={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});