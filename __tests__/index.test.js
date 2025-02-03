import curUrl from '../';
import { url } from '@mxjs/app';
import { bootstrap, resetUrl, setUrl } from '@mxjs/test';

bootstrap();

describe('cur-url', () => {
  afterEach(() => {
    resetUrl();
  });

  test('api', () => {
    setUrl('/users');

    expect(curUrl.api()).toBe('users');
    expect(curUrl.api({ a: 'b' })).toBe('users?a=b');

    window.location.search = '?key=value';
    expect(curUrl.api()).toBe('users?key=value');
    expect(curUrl.api({ a: 'b' })).toBe('users?key=value&a=b');
  });

  test('dynamic api', () => {
    url.setOption('apiRewrite', false);

    setUrl('?r=users');
    // Compat with existing logic
    expect(curUrl.api()).toBe('users?r=users');
    expect(curUrl.api({ a: 'b' })).toBe('users?r=users&a=b');

    setUrl('?r=users&key=value');
    expect(curUrl.api()).toBe('users?r=users&key=value');

    setUrl('?r=admin/users');
    expect(curUrl.api()).toBe('users?r=admin/users');

    setUrl('?r=admin/users&key=value');
    expect(curUrl.api()).toBe('users?r=admin/users&key=value');
  });
});
