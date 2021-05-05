import {app, req} from '@mxjs/app';
import $ from 'miaoxing';

const buildPath = (...arr) => {
  // Remove empty element
  return arr.filter(el => el).join('/');
};

const curUrl = {
  /**
   * 返回当前页面的入口页地址
   */
  index(params = null) {
    return this.to(null, params);
  },

  /**
   * 返回当前页面的创建页地址
   */
  new(params = null) {
    return this.to('new', params);
  },

  /**
   * 返回当前页面的编辑页地址
   */
  edit(id = null, params = null) {
    return this.toId(id, 'edit', params);
  },

  /**
   * 返回当前页面的查看页地址
   */
  show(id = null, params = null) {
    return this.toId(id, null, params);
  },

  /**
   * 获取当前地址对应的 API 地址
   *
   * @experimental
   */
  api(params = null) {
    let url = req.getPathInfo().substr(1);
    if (url.startsWith('admin')) {
      url = url.substr(6);
    }
    return $.apiUrl(url + window.location.search, params);
  },

  /**
   * 获取当前页面对应的接口数据的地址
   *
   * @experimental
   */
  apiData(params = null) {
    return app.page.index ? this.apiColl(params) : this.apiForm(params);
  },

  /**
   * 获取当前页面对应的表单接口数据的地址
   *
   * @experimental
   */
  apiForm(params = null) {
    if ($.req('id')) {
      return this.apiShow(null, params);
    } else {
      return this.toApi('defaults', params);
    }
  },

  /**
   * 获取当前页面对应的集合接口数据的地址
   */
  apiColl(params = null) {
    return this.toApi(null, params);
  },

  apiIndex(params = null) {
    return this.apiColl(params);
  },

  apiItem(id = null, params = null) {
    return this.toApiId(id, null, params);
  },

  apiShow(id = null, params = null) {
    return this.apiItem(id, params);
  },

  apiFormUrlAndMethod(params = null) {
    if ($.req('id')) {
      return {method: 'PATCH', url: this.apiShow(null, params)};
    } else {
      return {method: 'POST', url: this.apiIndex(params)};
    }
  },

  to(path, argsOrParam, params) {
    return $.url(buildPath(app.page.collection, path), argsOrParam, params);
  },

  toId(id, path, params = null) {
    return this.to(buildPath(id || $.req('id'), path), params);
  },

  toApi(path, argsOrParam, params) {
    let collection;
    if (app.page.collection.startsWith('admin/')) {
      collection = app.page.collection.substr(6);
    } else {
      collection = app.page.collection;
    }
    return $.apiUrl(buildPath(collection, path) + window.location.search, argsOrParam, params);
  },

  toApiId(id, path, argsOrParam, params) {
    return this.toApi(buildPath(id || $.req('id'), path), params);
  },
};

export default curUrl;
