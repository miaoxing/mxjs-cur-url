import curUrl from '../';
import {req, url} from '@mxjs/app';
import $ from 'miaoxing';

$.req = req.get.bind(req);
$.url = url.to.bind(url);
$.apiUrl = url.api.bind(url);

describe('cur-url', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = {
      href: '',
      search: '',
      pathname: '/',
    };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  test('api', () => {
    window.location.pathname = '/users';

    expect(curUrl.api()).toBe('/api/users');
    expect(curUrl.api({a: 'b'})).toBe('/api/users?a=b');

    window.location.search = '?key=value';
    expect(curUrl.api()).toBe('/api/users?key=value');
    expect(curUrl.api({a: 'b'})).toBe('/api/users?key=value&a=b');
  });

  test('dynamic api', () => {
    window.location.search = '?r=users';
    expect(curUrl.api()).toBe('/?r=api%2Fusers');
    expect(curUrl.api({a: 'b'})).toBe('/?r=api%2Fusers&a=b');

    window.location.search = '?r=users&key=value';
    expect(curUrl.api()).toBe('/?r=api%2Fusers&key=value');

    window.location.search = '?r=admin/users';
    expect(curUrl.api()).toBe('/?r=admin-api%2Fusers');

    window.location.search = '?r=admin/users&key=value';
    expect(curUrl.api()).toBe('/?r=admin-api%2Fusers&key=value');
  });
});
