<?php
/**
 * Created by PhpStorm.
 * User: Bohn
 * Date: 2018/8/25
 * Time: 16:15
 */
require ("init.php");
$uname=$_REQUEST["uname"];
$upwd=$_REQUEST["upwd"];
$uemail=$_REQUEST["uemail"];
$utel=$_REQUEST["utel"];
$truename=$_REQUEST["truename"];
$ugender=$_REQUEST["gender"];
$sql="insert into emp(uname,upwd,uemail,utel,truename,gender) values ('$uname','$upwd','$uemail','$utel','$truename','$ugender')";
$result=mysqli_query($conn,$sql);
if($result==true){
    echo "注册成功";
}else{
    echo "注册失败";
}
 
?>
————————————————
版权声明：本文为CSDN博主「bohn」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_39458856/article/details/82054500