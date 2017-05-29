/** @jsx h */
import {h, render} from '../jsx.js'

// JSX -> VDOM:
const ITEMS = 'hello there people'.split(' ');

// a "partial" that does a filtered loop - no template BS, just functional programming:
/** @jsx h */
function foo(items) {
	// imagine templates that adhere to your JS styleguide...
	return items.map( p => <li> {p} </li> );		// <-- can be multiline
}

// a simple JSX "view" with a call out ("partial") to generate a list from an Array:
let vdom = (
	<div id="foo">
		<p>Look, a simple JSX DOM renderer!</p>
		<ul>{ foo(ITEMS) }</ul>
	</div>
);
console.log('vDom', vdom);

// vDom -> dom
let dom = render(vdom);
console.log('dom', dom);

// insertDom
document.body.appendChild(dom);
