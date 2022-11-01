module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        style: false, // 默认不加载样式,使用项目自定义主题加载样式
      },
    ],
  ],
}
