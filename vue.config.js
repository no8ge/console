const { defineConfig } = require("@vue/cli-service");

const host = process.env.VUE_APP_host;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    proxy: {
      "/api": {
        target: host,
        pathRewrite: { "^/api": "" },
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
