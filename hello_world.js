/*尝试写一个单独存在的脚本
顺便尝试一下多行注释*/
function myFunction()
{
  try
  {
    document.getElementById("demo").innerHTML="Hello World!";
    document.getElementById("demo").style.color="red";
  }
  catch(err)
  {
    var mess="发生错误："
    alert(mess + err)
  }
}