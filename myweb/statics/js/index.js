$(document).ready(function(){
    var getid1;
    var getjson;
    $.ajax({
        type:"post",
        url:"/indexf",
        success:function(data){
            getjson=data;
        },
    });
    $("#image").click(function(){
        count=parseInt(count);
        for(var i=1;i<=count;i++){
            var newbox=$("<div></div>");
            $("#rightbox").append(newbox);
            newbox.attr("class","newbox");
            newbox.attr("id","user"+i);
        }
        $(".newbox").click(function(e){
            getid1=$(e.target).attr('id');
            var id = {"userid":getid1};
            $.ajax({
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
    });
    $("#end").click(function(){
        var returnsign=confirm("确认返回？");
        if(returnsign==true){
            window.location.href = "./";
        }
    });
});