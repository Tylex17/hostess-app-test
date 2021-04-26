module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
    ],
    presets: ['module:metro-react-native-babel-preset'],
  };
};
