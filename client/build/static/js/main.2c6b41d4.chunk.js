(this["webpackJsonpquiz-app-starter"]=this["webpackJsonpquiz-app-starter"]||[]).push([[0],{19:function(e,t,a){e.exports=a(45)},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(17),o=a.n(r),i=(a(24),a(2)),l=a(3),c=a(5),u=a(4),m=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).componentDidMount=function(){console.log("Component did mount"),setTimeout((function(){fetch("https://juice-quiz.herokuapp.com/api/get").then((function(e){return e.json()})).then((function(e){console.log(e);var t=JSON.stringify(e),a=JSON.parse(t);s.setState({ques:JSON.stringify(a)}),console.log("before"),s.processData(),console.log("after")}))}))},s.processData=function(){var e=JSON.parse(s.state.ques);s.setState({queslength:e["count(QuestionID)"]});var t=s.state.currentQuestion;console.log(t),console.log(s.state.queslength),console.log("processing");var a=e[t+1].Optionx,n=a[0],r=a[1],o=a[2],i=a[3];s.setState({quesText:e[t+1].Qtext}),s.setState({opt1:n}),s.setState({opt2:r}),s.setState({opt3:o}),s.setState({opt4:i}),s.setState({answerOptions:[n,r,o,i]})},s.handleNextQuestion=function(e){var t=s.state.currentQuestion;console.log("handler");var a=!1;1===e.correctness&&(a=!0);var n=s.state.currentScore,r=s.state.queslength,o=t+1;console.log("nextQuestion"),console.log("questlen"),s.setState({currentQuestion:o}),o<r?a&&(n+=1,s.setState({currentScore:n})):(a&&(n+=1,s.setState({currentScore:n})),s.setState({showScore:!0})),console.log(s.state.currentQuestion),s.processData()},s.state={currentQuestion:0,showScore:!1,currentScore:0,ques:[],queslength:0,quesText:"",opt1:"",opt2:"",opt3:"",opt4:"",answerOptions:[]},s}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"app"},this.state.showScore?n.a.createElement("div",{className:"score-section"},"You scored  out of ",this.state.currentScore):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"question-section"},n.a.createElement("div",{className:"question-count"},n.a.createElement("span",null,"Question ",this.state.currentQuestion+1," "),"/"),n.a.createElement("div",{className:"question-text"},this.state.quesText)),n.a.createElement("div",{className:"answer-section"},this.state.answerOptions.map((function(t){return n.a.createElement("button",{onClick:function(){return e.handleNextQuestion(t)}},t.Optionx)})))))}}]),a}(s.Component),h=(a(25),a(26),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={trigger:!1,userName:"",email:"",password:"",conformPassword:""},s}return Object(l.a)(a,[{key:"handleChangeUserName",value:function(e){this.setState({userName:e.target.value}),this.props.getUserName(this.state.userName)}},{key:"handleChangePassWord",value:function(e){this.setState({password:e.target.value}),this.props.getPassword(this.state.password)}},{key:"handleChangeEmail",value:function(e){this.setState({email:e.target.value}),this.props.getEmail(this.state.email)}},{key:"handleChangeConfirmPassword",value:function(e){this.setState({conformPassword:e.target.value}),this.props.getConfirm(this.state.conformPassword)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{className:"signUpBoard"},n.a.createElement("label",{className:"SIGNUP"},"SignUp"),n.a.createElement("div",{className:"userInput"},n.a.createElement("label",null,"Email:"),n.a.createElement("input",{type:"text",placeholder:"Enter Email",name:"email",required:!0,onChange:this.handleChangeEmail.bind(this)})),n.a.createElement("div",{className:"userInput"},n.a.createElement("label",null,"UserName:"),n.a.createElement("input",{type:"text",placeholder:"Enter UserName",name:"useName",required:!0,onChange:this.handleChangeUserName.bind(this)})),n.a.createElement("div",{className:"userInput"},n.a.createElement("label",null,"Password:"),n.a.createElement("input",{type:"text",placeholder:"Enter password",name:"password",required:!0,onChange:this.handleChangePassWord.bind(this)})),n.a.createElement("div",{className:"userInput"},n.a.createElement("label",null,"Confirm your pass word:"),n.a.createElement("input",{type:"text",placeholder:"Confirm your password",name:"confirmPassword",required:!0,onChange:this.handleChangeConfirmPassword.bind(this)}))))}}]),a}(s.Component)),p=a(18),d=a.n(p),g=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).submit=function(){d.a.post("https://juice-quiz.herokuapp.com/api/register",{username:s.state.userName,email:s.state.email,password:s.state.password,confirmPassword:s.state.confirmPassword}).then((function(e){console.log(e)})),s.setState({visible:!1})},s.state={visible:!1,userName:"",email:"",password:"",confirmPassword:""},s}return Object(l.a)(a,[{key:"getEmail",value:function(e){this.setState({email:e}),console.log("parent email is:"),console.log(this.state.email)}},{key:"getConfirm",value:function(e){this.setState({confirmPassword:e}),console.log("parent confirmpassword is:"),console.log(this.state.confirmPassword)}},{key:"getUserName",value:function(e){this.setState({userName:e}),console.log("parent userName is:"),console.log(this.state.userName)}},{key:"getPassword",value:function(e){this.setState({password:e}),console.log("parent password is:"),console.log(this.state.password)}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"header"},n.a.createElement("button",{onClick:function(){return e.setState({visible:!0})},type:"button",className:"signUp"},"Sign up")),this.state.visible&&n.a.createElement(h,{getEmail:this.getEmail.bind(this),getConfirm:this.getConfirm.bind(this),getPassword:this.getPassword.bind(this),getUserName:this.getUserName.bind(this)}),this.state.visible&&n.a.createElement("div",null," ",n.a.createElement("button",{className:"submit",onClick:function(){return e.submit()}},"submit"),n.a.createElement("button",{className:"cancel",onClick:function(){return e.setState({visible:!1})}},"X")))}}]),a}(s.Component);o.a.render(n.a.createElement(g,null),n.a.createElement(m,null),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.2c6b41d4.chunk.js.map