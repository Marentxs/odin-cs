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
}
