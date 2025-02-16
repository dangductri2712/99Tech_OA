//#1: use a for loop to sum up every iteration until reach the "n"
function sum_to_n_a(n: number): number{
    var result:number = 0;
    for(var i=1; i<= n; i++){
        result += i;
    }
    return result;
}

//#2:  use a while loop. Need to think later.
function sum_to_n_b(n: number): number{
    var result: number = 0;
    var currIndex = 1;
    while(currIndex <= n){
        result += currIndex;
        currIndex ++;
    }
    return result;
}

//#3: Following this format: result = (n-n+1)+(n-n+2)+ (n-n+3)+...+n
function sum_to_n_c(n: number): number{
    var result: number = 0;
    for(var i:number =n-1; i>=0; i--){
        result+= (n-i);
    }

    return result;
}
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));