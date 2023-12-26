// webpack.config.js
const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    Scene: "./src/rkt/Scene.js",
    Lights: "./src/rkt/Lights.js",
    Particle: "./src/rkt/Particle.js",
    Rocket: "./src/rkt/Rocket.js",
    GLTF: "./src/rkt/GLTF.js",
    ex: "./src/rkt/ex_rkt.js",
    cencer_camera: "./src/rkt/cencer_camera.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]Bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
