const hello = () => 'hello there my friends';
if(process.env.NODE_ENV!=='production'){
  if(module.hot){
    module.hot.accept()
  }
}
require("./styles.css");
/*const Please=require("pleasejs");*/
const div=document.getElementById("color");
const button=document.getElementById("button");
const changeColor = () => div.style.backgroundColor = '#000000'

button.addEventListener('click', changeColor)
