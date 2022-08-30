const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
   // database : 'nodejsSql' //specifying the database prevents the app from running and creating db on its own
   database : 'nodejsSql'
});
//connect
db.connect((err)=>{
        if(err){
            throw err; //if the connecting created above does not work
        }
        console.log("MySql connected...");//else log this if the connecting is ok
});


const app = express();

//Create DB...this is a route actually

app.get("/createdb", (req,res)=>{
    let sql ="CREATE DATABASE nodejsSql";
    db.query(sql,(err,result)=>{
        if(err) {
            console.log(err + " Me: Exists");
            
        };
        console.log(result);
        res.send("Database created..");
    })
});

//create table
app.get("/createpoststable", (req,res)=>{
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
    
    db.query(sql, (err,result)=>{
            if(err){
                throw err;
            }
            console.log(result+ " ME: Table create success...");
            res.send("Table created...");
    });

});

//INSERT POST 1
app.get("/addpost1", (req,res)=>{
    let post = {title:"POST 1", body:"This is post number one"};
    let sql = "INSERT INTO posts SET ?" //The question mark acts as a placeholder for the actula data down below
    let query = db.query(sql,post/** post occupies the space held by ? in the sql string */,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result+ " ME: Post insert success...");
        res.send("Post inserted...");  
    });
});
//INSERT POST 2
app.get("/addpost2", (req,res)=>{
    let post = {title:"POST TWO - BMULWA", body:"This is post number TWO"};
    let sql = "INSERT INTO posts SET ?" //The question mark acts as a placeholder for the actula data down below
    let query = db.query(sql,post/** post occupies the space held by ? in the sql string */,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result+ " ME: Post 2 insert success...");
        res.send("Post 2 inserted...");  
    });
});

//Select records/posts from table
app.get("/getposts", (req,res)=>{
    
    let sql = "SELECT * FROM posts";
    db.query(sql,(err, results)=>{
        if(err){
            throw err;
        }
        console.log(results);
        res.send("Posts fetched..." ); 
    });
});

//Select single record/post from table
app.get("/getpost/:id", (req,res)=>{
    
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id/**Get id from url */}`;
    db.query(sql,(err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("Post fetched..." ); 
    });
});

//Update single record/post in table
app.get("/updatepost/:id", (req,res)=>{
    let newTitle = "Updated Title";
    let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id/**Get id from url */}`;
    db.query(sql,(err, result)=>{
        if(err){
            throw err;        
        }
        console.log(result);
        res.send("Post updated..." ); 
    });
});

//Delete single record/post in table
app.get("/deletepost/:id", (req,res)=>{
    let sql = `DELETE FROM posts WHERE id = ${req.params.id/**Get id from url */}`;
    db.query(sql,(err, result)=>{
        if(err){
            throw err;        
        }
        console.log(result);
        res.send("Post deleted..." ); 
    });
});

app.listen("3000", ()=>{
    console.log("server started on port 3000");
});

