const test = new hashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Size:", test.length());
console.log("Load factor:", test.length() / test.capacity);

test.set("apple", "green");
test.set("dog", "white");

console.log("Size:", test.length());
console.log("Load factor:", test.length() / test.capacity);

test.set("moon", "silver");

console.log("Size:", test.length());
console.log("Load factor:", test.length() / test.capacity);

test.set("apple", "red");
test.set("dog", "brown");

console.log("Size:", test.length());
console.log("Load factor:", test.length() / test.capacity);

console.log("Get apple:", test.get("apple"));
console.log("Has carrot?", test.has("carrot"));
console.log("Remove carrot:", test.remove("carrot"));
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());
