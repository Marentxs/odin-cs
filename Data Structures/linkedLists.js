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

  at(index) {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      if (count === index) {
        return current.value;
      }
      count += 1;
      current = current.nextNode;
    }
  }

  pop() {
    if (this.head === null) {
      return undefined;
    }
    if (this.head.nextNode === null) {
      this.tail = null;
    }
    const popped = this.head.value;
    this.head = this.head.nextNode;
    return popped;
  }

  contains(value) {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return count;
      }
      count += 1;
      current = current.nextNode;
    }
    return -1;
  }

  toString() {
    let current = this.head;
    let list = "";

    if (this.head === null) return "";

    while (current !== null) {
      list += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    return list + "null";
  }

  insertAt(index, value) {
    if (index < 0 || index > this.size()) {
      throw new RangeError("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.size()) {
      this.append(value);
      return;
    }

    let count = 0;
    let current = this.head;
    const newNode = new Node(value);

    while (current !== null) {
      if (count === index - 1) {
        newNode.nextNode = current.nextNode;
        current.nextNode = newNode;
        return;
      }
      count += 1;
      current = current.nextNode;
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}
