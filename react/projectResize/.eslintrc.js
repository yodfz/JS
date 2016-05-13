module.exports = {
	root: true,
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		'semi': [2, "always"],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		"no-spaced-func": 2,
		"arrow-spacing": 0,
		"space-before-function-paren": [0, "always"]//函数定义时括号前面要不要有空格
	}
};
