$(document).ready(function(){
    var userid;
    var getid=new Array();
    var getjson;
    var count;
    var geijson1;
    var volume;
    var patientid;
    var path;
    var area;
    var getpatient;
    var patientname=new Array();
    var patientsex=new Array();
    var patientage=new Array();
    var patientheight=new Array();
    var patientweight=new Array();
    var patientocc=new Array();

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

    function getpatientid(){
        var patientcount;
        $.ajax({
            async:false,
            type:"get",
            url:"/getpatient",
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
                url:"/getpatient",
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

    function showdata(){
        getpatientid();
        $.ajax({
            async:false,
            type:"post",
            url:"/indexf",
            success:function(data){
                getjson=data;  
            },
        });
        var c_username=getCookie('username');
        count=getjson.count;
        userid=getjson.list;
        getid=userid.split(",");

        $(".leftbox").css("height","694px");
        if(parseInt(count)>30){
            var height=694+(parseInt(count)-30)*22;
            $(".leftbox").css("height",height+"px");
        }
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>ID</td><td>姓名</td><td>性别</td><td>年龄</td><td>身高</td><td>体重</td><td>职业</td><td>影像资料</td></tr>");
        count=parseInt(count);
        for(var i=0;i<count;i++){
            var newbox=$("<tr><td>"+(i+1)+"</td><td>"+patientname[i]+"</td><td>"+patientsex[i]+"</td><td>"+patientage[i]+"</td><td>"+patientheight[i]+"</td><td>"+patientweight[i]+"</td><td>"+patientocc[i]+"</td><td><a class='starta' id="+getid[i]+">点击此处进行标注</a></td></tr>");
            $("#idtable").append(newbox);
        }
        $(".starta").click(function(){
            var getid1=this.id;
            var id={"userid":getid1,"username":c_username};
            $.ajax({
                async:false,
                type:"post",
                url:"/index",
                data:id,
                cache:false,
                success:function(data){
                    $("#idtable").html(" ");
                    window.location.href = "/main";
                    
                },
            });
        });
    }
    checkCookie();
    showdata();

    $("#image").click(function(){
        getpatientid();
        var c_username=getCookie('username');
        $(".leftbox").css("height","694px");
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>ID</td><td>姓名</td><td>性别</td><td>年龄</td><td>身高</td><td>体重</td><td>职业</td><td>影像资料</td></tr>");
        if(count>30){
            var height=694+(count-30)*22;
            $(".leftbox").css("height",height+"px");
        }
        for(var i=0;i<count;i++){
            newbox=$("<tr><td>"+(i+1)+"</td><td>"+patientname[i]+"</td><td>"+patientsex[i]+"</td><td>"+patientage[i]+"</td><td>"+patientheight[i]+"</td><td>"+patientweight[i]+"</td><td>"+patientocc[i]+"</td><td><a class='starta' id="+getid[i]+">点击此处进行标注</a></td></tr>");
            $("#idtable").append(newbox);
        }
        $(".starta").click(function(){
            getid1=this.id;
            id = {"userid":getid1,"username":c_username};
            $.ajax({
                async:false,
                type:"post",
                url:"/index",
                data:id,
                cache:false,
                success:function(data){
                    $("#idtable").html(" ");
                    window.location.href = "/main";
                    
                },
            });
        });
    });
    
    $("#history").click(function(){
        var usercount=0;
        var c_username=getCookie('username');
        var username={"username":c_username};
        $(".leftbox").css("height","694px"); 
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>病人姓名</td><td>性别</td><td>肿瘤体积</td><td>标注面积</td><td>特征</td><td>标注结果</td></tr>")
        $.ajax({
            async:false,
            type:"get",
            data:username,
            url:"/showone",
            cache:false,
            success:function(data){
                usercount=data;
                alert("一共查询到"+data+"条信息！");
            },
        });
        if(parseInt(usercount)>30){
            var height=694+(parseInt(usercount)-30)*40;
            $(".leftbox").css("height",height+"px");
        }
        for(var i=0;i<usercount;i++){
            var thecount={"postcount":i,"username":c_username};
            $.ajax({
                async:false,
                type:"post",
                data:thecount,
                url:"/showone",
                cache:false,
                success:function(data){
                    getjson1=data;
                },
            });
            volume=getjson1.voftumour;
            patientid=getjson1.patientid;
            feature=getjson1.feature;
            area=getjson1.area;
            var txtpath="static/Matrix/"+patientid+"/"+c_username+"/matrix.txt";
            $("#idtable").append("<tr><td>"+patientid+"</td><td>男</td><td>"+volume+"</td><td>"+area+"</td><td>"+feature+"</td><td><a href="+txtpath+" download=\"result.txt\">点此下载</a></td></tr>");
        }
    });
    
    $("#exit").click(function(){
        var returnsign=confirm("确认退出登录？");
        if(returnsign==true){
            removeCookie("username");
            $("#rightbox").html(" ");
            window.location.href = "/";
        }
    });

    $("#userpage").click(function(){
        $("#rightbox").html(" ");
        window.location.href = "/userpage";
    });
});