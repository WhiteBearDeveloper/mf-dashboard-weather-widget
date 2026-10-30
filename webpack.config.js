const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
    clean: true,
    uniqueName: "weather_widget",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            allowTsInNodeModules: true,
          },
        },
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@whitebeardeveloper/ui/src"),
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\.module\.s[ac]ss$/i,
                namedExport: false,
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "weatherWidget",
      filename: "remoteEntry.js",
      exposes: {
        "./WeatherWidget": "./src/WeatherWidget.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
        "react-dom/client": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],

  devServer: {
    port: 3004,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
