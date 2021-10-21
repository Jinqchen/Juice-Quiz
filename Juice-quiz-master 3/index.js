var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port =3001;
var mysql = require("mysql");



const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
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
	port:3306
});


app.get ('/api/get',(req,res)=>{

     console.log("Connected!");
	con.query("SELECT questionText,q2.questionID,option1,option2,option3,option4,correct FROM quiz q, QuizQuestion q2 WHERE q2.QID=1 AND q.QID=q2.QID;", function (err1, result) {
	  if (err1) throw err1;
	  res.send(result);
 
}
);
 
})

app.listen(process.env.PORT || 3001,()=>{
  console.log('listening for requests on port'+process.env.PORT)
})



