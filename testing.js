function fibonacci (array) {
  if (array.length < 3) {
    return false;
  }
  if (array[0] > array[1]) {
    return false;
  }
  if (array[0] + array[1] !== array[2]) {
    return false;
  }
  for (let i = 2; i < array.length; i++) {
    if (!array[i + 2]) {
      break;
    }
    if (array[i] + array[i + 1] === array[i + 2]) { continue;
    } else {
      return false;
    }
  }
  return true;
}

function isFib(arr) {
    if (arr.length < 3) return false
    for (var i=2; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]+arr[i-2]) return false
        console.log(arr[i-1]+arr[i-2])
    }
    return true
}

console.log(isFib([1,2,3, 5, 100,105]));
