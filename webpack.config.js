const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

console.log("Webpack custom config is loaded!");

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      reportFilename: "bundle-report.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist/dmcoffers-client"),
    filename: "[name].[contenthash].js",
  },
};
