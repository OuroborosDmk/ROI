$(document).ready(function(){
    var getuser;
    var getpatient;
    var table2=new Array();
    var patientname=new Array();
    var patientsex=new Array();
    var patientage=new Array();
    var patientheight=new Array();
    var patientweight=new Array();
    var patientocc=new Array();
    var username=new Array();
    var u_name=new Array();
    var usermailbox=new Array();
    var userocc=new Array();
    var usercom=new Array();

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
            window.location.href="/adminlogin";
        }
    }

    function removeCookie(name){
        setCookie(name, '1', -1);
    }

    function getpatientid(){
        var patientcount;
        $.ajax({
            async:false,
            type:"get",
            url:"/adminpatient",
            success:function(data){
                patientcount=data;  
            },
        });
        for(var i=0;i<patientcount;i++){
            var patientindex={"postcount":i};
            $.ajax({
                async:false,
                type:"post",
                data:patientindex,
                url:"/adminpatient",
                success:function(data){
                    getpatient=data;  
                },
            });
            patientname[i]=getpatient.patientname;
            patientsex[i]=getpatient.patientsex;
            patientage[i]=getpatient.patientage;
            patientheight[i]=getpatient.patientheight;
            patientweight[i]=getpatient.patientweight;
            patientocc[i]=getpatient.patientocc;
        }
    }

    function showpatient(){

    }

    function getuser(){
        var usercount;
        $.ajax({
            async:false,
            type:"get",
            url:"/adminuser",
            success:function(data){
                patientcount=data;  
            },
        });
        for(var i=0;i<patientcount;i++){
            var userindex={"postcount":i};
            $.ajax({
                async:false,
                type:"post",
                data:userindex,
                url:"/adminuser",
                success:function(data){
                    getuser=data;  
                },
            });
            username[i]=getuser.username;
            u_name[i]=getuser.u_name;
            usermailbox[i]=getuser.usermailbox;
            userocc[i]=getuser.userocc;
            usercom[i]=getuser.usercom;
        }
    }
    checkCookie();
    showpatient();

    $("#userbutton").click(function(){  
        getuser();
        $(".leftbox").css("height","694px");
        if(parseInt(count)>30){
            var height=694+(parseInt(count)-30)*22;
            $(".leftbox").css("height",height+"px");
        }
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>ID</td><td>用户名</td><td>姓名</td><td>邮箱</td><td>职业</td><td>公司</td><td>操作</td></tr>");
        count=parseInt(count);
        for(var i=0;i<count;i++){
            var newbox=$("<tr id="+"table"+i+"><td>"+(i+1)+"</td><td>"+username[i]+"</td><td>"+u_name[i]+"</td><td>"+usermailbox[i]+"</td><td>"+userocc[i]+"</td><td>"+usercom[i]+"</td><td><a class='starta'>删除</a></td></tr>");
            $("#idtable").append(newbox);
        }
        $(".starta").click(function(){
            var getid1=this.id;
            var id={"userid":getid1,"username":};
            $.ajax({
                async:false,
                type:"get",
                url:"/index",
                data:id,
                cache:false,
                success:function(data){
                    alert("删除成功!");
                    $("#"+getid1).css("display","none");
                },
                error:function(){
                    alert("error!");
                },
            });
        });
    });

    $("#returnbutton").click(function(){
        var returnsign=confirm("确认返回用户界面？");
        if(returnsign==true){
            removeCookie("username");
            $("#rightbox").html(" ");
            window.location.href = "/";
        }

    });
});