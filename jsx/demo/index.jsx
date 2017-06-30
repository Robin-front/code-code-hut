/** @jsx h */
import { h, render, Components } from '../jsx.js'

class Demo extends Components{

	componentDidMount(){
		console.log('componentDidMount');
	}

	render (){
		return (<div id="foo2">
			<p>Look, a simple JSX DOM renderer!</p>
			<ul>{ foo(ITEMS) }</ul>
			<button onClick={page.click} type="button" class="btn">click me!</button>
		</div>);
	}

}

// JSX -> VDOM:
const ITEMS = 'hi, render jsx everywhere'.split(' ');

function foo(items) {
	return items.map( p => <li> {p} </li> );
}

let page = {
	click (){
		alert('hi!');
	}
}
//
// let vdom = (
// 	<div id="foo">
// 		<p>Look, a simple JSX DOM renderer!</p>
// 		<ul>{ foo(ITEMS) }</ul>
// 		<button onClick={page.click} type="button" class="btn">click me!</button>
// 	</div>
// );
// console.log('vDom', vdom);




// vDom -> dom
let dom = render(<Demo />, document.body);
console.log('dom', dom);
