var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port =3001;
var mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const { Console } = require('console');
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

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
app.get('/api/answer/:id',(req,res)=>{
      console.log("Connected!");
	  const QID = req.params.id;
    con.query(
		`select q.QuestionID,q.Qtext,qo.optionnumber,qo.Optionx,qo.correctness from quizquestion q, quizoptions qo
		where q.QID=${QID} and q.QID=qo.QID AND q.QuestionID=qo.QuestionID`,
		function (err1, result) {
			if (err1) throw err1;
			res.send(result);}
	  )
	 
	}
  );

app.put('/api/answer/updateRep/:id',(req,res)=>{
     const QID = req.params.id;
	 const PID = req.body.PID;
	 const UID = req.body.UID;
	 con.query(
		`select reputationneed, c.PID from quiz q,contain c where q.QID=${QID} and q.QID=C.QID;`, 
		function (err1, result) {
		if (err1) throw err1;
	    
		var repoint = result[0]['reputationneed'];
		console.log(repoint);
	con.query(
		`select Rpoint from reputation where UID=? AND PID=?`,
		[UID,PID],
		(err, result1) => {
			console.log(result1);
		  repoint+= result1[0]['Rpoint']
		  console.log(repoint);
		  con.query(
			"update reputation set Rpoint=? where UID=? AND PID=?", 
			[repoint,UID,PID],
			function (err1, result) {
			if (err1) throw err1;
			res.send(result);}
	  )
		}
		
	  );
	
	}
  )





     
})
 //Get platform list
app.get ('/api/Platform',(req,res)=>{
    con.query(
		"SELECT Pcover,p.PID,Pname,tag from platformstyle s,platform p where s.PID=p.PID  order BY RAND() limit 4;", 
		function (err1, result) {
		if (err1) throw err1;
	    res.send(result);}
  );})

  app.get ('/api/Platform/:tag',(req,res)=>{
	const tag = req.params.tag;
    con.query(
		`SELECT Pcover,p.PID,Pname from platformstyle s,platform p
		 where s.PID=p.PID AND p.tag='`+tag +`' order BY RAND() limit 3`, 
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

  app.get ('/api/manageQuiz/quizlist_total/:id',(req,res)=>{
	const UID = req.params.id;
    con.query(
		`select QID from releases where UID=${UID}`, 
		function (err1, result) {
		if (err1) throw err1;
        res.send(result)		
	}
  );
}
)
app.get ('/api/manageQuiz/quizlist/:id',(req,res)=>{
    console.log("manage Connected!");
	const QID = req.params.id;
    con.query(
		`select Qname,ave_rate,hot,description,releasedate from quiz where QID=${QID}`, 
		function (err1, result) {
		if (err1) throw err1;
        res.send(result)		
	}
  );
}
)








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

  app.get ('/api/user/owned/:id',(req,res)=>{
    console.log("owned Connected!");
	const UID = req.params.id;
	console.log("UID:"+UID);
    con.query(
		`select o.PID,p.Pname from own o, platform p
		where UID=${UID} and o.PID=p.PID `, 
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

  app.get ('/api/platform/:id/replimit',(req,res)=>{
	const PID = req.params.id;
    con.query(
		`select  replimit
		from platform p
		where  p.PID=${PID}`, 
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
		//console.log(index);
		var id =index;
		//console.log(id);
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
//	console.log(PID);
	//console.log("sub");
	con.query(
	  `SELECT EXISTS(
		SELECT *
		FROM subscribe
		WHERE UID=? and PID=?)`,
	  [UID,PID],
	  (err, result) => {
		  var sub =result[0]["EXISTS(\n\t\tSELECT *\n\t\tFROM subscribe\n\t\tWHERE UID='"+UID+"' and PID='"+PID+"')"];
		
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

app.post('/api/platform/coowner', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	con.query(
	  `SELECT EXISTS(SELECT UID FROM coown WHERE UID=? AND PID=?)`,
	  [UID,PID],
	  (err, result) => {
		//  console.log(result);
		  var sub =result[0]["EXISTS(SELECT UID FROM coown WHERE UID='"+UID+"' AND PID='"+PID+"')"];
		//  console.log(sub);
		if (err) {
		  res.send({ err: err });
		}
	    if (sub==1){
			res.send({coowner:true});
		}else{
			res.send({coowner:false});
		}
	  }
	);
  });
  app.post('/api/platform/owner', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	con.query(
	  `SELECT EXISTS(SELECT UID FROM own WHERE UID=? AND PID=?)`,
	  [UID,PID],
	  (err, result) => {
		//  console.log(result);
		  var sub =result[0]["EXISTS(SELECT UID FROM own WHERE UID='"+UID+"' AND PID='"+PID+"')"];
		//  console.log(sub);
		if (err) {
		  res.send({ err: err });
		}
	    if (sub==1){
			res.send({owner:true});
		}else{
			res.send({owner:false});
		}
	  }
	);
  });

  app.delete('/api/platform/delSub/:id', (req, res) => {
	const PID = req.params.id;
	const UID = req.body.UID;  
	con.query(
	  `delete from subscribe where PID=? and UID=?`,
	  [PID,UID],
	  (err, result) => {
		console.log(result);
		
	  }
	);
  });

  app.delete('/api/platform/delCoown/:id', (req, res) => {
	const PID = req.params.id;
	const UID = req.body.UID;  
	con.query(
	  `delete from coown where PID=? and UID=?`,
	  [PID,UID],
	  (err, result) => {
		console.log(result);
		
	  }
	);
  });




app.get('/api/platform/userRep/:id',(req,res)=>{
	console.log("User:");
	const UID = req.params.id;
	const PID = req.query.PID;
	console.log(PID);
	con.query(
		`select Rpoint 
		from reputation r
		where r.UID=${UID} AND r.PID=${PID};`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);}
  )
}
)





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


  app.post('/api/platform/doapply', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	console.log(PID);
	console.log("apply");
	con.query(
	  `insert into coown (PID,UID)
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





//Create a platform 
  app.post('/api/CreatePlatform/initalR', (req, res) => {
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

app.post('/api/createplatform', (req, res) => {
	const Pname = req.body.Pname;
	const tag = req.body.tag;
    const replimit  = req.body.replimit;
	con.query('select COUNT(*)from platform',function(err,result){
		var index = result[0]["COUNT(*)"]
		console.log("index:"+index);
		var id =index+1;
		console.log(id);
		con.query(
		"insert into platform(PID,Pname,tag,replimit) value(?,?,?,?)",
		[id,Pname,tag,replimit],
		(err, result) => {
		  console.log(err);
		  res.send({PID:id,success:true});
		}
	  );
	});
  }); 


app.post('/api/CreatePlatform/doown', (req, res) => {
	const PID = req.body.PID;
	const UID = req.body.UID;  
	console.log(PID);
	console.log("apply");
	con.query(
	  `insert into own (PID,UID)
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

//Edit platform
app.put('/api/EditPlatform/name/:name',(req,res)=>{
     const name = req.params.name;
	 const PID = req.body.PID;
     con.query(
		`UPDATE platform SET Pname='`+name+`'
		where PID=?;`,
		[PID],
		(err, result) => {
			console.log(result);
		  if (err) {
			res.send({ err: err });
		  }
		}
	  );
})
app.put('/api/EditPlatform/tag/:tag',(req,res)=>{
	const tag = req.params.tag;
	const PID = req.body.PID;
	con.query(
	   `UPDATE platform SET tag='`+tag+`'
	   where PID=?;`,
	   [PID],
	   (err, result) => {
		   console.log(result);
		 if (err) {
		   res.send({ err: err });
		 }
	   }
	 );
})
app.put('/api/EditPlatform/replimit/:replimit',(req,res)=>{
	const replimit = req.params.replimit;
	const PID = req.body.PID;
	con.query(
	   `UPDATE platform SET replimit='`+replimit+`'
	   where PID=?;`,
	   [PID],
	   (err, result) => {
		   console.log(result);
		 if (err) {
		   res.send({ err: err });
		 }
	   }
	 );
})




//Create quiz
app.post('/api/initQuiz', (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
    const timelimit  = req.body.timelimit;
    const Repoint = req.body.Repoint;
    const PID = req.body.PID;
	const UID = req.body.UID;
	     
	con.query('select max(QID) FROM releases',function(err,result){
		console.log(result)
		var index = result[0]["max(QID)"]
		console.log("index:"+index);
		var id =index+1;
		console.log(id);

	
	   con.query(
		  `INSERT INTO quiz(QID,Qname,ave_rate,hot,description,reputationneed,Taketime,releasedate)
		  value(?,?,0.0,0,?,?,?,now());`,
	      [id,title,description,Repoint,timelimit],
	      (err, result) => {
	       console.log(err);  
	}
  );
		con.query(
					`insert into releases(UID,QID)
					VALUE(?,?)`,
				[UID,id],
				(err, result) => {
				console.log(err);  
				}
			);
			con.query(
			`insert into contain(PID,QID)
			VALUE(?,?)`,
			[PID,id],
		(err, result) => {
		console.log(err);  
		}
	);
		res.send({QID:id,success:true})
});	
		
  
}); 

app.put('/api/updateQuizdes/:description',(req,res)=>{
	const description = req.params.description;
	const QID = req.body.QID;
	con.query(
	   `UPDATE quiz 
	   SET description=?
	   where QID=?`,
	   [description,QID],
	   (err, result) => {
		console.log(err); 
		
	   }
	 );
})


app.post('/api/quizsetCreate', (req, res) => {
	const QID = req.body.QID;
	const questions = req.body.questions;  
	console.log(QID);
	console.log(questions);
    for (var i=0;i<questions.length;i++){
		con.query(
	  `insert into quizquestion(QID,QuestionID,Qtext)
	  value(?,?,?);`,
	  [QID,i+1,questions[i]['questionText']] 
	);
     var options=questions[i]['answerOptions']
	 for (var j=0;j<options.length;j++){
     con.query(
		`insert into quizoptions(QID,QuestionID,optionnumber,Optionx,correctness)
		VALUE(?,?,?,'this is option description',True);`,
		[QID,i+1,j+1,options[j]['questionText'],options[j]['isCorrect']],
		(err, result) => {
			console.log(err);
			
		  }
	 );
	 }

	}


});







app.listen(3001,()=>{
	  console.log("running");
	})
	
// app.listen(process.env.PORT || 3001,()=>{
//   console.log('listening for requests on port'+ process.env.PORT);
// })