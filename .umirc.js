// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  publicPath: "./",
  // history: "hash",
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'ftrack-widget-visualization',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      target: "http://127.0.0.1:8000/",
      changeOrigin: true,
    }
  }
}
