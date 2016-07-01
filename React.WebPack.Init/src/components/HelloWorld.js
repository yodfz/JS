// const App = () => <h1>hello world,const!</h1>;
import React, {Component} from 'react';
// class App extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {};
//    return {
//      render() {
//        return (<h1>hello world</h1>);
//      }
//    };
//  }
// }
// console.log(React);
export default class HelloWorld extends Component {
  render() {
    return (<h1>hello world</h1>);
  }
}
