(this.webpackJsonpsite=this.webpackJsonpsite||[]).push([[0],{16:function(e,t,a){e.exports=a(30)},21:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(4),c=a.n(r),o=(a(21),a(8)),l=a.n(o),i=a(14),u=a(1),m=a(7),d=a.n(m),v=(a(5),a(9)),p=a.n(v);a(23);var E=function(e){var t=e.setCourseBoolHelper;return s.a.createElement("div",{className:"header-container"},s.a.createElement("button",{class:"header-add-course",id:"header-add-course",onClick:t},"+"))},f=(a(6),a(2));var g=function(e){var t=e.courseAddBool,a=e.updateJson,n=e.data;return s.a.createElement(s.a.Fragment,null,s.a.createElement(f.NotificationContainer,null),t?s.a.createElement("div",{className:"adder-container",style:{"margin-top":"40px"}},s.a.createElement("div",{class:"adder-inputs"},s.a.createElement("input",{type:"text",id:"courseName",placeholder:"Add Course Name"}),s.a.createElement("button",{class:"assessment-remove",onClick:function(){var e=n;e[document.getElementById("courseName").value]=[],a(e),f.NotificationManager.info(document.getElementById("courseName").value+" course is added ")}},"submit"))):"")};var b=function(e){var t=e.data,a=e.setSelHelper,r=(e.totalAvg,Object(n.useState)([])),c=Object(u.a)(r,2),o=c[0],l=c[1];return Object(n.useEffect)((function(){var e=[];for(var a in t)e.push(a);l(e),console.log(e)}),[t]),s.a.createElement("div",{className:"content-container"},o.map((function(e){return s.a.createElement("div",{className:"content-course",id:e,onClick:function(){return a(e)}},e)})))};var h=function(e){var t=e.data,a=e.selected,r=e.getGpa,c=Object(n.useState)(0),o=Object(u.a)(c,2),l=o[0],i=o[1],m=Object(n.useState)("0.00"),d=Object(u.a)(m,2),v=d[0],p=d[1];return Object(n.useEffect)((function(){var e=0,n=0;(null!=t[a]?t[a]:[]).map((function(t){e+=t[1]/100*t[2],n+=t[2],console.log(e)})),i((100*(n=0!=n?e/n:0)).toPrecision(3));var s=r((100*n).toPrecision(3));console.log(100*n);parseInt(s);var c="";(c=s>=3.9?"awesome":s>=3.7?"good":s>=3.3?"okay":"bad",""!=a)&&(document.getElementById("overview-gpa").className="overview-gpa "+c);p(s)}),[t,a]),s.a.createElement("div",{className:"overview-container"},""!=a?s.a.createElement(s.a.Fragment,null,s.a.createElement("h1",{class:"overview-header"},a),s.a.createElement("div",{class:"overview-mark"},s.a.createElement("i",null,l,"%"),s.a.createElement("br",null),s.a.createElement("div",{id:"overview-gpa",class:"overview-gpa"},v," gpa"))):s.a.createElement("h1",{class:"overview-header"},"Please Select a course"))};var O=function(e){var t=e.data,a=e.selected,r=e.updateJson,c=Object(n.useState)(!1),o=Object(u.a)(c,2),l=o[0],i=o[1];return s.a.createElement("div",{className:"adder-container"},""!=a&&s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{className:"adder-button",onClick:function(){return i(!l)}},"+"),l?s.a.createElement("div",{class:"adder-inputs"},s.a.createElement("input",{type:"text",id:"assessmentName",placeholder:"Add Assessment Name"}),s.a.createElement("div",{class:"adder-numbers"},s.a.createElement("input",{type:"number",id:"assessmentPercentage",max:"100",min:"0",placeholder:"Your percentage acheived"}),s.a.createElement("input",{type:"number",id:"assessmentWeightage",max:"100",min:"0",placeholder:"Weight of Assessment"})),s.a.createElement("button",{class:"assessment-remove",onClick:function(){var e=document.getElementById("assessmentName").value;e=""!=e||null!=e?e:"unnamed";var n=document.getElementById("assessmentPercentage").value;n=null!=n?n:0;var s=document.getElementById("assessmentWeightage").value;s=null!=s?s:0;var c=t,o=t[a];o.push([e,parseInt(n),parseInt(s)]),c[a]=o,i(!1),r(c),f.NotificationManager.info(e+" gained "+n+"%",a)}},"submit")):""))};var j=function(e){var t=e.data,a=e.selected,r=e.updateJson,c=Object(n.useState)([]),o=Object(u.a)(c,2),l=o[0],i=o[1],m=Object(n.useState)(0),d=Object(u.a)(m,2),v=d[0],p=d[1];return Object(n.useEffect)((function(){var e=null!=t[a]?t[a]:[];i(e);var n=0;e.map((function(e){n+=e[2],console.log(e[2])})),p(n),i(e),console.log(n),console.log(t[a]),document.getElementById("assessment-completion-bar").style.width=n+"px"}),[t,a]),s.a.createElement("div",{className:"assessment-container"},s.a.createElement("div",{class:"assessment-completion"},"Course Completion ",s.a.createElement("b",null,v),"  %"),s.a.createElement("div",{id:"assessment-completion-bar",class:"assessment-completion-bar"}),l.map((function(e){return s.a.createElement("div",{class:"assessment-single assessment-data"},s.a.createElement("div",null,s.a.createElement("b",null,e[0]),s.a.createElement("p",null,"Mark: "+e[1]+" % "),s.a.createElement("p",null,"Weightage: "+e[2])),s.a.createElement("div",null,s.a.createElement("button",{class:"assessment-remove",onClick:function(){return function(e){f.NotificationManager.error(e+" is deleted",a);var n=t,s=[];l.map((function(t){t[0]!=e&&s.push(t)})),n[a]=s,r(n)}(e[0])}},"X")))})))};var y=function(){var e=Object(n.useState)({}),t=Object(u.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(0),o=Object(u.a)(c,2),m=o[0],v=(o[1],Object(n.useState)("")),y=Object(u.a)(v,2),N=y[0],w=y[1],S=Object(n.useState)(!1),k=Object(u.a)(S,2),B=k[0],I=k[1],C=[{0:"0.00"},{56:"1.30"},{60:"1.70"},{63:"2.00"},{67:"2.30"},{70:"2.70"},{73:"3.00"},{77:"3.30"},{80:"3.70"},{85:"3.90"},{90:"4.00"},{100:"4.00"}];function J(e){p.a.start(),document.getElementById("header-add-course").classList.add("hide"),r(e);var t=new XMLHttpRequest,a=new FormData;a.append("dataJson",JSON.stringify(e)),t.open("POST","/update"),t.send(a),t.onreadystatechange=function(){t.readyState==XMLHttpRequest.DONE&&(f.NotificationManager.success(t.responseText),d.a.get("https://gitlab.com/api/v4/projects/23578539/repository/files/data%2Ejson/raw?ref=master",(function(e){r(JSON.parse(e)),p.a.done(),document.getElementById("header-add-course").classList.remove("hide")})))}}return Object(n.useEffect)(Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d.a.get("https://gitlab.com/api/v4/projects/23578539/repository/files/data%2Ejson/raw?ref=master",(function(e){r(JSON.parse(e))}));case 1:case"end":return e.stop()}}),e)}))),[]),s.a.createElement("div",{className:"App"},s.a.createElement(E,{setCourseBoolHelper:function(){I(!B)}}),s.a.createElement(g,{courseAddBool:B,updateJson:J,data:a}),s.a.createElement(b,{data:a,setSelHelper:function(e){console.log(e),document.getElementById(e).classList.add("selected"),w(e)},totalAvg:m}),s.a.createElement(h,{data:a,selected:N,getGpa:function(e){if(100==e)return"4.00";for(var t=0;t<C.length-1;t++){var a=parseInt(Object.keys(C[t])),n=parseInt(Object.keys(C[t+1]));if(e>=a&&e<n)return C[t][a]}return C[e]}}),s.a.createElement(O,{data:a,selected:N,updateJson:J}),s.a.createElement(j,{data:a,selected:N,updateJson:J}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},5:function(e,t,a){}},[[16,1,2]]]);
//# sourceMappingURL=main.856b0d42.chunk.js.map