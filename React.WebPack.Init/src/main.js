// 核心
import React from 'react';
import ReactDom from 'react-dom';
// UI
import HelloWorld from './components/HelloWorld';

// class App extends React.Component {
//  render() {
//    return (<h1>hello world</h1>);
//  };
// }

// const App = () => <h1>hello world,const!</h1>;
// export default helloworld;
console.log(HelloWorld);
console.log(React);
ReactDom.render(<HelloWorld />, window.document.querySelector('app'));
