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

    $("#idtable").html(" ");
    $("#idtable").append("<tr><td>ID</td><td>姓名</td><td>性别</td><td>案例数量</td></tr>");
    count=parseInt(count);
    for(var i=0;i<count;i++){
        var newbox=$("<tr><td>"+(i+1)+"</td><td>"+getid[i]+"</td><td>男</td><td>"+count+"</td></tr>");
        $("#idtable").append(newbox);
        newbox.attr("class","newbox");
        newbox.attr("id",getid[i]);
    }
    $(".newbox").click(function(){
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
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>ID</td><td>姓名</td><td>性别</td><td>案例数量</td></tr>");
        //count=parseInt(count);
        for(var i=0;i<count;i++){
            newbox=$("<tr><td>"+(i+1)+"</td><td>"+getid[i]+"</td><td>男</td><td>"+count+"</td></tr>");
            $("#idtable").append(newbox);
            newbox.attr("class","newbox");
            newbox.attr("id",getid[i]);
        }
        $(".newbox").click(function(){
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
        var usercount=0;
        $("#idtable").html(" ");
        $("#idtable").append("<tr><td>病人姓名</td><td>性别</td><td>肿瘤体积</td><td>特征</td></tr>")
        $.ajax({
            async:false,
            type:"get",
            url:"/showone",
            cache:false,
            success:function(data){
                usercount=data;
                alert(data);
            },
        });

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
            volume=getjson1.voftumour;
            patientid=getjson1.patientid;
            feature=getjson1.feature;
            $("#idtable").append("<tr><td>"+patientid+"</td><td>男</td><td>"+volume+"</td><td>"+feature+"</td></tr>");
        }
        /*username=getjson1.username;
        volume=getjson1.voftumour;
        patientid=getjson1.patientid;
        feature=getjson1.feature;
        //for(var j=0;j<ilist.length;j++){
        $("#idtable").append("<tr><td>"+patientid+"</td><td>男</td><td>"+volume+"</td><td>"+feature+"</td></tr>");//输出结果表格

        //}*/
    });
    
    $("#end").click(function(){
        var returnsign=confirm("确认返回？");
        if(returnsign==true){
            $("#rightbox").html(" ");
            window.location.href = "./";
        }
    });
});