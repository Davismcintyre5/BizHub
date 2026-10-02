import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUi } from '@/stores/uiStore';
import { Toast } from './Toast';

function AutoDismiss({
  id,
  duration,
  children,
}: {
  id: string;
  duration: number;
  children: React.ReactNode;
}): React.ReactElement {
  const dismissToast = useUi((s) => s.dismissToast);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const t = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => dismissToast(id));
    }, duration);

    return () => clearTimeout(t);
  }, [id, duration, opacity, dismissToast]);

  return (
    <Animated.View style={{ opacity }}>{children}</Animated.View>
  );
}

export function ToastContainer(): React.ReactElement | null {
  const toasts = useUi((s) => s.toasts);
  const dismissToast = useUi((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <SafeAreaView
      pointerEvents="box-none"
      edges={['top']}
      style={styles.root}
    >
      <View pointerEvents="box-none" style={styles.stack}>
        {toasts.map((t) => (
          <AutoDismiss
            key={t.id}
            id={t.id}
            duration={t.durationMs ?? 3500}
          >
            <Toast toast={t} onDismiss={dismissToast} />
          </AutoDismiss>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  stack: {
    paddingTop: 8,
  },
});