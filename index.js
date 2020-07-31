import app from '@mxjs/app';

const buildPath = (...arr) => {
  // Remove empty element
  return arr.filter(el => el).join('/');
};

const curUrl = {
  /**
   * 返回当前控制器的入口页地址
   */
  index(params = null) {
    return this.to(null, params);
  },

  /**
   * 返回当前控制器的创建页地址
   */
  new(params = null) {
    return this.to('new', params);
  },

  edit(id = null, params = null) {
    return this.toId(id, 'edit', params);
  },

  show(id = null, params = null) {
    return this.toId(id, null, params);
  },

  create(params = null) {
    return this.to('create', params);
  },

  update(params = null) {
    return this.to('update', params);
  },

  destroy(id = null, params = null) {
    return this.toId(id, 'destroy', params);
  },

  form(params = null) {
    return app.id ? this.create(params) : this.update(params);
  },

  api(params = null) {
    return this.toApiId(null, app.action === 'show' ? null : app.action, params);
  },

  apiIndex(params = null) {
    return this.toApi(null, params);
  },

  apiShow(id = null, params = null) {
    return this.toApiId(id, null, params);
  },

  apiCreate(params = null) {
    return this.toApi('create', params);
  },

  apiUpdate(params = null) {
    return this.toApi('update', params);
  },

  apiDestroy(id = null, params = null) {
    return this.toApiId(id, 'destroy', params);
  },

  apiForm(params = null) {
    return app.id ? this.apiUpdate(params) : this.apiCreate(params);
  },

  to(path, argsOrParam, params) {
    return app.url(buildPath(app.namespace, app.controller, path), argsOrParam, params);
  },

  toId(id, path, params = null) {
    return this.to(buildPath(id || app.id, path), params);
  },

  toApi(path, argsOrParam, params) {
    return app.apiUrl(app.controller + '/' + path + window.location.search, argsOrParam, params);
  },

  toApiId(id, path, argsOrParam, params) {
    return this.toApi(buildPath(id || app.id, path), params);
  }
}

export default curUrl;
