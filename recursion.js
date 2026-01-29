function fibonacci(n) {
  if (n === 0) {
    return [];
  }

  if (n === 1) {
    return [0];
  }

  let array = [0, 1];

  for (let i = 0; i < n - 2; i++) {
    array.push(array.at(-1) + array.at(-2));
  }
  return array;
}

console.log(fibonacci(6));
