"use strict";
//#1: use a for loop to sum up every iteration until reach the "n". Time complexity is O(n)
function sum_to_n_a(n) {
    var result = 0;
    for (var i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}
//#2:  use a while loop. Time complexity is O(n)
function sum_to_n_b(n) {
    var result = 0;
    var currIndex = 1;
    while (currIndex <= n) {
        result += currIndex;
        currIndex++;
    }
    return result;
}
//#3: using recursion. Time complexity is O(n)
function sum_to_n_c(n) {
    if (n == 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
}
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
