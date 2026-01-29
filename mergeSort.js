function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);

    const leftSorted = mergeSort(leftHalf);
    const rightSorted = mergeSort(rightHalf);

    let sorted = [];

    let i = 0;
    let j = 0;

    while (i < leftSorted.length && j < rightSorted.length) {
      const a = leftSorted[i];
      const b = rightSorted[j];

      let small;
      if (a < b) {
        small = a;
        i++;
      } else {
        small = b;
        j++;
      }
      sorted.push(small);
    }

    if (i < leftSorted.length) {
      sorted.push(...leftSorted.slice(i));
    }

    if (j < rightSorted.length) {
      sorted.push(...rightSorted.slice(j));
    }

    return sorted;
  }
}
console.log(mergeSort([4, 5, 10, 8]));
