const left=123,middle=456,right=789;
let images = [left,middle,right];
// console.log(images);
// {'left','middle','right'}={}
// images = {middle,left,right};
for(let i=0;i<6;i++) {
  console.log(images);
  let arr=[];
  arr[0]=images[1];
  arr[1]=images[2];
  arr[2]=images[0];
  images=arr;
}