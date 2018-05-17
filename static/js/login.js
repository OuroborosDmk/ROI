$(document).ready(function(){
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