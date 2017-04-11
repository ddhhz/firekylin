'use strict';

import ua from 'universal-analytics';
import pack from '../../../package.json';

export default class extends think.controller.base {
  /**
   * init
   * @param  {[type]} http [description]
   * @return {[type]}      [description]
   */
  init(http) {
    super.init(http);
    //home view path
    this.HOME_VIEW_PATH = `${think.ROOT_PATH}${think.sep}view${think.sep}home${think.sep}`;
    if (think.GA_ID && http.hostname.indexOf('127.0.0.1') === -1) {
      let visitor = ua(think.GA_ID, {https: true, strictCidFormat: false});
      visitor.pageview({
        dp: http.req.url,
        dh: http.hostname,
        dr: http.req.headers['referrer'],
        cid: http.req.headers['x-real-ip'] || http.req.connection.remoteAddress,
        uip: http.req.headers['x-real-ip'] || http.req.connection.remoteAddress,
        ua: http.req.headers['user-agent'],
        ul: (http.req.headers['accept-language'] || '').match(/^([a-zA-Z-]*)/)[0],
        z: new Date().getTime()
      }).send();
    }
  }
  /**
   * some base method in here
   */
  async __before() {
    if(this.http.action === 'install') {
      return;
    }
    if(!firekylin.isInstalled) {
      return this.redirect('/index/install');
    }

    let model = this.model('options');
    let options = await model.getOptions();
    this.options = options;
    let {navigation, themeConfig} = options;
    try {
      navigation = JSON.parse(navigation);
    } catch(e) {
      navigation = [];
    }
    try {
      themeConfig = JSON.parse(themeConfig);
    } catch(e) {
      themeConfig = {};
    }

    this.assign('options', options);
    this.assign('navigation', navigation);
    this.assign('themeConfig', themeConfig);
    this.assign('VERSION', pack.version);
    //set theme view root path
    let theme = options.theme || 'firekylin';
    this.THEME_VIEW_PATH = `${think.ROOT_PATH}${think.sep}www${think.sep}theme${think.sep}${theme}${think.sep}`;

    //网站地址
    let siteUrl = this.options.site_url;
    if(!siteUrl) {
      siteUrl = 'http://' + this.http.host;
    }
    this.assign('site_url', siteUrl);

    //所有的分类
    let categories = await this.model('cate').getCateArchive();
    this.assign('categories', categories);

    this.assign('currentYear', (new Date()).getFullYear());
  }
  /**
   * display view page
   * @param  {} name []
   * @return {}      []
   */
  async displayView(name) {
    if (this.http.url.match(/\.json(?:\?|$)/)) {
      let jsonOutput = {},
        assignObj = this.assign();
      Object.keys(assignObj).forEach((key)=>{
        if (['controller', 'http', 'config', '_', 'options'].indexOf(key) === -1) {
          jsonOutput[key] = assignObj[key];
        }
      })

      this.type('application/json');
      return this.end(jsonOutput);
    }

    return this.display(this.THEME_VIEW_PATH + name + '.html');
  }
}
