$(document).ready(function(){
	$("#signup").click(function(){
        var user = $("#username").val();
        var pwd = $("#password").val();
        var pd = {"username":user, "password":pwd};
        $.ajax({
            type:"post",
            url:"/signup",
            data:pd,
            cache:false,
            success:function(data){
                window.location.href = "/";
            },
            error:function(){
                alert("error!");
            },
        });
    });
});