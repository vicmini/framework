const HappyWebpack = require('happypack');

const os = require('os');
const happyThreadPoll = HappyWebpack.ThreadPool({
  'size': os.cpus().length
});

module.exports = [
  new HappyWebpack({
    'id': 'happyTs',
    'threadPool': happyThreadPoll,
    'verbose': true,
    'loaders': [{
      'path': 'ts-loader',
      'query': {
        'happyPackMode': true
      }
    }]
  }),
  new HappyWebpack({
    'id': 'happyCSS',
    'threadPool': happyThreadPoll,
    'verbose': true,
    'loaders': [{
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  })
];
