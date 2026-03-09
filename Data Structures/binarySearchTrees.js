class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(arr);
  }

  #recursiveBST(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.left = this.#recursiveBST(arr, start, mid - 1);
    root.right = this.#recursiveBST(arr, mid + 1, end);

    return root;
  }

  buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }
    const newArr = [...new Set(arr)].sort((a, b) => a - b);

    return this.#recursiveBST(newArr, 0, newArr.length - 1);
  }

  #includesRecursive(node, value) {
    if (node === null) {
      return false;
    }
    if (value === node.data) {
      return true;
    }

    if (value < node.data) {
      return this.#includesRecursive(node.left, value);
    } else if (value > node.data) {
      return this.#includesRecursive(node.right, value);
    }
  }

  includes(value) {
    return this.#includesRecursive(this.root, value);
  }

  #insertRecursive(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.#insertRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.#insertRecursive(node.right, value);
    } else if (value === node.data) {
      return node;
    }

    return node;
  }

  insert(value) {
    this.root = this.#insertRecursive(this.root, value);
  }

  #findNode(node, value) {
    if (node === null) {
      return null;
    }
    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      return this.#findNode(node.left, value);
    } else if (value > node.data) {
      return this.#findNode(node.right, value);
    }
  }

  #calculateHeight(node) {
    if (node === null) {
      return -1;
    }
    const left = this.#calculateHeight(node.left);
    const right = this.#calculateHeight(node.right);
    const max = Math.max(left, right);

    return 1 + max;
  }

  height(value) {
    const target = this.#findNode(this.root, value);
    if (target === null) return undefined;
    return this.#calculateHeight(target);
  }

  #depthRecursive(node, value, currentDepth) {
    if (node === null) {
      return undefined;
    }
    if (value === node.data) {
      return currentDepth;
    }

    if (value < node.data) {
      currentDepth += 1;
      return this.#depthRecursive(node.left, value, currentDepth);
    } else if (value > node.data) {
      currentDepth += 1;
      return this.#depthRecursive(node.right, value, currentDepth);
    }
  }

  depth(value) {
    return this.#depthRecursive(this.root, value, 0);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback is required");

    const queue = [this.root];

    if (this.root === null) {
      return;
    }

    while (queue.length !== 0) {
      const node = queue.shift();

      callback(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  #preOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }

    callback(node.data);
    this.#preOrderRecursive(node.left, callback);
    this.#preOrderRecursive(node.right, callback);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback is required");

    return this.#preOrderRecursive(this.root, callback);
  }

  #inOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }

    this.#inOrderRecursive(node.left, callback);
    callback(node.data);
    this.#inOrderRecursive(node.right, callback);
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback is required");

    return this.#inOrderRecursive(this.root, callback);
  }

  #postOrderRecursive(node, callback) {
    if (node === null) {
      return;
    }

    this.#postOrderRecursive(node.left, callback);
    this.#postOrderRecursive(node.right, callback);
    callback(node.data);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback is required");

    return this.#postOrderRecursive(this.root, callback);
  }

  #checkBalance(node) {
    if (node === null) {
      return { height: -1, balanced: true };
    }
    const left = this.#checkBalance(node.left);
    const right = this.#checkBalance(node.right);

    const height = 1 + Math.max(left.height, right.height);
    const childBalanced = left.balanced && right.balanced;
    const ownBalanced = Math.abs(left.height - right.height) <= 1;

    const balanced = childBalanced && ownBalanced;

    return { height, balanced };
  }

  isBalanced() {
    const result = this.#checkBalance(this.root);
    return result.balanced;
  }

  rebalance() {
    if (this.isBalanced()) {
      return;
    }

    const values = [];
    this.inOrderForEach((value) => values.push(value));

    this.root = this.buildTree(values);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
