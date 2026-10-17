const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const insert = (node) => {
      if (!node) {
        return new Node(data);
      }
      if (data === node.data) {
        return node;
      }

      if (data < node.data) {
        node.left = insert(node.left);
      } else {
        node.right = insert(node.right);
      }

      return node;
    };

    this.rootNode = insert(this.rootNode);
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (!node) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      }

      if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      }

      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      let minRight = node.right;
      while (minRight.left) minRight = minRight.left;

      node.data = minRight.data;
      node.right = removeNode(node.right, minRight.data);
      return node;
    };

    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootNode) return null;

    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};