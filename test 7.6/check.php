
<?php
/**
 * Created by PhpStorm.
 * User: Bohn
 * Date: 2018/8/25
 * Time: 16:50
 */
require ("init.php");
$uname=$_REQUEST["uname"];
$sql="select * from emp where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row==null){
    echo "0";
}else{
    echo "1";
}
?>
————————————————
版权声明：本文为CSDN博主「bohn」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_39458856/article/details/82054500