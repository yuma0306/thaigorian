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
			'react/jsx-no-target-blank': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react/jsx-handler-names': [
				'warn',
				{
					eventHandlerPrefix: 'handle',
					eventHandlerPropPrefix: 'on'
				}
			],
			'@typescript-eslint/no-unused-vars': 'error',
			'max-lines': [
				'warn',
				{
					max: 300,
					skipBlankLines: true,
					skipComments: true
				}
			],
			'max-lines-per-function': ['warn', 80],
			complexity: ['warn', 10],
			'no-nested-ternary': 'error'
		}
	},
	prettier
);
