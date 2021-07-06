
drop database if exists xuezi;
create database xuezi;
use xuezi;
create table emp(
uname VARCHAR(64),
upwd VARCHAR(64),
uemail VARCHAR(64),
utel VARCHAR(64),
truename VARCHAR(64),
gender VARCHAR(64)
);
insert into emp values('xioaming','123','128928@qq.com','1234567','xiaomingming','man');
insert into emp values('xioaliu','123','128928@qq.com','1234567','xiaoliuliu','man');
————————————————
版权声明：本文为CSDN博主「bohn」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_39458856/article/details/82054500