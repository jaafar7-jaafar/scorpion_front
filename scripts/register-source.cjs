// Build tooling only: compile our JSX/ES modules without changing CRA's bundler.
const fs = require('node:fs');
const path = require('node:path');
const babel = require('@babel/core');
const sourceRoot = path.resolve(__dirname, '../src') + path.sep;
const originalJs = require.extensions['.js'];

function compile(module, filename) {
  if (!filename.startsWith(sourceRoot)) return originalJs(module, filename);
  const result = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename, babelrc: false, configFile: false,
    presets: [
      [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    ],
  });
  module._compile(result.code, filename);
}

require.extensions['.js'] = compile;
require.extensions['.jsx'] = compile;
