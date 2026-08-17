const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

const appName = process.env.APP_NAME ?? "SpellSkipper";

module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/main.ts",
    devtool: isProd ? false : "inline-source-map",
    watchOptions: { ignored: /node_modules/ },
    module: {
      rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
    },
    resolve: { extensions: [".ts", ".js"] },
    output: {
      clean: true,
      filename: `${appName}.js`,
      path: path.resolve(__dirname, isProd ? "dist" : "build"),
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.APP_NAME": JSON.stringify(appName),
      }),
      ...(isProd
        ? [
            new webpack.SourceMapDevToolPlugin({
              filename: `${appName}.js.map`,
              publicPath: `https://swbuwk.github.io/${appName}/dist/`,
            }),
          ]
        : []),
    ],
  };
};
