$(document).ready(function(){
    var userid;
    var getid=new Array();
    var getjson;
    var count;
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

    $("#image").click(function(){
        count=parseInt(count);
        for(var i=0;i<count;i++){
            var newbox=$("<div></div>");
            $("#rightbox").append(newbox);
            newbox.attr("class","newbox");
            newbox.attr("id",getid[i]);
            newbox.html(getid[i]);
        }
        $(".newbox").click(function(e){
            var getid1=$(e.target).attr('id');
            var id = {"userid":getid1};
            $.ajax({
                async:false,
                type:"post",
                url:"/index",
                data:id,
                cache:false,
                success:function(data){
                    window.location.href = "/main";
                    
                },
            });
        });
    });
    
    $("#history").click(function(){
        $.ajax({
                async:false,
                type:"post",
                url:"/show",
                cache:false,
                success:function(data){
                    alert("查询完毕!");
                },
            });
    });
    
    $("#end").click(function(){
        var returnsign=confirm("确认返回？");
        if(returnsign==true){
            window.location.href = "./";
        }
    });
});