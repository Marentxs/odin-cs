class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.nextNode = this.head;
      this.head = node;
    }
  }

  size() {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      count += 1;
      current = current.nextNode;
    }

    return count;
  }

  head() {
    if (this.head === null) {
      return undefined;
    }
    return this.head.value;
  }

  tail() {
    if (this.head === null) {
      return undefined;
    }
    return this.tail.value;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}
