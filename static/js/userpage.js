$(document).ready(function(){
	var userinformations;

	function getCookie(c_name){
        var arr=document.cookie.split(';');
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');     
            if(arr2[0]==c_name){  
                var getC = decodeURIComponent(arr2[1]);
                return getC;
            }
        }
             
        return "";
    }

    function checkCookie(){
        var c_username=getCookie('username');
        if(c_username!=null&&c_username!=""){
            return true;
        }
        else{
            alert("还没有进行登录！");
            window.location.href="/";
        }
    }

    function setCookie(c_name,value,time){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+time);
        document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString();
    }
    
    function removeCookie(name){
        setCookie(name, '1', -1);
    }

    function showinformation(){
    	var c_username=getCookie('username');
    	var username={"username":c_username};
    	$.ajax({
            async:false,
            type:"post",
            data:username,
            url:"/userpage",
            success:function(data){
                userinformations=data;  
            },
        });
        $("#showusername").html(c_username);
        $("#showname").html(userinformations.u_name);
        $("#showmailbox").html(userinformations.mailbox);
        $("#showocc").html(userinformations.occ);
        $("#showcom").html(userinformations.com);
    }

    checkCookie();
    showinformation();

    $("#userbutton").click(function(){
    	$("#div1").css("display","block");
    	$("#div2").css("display","none");
    	$("#div3").css("display","none");
    	showinformation();
    });

    $("#changepaw").click(function(){
    	$("#div1").css("display","none");
    	$("#div2").css("display","block");
    	$("#div3").css("display","none");
    });

    $("#changepswbtn").click(function(){
    	if($("#newpassword1").val()==$("#newpassword2").val()){
    		var c_username=getCookie('username');
    		var password=$("#password").val();
    		var newpassword=$("#newpassword1").val();
    		var onepassword={"username":c_username,"password":password};
    		var twopassword={"username":c_username,"newpassword":newpassword};
    		var psdtrue;
    		$.ajax({
            	async:false,
            	type:"get",
            	data:onepassword,
            	url:"/changepsw",
            	success:function(data){
                	psdtrue=data;  
            	},
        	});
        	if(psdtrue=="1"){
        		$.ajax({
            		async:false,
            		type:"post",
            		data:twopassword,
            		url:"/changepsw",
            		success:function(data){
                		alert("修改密码成功！请重新登录");
                		removeCookie("username");
            			$("#rightbox").html(" ");
            			window.location.href = "/";
            		},
        		});
        	}
        	else{
        		alert("原密码错误！");
        		$("#div1").css("display","none");
    			$("#div2").css("display","block");
    			$("#div3").css("display","none");
        	}
    	}
    	else{
    		alert("两次输入的密码不一致，请重新输入！");
    		$("#div1").css("display","none");
    		$("#div2").css("display","block");
    		$("#div3").css("display","none");
    	}
    });

    $("#changeifm").click(function(){
    	$("#div1").css("display","none");
    	$("#div2").css("display","none");
    	$("#div3").css("display","block");
    });

    $("#changeuserbtn").click(function(){
    	var c_username=getCookie('username');
    	var u_name=$("#u_name").val();
    	var mailbox=$("#mailbox").val();
    	var occ=$("#occ").val();
    	var com=$("#com").val();
    	var changeuserinf={"username":c_username,"u_name":u_name,"mailbox":mailbox,"occ":occ,"com":com};
    	$.ajax({
            async:false,
            type:"post",
            data:changeuserinf,
            url:"/changeinf",
            success:function(data){
                alert("修改信息成功！");
                $("#div1").css("display","none");
    			$("#div2").css("display","none");
    			$("#div3").css("display","block");
            },
        });
    });

    $("#exit").click(function(){
        var returnsign=confirm("确认退出登录？");
        if(returnsign==true){
            removeCookie("username");
            $("#rightbox").html(" ");
            window.location.href = "/";
        }
    });

    $("#returnbutton").click(function(){
        var returnsign=confirm("确认返回首页？");
        if(returnsign==true){
            $("#rightbox").html(" ");
            window.location.href = "/index";
        }
    });
});