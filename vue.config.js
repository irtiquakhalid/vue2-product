const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "/api": {
        target: "http://brokerapis.rootpointers.net",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api" },
      },
    },
  },
});
