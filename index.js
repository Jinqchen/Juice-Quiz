var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port =3001;
var mysql = require("mysql");
const path = require("path");
const session = require("express-session");
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// // Step 2:
app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// app.use(
// 	session({
// 	  key: "userId",
// 	  secret: "subscribe",
// 	  resave: false,
// 	  saveUninitialized: false,
// 	  cookie: {
// 		expires: 60 * 60 * 24,
// 	  },
// 	})
//   );
  


var con = mysql.createPool({
	host: "us-cdbr-east-04.cleardb.com",
	user: "b0fb64176d0a67",
	password: "1322f121",
	database: "heroku_a8e492587e5e18a",
	port:3306,
});

//Answering
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
 //Get platform list
app.get ('/api/Platform',(req,res)=>{
    console.log("Connected!");
    con.query(
		"SELECT Pcover,p.PID,Pname,tag from platformstyle s,platform p where s.PID=p.PID  order BY RAND() limit 4;", 
		function (err1, result) {
		if (err1) throw err1;
	    res.send(result);}
  );})

  app.get ('/api/Platform/:tag',(req,res)=>{
    console.log("Connected!");
	const tag = req.params.tag
    con.query(
		`SELECT Pcover,p.PID,Pname from platformstyle s,platform p
		 where s.PID=p.PID AND p.tag='`+tag +`' order BY RAND() limit 2`, 
		function (err1, result) {
		if (err1) throw err1;
	    res.send(result);}
  );})



// Get quizlist
  app.get ('/api/platform/quizlist/:id',(req,res)=>{
    console.log("quiz Connected!");
	const PID = req.params.id;
	
    con.query(
		`SELECT q.QID,q.Qname,q.ave_rate,q.hot,q.description ,u.Uname AS Releaser, pic 
		FROM quiz q,contain c,releases r,users u, userstyle us
		WHERE q.QID=c.QID AND q.QID=r.QID and r.UID = U.UID and r.UID=us.UID and c.PID=`+PID, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);}
  );})

  app.get ('/api/user/subscribed/:id',(req,res)=>{
    console.log("uer Connected!");
	const UID = req.params.id;
	
    con.query(
		`select s.PID,r.Rpoint,ps.Pcover,p.Pname
		from subscribe s, reputation r,platform p,platformstyle ps
		where  r.UID=s.UID AND s.UID=`+UID+ ` and p.PID= s.PID AND p.PID= r.PID AND ps.PID=p.PID 
		ORDER BY r.Rpoint desc`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);}
  );})
//Get ranklist
  app.get ('/api/platform/ranklist/:id',(req,res)=>{
    console.log("rank Connected!");
	const PID = req.params.id;
    con.query(
		`select U.UID,U.Uname,Rpoint,pic
		from users U,platform P,reputation R,userstyle us
		where P.PID=`+PID+` AND P.PID= R.PID AND U.UID=R.UID and U.UID=us.UID
		ORDER BY Rpoint DESC`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);}
  );})

//Search
  app.get ('/api/platform/:name',(req,res)=>{
    console.log("platform Connected!");
	const name = req.params.name;
	console.log(name);
    con.query(
		`select p.PID,p.Pname, ps.Pcover
		from platform p, platformstyle ps
		where p.Pname LIKE '%`+name+`%' and p.PID=ps.PID`, 
		function (err1, result) {
		if (err1) throw err1;
		
	    res.send(result);}
  );})

  app.get ('/api/quiz/:name',(req,res)=>{
    console.log("platform Connected!");
	const name = req.params.name;
	const PID = req.query.PID;
	console.log(PID);
    con.query(
		`select q.QID,q.Qname,q.ave_rate,q.hot,q.description 
		from quiz q,contain c
		where q.QID=c.QID and c.PID=`+PID+` and q.Qname  LIKE '%`+name+`%'`, 
		function (err1, result) {
		if (err1) throw err1;
		
	    res.send(result);}
  );})




//Logging System
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
	con.query(
	  `select Upass,UID From users where Uemail =?;`,
	  email,
	  (err, result) => {
		  console.log(result);
		if (err) {
		  res.send({ err: err });
		}
		if (result.length > 0) {
			if (result[0]["Upass"] === password) {
				// req.session.user = result;
                // console.log(req.session.user);
                
			    res.send({message:"Welcome!",success:true,UID:result[0]["UID"]});
			} 
			else {
			  res.send({ message: "Wrong username/password combination!",success:false});
			}
		} 
		else {
		  res.send({ message: "User doesn't exist",success:false });
		}
	  }
	);
  });


//Platform subscribe
app.post('/api/platform/subscribe', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	console.log(PID);
	console.log("sub");
	con.query(
	  `SELECT EXISTS(
		SELECT *
		FROM subscribe
		WHERE UID=? and PID=?)`,
	  [UID,PID],
	  (err, result) => {
		  var sub =result[0]["EXISTS(\n\t\tSELECT *\n\t\tFROM subscribe\n\t\tWHERE UID='"+UID+"' and PID='"+PID+"')"];
		  console.log(sub);
		if (err) {
		  res.send({ err: err });
		}
	    if (sub==1){
			res.send({subscribe:true});
		}else{
			res.send({subscribe:false});
		}
	  }
	);
  });

  app.post('/api/platform/dosubscribe', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	console.log(PID);
	console.log("subed");
	con.query(
	  `insert into subscribe (PID,UID)
	  value(?,?);`,
	  [PID,UID],
	  (err, result) => {
		  console.log(result);
		if (err) {
		  res.send({ err: err });
		}
	  }
	);
  });

  app.post('/api/platform/initalR', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	console.log(PID);
	console.log("subed");
	con.query(
	  `insert into reputation (Rpoint,PID,UID)
	  value(0,?,?);`,
	  [PID,UID],
	  (err, result) => {
		  console.log(result);
		if (err) {
		  res.send({ err: err });
		}
	  }
	);
  });



// app.listen(3001,()=>{
// 	  console.log("running");
// 	})
	
app.listen(process.env.PORT || 3001,()=>{
  console.log('listening for requests on port'+ process.env.PORT);
})