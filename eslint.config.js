// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import prettier from 'eslint-config-prettier/flat';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import functional from 'eslint-plugin-functional';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...nextVitals,
	...nextTs,
	functional.configs.recommended,
	functional.configs.stylistic,
	functional.configs.disableTypeChecked,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			'functional/no-let': ['error', { allowInForLoopInit: false }],
			'react/react-in-jsx-scope': 'off',
			'react/jsx-curly-brace-presence': [
				'error',
				{
					props: 'never',
					children: 'never'
				}
			],
			'react/jsx-boolean-value': ['error', 'never'],
			'react/jsx-no-useless-fragment': 'error',
			'react/no-children-prop': 'error',
			'react/jsx-no-target-blank': 'error'
		}
	},
	prettier
);

// "max-lines": ["warn", 300],
// "max-lines-per-function": ["warn", 80],
// "complexity": ["warn", 10],
// "unused-imports/no-unused-imports": "error"
