// 二叉排序树

// 若根节点有左子树，则左子树的所有节点都比根节点小。
// 若根节点有右子树，则右子树的所有节点都比根节点大。
;(function (){
  'use strict';

  function Node(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
  }

  function BSTree(){
    this.root = null;
  }

  // 插入
  BSTree.prototype.insert = function (data){
    // 新建节点
    var node = new Node(data, null, null);

    if (this.root === null){
      this.root = node;
    } else {
      var parent = null,
          current = this.root;
      while (true) {
        parent = current;
        if (current > data){
          // 比current小，则继续比较左节点
          current = current.left;
          // 如果左节点为 null， 则直接插入左节点
          if (current === null){
            parent.left = node;
            break;
          }
        } else {
          // 比 current 大或等于，则继续比较右节点
          current = current.right;
          // 如果右节点为 null， 则直接插入右节点
          if (current === null){
            parent.right = node;
            break;
          }
        }
      }
    }
  };

  // 删除
  BSTree.prototype.remove = function (data){
    if (this.root === null){
      return false;
    }

    var parent = null,
        current = this.root;
    // 当节点不为 null, 且不等于 data时，继续往下找，直到 节点为 null 或相等
    while (current.data !== null && current.data !== data) {
      parent = current;
      if (current.data > data){
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current.data === null){
      // 找到最后为 Null,即是找不到
      return false;
    }

    // 找到了~
    if (current.left === null || current.right === null){
      // 至少有一个子节点为空时，可直接将子节点替换到被删除的位置
      // 但是首先要知道 删除的节点是其父节点的 左子节点还是右子节点
      if (parent === null){
        this.root = current.left === null ? current.right : current.left;
      } else if (parent.left === current){
        parent.left = current.left === null ? current.right : current.left;
      } else {
        parent.right = current.left === null ? current.right : current.left;
      }
    } else {
      // current左右子节点都不为空
      var mid = current.right;
      parent = current;
      while (current.left !== null) {
        parend = mid;
        mid = mid.left;
      }
      current.data = mid.data; // 直接找到右节点的最左节点（即右边最小的数）替换要删除的数
      // 然后接续上最左节点的右节点，保持替换数的位置的连续性
      if (parent.left = mid){
        parent.left = mid.right;
      } else {
        parent.right = mid.right;
      }
    }
    return true;
  };

  BSTree.prototype.find = function (data){
    var current = this.root;
    while (current.data !== null) {
      if (current.data === data){
        return current;
      } else if (current.data > data){
        current = current.left;
      } eles {
        current = current.right;
      }
    }
    return -1;
  };

  BSTree.prototype.getMin = function (){
    // 即最左子节点
    var current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  };

  BSTree.prototype.getMax = function (){
    // 即最右子节点
    var current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  };

  BSTree.prototype.preOrder = function (node){
    // 前序遍历
    if (node !== null){
      console.log(node.data);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  };
  BSTree.prototype.inOrder = function (node){
    // 中序遍历
    if (node !== null){
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  };
  BSTree.prototype.postOrder = function (node){
    // 后序遍历
    if (node !== null){
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    }
  };

  module.exports = BSTree;
})()
