const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    proxy: {
      "/api": {
        target: 'http://atop.test:31695',
        pathRewrite: { "^/api": "" },
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
