import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export function SplashScreen(): React.ReactElement {
  const theme = useTheme();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoOpacity, logoScale, taglineOpacity]);

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.colors.primary },
      ]}
    >
      <Animated.View
        style={[
          styles.logoWrap,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.mark}>
          <View style={[styles.barShort, { backgroundColor: '#ffffff' }]} />
          <View style={[styles.barTall, { backgroundColor: '#ffffff' }]} />
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: taglineOpacity }}>
        <Text style={[styles.title, { color: theme.colors.onPrimary }]}>
          BizHub
        </Text>
        <Text style={[styles.tagline, { color: theme.colors.onPrimary }]}>
          MANAGE EVERYTHING. ONE APP.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    marginBottom: 40,
  },
  mark: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  barShort: {
    width: 14,
    height: 30,
    borderRadius: 2,
  },
  barTall: {
    width: 16,
    height: 54,
    borderRadius: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
    opacity: 0.75,
  },
});