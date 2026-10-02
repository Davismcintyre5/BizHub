const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = config;