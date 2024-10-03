const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

console.log("Webpack custom config is loaded!");

module.exports = smp.wrap({
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
});
