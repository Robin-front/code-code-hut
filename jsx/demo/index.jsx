/** @jsx h */
import {h, render} from '../jsx.js'

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

let vdom = (
	<div id="foo">
		<p>Look, a simple JSX DOM renderer!</p>
		<ul>{ foo(ITEMS) }</ul>
		<button onClick={page.click}>click me!</button>
	</div>
);
console.log('vDom', vdom);


// vDom -> dom
let dom = render(vdom, document.body);
console.log('dom', dom);
