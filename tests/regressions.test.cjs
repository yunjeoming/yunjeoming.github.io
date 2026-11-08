const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies = {}, globals = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(source, { exports, require: (name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  }, ...globals }, { filename: file });
  return exports;
}

function themeEnvironment(stored, prefersDark, blocked = false) {
  const classes = new Set();
  const storage = new Map(stored ? [['theme', stored]] : []);
  const window = new EventTarget();
  const media = new EventTarget();
  media.matches = prefersDark;
  window.matchMedia = () => media;
  const document = { documentElement: { style: {}, classList: {
    toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); },
    contains(name) { return classes.has(name); },
  } } };
  const globals = { window, document, CustomEvent, localStorage: {
    getItem(key) { if (blocked) throw Error('disabled'); return storage.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw Error('disabled'); storage.set(key, value); },
  } };
  return { globals, classes, storage, media, window };
}

test('theme bootstrap and toggle agree for saved and system preferences', () => {
  for (const stored of [null, 'light', 'dark', 'invalid']) {
    for (const prefersDark of [false, true]) {
      const env = themeEnvironment(stored, prefersDark);
      const theme = load('src/utils/theme.ts', {}, env.globals);
      vm.runInNewContext(theme.themeInitScript, env.globals);
      assert.equal(env.classes.has('dark'), theme.getTheme() === 'dark');
      const next = env.classes.has('dark') ? 'light' : 'dark';
      theme.setTheme(next);
      assert.equal(env.storage.get('theme'), next);
      assert.equal(env.classes.has('dark'), next === 'dark');
    }
  }
});

test('theme subscription follows system and cross-tab changes and cleans up', () => {
  const env = themeEnvironment(null, false);
  const theme = load('src/utils/theme.ts', {}, env.globals);
  let calls = 0;
  const unsubscribe = theme.subscribeTheme(() => calls++);
  env.media.matches = true;
  env.media.dispatchEvent(new Event('change'));
  assert.equal(env.classes.has('dark'), true);
  env.storage.set('theme', 'light');
  const event = new Event('storage');
  event.key = 'theme';
  env.window.dispatchEvent(event);
  assert.equal(env.classes.has('dark'), false);
  assert.equal(calls, 2);
  unsubscribe();
  theme.setTheme('dark');
  assert.equal(calls, 2);
});

test('theme still works when localStorage is unavailable', () => {
  const env = themeEnvironment(null, false, true);
  const theme = load('src/utils/theme.ts', {}, env.globals);
  vm.runInNewContext(theme.themeInitScript, env.globals);
  assert.doesNotThrow(() => theme.setTheme('dark'));
  assert.equal(env.classes.has('dark'), true);
});

test('post lookup separates identical blog and memo filenames and rejects missing or private posts', () => {
  const posts = ['blog/same', 'memo/same', 'blog/private'].map((path) => ({
    _raw: { flattenedPath: path }, isPublished: !path.endsWith('private'),
  }));
  const { PostUtil } = load('src/utils/post.ts', {
    'contentlayer/generated': { allPosts: posts },
    '@/constants': { Constants: {} },
    'next/navigation': { notFound() { throw Error('404'); } },
  });
  assert.equal(PostUtil.getOriginPostByPath('blog/same'), posts[0]);
  assert.equal(PostUtil.getOriginPostByPath('memo/same'), posts[1]);
  for (const path of ['blog/private', 'blog/missing']) {
    assert.throws(() => PostUtil.getOriginPostByPath(path), /404/);
  }
});
