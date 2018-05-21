$(document).ready(function(){
	$("#signup").click(function(){
        var user = $("#zusername").val();
        var pwd = $("#zpassword").val();
        var pd = {"zusername":user, "zpassword":pwd};
        $.ajax({
            type:"post",
            url:"/signup",
            data:pd,
            cache:false,
            success:function(data){
                if(data=="ok"){
                    alert("注册成功！");
                    window.location.href = "/";
                }
                else if(data=="error"){
                    alert("该用户名已经存在！");
                }
            },
            error:function(){
                alert("error!");
            },
        });
    });
});