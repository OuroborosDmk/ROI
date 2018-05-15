$(document).ready(function(){
    var count;
    var getid;
    $.ajax({
        type:"post",
        url:"/indexf",
        success:function(data){
            count=data;
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
        $("#user1").click(function(e){
            getid=$(e.target).attr('id');
            var id = {"userid":getid};
            $.ajax({
                type:"post",
                url:"/index",
                data:id,
                cache:false,
                success:function(data){
                    alert(data);
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