module.exports = {
	globals: {
		JSX: true,
		NodeJS: true
	},
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest'
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'eslint-plugin-import-helpers'
	],
	rules: {
		'no-tabs': 'off',
		camelcase: 'off',
		indent: ['error', 'tab'],
		'no-useless-constructor': 'off',
		'import-helpers/order-imports': [
			'error',
			{
				newlinesBetween: 'never',
				groups: [
					'/react/',
					'module',
					'/^@\\/.+/',
					'/^@\\/presentation/',
					'/^@\\/data/',
					'/^@\\/domain/',
					'sibling',
					'parent',
					'index',
					'/\\.+/'
				],
				alphabetize: { order: 'asc', ignoreCase: true }
			}
		]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
