var path = require('path');
var thinkjs = require('thinkjs');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  UPLOAD_PATH: path.join(__dirname, 'static/upload'),
  UPLOAD_BASE_URL: 'https://⚡.whe.me',
  GA_ID: 'UA-18952818-13',
  env: 'production'
});

instance.run();
