"use strict";
//assuming that "n" >=0
//#1: use a for loop to sum up every iteration until reach the "n". Time complexity is O(n)
function sum_to_n_a(n) {
    var result = 0;
    for (var i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}
//#2:  use a while loop. This also has time complexity of O(n)
function sum_to_n_b(n) {
    var result = 0;
    var currIndex = 1;
    while (currIndex <= n) {
        result += currIndex;
        currIndex++;
    }
    return result;
}
//#3: Following this format: result = (n-n+1)+(n-n+2)+ (n-n+3)+...+n using recursive. Time complexity is O(n)
function sum_to_n_c(n) {
    if(n == 1){
        return 1;
    }
    return n+ sum_to_n_c(n-1);
}
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
