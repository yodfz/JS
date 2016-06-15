import {createStore} from 'redux';

var store = createStore(() => {
});

var reducer = function (...args) {
	console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)