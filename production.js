const path = require('path');
const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'src'),
//  proxy: true, // use proxy
  RESOURCE_PATH: __dirname,
  UPLOAD_PATH: path.join(__dirname, 'static/upload'),
  UPLOAD_BASE_URL: 'https://⚡.whe.me',
  env: 'production'
});

instance.run();
