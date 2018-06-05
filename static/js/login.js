$(document).ready(function(){
    
    function setCookie(c_name,value,time){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+time);
        document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString();
    }

    $("#login").click(function(){
       var user = $("#name").val();
       var pwd = $("#password").val();
       var pd = {"name":user,"password":pwd};
       $.ajax({
           type:"post",
           url:"/",
           data:pd,
           cache:false,
           success:function(data){
               alert(data);
               if(data=="welcome"){
                  setCookie("username",user,1);
                  window.location.href = "/index";
               }
               else{
                   window.location.href = "/";
               }
               return true;
           },
           error:function(){
               alert("error!");
           },
       });
    });
});