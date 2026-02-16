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
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}
