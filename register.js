function display_alert(){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port     : '3306',
    database : 'user'
    });
    
    connection.connect();

    var username='123456'
    var password='789101'

    var  addSql = 'INSERT INTO tbl(user_name,user_pwd) VALUES(?,?)';
    var  addSqlParams = [username,password];

    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }        
    
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:',result);        
        console.log('-----------------------------------------------------------------\n\n');  
        });
    
    connection.end();
}