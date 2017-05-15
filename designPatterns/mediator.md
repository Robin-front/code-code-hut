## 中介者模式

中介者是一个行为设计模式，通过提供一个统一的接口让系统的不同部分进行通信。一般，如果系统有很多子模块需要直接沟通，都要创建一个中央控制点让其各模块通过该中央控制点进行交互。中介者模式可以让这些子模块不需要直接沟通，而达到进行解耦的目的。

#### 基础实现

```js
var mediator = (function (){
  var topics = {};

  var subcribe = function (topic, fn){
    if (!topics[topic]){
      topics[topic] = [];
    }

    topics[topic].push({ context: this, callback: fn });

    return this;
  }

  var publish = function (topic){
    var args, topicArr = topics[topic];

    if (!topicArr){
      return false;
    }

    args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, l = topicArr.length; i < l; i++){
      var subscription = topicArr[i];
      subscription.apply(subscription.context, args);
    }
    return this;
  }

  return {
    subscribe: subscribe,
    publish: publish,
    installTo: function (obj){
      obj.subscribe = subscribe;
      obj.publish = subscribe;
    }
  }
})();

```

观察者模式，没有封装约束的单个对象，相反，观察者Observer和具体类Subject是一起配合来维护约束的，沟通是通过多个观察者和多个具体类来交互的：每个具体类通常包含多个观察者，而有时候具体类里的一个观察者也是另一个观察者的具体类。

而中介者模式所做的不是简单的分发，却是扮演着维护这些约束的职责。

#### 更完整的例子

```js
// 玩家
function Player (name){
  this.name = name;
  this.points = 0;
}

Player.prototype.update = function (score){
  this.points += 1;
  mediator.played();
}

// 显示器
var scoreboard = {
  el: document.getElementById('result'),

  update: function (scores){
    var i, msg = '';
    for (i in scores){
      if (scores.hasOwnProperty(i)){
        msg += '<p><strong>' + i + '<\/strong>: ';
        msg += scores[i];
        msg += '<\/p>';
      }
    }

    this.el.innerHTML = msg;
  }
}

// 中介者，用于解耦操作
var mediator = {
  players: {},

  setup: funciton (){
    var players = this.players;
    players.home = new Player('home');
    players.guest = new Player('guest');
  },

  played: function (){
    var players = this.players;

    var scores = {
      home: players.home.points,
      guest: players.guest.points
    }

    scoreboard.update(scores);
  },

  keypress: function (e){
    e = e||window.event;

    if (e.which === 49){ // key 1
      mediator.players.home.play();
      return;
    }
    if (e.which === 48){ // key 0
      mediator.players.guest.play();
      return ;
    }
  }

  // go
  mediator.setup();
  window.onkeypress = mediator.keypress;

  setTimeout(function (){
    window.onkeypress = null;
    console.log('Game Over!');
  }, 30000);
}

```


这个例子比较清晰地说明，中介者关注的不是如何组织代码，而是行为，让 player 和 scoreboard 没有直接关系，都通过 mediator 进行操作。但是这样也造成 mediator 可能会过于复杂。

一般情况下，中介者模式很容易在系统中使用，但也容易在系统里误用，当系统出现了多对多交互复杂的对象群时，先不要急于使用中介者模式，而是要思考一下是不是系统设计有问题。

另外，由于 **中介者模式把交互复杂性变成了中介者本身的复杂性**，所以说中介者对象会比其它任何对象都复杂。
