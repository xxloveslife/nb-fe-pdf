# html to pdf demo
## pdf-front 
- 用vue-cli初始化的pdf demo
- 启动方式
~~~
npm install
npm run dev
~~~
## pdf-server
~~~
npm install
npm run dev:local // 本地开发调试，启动一个进程
npm run dev  // 生产前台启动，启动多进程、进程守护
npm run start // 生产后台启动，启动多进程、进程守护

启动成功了，node 会启动一个8090的端口，前端发送请求到8090
~~~
## api
~~~

定义地址 // pdf-server/src/router/index.js
前端下载 windown.print() or htmlToCanvas()
node端同步下载  get  /syncDownload 

node 端异步下载，需要本地启动redis服务
node端异步下载  get  /asyncPrint
node端批量异步下载  post  /asyncManyPrint
node 异步批量下载，和node异步单个下载类似，只是请求方式变为post，将批量下载的链接和参数传递过去即可
~~~