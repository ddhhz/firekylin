var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  UPLOAD_PATH: path.join(__dirname, 'static/upload'),
  UPLOAD_URL_PATH: '',
  env: 'development'
});

//compile src/ to app/
instance.compile({
  retainLines: false,
  log: true
});

instance.run();
