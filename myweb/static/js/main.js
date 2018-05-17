window.onload=function(){

function createCanvas(){
    var numofpic=getjson.count;//图片张数
    var uid=getjson.uid//图片路径
    var imglist=getjson.list//图片名称合集
    var clicksign=0;//点击标志，是否可以再次触发Canvas点击事件
    var getid;//Cnavas的标号
    var area=0;//圈出的面积
    var volume=0;//肿瘤体积
    var theformyon=0;//肿瘤类型按钮是否可用,0为可用
    var thetableyon=0;//显示结果类型按钮是否可用,0为可用 
    var thenumofpic=parseInt(numofpic);//强制类型转换 
    var allarray=new Array();//储存所有结果矩阵的大数组
    var canvaswith=704;
    var canvasheight=701;
    var arr=[];
    var newimglist=new Array();//储存图片路径
    newimglist=imglist.split(",");

    for(var i=0;i<thenumofpic;i++){
        allarray[i]=new Array();
        for(var j=0;j<canvaswith;j++){
            allarray[i][j]=new Array();
        }
    }

    for(var i=0;i<thenumofpic;i++){
        for(var j=0;j<canvaswith;j++){
            for(var k=0;k<canvasheight;k++){
                allarray[i][j][k]=0;
            }
        }
    }

    //alert(allarray[1][2][3]);//测试数组

    for(var i=1;i<=thenumofpic;i++){
        var createc=$("<canvas></canvas>");
        $("#box").append(createc);
        createc.attr("id","Canvas"+i);
    }//生成与需要标注的图像张数相同的canvas
    
    var canvaslist=new Array(thenumofpic);//储存圈出的面积
    for(var i=0;i<thenumofpic;i++){
        canvaslist[i]=0;
    }//初始化数组为0
    //console.log(canvaslist.length);
    
    if(thenumofpic==1){
        $("#Canvas1").css("border-color","red");
    }
    else if(thenumofpic%2==0){
        $("#Canvas1").css("border-color","red");
        $("#Canvas"+thenumofpic/2).css("border-color","red");
        $("#Canvas"+(thenumofpic/2+1)).css("border-color","red");
        $("#Canvas"+numofpic).css("border-color","red");
    }
    else if(thenumofpic%2==1){
        $("#Canvas1").css("border-color","red");
        $("#Canvas"+(thenumofpic+1)/2).css("border-color","red");
        $("#Canvas"+numofpic).css("border-color","red");
    }
    
    $("canvas").click(function(e){
        if(clicksign==0){
            getid=$(e.target).attr('id'); 

            openNew();
        }
    });//点击要标注的canvas还原大小以进行标注
    
    function V_calculate(){//计算体积肿瘤函数
        if(numofpic==1){
            volume=canvaslist[0]*1;
        }//医学影像资料一张的时候
        else if(numofpic%2==0){

        }//医学影像资料张数为偶数
        else if(numofpic%2==1){

        }//医学影像资料张数为奇数
    }

    function openNew(){//悬浮层弹出，还原canvas大小
        clicksign=1;
        var sWidth=document.body.scrollWidth;//获取整个页面宽度
        var sHeight=document.body.scrollHeight;//获取整个页面高度
        var wHeight=document.documentElement.clientHeight;//获取页面的可视区域高度
        var oMask=document.createElement("div");
            oMask.id="canvasbg";
            oMask.style.height=sHeight+"px";
            oMask.style.width=sWidth+"px";
            document.body.appendChild(oMask);//弹出悬浮层

        //弹出工具栏
        var tools=document.createElement("div");
            tools.id="toolbox";
            tools.style.height=sHeight+"px";
            document.body.appendChild(tools);
        var circletools=document.createElement("button");
            circletools.id="circletool";
            circletools.innerHTML="圆线";
            tools.appendChild(circletools);
        var rectangletools=document.createElement("button");
            rectangletools.id="rectangletool";
            rectangletools.innerHTML="矩形线";
            tools.appendChild(rectangletools);
        var othertools=document.createElement("button");
            othertools.id="othertool";
            othertools.innerHTML="不规则";
            tools.appendChild(othertools);
        var cleartools=document.createElement("button");
            cleartools.id="cleartool";
            cleartools.innerHTML="清除";
            tools.appendChild(cleartools);
        var revoketools=document.createElement("button");
            revoketools.id="revoketool";
            revoketools.innerHTML="撤销";
            tools.appendChild(revoketools);
        var returntools=document.createElement("button");
            returntools.id="returntool";
            returntools.innerHTML="返回";
            tools.appendChild(returntools);
        
        //var ctx=$("#"+getid)[0].getContext('2d');

        //设置Canvas的left和top
        var listid=String(getid);
        listid=listid.replace(/Canvas/,"");
        listid=parseInt(listid);
        imgpath="/static/pic/qwer/"+newimglist[listid-1];//需要标注的影像资料路径
        

        $("#"+getid).css("z-index","501")
                    .css("left","400px")
                    .css("top","50px")
                    .css("margin-left","0")
                    .css("margin-top","0")
                    .css("position","fixed")
                    .css("background-image","url("+imgpath+")");
                    //.css("float","left");
        $("#"+getid).attr("width","704px")
                    .attr("height","701px");//Canvas的高宽不能通过CSS设置，只能通过属性直接设置
                    
    
        //点击return关闭Canvas
        $("#returntool").click(function(){
            var returnsign=confirm("确认返回？");
            if(returnsign==true){
                var cxt=$("#"+getid)[0].getContext("2d");
                cxt.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                document.body.removeChild(oMask);
                document.body.removeChild(toolbox);
                $("#"+getid).css("z-index","auto")
                            .css("margin-left","150px")
                            .css("margin-top","50px")
                            .css("background-image","none")
                            .css("position","static");
                $("#"+getid).attr("width","300px")
                            .attr("height","150px");
                clicksign=0;

            }
        });

        $("#revoketool").click(function(){//撤销上次操作
            var ctx=$("#"+getid)[0].getContext('2d');
            
            arr.pop();
            ctx.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
            if(arr.length>0){
                ctx.putImageData(arr[arr.length-1],0,0,0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
            }
        });

        $("#cleartool").click(function(){//清除标注痕迹
            var cxt=$("#"+getid)[0].getContext("2d");
            arr=[];
            cxt.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);

        });

        $("#othertool").click(function(){//用不规则线标注图像
            var mousePressed=false;
            var lastX,lastY;
            var ctx;
            var startX,startY;
            var coordinateX=new Array();
            var coordinateY=new Array();
             
            function InitThis() {
                ctx=$("#"+getid)[0].getContext('2d');
             
                $("#"+getid).mousedown(function(e){
                    mousePressed=true;
                    Draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,false);
                    coordinateX=[];
                    coordinateY=[];
                    //coordinateX.push(e.pageX-$(this).offset().left);
                    //coordinateY.push(e.pageY-$(this).offset().top);
                    startX=e.pageX-$(this).offset().left;
                    startY=e.pageY-$(this).offset().top;
                });
             
                $("#"+getid).mousemove(function(e){
                    if(mousePressed){
                        //coordinateX.push(e.pageX-$(this).offset().left);
                        //coordinateY.push(e.pageY-$(this).offset().top);
                        Draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,true);
                    }
                });
             
                $("#"+getid).mouseup(function(e){
                    mousePressed=false;
                    
                    if(parseInt(startX)!=parseInt(lastX)||parseInt(startY)!=parseInt(lastY)){
                        ctx.beginPath();
                        ctx.moveTo(lastX,lastY);
                        ctx.lineTo(startX,startY);
                        ctx.strokeStyle="#f36";
                        ctx.lineWidth=1;
                        ctx.lineJoin="round";
                        ctx.closePath();
                        ctx.stroke();
                    }
                    alert(coordinateX.length);
                    alert(coordinateY.length);
                    arr.push(ctx.getImageData(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height));
                });

                $("#"+getid).mouseleave(function(e){
                    mousePressed=false;
                });
            }
             
            function Draw(x,y,isDown){
                if (isDown){
                    ctx.beginPath();
                    ctx.strokeStyle="#f36";
                    ctx.lineWidth=1;
                    ctx.lineJoin="round";
                    ctx.moveTo(lastX,lastY);
                    ctx.lineTo(x,y);
                    ctx.closePath();
                    ctx.stroke();
                    if((parseInt(x)<parseInt(lastX))&&(parseInt(y)<parseInt(lastY))){
                    for(var i=parseInt(lastX);i>parseInt(x);i--){
                        coordinateX.push(i);
                    }
                    for(var j=parseInt(lastY);j>parseInt(y);j--){
                        coordinateY.push(j);
                    }
                }
                else if((parseInt(x)<parseInt(lastX))&&(parseInt(y)>parseInt(lastY))){
                    for(var i=parseInt(lastX);i>parseInt(x);i--){
                        coordinateX.push(i);
                    }
                    for(var j=parseInt(lastY);j<parseInt(y);j++){
                        coordinateY.push(j);
                    }
                }
                else if((parseInt(x)>parseInt(lastX))&&(parseInt(y)<parseInt(lastY))){
                    for(var i=parseInt(lastX);i<parseInt(x);i++){
                        coordinateX.push(i);
                    }
                    for(var j=parseInt(lastY);j>parseInt(y);j--){
                        coordinateY.push(j);
                    }
                }
                else if((parseInt(x)>parseInt(lastX))&&(parseInt(y)>parseInt(lastY))){
                    for(var i=parseInt(lastX);i<parseInt(x);i++){
                        coordinateX.push(i);
                    }
                    for(var j=parseInt(lastY);j<parseInt(y);j++){
                        coordinateY.push(j);
                    }
                }
                }
                lastX=x; lastY=y;
            }

            InitThis(); 
        });

        $("#circletool").click(function(){//用圆线标注图像
            //var myCanvas = document.getElementById('myCanvas'); 
            //console.log(myCanvas);
            function InitThis(){
                var ctx=$("#"+getid)[0].getContext('2d');
                      
                var rect={},drag=false;
                var rx,ry,r;//rx,ry均为坐标,r为半径
                
                $("#"+getid).mousedown(function(e){
                    x=e.offsetX;
                    y=e.offsetY;
                    drag=true;
                });

                $("#"+getid).mouseup(function(e){
                    area=3.14*Math.pow(r,2);
                    var numofid=String(getid);
                    numofid=numofid.replace(/Canvas/,"");
                    numofid=parseInt(numofid);
                    canvaslist[numofid-1]=area;
                    //alert(canvaslist[numofid-1]);
                    drag=false;
                    arr.push(ctx.getImageData(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height));


                    var roundx=Math.ceil(rx+x);//圆心x坐标取整
                    var roundy=Math.ceil(ry+y);//圆心y坐标取整

                    for(var i=0;i<canvaswith;i++){
                        for(var j=0;j<canvasheight;j++){
                            if((Math.pow(i-roundx,2)+Math.pow(j-roundy,2)==Math.pow(r,2))
                                ||(Math.pow(i-roundx,2)+Math.pow(j-roundy,2)<Math.pow(r,2))){
                                allarray[numofid-1][i][j]=1;
                            }
                        }
                    }

                    //console.log(roundx);
                    //console.log(roundy);
                });

                $("#"+getid).mousemove(function(e){
                    if(drag){
                        ctx.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                        if(arr.length!=0){
                            ctx.putImageData(arr[arr.length-1],0,0,0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                         }
                        ctx.beginPath();
                        rx=(e.offsetX-x)/2;
                        ry=(e.offsetY-y)/2;
                        r=Math.sqrt(rx*rx+ry*ry);
                        ctx.arc(rx+x,ry+y,r,0,Math.PI*2);
                        ctx.stroke();
                        ctx.lineWidth=0.5;
                        ctx.strokeStyle="#FFFFFF"; 
                    }
                });

            }

            InitThis();
        });

        $("#rectangletool").click(function(){//用矩形线标注图像//修改监听事件
            //var myCanvas=$("#canvas"+i); 
            //console.log(myCanvas);
            
            function InitThis(){
                var ctx=$("#"+getid)[0].getContext('2d');
                //myCanvas.width = window.innerWidth;
                //myCanvas.height = window.innerHeight;
                      
                var rect={},drag=false;
                      
                $("#"+getid).mousedown(function(e){
                    rect.startX=(e.pageX-this.offsetLeft);
                    rect.startY=(e.pageY-this.offsetTop);
                    drag=true;
                    
                    
                    
                });

                $("#"+getid).mouseup(function(e){
                    drag=false;
                    arr.push(ctx.getImageData(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height));
                    //console.log(rect.w*rect.h);//矩形面积
                    //alert(rect.startX+rect.w);
                    //alert(rect.startY+rect.h);
                    area=rect.w*rect.h;
                    var numofid=String(getid);
                    numofid=numofid.replace(/Canvas/,"");
                    numofid=parseInt(numofid);
                    canvaslist[numofid-1]=area;
                    //alert(canvaslist[numofid-1]);
                    for(var i=rect.startX-1;i<rect.startX+rect.w;i++){
                        for(var j=rect.startY-1;j<rect.startY+rect.h;j++){
                            allarray[numofid-1][i][j]=1;
                        }
                    }//将矩阵储存在大数组中
                });
                      
                $("#"+getid).mousemove(function(e){
                    if(drag){
                        rect.w=(e.pageX-this.offsetLeft)-rect.startX;
                        rect.h=(e.pageY-this.offsetTop)-rect.startY;
                        ctx.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                        if(arr.length!=0){
                        ctx.putImageData(arr[arr.length-1],0,0,0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                    }
                        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
                        ctx.lineWidth=0.5;
                        ctx.strokeStyle="#FFFFFF";
                    }
                });
                      
            }

            InitThis();
        });
        
    
    }

    $("#steptwo").click(function(){//标记肿瘤种类函数

        $("#theform").css("display","block")
                     .css("z-index","600")
                     .css("position","absolute")
                     .css("background-color","white")
                     .css("left","70px")
                     .css("top","50px");
                
        var xmlhttp=new window.XMLHttpRequest();  
        xmlhttp.open("get","/static/XML/savedata.xml",false); 
        xmlhttp.send();  
        xmlDoc=xmlhttp.responseXML.documentElement;
        x=xmlDoc.getElementsByTagName("INPUT");

        for(var i=0;i<x.length;i++){
            $("#theform").append(x[i].getElementsByTagName("TYPENAME")[0].childNodes[0].nodeValue);
            var createc=$("<input>");
            $("#theform").append(createc);
            //createc.attr("id","theinput");
            createc.attr("type",x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue);
            createc.attr("name",x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue);
            createc.attr("value",x[i].getElementsByTagName("VALUE")[0].childNodes[0].nodeValue);
            if(createc.attr("type")=="submit"){
                createc.attr("id","theinput");//提交按钮的id为theinput
            }
            $("#theform").append(x[i].getElementsByTagName("TEXT")[0].childNodes[0].nodeValue);
            $("#theform").append("</input>");
            for(var j=0;j<x[i].getElementsByTagName("NUMOFBR")[0].childNodes[0].nodeValue;j++){
                $("#theform").append("<br>");
            }
        }

        $("#theinput").click(function(){
            var pd = {"V":volume};
            $.ajax({
                type:"post",
                url:"/",
                data:pd,
                cache:false,
                success:function(data){
                    alert(data);
                },
                error:function(){
                    alert("error!");
                },
           
            });
        });

    $("#stepfin").click(function(){//完成操作
        var v = {"V":volume,"patient":uid};
            $.ajax({
                type:"post",
                url:"/result",
                data:v,
                cache:false,
                success:function(data){
                    window.location.href = "/index";
                },
                error:function(){
                    alert("error!");
                },
            });
    });
    
        /*$("#thefin").css("display","block")
                    .css("z-index","600")
                    .css("position","absolute")
                    .css("background-color","white")
                    .css("left","400px")
                    .css("top","50px");
        $("#fintable").append("<tr><th>影像编码</th><th>标记面积</th></tr>");

        var ilist=new Array();//储存操作过的图像序号
        var mlist=new Array();//储存操作过的图像面积

        for(var i=0;i<thenumofpic;i++){//输出储存面积数组中的值
            if(canvaslist[i]!=0){
                ilist.push(i+1);
                mlist.push(canvaslist[i]);
            }
        }

        for(var j=0;j<ilist.length;j++){
            $("#fintable").append("<tr><td>"+ilist[j]+"</td><td>"+mlist[j]+"</td></tr>");//输出结果表格

        }

        //$("#finspan").html(volume);//输出肿瘤体积

        $("#finreturn").click(function(){
            $("#fintable").html(" ");//清除原表格中所有信息
            $("#thefin").css("z-index","1")
                        .css("display","none");
        });*/
    

    });
    $("#submission").click(function(){//完成操作
        var v = {"V":volume,"patient":uid};
            $.ajax({
                type:"post",
                url:"/result",
                data:v,
                cache:false,
                success:function(data){
                    window.location.href = "/index";
                },
                error:function(){
                    alert("error!");
                },
            });
    });
}

function getthejson(){
    $.ajax({
        async:false,//同步请求，相应完成后继续脚步操作
        type:"post",
        url:"/main",
        success:function(data){
            getjson=data;
        },
    });
}
var getjson;

getthejson();//向后端提交请求并返回数据
createCanvas();

}