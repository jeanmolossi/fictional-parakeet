const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = {
	entry: './index.tsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			assets: path.resolve(__dirname, 'assets')
		},
		fallback: {
			path: 'path-browserify'
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new DefinePlugin({
			'process.env.USR_API': JSON.stringify(process.env.USR_API),
			'process.env.CATALOG_API': JSON.stringify(process.env.CATALOG_API)
		})
	]
}
