var path = require('path');
// 合并文件,并且对HTML进行发布模式修改
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './app/main.js'),
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js'
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		preLoaders: [{
			test: /\.vue$/,
			loader: 'eslint',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.js$/,
			loader: 'eslint',
			include: projectRoot,
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.html$/,
			loader: 'vue-html'
		}, {
			test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('[name].[hash:7].[ext]')
			}
		}]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	plugins: [new HtmlWebpackPlugin({
		filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
		template: 'index.html',
		inject: true,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
			// more options:
			// https://github.com/kangax/html-minifier#options-quick-reference
		}
	})]
};

//# sourceMappingURL=webpack.config-compiled.js.map