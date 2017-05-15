## 建造者模式

我们需要一种为我们构建复杂DOM对象的机制，它独立于为我们提供这种灵活性的对象本身，而这正是建造者模式为我们所提供的。

建造器使得我们仅仅 **只通过定义对象的类型和内容，就可以去构建复杂的对象，为我们屏蔽了明确创造或者展现对象的过程**。

```js
$( '<div class="foo">bar</div>' );

$( '<p id="test">foo <em>bar</em></p>').appendTo("body");

var newParagraph = $( "<p />" ).text( "Hello world" );

$( "<input />" )
  .attr({ "type": "text", "id":"sample"});
  .appendTo("#container");
```

下面引用自jQuery内部核心的jQuery.protoype方法，它支持从jQuery对象到传入jQuery()选择器的标签的构造。不管是不是使用document.createElement去创建一个新的元素，都会有一个针对这个元素的引用（找到或者被创建）被注入到返回的对象中，因此进一步会有更多的诸如as.attr()的方法在这之后就可以很容易的在其上使用了。

```js
// HANDLE: $(html) -> $(array)
if ( match[1] ) {
  context = context instanceof jQuery ? context[0] : context; doc = ( context ? context.ownerDocument || context : document );

  // If a single string is passed in and it's a single tag // just do a createElement and skip the rest ret = rsingleTag.exec( selector );

  if ( ret ) { if ( jQuery.isPlainObject( context ) ) {
    selector = [ document.createElement( ret[1] ) ];   
    jQuery.fn.attr.call( selector, context, true );
  } else {
    selector = [ doc.createElement( ret[1] ) ];
  }

} else {
  ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
  selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
}

return jQuery.merge( this, selector );
```
