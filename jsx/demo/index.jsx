/** @jsx h */
import { h, render, Component } from '../jsx.js'
// import { h, render, Component } from '../preact.js'

class Demo extends Component{

	constructor(){
		super();
		this.state = {
			time: '1'
		}
	}

	componentDidMount(){
		console.log('componentDidMount');
	}

	click(){
		console.log('click!');
		this.setState({
			time: '2'
		})
	}


	render (){
		let state = this.state;
		return (<div id="foo2">
			<p>Look, a simple JSX DOM renderer!</p>
			<ul>{ foo(ITEMS) }</ul>
			<button onClick={this.click.bind(this)} type="button" class="btn">click me!</button>
			<p>{state.time}</p>
		</div>);
	}

}

// JSX -> VDOM:
const ITEMS = 'hi, render jsx everywhere'.split(' ');

function foo(items) {
	return items.map( p => <li> {p} </li> );
}


// vDom -> dom
let dom = render(<Demo />, document.getElementById('app'));
// console.log('dom', dom);
