console.log("Webpack custom config is loaded!");
module.exports = {
  output: {
    filename: "[name].[contenthash].js",
  },
};
