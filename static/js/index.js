$(document).ready(function(){
    var userid;
    var getid=new Array();
    var getjson;
    var count;
    var geijson1;
    var username;
    var volume;
    var patientid;
    var path;
    var area;
    $.ajax({
        async:false,
        type:"post",
        url:"/indexf",
        success:function(data){
            getjson=data;  
        },
    });

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
        var newbox=$("<tr><td>"+(i+1)+"</td><td>"+getid[i]+"</td><td>男</td><td>50</td><td>180cm</td><td>80kg</td><td>无</td><td><a class='starta' id="+getid[i]+">点此进行标注</a></td></tr>");
        $("#idtable").append(newbox);
    }
    $(".starta").click(function(){
        var getid1=this.id;
        var id = {"userid":getid1};
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

    $("#image").click(function(){
        $(".leftbox").css("height","694px");
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>ID</td><td>姓名</td><td>性别</td><td>年龄</td><td>身高</td><td>体重</td><td>职业</td><td>影像资料</td></tr>");
        if(count>30){
            var height=694+(count-30)*22;
            $(".leftbox").css("height",height+"px");
        }
        for(var i=0;i<count;i++){
            newbox=$("<tr><td>"+(i+1)+"</td><td>"+getid[i]+"</td><td>男</td><td>50</td><td>180cm</td><td>80kg</td><td>无</td><td><a class='starta' id="+getid[i]+">点此进行标注</a></td></tr>");
            $("#idtable").append(newbox);
        }
        $(".starta").click(function(){
            getid1=this.id;
            id = {"userid":getid1};
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
        $(".leftbox").css("height","694px");
        var usercount=0;
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>病人姓名</td><td>性别</td><td>肿瘤体积</td><td>标注面积</td><td>特征</td><td>标注结果</td></tr>")
        $.ajax({
            async:false,
            type:"get",
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
            thecount={"postcount":i};
            $.ajax({
                async:false,
                type:"post",
                data:thecount,
                url:"/showone",
                cache:false,
                success:function(data){
                    getjson1=data;
                    //alert(data);
                },
            });
            username=getjson1.username;
            volume=getjson1.voftumour;
            patientid=getjson1.patientid;
            feature=getjson1.feature;
            area=getjson1.area;
            var txtpath="static/Matrix/"+patientid+"/"+username+"/matrix.txt";
            $("#idtable").append("<tr><td>"+patientid+"</td><td>男</td><td>"+volume+"</td><td>"+area+"</td><td>"+feature+"</td><td><a href="+txtpath+" download=\"show.txt\">点此下载</a></td></tr>");
        }
    });
    
    $("#end").click(function(){
        var returnsign=confirm("确认返回？");
        if(returnsign==true){
            $("#rightbox").html(" ");
            window.location.href = "./";
        }
    });
});