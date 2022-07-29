import { defineConfig } from 'rollup';
import pkg from './package.json';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import { swc } from 'rollup-plugin-swc3';
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core'

export default defineConfig([
  {
    input: 'src/index.ts',
    plugins: [
      resolve(),
      babel({
        presets: [
          '@babel/preset-typescript',
          'babel-preset-solid'
        ],
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
        include: ['src/**']
      }),
      swc({
        minify: process.env.NODE_ENV === 'production'
      }),
    ],
    external: [
      ...Object.keys(pkg.peerDependencies),
      'solid-js/web',
    ],
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm'
      }
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts'
    },
    plugins: [
      resolve(),
      dts(),
    ]
  }
])