module.exports = function override(config, env) {
  //do stuff with the webpack config...
  if (env === "production") {
    config.output.publicPath = './'; // 设置输出的公共路径为./
  }
  return config;
};
