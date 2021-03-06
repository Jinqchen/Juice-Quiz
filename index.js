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
const aws = require('aws-sdk');

// S3
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('./server/s3');
const { connect } = require('http2');
const Connection = require('mysql/lib/Connection');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



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





  
app.post('/images', upload.single('image'), async (req, res) => {
	const file = req.file
	console.log("test file")
	console.log(file)
    
  
	const result = await uploadFile(file)
	await unlinkFile(file.path)
	console.log(result)
	const description = req.body.description
	res.send({imagePath: `/images/${result.Key}`})
  })




//Answering
app.get('/api/answer/:id',(req,res)=>{
      console.log("Connected!");
	  const QID = req.params.id;
    con.query(
		`select q.QuestionID,q.Qtext,qo.optionnumber,qo.Optionx,qo.correctness from quizquestion q, quizoptions qo
		where q.QID=${QID} and q.QID=qo.QID AND q.QuestionID=qo.QuestionID`,
		function (err1, result) {
			if (err1) throw err1;
			res.send(result);			
		}
	  )
	 
	}
  );


  app.get('/api/answer/time/:id',(req,res)=>{
	console.log("time");
	const QID = req.params.id;
  con.query(
	  `SELECT TakeTime FROM quiz where QID=${QID}`,
	  function (err1, result) {
		  if (err1) throw err1;
		  console.log(result);
		  res.send(result);			
	  }
	)
   
  }
);
  app.get('/api/getusername/:id',(req,res)=>{
	console.log("Connected!");
	const UID = req.params.id;
  con.query(
	  `select Uname from users where UID=${UID}`,
	  function (err1, result) {
		  if (err1) throw err1;
		  res.send(result);
		  
	  }
	)
   
  }
);

app.put('/api/answer/updateRep/:id',(req,res)=>{
     const QID = req.params.id;
	 const PID = req.body.PID;
	 const UID = req.body.UID;
	 console.log("update rep")
	 console.log(QID);
	 console.log(PID);
	 console.log(UID);
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
			res.send(result);
		
		}
	  )
		}		
	  );
	
	}
  )
     
})
 //Get platform list
app.get ('/api/Platform',(req,res)=>{
	con.getConnection(function(err, connection){
		connection.query(
		"SELECT Pcover,p.PID,Pname,tag from platformstyle s,platform p where s.PID=p.PID  order BY RAND() limit 8;", 
		function (err1, result) {
		if (err1) throw err1;
	    res.send(result);
		connection.destroy();			
	}
    );   
  })
})

app.get ('/api/Platform/:tag',(req,res)=>{
	const tag = req.params.tag;
	console.log(tag)
	con.getConnection(function(err, connection){
    connection.query(
		`select p.PID,p.Pname, ps.Pcover
        from platform p, platformstyle ps
        where p.PID=ps.PID AND p.tag ='${tag}'  order BY RAND() limit 4`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result)
	    res.send(result);
		connection.destroy();
	}
  );
	})
})

// Get quizlist
  app.get ('/api/platform/quizlist/:id',(req,res)=>{
    console.log("quiz Connected!");
	const PID = req.params.id;	
	con.getConnection(function(err, connection){
    connection.query(
		`SELECT q.QID,q.Qname,q.ave_rate,q.hot,q.description ,u.Uname AS Releaser, pic 
		FROM quiz q,contain c,releases r,users u, userstyle us
		WHERE q.QID=c.QID AND q.QID=r.QID and r.UID = U.UID and r.UID=us.UID and c.PID=`+PID, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);
		connection.destroy();
	}
  );

	})
    })

  app.get ('/api/manageQuiz/quizlist_total/:id',(req,res)=>{
	const UID = req.params.id;
	con.getConnection(function(err, connection){
		connection.query(
		`select QID from releases where UID=${UID}`, 
		function (err1, result) {
		if (err1) throw err1;
        res.send(result)
		connection.destroy();		
	}
  );
	})
    
}
)


app.get ('/api/manageQuiz/quizlist/:id',(req,res)=>{
    console.log("manage Connected!");
	const QID = req.params.id;
	con.getConnection(function(err, connection){
		connection.query(
		`select Qname,ave_rate,hot,description,releasedate from quiz where QID=${QID}`, 
		function (err1, result) {
		if (err1) throw err1;
        res.send(result);
		connection.destroy();		
	}
  );
	})
    
}
)





  app.get ('/api/user/subscribed/:id',(req,res)=>{
    console.log("uer Connected!");
	const UID = req.params.id;
	con.getConnection(function(err, connection){
		con.query(
				`select s.PID,r.Rpoint,ps.Pcover,p.Pname
				from subscribe s, reputation r,platform p,platformstyle ps
				where  r.UID=s.UID AND s.UID=`+UID+ ` and p.PID= s.PID AND p.PID= r.PID AND ps.PID=p.PID 
				ORDER BY r.Rpoint desc`, 
				function (err1, result) {
				if (err1) throw err1;
				console.log(result);
				res.send(result);
				connection.destroy();
			}
		);

	})
    
})



  app.get ('/api/user/history/:id',(req,res)=>{
    console.log("history");
	const UID = req.params.id;
 
		con.query(
		`select q.Qname,q.ave_rate,q.hot,q.description,q.reputationneed,q.Taketime,q.releasedate,
        h.whendo,h.rate,h.score,h.timespend,c.PID
        from history h,quiz q,contain c where q.QID=h.QID AND UID=${UID} AND q.QID=C.QID;`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    con.query(
        `SELECT * FROM history WHERE UID=${UID} AND QID=0`,
		function (err, result0) {
			var list = result.concat(result0);
			res.send(list);
			
		}
		)
	}
  );
	
	
}
)








  app.get ('/api/user/owned/:id',(req,res)=>{
    console.log("owned Connected!");
	const UID = req.params.id;
	console.log("UID:"+UID);
	con.getConnection(function(err, connection){
		connection.query(
		`select Pcover, o.PID,p.Pname from own o, platform p,platformstyle s
		where UID=${UID} and o.PID=p.PID AND o.PID=s.PID`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);
	    connection.destroy();
	}
  );
	})
    
})



//Get ranklist
  app.get ('/api/platform/ranklist/:id',(req,res)=>{
    console.log("rank Connected!");
	const PID = req.params.id;
	con.getConnection(function(err, connection){
		connection.query(
		`select U.UID,U.Uname,Rpoint,pic
		from users U,platform P,reputation R,userstyle us
		where P.PID=`+PID+` AND P.PID= R.PID AND U.UID=R.UID and U.UID=us.UID
		ORDER BY Rpoint DESC`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result);
	    res.send(result);
		connection.destroy();
	}
  );
	})
    })

  app.get ('/api/platform/:id/replimit',(req,res)=>{
	const PID = req.params.id;
	con.getConnection(function(err, connection){
		connection.query(
			`select  replimit
			from platform p
			where  p.PID=${PID}`, 
			function (err1, result) {
			if (err1) throw err1;
			console.log(result);
			res.send(result);
			connection.destroy();
		}
	);

	})
    })

//Search
  app.get ('/api/platformSearch/:name',(req,res)=>{
    console.log("platform Connected!");
	const name = req.params.name;
	console.log(name);
	con.getConnection(function(err, connection){
		connection.query(
		`select p.PID,p.Pname, ps.Pcover
		from platform p, platformstyle ps
		where p.Pname LIKE '%`+name+`%' and p.PID=ps.PID`, 
		function (err1, result) {
		if (err1) throw err1;
		
	    res.send(result);
		connection.destroy();
	}
  );	
	})
    })

  app.get ('/api/quiz/:name',(req,res)=>{
    console.log("platform Connected!");
	const name = req.params.name;
	const PID = req.query.PID;
	console.log(PID);
	con.getConnection(function(err, connection){
 connection.query(
		`select q.QID,q.Qname,q.ave_rate,q.hot,q.description 
		from quiz q,contain c
		where q.QID=c.QID and c.PID=`+PID+` and q.Qname  LIKE '%`+name+`%'`, 
		function (err1, result) {
		if (err1) throw err1;
	    res.send(result);
	    connection.destroy();
	}
  );
	})
   
})




//Logging System
app.post('/api/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
    const email  = req.body.email;
	con.getConnection(function(err,connection){
     connection.query('select COUNT(UID) from users',function(err,result){
		var index = result[0]["COUNT(UID)"]
		//console.log(index);
		var id =index+1;
		console.log(id);
		connection.destroy();
		con.getConnection(function(err,connection){
		connection.query(
				"INSERT INTO users (UID,Uname,Uemail,Upass) VALUES (?,?,?,?)",
				[id,username,email,password],
				(err, result) => {
				console.log(err);
				res.send({UID: id});
                connection.destroy(); 
				con.query(`insert into userstyle(UID,pic)
				value(${id},'./user_image/1.png');`)

				}
			);



		})
		
	});


	})
	
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
	const PID = req.body.PID.toString();
	const UID = req.body.UID.toString();  
	console.log(PID)
	con.query(
	  `SELECT EXISTS(SELECT UID FROM own WHERE UID=? AND PID=?)`,
	  [UID,PID],
	  (err, result) => {
		  console.log("owner")
		  console.log(result);
		  var sub =result[0]["EXISTS(SELECT UID FROM own WHERE UID='"+UID+"' AND PID='"+PID+"')"];
	     console.log(sub);
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

  app.post('/api/platform/allow_co', (req, res) => {
	const PID = req.body.PID;
	
    con.getConnection(function(err,connection){
    connection.query(
	  `select allowco from platform where PID=?`,
	  [PID],
	  (err, result) => {
		var allow =result[0]["allowco"];
		if (err) {
		  res.send({ err: err });
		}
	    if (allow==1){
			res.send({allow_co:true});
		}else{
			res.send({allow_co:false});
		}
		connection.destroy();
	  }
	);
	
	})

	
  });



  app.delete('/api/platform/delSub/:id', (req, res) => {
	const PID = req.params.id;
	const UID = req.body.UID;  
	console.log('delete sub');
	con.getConnection(function (err, connection) {
		connection.query(
	  `delete from subscribe where PID=? and UID=?`,
	  [PID,UID],
	  (err, result) => {
		console.log(result);
		connection.destroy();
		  }
	);
	})
	
  });

  app.delete('/api/platform/delRep/:id', (req, res) => {
	const PID = req.params.id;
	const UID = req.body.UID;  
	con.query(
	  `delete from reputation where UID=${UID} AND PID=${PID}`,
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
	//console.log(PID);
	con.query(
		`select Rpoint 
		from reputation r
		where r.UID=${UID} AND r.PID=${PID};`, 
		function (err1, result) {
		if (err1) throw err1;
		//console.log(result);
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
	con.getConnection(function (err, connection) {
		connection.query(
	  `insert into reputation (Rpoint,PID,UID)
	  value(0,?,?);`,
	  [PID,UID],
	  (err, result) => {
		  console.log(result);
		if (err) {
		  res.send({ err: err });
		}
		connection.destroy();
	  }
	);
	})
	
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

  app.post('/images/:id', upload.single('image'), async (req, res) => {
	const PID = req.params.id;
	const file = req.file
	console.log(file);
	console.log("start")
	
	const result = await uploadFile(file);
	console.log("phase1")
	await unlinkFile(file.path);
	console.log(result.Location);
	var link = result.Location;
	link = link.slice(38)
	console.log(link)   
  
	
	con.query(`insert into platformstyle(PID,Pcover) value(?,?);`,
	[PID,link],
	(err, result) => {
		console.log(result);
	  if (err) {
		res.send({ err: err });
	  }
	}
	
	
	)



	

  })













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
            con.query(
				`insert into releases(UID,QID)
					VALUE(?,?)`,
				[UID,id],
				(err, result) => {
				console.log(err); 
				con.query(
			   `insert into contain(PID,QID)
			    VALUE(?,?)`,
			    [PID,id],
		        (err, result) => {
		       console.log(err);  
		       }
	           );
			}
		);
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
	const index = req.body.index;
	const questiontext = req.body.questiontext;  
	console.log(QID);
	console.log(index);
	console.log(questiontext);
	con.getConnection(function (err,connection) {
			connection.query(
	     `insert into quizquestion(QID,QuestionID,Qtext)
	     value(?,?,?);`,
	     [QID,index+1,questiontext],
		 (err,res)=>{connection.destroy();}
	     );
		})
})		
	
	// app.post('/api/quizsetInsert', (req, res) => {
	// 	const QID = req.body.QID;
	// 	const index = req.body.index;
	// 	const j = req.body.j;
	// 	const answertext = req.body.answertext; 
	// 	const isCorrect = req.body.isCorrect; 
	// 	console.log("insert quizoption")
	// 	console.log(QID);
	// 	console.log(index);
	// 	console.log(j)
	// 	console.log(answertext);
	// 	con.getConnection(function (err,connection) {
	// 			connection.query(
	// 		 `insert into quizoptions(QID,QuestionID,optionnumber,Optionx,correctness)
	// 	    	VALUE(?,?,?,?,?);`,
	// 		 [QID,index+1,j+1,answertext,isCorrect],
	// 		 (err,res)=>{connection.destroy();}
	// 		 );
	// 		})
	// })	

	app.post('/api/quizsetInsert', (req, res) => {
		const value = req.body.value;
		console.log(value)
	
		con.getConnection(function (err,connection) {
				connection.query(
			 `insert into quizoptions(QID,QuestionID,optionnumber,Optionx,correctness)
		    	VALUE ?;`,
			 [value],
			 (err,res,fields)=>{
				console.log(res) 
				connection.destroy();
			
			
			
			
			}
			 );
			})
	})	


app.post('/api/quizsetEdit/insert', (req, res) => {
	const QID = req.body.QID;
	const questions = req.body.questions;  
	 console.log("insert");
	// console.log(questions);
    for (var i=0;i<questions.length;i++){
		con.getConnection(function (err,connection) {
		con.query(
	  `insert into quizquestion(QID,QuestionID,Qtext)
	  value(?,?,?);`,
	  [QID,questions[i]['key'],questions[i]['questionText']] 
	);	
		})
		
	
     var options=questions[i]['answerOptions']
	 for (var j=0;j<options.length;j++){
     con.query(
		`insert into quizoptions(QID,QuestionID,optionnumber,Optionx,correctness)
		VALUE(?,?,?,?,?);`,
		[QID,questions[i]['key'],j+1,options[j]['answerText'],options[j]['isCorrect']],
		(err, result) => {
			console.log(err);
			connection.release();
			
		  }
	 );
	 }

	}


});


app.delete('/api/quizsetEdit/delete', (req, res) => {
	const QID = req.body.QID;
	const del = req.body.del;  
	console.log(QID);
	console.log(del);
    for (var i=0;i<del.length;i++){
		con.query(
	   `DELETE FROM quizquestion WHERE QID=${QID} and QuestionID=${del[i]};`,
	    );

	  con.query(
		`DELETE FROM quizoptions WHERE QID=${QID} and QuestionID=${del[i]};`,
		);
	}
});



app.delete('/api/quiz/delete/:id', (req, res) => {
	const QID = req.params.id;
	const UID = req.body.UID;
	console.log(QID);
	con.getConnection(function(err, connection){
		connection.query(
		`update history set QID=0 WHERE UID=${UID} AND QID=${QID};`, 
		function (err1, result) {
		if (err1) throw err1;
		console.log(result)
		connection.destroy();					
		
	}
	);   
  })
	con.getConnection(function(err, connection){
		connection.query(
		`delete from releases where QID=${QID};`, 
		function (err1, result) {
		if (err1) throw err1;
        console.log(result)
		connection.destroy();	
		
		con.getConnection(function(err, connection){
			connection.query(
			`delete from contain where QID=${QID};`, 
			function (err1, result) {
			if (err1) throw err1;
			console.log(result)
			connection.destroy();	
			
			
			con.getConnection(function(err, connection){
				connection.query(
				`delete from quizoptions  where QID=${QID};`, 
				function (err1, result) {
				if (err1) throw err1;
				console.log(result)
				connection.destroy();

				con.getConnection(function(err, connection){
					connection.query(
					`delete from quizquestion where QID=${QID};`, 
					function (err1, result) {
					if (err1) throw err1;
					console.log(result)
					connection.destroy();	
					
					con.getConnection(function(err, connection){
						connection.query(
						`delete from quiz where QID=${QID};`, 
						function (err1, result) {
						if (err1) throw err1;
						console.log(result)
						connection.destroy();					
						
					}
					);   
				  })
					
					
				}
				);   
			  })
				
				
			}
			);   
		  })
		}
		);   
	  })



	}
    );   
  })
});






app.put('/api/quizsetEdit/change', (req, res) => {
	const QID = req.body.QID;
	const questions = req.body.question;  
	console.log(QID);
	console.log(questions);
    for (var i=0;i<questions.length;i++){
		console.log(questions[i]['questionText'])
		con.query(
	  `UPDATE quizquestion 
	  SET Qtext=?
	  WHERE QID=? and QuestionID=?;`,[questions[i]['questionText'],QID,i+1],
	  (err, result) => {
		console.log(err);
		
	  }
	  );
	  var options=questions[i]['answerOptions']
	 for (var j=0;j<options.length;j++){
     con.query(
		`UPDATE quizoptions 
		SET Optionx=?
		WHERE QID=? and QuestionID=? and optionnumber=?;`,
		[options[j]['answerText'],QID,i+1,j+1],
	 );
	 

    con.query(`UPDATE quizoptions 
	SET correctness=?
	WHERE QID=? and QuestionID=? and optionnumber=?;`),[options[j]['isCorrect'],QID,i+1,j+1]
	}
}
});



app.put('/api/answer/rating', (req, res) => {
	const QID = req.body.QID;
	const UID = req.body.UID;
	const rate = req.body.rating;  
	console.log(QID);
	console.log(UID);
	console.log(rate);   
   con.query(
	   `SELECT max(whendo) FROM history where UID=${UID} AND QID=${QID};`,
	   (err, result) => {
		console.log(result); 
		var whendo=result[0]['max(whendo)'];
	    whendo =  new Date(Date.UTC(whendo.getFullYear(), 
		                            whendo.getMonth(),
		                            whendo.getDate(),  
									whendo.getHours(), 
									whendo.getMinutes(), 
									whendo.getSeconds())).toISOString().slice(0, 19).replace('T', ' ');
		console.log(whendo)
		con.query(
			`update history set rate = ${rate} 
             where QID=${QID} and UID=${UID} and whendo='${whendo}'`,
			(err, result) => {
			 console.log(result); 
			 con.query(
				`SELECT AVG(rate) FROM history WHERE QID=${QID} group by QID;`,
				(err,result)=>{
					console.log(result[0]['AVG(rate)']);
					var avg_rate = result[0]['AVG(rate)'];
					con.query(
				   `update quiz set ave_rate =${avg_rate} where QID=${QID};`,
				   (err1,res)=>{
					   console.log(res)
				   }
					)
				}
			)
			}
		 );
	   }	   
	   );
})


app.get('/api/answer/result/:id', (req, res) => {
	const QID = req.params.id;
	const UID = req.query.UID;
	console.log("start rating ")
	console.log(QID);
	console.log(UID);   
    con.query(
	   `SELECT max(whendo) FROM history where UID=${UID} AND QID=${QID};`,
	   (err, result) => {
		console.log(result); 
		var whendo=result[0]['max(whendo)'];
	    whendo =  new Date(Date.UTC(whendo.getFullYear(), 
		                            whendo.getMonth(),
		                            whendo.getDate(),  
									whendo.getHours(), 
									whendo.getMinutes(), 
									whendo.getSeconds())).toISOString().slice(0, 19).replace('T', ' ');
		console.log(whendo)
		con.query(
			`select score,timespend from history  where UID=${UID} AND whendo='${whendo}';`,
			(err, result1) => {
			 console.log(result1); 
			 res.send(result1)
			}
		 );
	   }	   
	   );
})



app.post('/api/answer/updateHIS/:id', (req, res) => {
	const QID = req.params.id;
	const UID= req.body.UID;  
	const score = req.body.Score;
	const timespend = req.body.timeSpend;
	
	console.log("update history")
	console.log(QID);
	console.log(UID);
    console.log(score);
	console.log("end")
	con.getConnection(function (err,connection) {
		connection.query(
	   `insert into history(UID,QID,whendo,rate,score,timespend)
	   value(?,?,now(),?,?,?);`,
	   [UID,QID,null,score,timespend],
	   (err, result) => {
		console.log(result);
		connection.destroy(); 		
	   }
    );
	})
    con.getConnection(function (err,connection) {
	connection.query(
		`SELECT COUNT(*) FROM history WHERE QID=${QID};`,
		(err, result) => {
		 console.log(result[0]['COUNT(*)'])
         var hot = result[0]['COUNT(*)'];
		 hot = hot + 1;
		 con.query(
			`update quiz set hot=${hot} where QID=${QID};`,
			(err, result) => {
			 console.log(err); 
			 connection.destroy();
			}
		 );
		 
		}
	 );	
	})
	
})

// app.listen(3001,()=>{
// 	  console.log("running");
// 	})
	
app.listen(process.env.PORT || 3001,()=>{
  console.log('listening for requests on port'+ process.env.PORT);
})