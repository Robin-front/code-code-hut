
## [ Add Two Numbers](addtwonumbers.md) 使用单链模拟两数相加。  _medium_

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
```

这个也不太难，只要了解单链，处理好“进位”和异常就可以。

```js
var addTwoNumbers = function(l1, l2) {
    if (l1===null) return l2;
    if (l2===null) return l1;

    var head = new ListNode(0); // 这里先新建一个node作为开头
    var pos = head;
    var temp = 0;
    while (l2!==null || l1!==null || temp>0){

        pos.next = new ListNode(0);
        pos = pos.next;

        if (l1!==null){
            temp += l1.val;
            l1 = l1.next;
        }
        if (l2!==null){
            temp += l2.val;
            l2 = l2.next;
        }

        pos.val = temp%10;
        temp = parseInt(temp/10);
        //console.log(temp);
    }
    return head.next;
};
```
