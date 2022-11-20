const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    proxy: {
      "/apis": {
        target: 'http://atop.test:31694',
        pathRewrite: { "^/apis": "" },
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
