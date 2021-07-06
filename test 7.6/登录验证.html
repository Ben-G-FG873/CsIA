<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>登录验证</title>
		<style type="text/css">
			.main{
				margin: 0 auto;
				width: 350px;
				height: 100px;
				background: cornflowerblue;
				padding: 20px;
			}
		</style>
	</head>
	<body>
		<div class="main">
			<?php
				$name=$_POST['userName'];
				$password=$_POST['userPassword'];
                                if($name==null||$password==null){
					header("location:登录.html");//直接打开该php文件，跳转到登录界面
				}
				
				
//				require_once('登录验证数据库连接.php');
//				$db=new connectDB();
//				$db->getConn();
			
					$db=@new mysqli('127.0.0.1','root','123456');
					if ($db->connect_error)
					 die('链接错误: '. $db->connect_error);
					$db->select_db('实验五第二题数据库') or die('不能连接数据库');
			
					$sql='SELECT * FROM 用户登录表 WHERE name='."'{$name}'AND psw="."'$password';";
					$result=$db->query($sql);
					$num_users=$result->num_rows;//在数据库中搜索到符合的用户
					if($num_users!=0){//搜索到该用户
						echo "<h3>欢迎您&nbsp{$name}</h3>";
						echo "您上次的登录时间是：";
						$sqlTime='SELECT time FROM 用户登录表 WHERE name='."'{$name}';";
						$resultTime=$db->query($sqlTime);
						while($obj=$resultTime->fetch_object()){
							echo "{$obj->time}";
						}
						$sqlUpdate='UPDATE 用户登录表 SET time="'.date('y-m-d h:i:s',time()).'" WHERE name='."'{$name}';";
						$db->query($sqlUpdate);//更新登陆时间
					}
					else{
						echo "用户名或密码错误";
					}
			?>
		</div>
	</body>
</html>
————————————————
版权声明：本文为CSDN博主「友人CWH」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/CWH0908/article/details/83244954