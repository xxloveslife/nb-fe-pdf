module.exports = {
  showUI: true,
  concurrency: 3,
  useLocalOrigin: false,
  workerNums: 4,
  redisClusterOpts: {
    enable: false,
    useBullIORedis: true,
    redisCluster: [
      {
        port: 6379,
        host: 'http:127.0.0.1',
      },
    ],
    options: {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    },
  },

  redisOpt: {
    port: 6379,
    host: 'marketing-redis',
    password: '948cacc0',
    db: 0,
  },
  // redisOpt: {
  //   jobEvents: false,
  //   prefix: '{PDF_DOWNLOAD_TEST_DB}',
  //   redis: {
  //     port: 6379,
  //     host: '127.0.0.1',
  //     db: 0,
  //   },
  // },
  // redisOpt: {
  //   jobEvents: false,
  //   prefix: '{PDF_DOWNLOAD_PRO_DB}',
  //   redis: {
  //     port: 6391,
  //     host: '10.10.30.133',
  //     db: 0,
  //     password: 123456,
  //   },
  // },
}
