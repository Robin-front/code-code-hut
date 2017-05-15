## 享元模式

享元模式（Flyweight），运行共享技术有效地支持大量细粒度的对象，避免大量拥有相同内容的小类的开销(如耗费内存)，使大家共享一个类(元类)。

Flyweight模式是一个提高程序效率和性能的模式,会大大加快程序的运行速度。

### 应用

- 1.应用在数据层上，主要是应用在内存里大量相似的对象上；
- 2.应用在DOM层上，享元可以用在中央事件管理器上用来避免给父容器里的每个子元素都附加事件句柄。

如果一个应用程序使用了大量的对象，而这些大量的对象造成了很大的存储开心时就应该考虑使用享元模式；还有就是对象的大多数状态可以外部状态，如果删除对象的外部状态，那么就可以用相对较少的共享对象取代很多组对象，此时可以考虑使用享元模式。

先来一个 bad code:

```js
var Book = function( id, title, author, genre, pageCount,publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate,availability ){
   this.id = id;
   this.title = title;
   this.author = author;
   this.genre = genre;
   this.pageCount = pageCount;
   this.publisherID = publisherID;
   this.ISBN = ISBN;
   this.checkoutDate = checkoutDate;
   this.checkoutMember = checkoutMember;
   this.dueReturnDate = dueReturnDate;
   this.availability = availability;
};
Book.prototype = {
   getTitle:function(){
       return this.title;
   },
   getAuthor: function(){
       return this.author;
   },
   getISBN: function(){
       return this.ISBN;
   },
/*其它get方法在这里就不显示了*/

// 更新借出状态
updateCheckoutStatus: function(bookID, newStatus, checkoutDate,checkoutMember, newReturnDate){
   this.id  = bookID;
   this.availability = newStatus;
   this.checkoutDate = checkoutDate;
   this.checkoutMember = checkoutMember;
   this.dueReturnDate = newReturnDate;
},
//续借
extendCheckoutPeriod: function(bookID, newReturnDate){
    this.id =  bookID;
    this.dueReturnDate = newReturnDate;
},
//是否到期
isPastDue: function(bookID){
   var currentDate = new Date();
   return currentDate.getTime() > Date.parse(this.dueReturnDate);
 }
};
```

所有状态都存储在book对象中，上百万本书时，内存消耗很大。要考虑减轻对象的大小。

better code:

```js
// 只包含内部状态
var Book = function(title, author, genre, pageCount, publisherID, ISBN){
   this.title = title;
   this.author = author;
   this.genre = genre;
   this.pageCount = pageCount;
   this.publisherID = publisherID;
   this.ISBN = ISBN;
};

// 工厂函数
var BookFactory = (function(){
   var existingBooks = {};
   return{
       createBook: function(title, author, genre, pageCount, publisherID, ISBN){
       /*查找之前是否创建*/
           var existingBook = existingBooks[ISBN];
           if(existingBook){
                   return existingBook;
               }else{
               /* 如果没有，就创建一个，然后保存*/
               var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
               existingBooks[ISBN] =  book;
               return book;
           }
       }
   }
})();

/**
 * BookRecordManager
 * 借书管理类 单例
 * 管理外部状态
 */
var BookRecordManager = (function(){
   var bookRecordDatabase = {};
   return{
     /*添加借书记录*/
     addBookRecord: function(id, title, author, genre,pageCount,publisherID,ISBN, checkoutDate, checkoutMember, dueReturnDate, availability){
         var book = bookFactory.createBook(title, author, genre,pageCount,publisherID,ISBN);
          bookRecordDatabase[id] ={
             checkoutMember: checkoutMember,
             checkoutDate: checkoutDate,
             dueReturnDate: dueReturnDate,
             availability: availability,
             book: book
         };
     },
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate){
        var record = bookRecordDatabase[bookID];
        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
     },
     extendCheckoutPeriod: function(bookID, newReturnDate){
         bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
     },
     isPastDue: function(bookID){
         var currentDate = new Date();
         return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
     }
   };
});

```

通过这种方式，我们做到了将同一种图书的相同信息保存在一个bookmanager对象里，而且只保存一份；相比之前的代码，就可以发现节约了很多内存


### 享元与DOM

其实事件委托也是一种享元模式的应用。根据事件冒泡，我们将所有事件委托在父节点上，通过判断 target 来执行相应的事件。jQuery的 on方法就是这样一种应用。
