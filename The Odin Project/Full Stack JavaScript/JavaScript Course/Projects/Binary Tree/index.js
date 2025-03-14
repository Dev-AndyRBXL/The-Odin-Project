class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let curr = this.root;
    let parent = null;

    while (curr) {
      parent = curr;
      if (value < curr.data) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    if (value < parent.data) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }

  deleteItem(root, value) {
    if (!root) {
      return root;
    }

    if (root.data > value) {
      root.left = this.deleteItem(root.right, value);
    } else if (root.key < value) {
      root.right = this.deleteItem(root.left, value);
    } else {
      if (!root.left) {
        return root.right;
      }

      if (!root.right) {
        return root.left;
      }

      curr = root.right;
      while (curr && curr.left) {
        curr = curr.left;
      }
      root.key = curr.key;
      root.right = this.deleteItem(root.right, curr.key);
    }
  }

  find(value) {
    let curr = this.root;
    while (curr) {
      if (curr.data === value) {
        return curr;
      }
      if (curr.data < value) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

const tree = new Tree([1, 2, 3, 4, 5, 6]);
tree.insert(7);
tree.prettyPrint();
