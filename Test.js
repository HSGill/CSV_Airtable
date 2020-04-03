funtion happyNumber(num) {
  let str = num.toString();
  let arr = []
  let sum =0;
 for(let i =0;i<str.length;i++){
     arr.push(str[i] * str[i]);
 }
 console.log(arr);
 }
 
 happyNumber(13);