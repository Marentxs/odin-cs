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

console.log(fibonacci(8));

function fibsRec(n) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  } else if (n > 2) {
    let array = fibsRec(n - 1);
    let nextValue = array.at(-1) + array.at(-2);
    array.push(nextValue);
    return array;
  }
}

console.log(fibsRec(8));
