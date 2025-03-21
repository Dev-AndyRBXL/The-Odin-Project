class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr, 0, arr.length - 1) || null;
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
      root.left = this.deleteItem(root.left, value);
    } else if (root.key < value) {
      root.right = this.deleteItem(root.right, value);
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

  levelOrder(callback /*, curr = this.root*/) {
    if (!callback) throw new Error('A callback function is required!');
    else if (!this.root) return null;

    // if (!curr) return;
    // else callback(curr);

    // if (curr.left) this.levelOrder(callback, curr.left);
    // if (curr.right) this.levelOrder(callback, curr.right);

    let queue = [this.root];

    while (queue.length) {
      let cur = queue.shift();
      callback(cur);

      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }

  preOrder(callback) {
    if (!callback || !this.root) throw new Error('Callback is required');

    let stack = [];
    let cur = this.root;
    while (stack.length || cur) {
      callback(cur);
      while (cur?.left) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      cur = cur.right;
    }
  }

  inOrder(callback) {
    if (!callback || !this.root) throw new Error('Callback is required');

    let stack = [];
    let cur = this.root;
    while (stack.length || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      callback(cur);

      cur = cur.right;
    }
  }

  postOrder(callback) {
    if (!callback) throw new Error('Callback is required!');

    let stack = [{ node: this.root, vis: false }];
    while (stack.length) {
      let cur = stack.pop();
      if (cur.node) {
        if (cur.vis) {
          callback(cur.node);
        } else {
          stack.push({ node: cur.node, vis: true });
          stack.push({ node: cur.node.right, vis: false });
          stack.push({ node: cur.node.left, vis: false });
        }
      }
    }
  }

  height(node = this.root) {
    if (!node) return 0;

    let queue = [node];
    let height = 0;

    while (queue.length) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        let current = queue.shift();
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
      height++;
    }

    return height;
  }

  depth(node, currentDepth = 0) {
    if (!node) return -1;

    if (node === this.root) return currentDepth;

    return Math.max(
      this.depth(node.left, currentDepth + 1),
      this.depth(node.right, currentDepth + 1)
    );
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    let lHeight = this.height(root.left);
    let rHeight = this.height(root.right);

    if (Math.abs(lHeight - rHeight) > 1) return false;

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    if (this.isBalanced(this.root)) return;
    let nodes = [];
    this.inOrder((node) => nodes.push(node.data));

    this.root = this.buildTree(nodes, 0, nodes.length - 1);
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

// I owe ChatGPT one for creating the driver code lol

function getRandomArray(size, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Create a BST from an array of random numbers < 100
const randomNumbers = getRandomArray(10);
const bst = new Tree(randomNumbers);

console.log('Tree is balanced:', bst.isBalanced());

// Print traversals
bst.levelOrder((node) => {
  console.log(`Level order: ${node.data}`);
});
bst.preOrder((node) => {
  console.log(`Preorder: ${node.data}`);
});
bst.postOrder((node) => {
  console.log(`Postorder: ${node.data}`);
});
bst.inOrder((node) => {
  console.log(`Inorder: ${node.data}`);
});

// Unbalance the tree by adding numbers > 100
[150, 200, 250, 300, 350].forEach((num) => bst.insert(num));

console.log('Tree is balanced after unbalancing:', bst.isBalanced(bst.root));

// Rebalance the tree
bst.rebalance();

console.log('Tree is balanced after rebalancing:', bst.isBalanced(bst.root));

// Print traversals again
bst.levelOrder((node) => {
  console.log(`Level order: ${node.data}`);
});
bst.preOrder((node) => {
  console.log(`Preorder: ${node.data}`);
});
bst.postOrder((node) => {
  console.log(`Postorder: ${node.data}`);
});
bst.inOrder((node) => {
  console.log(`Inorder: ${node.data}`);
});
