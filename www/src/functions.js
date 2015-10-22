function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function swapArrayElements(array, child1, child2) {
    if(child1 === child2) {
        return;
    }

    var index1 = array.indexOf(child1);
    var index2 = array.indexOf(child2);

    if(index1 < 0 || index2 < 0) {
        throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');
    }

    array[index1] = child2;
    array[index2] = child1;
    return array;
}
