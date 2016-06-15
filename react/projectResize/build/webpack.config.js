var path = require('path');
// 合并文件,并且对HTML进行发布模式修改
var HtmlWebpackPlugin = require('html-webpack-plugin');
var projectRoot = path.resolve(__dirname, '../')
module.exports = {
	// 入口文件
	entry: path.resolve(__dirname, './app/main.js'),
	// 输出文件
	output: {
		// 目录
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js',
	},
	// 指定可以被 import 的文件后缀。比如 Hello.jsx 这样的文件就可以直接用 import Hello from 'Hello' 引用
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint',
				include: projectRoot,
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$|jsx$/,
				loader: 'babel',
				include: projectRoot,
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.html$/,
				loader: 'vue-html'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: utils.assetsPath('[name].[hash:7].[ext]')
				}
			},
			{test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, // 用!去链式调用loader
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.scss$/, loader: 'style-loader!scss-loader'}
		]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: process.env.NODE_ENV === 'testing'
				? 'index.html'
				: config.build.index,
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			}
		})
	]
};