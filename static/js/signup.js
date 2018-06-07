$(document).ready(function(){
	
    $("#signup").click(function(){
        var username=$("#zusername").val();
        var pwd=$("#zpassword").val();
        var name=$("#zname").val();
        var mail=$("#zmailbox").val();
        var occ=$("#zoccupation").val();
        var company=$("#zcompany").val();
        var pd = {"zusername":username,"zpassword":pwd,"zname":name,"zmailbox":mail,"zoccupation":occ,"zcompany":company};
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