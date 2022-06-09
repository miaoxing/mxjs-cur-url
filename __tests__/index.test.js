import curUrl from '../';
import {url} from '@mxjs/app';
import {bootstrap, resetUrl, setUrl} from '@mxjs/test';

bootstrap();

describe('cur-url', () => {
  afterEach(() => {
    resetUrl();
  });

  test('api', () => {
    setUrl('/users');

    expect(curUrl.api()).toBe('/api/users');
    expect(curUrl.api({a: 'b'})).toBe('/api/users?a=b');

    window.location.search = '?key=value';
    expect(curUrl.api()).toBe('/api/users?key=value');
    expect(curUrl.api({a: 'b'})).toBe('/api/users?key=value&a=b');
  });

  test('dynamic api', () => {
    url.setOption('apiRewrite', false);

    setUrl('?r=users');
    expect(curUrl.api()).toBe('/index.php?r=api%2Fusers');
    expect(curUrl.api({a: 'b'})).toBe('/index.php?r=api%2Fusers&a=b');

    setUrl('?r=users&key=value');
    expect(curUrl.api()).toBe('/index.php?r=api%2Fusers&key=value');

    setUrl('?r=admin/users');
    expect(curUrl.api()).toBe('/index.php?r=admin-api%2Fusers');

    setUrl('?r=admin/users&key=value');
    expect(curUrl.api()).toBe('/index.php?r=admin-api%2Fusers&key=value');
  });
});
