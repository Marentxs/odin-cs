function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumbers = Array.from({ length: 25 }, () =>
  getRandomIntInclusive(1, 100),
);

const bst = new Tree(randomNumbers);

bst.prettyPrint();

console.log("Tree is balanced:", bst.isBalanced());

const preOrder = [];
bst.preOrderForEach((value) => preOrder.push(value));
console.log("Pre-order:", preOrder);

const inOrder = [];
bst.inOrderForEach((value) => inOrder.push(value));
console.log("In-order:", inOrder);

const postOrder = [];
bst.postOrderForEach((value) => postOrder.push(value));
console.log("Post-order:", postOrder);

const levelOrder = [];
bst.levelOrderForEach((value) => levelOrder.push(value));
console.log("Level-order:", levelOrder);

bst.insert(101); // Imbalance Tree
bst.insert(105);
bst.insert(120);

console.log("Tree is balanced:", bst.isBalanced());

bst.rebalance();

console.log("Tree is balanced:", bst.isBalanced());

bst.prettyPrint(); // Rebalanced Tree
