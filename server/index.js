var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port =3001;
var mysql = require("mysql");



const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

var con = mysql.createConnection({
	host: "us-cdbr-east-04.cleardb.com",
	user: "b0fb64176d0a67",
	password: "1322f121",
	database: "heroku_a8e492587e5e18a",
	port:3306,
});




app.get('/api/get',(req,res)=>{
   
    console.log("Connected!");
    con.query(
		"select count(QuestionID) from quizquestion where QID=1 ;", 
		function (err1, result) {
		if (err1) throw err1;
	    file={};
		file["count(QuestionID)"]=result[0]["count(QuestionID)"];
		for(let i = 0; i < result[0]["count(QuestionID)"]; i++){
			con.query("select Qtext from quizquestion where QID=1 AND QuestionID="+String(i+1)+";", 
			function (err2, result2) {
			 if (err2) throw err2;
			 file[i+1]= {};
			 var str = JSON.stringify(result2[0]);
             var obj = JSON.parse(str)
			 file[i+1]['Qtext']=obj['Qtext'];
			 });
			
			con.query("select Optionx ,correctness  from quizoptions where QID=1 AND QuestionID="+String(i+1)+";", 
			function (err2, result2) {
			if (err2) throw err2;
		    var str = JSON.stringify(result2);
            var obj = JSON.parse(str);
            file[i+1]['Optionx']=obj;
			});
	   }
       }
	  )
	  res.send(file);
	}
  );
 
  app.get ('/api/Platform',(req,res)=>{
   
    console.log("Connected!");
    con.query(
		"SELECT Pcover,p.PID,Pname,tag from platformstyle s,platform p where s.PID=p.PID  order BY RAND() limit 8;", 
		function (err1, result) {
		if (err1) throw err1;
	    res.send(result);}
  );})

app.post('/api/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
    const email  = req.body.email;
	con.query('select COUNT(UID) from users',function(err,result){
		var index = result[0]["COUNT(UID)"]
		console.log(index);
		var id =index;
		console.log(id);
		con.query(
		"INSERT INTO users (UID,Uname,Uemail,Upass) VALUES (?,?,?,?)",
		[id,username,email,password],
		(err, result) => {
		  console.log(err);
		  res.send(result);
		}
	  );
	});
  }); 

  app.post('/api/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
  
	db.query(
	  "select Upass From users where Uemail =?;",
	  email,
	  (err, result) => {
		if (err) {
		  res.send({ err: err });
		}
  
		if (result.length > 0) {
		    
			if (result === password) {
			  req.session.user = result;
			  console.log(req.session.user);
			  res.send(result);
			} 
			else {
			  res.send({ message: "Wrong username/password combination!" });
			}
		 
		} 
		else {
		  res.send({ message: "User doesn't exist" });
		}
	  }
	);
  });






app.listen(3001,()=>{
	  console.log("running");
	})
	



// app.listen(process.env.PORT || 3001,()=>{
//   console.log('listening for requests on port'+ process.env.PORT);
// })