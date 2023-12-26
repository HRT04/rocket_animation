const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  // ... 他の設定
  devServer: {
    https: true,
    hot: true, // ホットリロードの有効化
  },
};
