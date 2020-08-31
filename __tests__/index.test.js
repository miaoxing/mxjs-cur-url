import curUrl from '../';
import app from '@mxjs/app';

describe('cur-url', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = {
      href: '',
      search: '',
    };
  });

  afterEach(() => {
    window.location = originalLocation;

    app.controller = null;
    app.action = null;
  });

  test('api', () => {
    app.controller = 'users';
    app.action = 'index';

    expect(curUrl.api()).toBe('/api/users/index');

    window.location.search = '?key=value';
    expect(curUrl.api()).toBe('/api/users/index?key=value');
  });

  test('dynamic api', () => {
    window.location.href = '?r=users';
    app.controller = 'users';
    app.action = 'index';

    expect(curUrl.api()).toBe('/?r=api%2Fusers%2Findex');

    window.location.search = '?r=users&key=value';
    expect(curUrl.api()).toBe('/?r=api%2Fusers%2Findex&key=value');
  });
});
