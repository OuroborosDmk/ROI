window.onload=function(){

function createCanvas(){
    var choose=confirm("是否选择标注所有图像？");
    var numofpic=getjson.count;//图片张数
    var uid=getjson.uid//图片路径
    var imglist=getjson.list//图片名称合集
    var clicksign=0;//点击标志，是否可以再次触发Canvas点击事件
    var getid;//Cnavas的标号
    var area=0;//圈出的面积
    var volume=100;//肿瘤体积
    var showcount=0;//如果不全标注判断标注几张图片
    var showimg=new Array();//储存不全标注图片的序号
    var theformyon=0;//肿瘤类型按钮是否可用,0为可用
    var thetableyon=0;//显示结果类型按钮是否可用,0为可用 
    var thenumofpic=parseInt(numofpic);//强制类型转换 
    var allarray=new Array();//储存所有结果矩阵的大数组
    var allarea=new Array();//储存面积的数组
    var canvaswidth=704;
    var canvasheight=701;
    var feature="";
    var newimglist=new Array();//储存图片路径
    newimglist=imglist.split(",");
    var index=0;//储存矩阵指数
    var middleindex=0;//储存大数组序列

    if(numofpic==1){
        showcount=1;
        showimg[0]=1;
    }
    else if(numofpic%2==0){
        showcount=4;
        showimg[0]=1;
        showimg[1]=thenumofpic/2;
        showimg[2]=thenumofpic/2+1;
        showimg[3]=thenumofpic;
    }
    else if(numofpic%2==1){
        showcount=3;
        showimg[0]=1;
        showimg[1]=(thenumofpic+1)/2;
        showimg[2]=thenumofpic;
    }

    for(var i=0;i<thenumofpic;i++){
        allarray[i]=new Array();
        for(var j=0;j<canvasheight;j++){
            allarray[i][j]=new Array();
        }
    }

    for(var i=0;i<thenumofpic;i++){
        for(var j=0;j<canvasheight;j++){
            for(var k=0;k<canvaswidth;k++){
                allarray[i][j][k]=0;
            }
        }
    }

    if (choose==true){
        for(var i=1;i<=thenumofpic;i++){
            var created=$("<div></div>");
            $("#rightbox").append(created);
            created.attr("class","canvasdiv")
                   .attr("id","canvasdiv"+i);
        }//生成与需要标注的图像张数相同的canvas

        for(var i=1;i<=thenumofpic;i++){
            imgpath="/static/pic/"+uid+"/"+newimglist[i-1];
            var createc=$("<canvas></canvas>");
            $("#canvasdiv"+i).append(createc);
            createc.attr("class","mycanvas")
                   .attr("width","195px")
                   .attr("height","150px")
                   .attr("id","Canvas"+i);
            createc.css("background-image","url("+imgpath+")");
        }//生成与需要标注的图像张数相同的canvas
    }
    else{
        for(var i=1;i<=showcount;i++){
            var themiddlecount=parseInt(showimg[i-1]);
            var created=$("<div></div>");
            $("#rightbox").append(created);
            created.attr("class","canvasdiv")
                   .attr("id","canvasdiv"+themiddlecount);
        }
        for(var i=1;i<=showcount;i++){
            var middlecount=parseInt(showimg[i-1]);
            imgpath="/static/pic/"+uid+"/"+newimglist[middlecount-1];
            var createc=$("<canvas></canvas>");
            $("#canvasdiv"+middlecount).append(createc);
            createc.attr("class","mycanvas")
                   .attr("width","195px")
                   .attr("height","150px")
                   .attr("id","Canvas"+middlecount);
            createc.css("background-image","url("+imgpath+")");
        }//生成与需要标注的图像张数相同的canvas
    }

    
    
    var canvaslist=new Array(thenumofpic);//储存圈出的面积
    for(var i=0;i<thenumofpic;i++){
        canvaslist[i]=0;
    }//初始化数组为0
    
    $("canvas").click(function(e){
        if(clicksign==0){
            getid=$(e.target).attr('id');
            alert(getid);
            openNew();
        }
    });//点击要标注的canvas还原大小以进行标注
    
    function openNew(){//悬浮层弹出，还原canvas大小
        clicksign=1;
        var rightboxw=document.getElementById("rightbox").clientWidth;
        var oMask=document.createElement("div");
            oMask.id="canvasbg";
            oMask.style.height="667px";
            oMask.style.width=rightboxw+"px";
            document.getElementById("rightbox").appendChild(oMask);//弹出悬浮层
        var arr=[];//储存图像信息的栈

        //弹出工具栏
        var tools=document.createElement("div");
            tools.id="toolbox";
            tools.style.height="667px";
            document.getElementById("rightbox").appendChild(tools);
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
        
        $("#rightbox").css("overflow","hidden");
        $(".canvasdiv").css("visibility","hidden");
        $("#"+getid).css("z-index","501")
                    .css("visibility","visible")
                    .css("left","500px")
                    .css("top","100px")
                    .css("margin-left","0")
                    .css("margin-top","0")
                    .css("position","fixed");
                    
                    //.css("float","left");
        $("#"+getid).attr("width","704px")
                    .attr("height","701px");//Canvas的高宽不能通过CSS设置，只能通过属性直接设置                 
    
        //点击return关闭Canvas
        $("#returntool").click(function(){
            var count=0;
            var returnsign=confirm("确认返回？");
            if(returnsign==true){
                var cxt=$("#"+getid)[0].getContext("2d");
                cxt.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                document.getElementById("rightbox").removeChild(oMask);
                document.getElementById("rightbox").removeChild(toolbox);
                $("#"+getid).css("z-index","auto")
                            .css("position","static")
                            .css("margin-top","70px")
                            .css("visibility","inherit")
                $("#"+getid).attr("width","195px")
                            .attr("height","150px");
                $("#rightbox").css("overflow","visible");
                $(".canvasdiv").css("visibility","visible");
                clicksign=0;
                arr=[];
                index=0;
                for(var i=0;i<canvasheight;i++){
                    for(var j=0;j<canvaswidth;j++){
                        if(allarray[middleindex][i][j]!=0){
                            count+=1;
                        }
                    }
                }
                allarea[middleindex]=count;
                $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
            }
        });

        $("#revoketool").click(function(){//撤销上次操作
            var ctx=$("#"+getid)[0].getContext('2d');
            
            arr.pop();
            ctx.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
            if(arr.length>0){
                ctx.putImageData(arr[arr.length-1],0,0,0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
            }
            if(index-1>0){
                for(var i=0;i<canvasheight;i++){
                    for(var j=0;j<canvaswidth;j++){
                        if(allarray[middleindex][i][j]>=Math.pow(2,(index-1))){
                            allarray[middleindex][i][j]-=Math.pow(2,(index-1));
                        }
                    }
                }
                index-=1;
            }
            else if(index-1==0){
                for(var i=0;i<canvasheight;i++){
                    for(var j=0;j<canvaswidth;j++){
                        if(allarray[middleindex][i][j]==1){
                            allarray[middleindex][i][j]=0;
                        }
                    }
                }
                index=0;
            }
        });

        $("#cleartool").click(function(){//清除标注痕迹
            var cxt=$("#"+getid)[0].getContext("2d");
            arr=[];
            cxt.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
            index=0;
        });

        $("#othertool").click(function(){//用不规则线标注图像
            $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
            var mousePressed=false;
            var lastX,lastY;
            var ctx;
            var startX,startY;
            var locationX=new Array();
            var locationY=new Array();
            var maxX,maxY,minX,minY;
            var maxXy,maxYx,minXy,minYx;
            var sum=0;//回转数法角度总和
            var countofx=0;//与边界相交几次
            var hsum=0;//回转数
            var angle;//回转数角度
             
            function InitThis() {
                ctx=$("#"+getid)[0].getContext('2d');
             
                $("#"+getid).mousedown(function(e){
                    if(index>=8){
                        alert("达到标记上限！");
                        return false;
                    }
                    mousePressed=true;
                    Draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,false);
                    coordinateX=[];
                    coordinateY=[];
                    startX=e.pageX-$(this).offset().left;
                    startY=e.pageY-$(this).offset().top;
                });
             
                $("#"+getid).mousemove(function(e){
                    if(mousePressed){
                        Draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,true);
                    }
                    function getLocation(x, y){  
                            var mouse=$("#"+getid)[0].getBoundingClientRect();  
                            return {  
                                x:(x-mouse.left)*(704/mouse.width),  
                                y:(y-mouse.top)*(701/mouse.height)
                            };  
                    }
                    var lofmouse=getLocation(e.clientX,e.clientY);
                    locationX.push(parseInt(lofmouse.x));
                    locationY.push(parseInt(lofmouse.y));
                });
             
                $("#"+getid).mouseup(function(e){
                    var middlecount=0;
                    mousePressed=false;
                    
                    if(parseInt(startX)!=parseInt(lastX)||parseInt(startY)!=parseInt(lastY)){
                        ctx.beginPath();
                        ctx.moveTo(lastX,lastY);
                        ctx.lineTo(startX,startY);
                        ctx.strokeStyle="#0000FF";
                        ctx.lineWidth=1;
                        ctx.lineJoin="round";
                        ctx.closePath();
                        ctx.stroke();
                        //ctx.fillStyle="#f36";
                        //ctx.fill;
                    }
                    arr.push(ctx.getImageData(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height));
                    var numofid=String(getid);
                    area=1;
                    numofid=numofid.replace(/Canvas/,"");
                    numofid=parseInt(numofid);
                    canvaslist[numofid-1]=area;
                    maxX=locationX[0];
                    maxY=locationY[0];
                    minX=locationX[0];
                    minY=locationY[0];
                    for(var i=0;i<locationX.length;i++){
                        if(maxX<locationX[i]){
                            maxX=locationX[i];
                            maxXy=i;
                        }
                    }
                    maxXy=parseInt(locationY[maxXy]);

                    for(var i=0;i<locationX.length;i++){
                        if(minX>locationX[i]){
                            minX=locationX[i];
                            minXy=i;
                        }
                    }
                    minXy=parseInt(locationY[minXy]);

                    for(var i=0;i<locationY.length;i++){
                        if(maxY<locationY[i]){
                            maxY=locationY[i];
                            maxYx=i;
                        }
                    }
                    maxYx=parseInt(locationX[maxYx]);

                    for(var i=0;i<locationY.length;i++){
                        if(minY>locationY[i]){
                            minY=locationY[i];
                            minYx=i;
                        }
                    }
                    minYx=parseInt(locationX[minYx]);

                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            if(i<maxY&&i>minY&&j<maxX&&j>minX){
                                
                                allarray[numofid-1][i][j]+=Math.pow(2,index);
                            }           
                        }
                    }   
                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            if(allarray[numofid-1][i][j]==0){
                                middlecount+=1;
                            }
                        }
                    } 
                    //alert(middlecount);
                    middleindex=numofid-1;
                    if(index<8){
                        index+=1;
                    }
                });
    
                $("#"+getid).mouseleave(function(e){
                    mousePressed=false;
                });
            }
             
            function Draw(x,y,isDown){
                if (isDown){
                    ctx.beginPath();
                    ctx.strokeStyle="#0000FF";
                    ctx.lineWidth=1;
                    ctx.lineJoin="round";
                    ctx.moveTo(lastX,lastY);
                    ctx.lineTo(x,y);
                    ctx.closePath();
                    ctx.stroke();
                    
                }
                lastX=x; lastY=y;
            }

            InitThis(); 
        });

        $("#circletool").click(function(){//用圆线标注图像
            $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
            //var myCanvas = document.getElementById('myCanvas'); 
            //console.log(myCanvas);
            function InitThisCircle(){
                var ctx=$("#"+getid)[0].getContext('2d');
                      
                var rect={},drag=false;
                var rx,ry,r;//rx,ry均为坐标,r为半径
                
                $("#"+getid).mousedown(function(e){
                    if(index>=8){
                        alert("达到标记上限！");
                        return false;
                    }
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

                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            if((Math.pow(i-roundx,2)+Math.pow(j-roundy,2)==Math.pow(r,2))
                                ||(Math.pow(i-roundx,2)+Math.pow(j-roundy,2)<Math.pow(r,2))){
                                allarray[numofid-1][i][j]+=Math.pow(2,index);
                            }
                        }
                    }
                    middleindex=numofid-1;
                    if(index<8){
                        index+=1;
                    }
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
                        ctx.strokeStyle="#0000FF"; 
                    }
                });

            }

            InitThisCircle();
        });

        $("#rectangletool").click(function(){//用矩形线标注图像
            //var myCanvas=$("#canvas"+i); 
            //console.log(myCanvas);
            $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
            function InitThisRe(){
                var ctx=$("#"+getid)[0].getContext('2d');
                //myCanvas.width = window.innerWidth;
                //myCanvas.height = window.innerHeight;
                      
                var rect={},drag=false;
                      
                $("#"+getid).mousedown(function(e){
                    if(index>=8){
                        alert("达到标记上限！");
                        return false;
                    }
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
                    for(var i=rect.startY-1;i<rect.startY+rect.h;i++){
                        for(var j=rect.startX-1;j<rect.startX+rect.w;j++){
                            allarray[numofid-1][i][j]+=Math.pow(2,index);
                        }
                    }//将矩阵储存在大数组中
                    middleindex=numofid-1;
                    if(index<8){
                        index+=1;
                    }
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
                        ctx.strokeStyle="#0000FF";
                    }
                });
                      
            }

            InitThisRe();
        });
        
    
    }

    $("#steptwo").click(function(){//标记肿瘤种类函数
        
        var rightboxw=document.getElementById("rightbox").clientWidth;
        var oMask=document.createElement("div");
            oMask.id="tablebg";
            oMask.style.height="667px";
            oMask.style.width=rightboxw+"px";
            document.getElementById("rightbox").appendChild(oMask);//弹出悬浮层
        $(".canvasdiv").css("display","none");      
        var xmlhttp=new window.XMLHttpRequest();  
        xmlhttp.open("get","/static/XML/savedata.xml",false); 
        xmlhttp.send();  
        xmlDoc=xmlhttp.responseXML.documentElement;
        x=xmlDoc.getElementsByTagName("INPUT");
        var formname=new Array(x.length-1);
        var createf=$("<form></form>");
        $("#tablebg").append(createf);
        createf.attr("id","theform");

        for(var i=0;i<x.length;i++){
            var createi=$("<p></p>");
            $("#theform").append(createi);
            createi.html(x[i].getElementsByTagName("TYPENAME")[0].childNodes[0].nodeValue);
            if(i!=(x.length-1)){
                formname[i]=x[i].getElementsByTagName("TYPENAME")[0].childNodes[0].nodeValue;
            }
            var createc=$("<input></input>");
            $("#theform").append(createc);
            //createc.attr("id","theinput");
            createc.attr("type",x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue);
            createc.attr("name",x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue);
            createc.attr("value",x[i].getElementsByTagName("VALUE")[0].childNodes[0].nodeValue);
            if(createc.attr("type")=="submit"){
                createc.attr("id","theinput");//提交按钮的id为theinput
            }
            else{
                createc.attr("id","Input"+i)
            }
            $("#theform").append("</br>");
        }

        $("#theinput").click(function(){
            var str="";
            var formvalue=new Array(x.length-1);//储存表单的值
            for(var i=0;i<(x.length-1);i++){
                formvalue[i]=$("#Input"+i).val();
                str=str+formname[i]+":"+formvalue[i]+";";
            }
            feature=str;
            alert("填写完毕！");
            document.getElementById("rightbox").removeChild(oMask);
            $(".canvasdiv").css("display","");
        });

    });
    $("#submission").click(function(){//完成操作

        if(feature.length==0){
            alert("未进行特征判断！");
            return false;
        }

        var ilist=new Array();//储存操作过的图像序号

        for(var i=0;i<thenumofpic;i++){//获取哪几个图像被标记过
            if(canvaslist[i]!=0){
                ilist.push(i+1);
            }
        }

        var newarrayl=ilist.length;
        var newallarray=new Array(newarrayl);
        var asd;

        for(var i=0;i<newarrayl;i++){
            newallarray[i]=new Array();
            for(var j=0;j<canvasheight;j++){
                newallarray[i][j]=new Array();
            }
        }

        for(var i=0;i<newarrayl;i++){
            for(var j=0;j<canvasheight;j++){
                for(var k=0;k<canvaswidth;k++){
                    newallarray[i][j][k]=0;
                }
            }
        }

        for(var i=0;i<newarrayl;i++){
            asd=parseInt(ilist[i]);
            for(var j=0;j<canvasheight;j++){
                for(var k=0;k<canvaswidth;k++){
                    newallarray[i][j][k]=allarray[asd-1][j][k];
                }
            }
        }

        var areastr="";
        for(var i=0;i<newarrayl;i++){
            basd=parseInt(ilist[i]);
            areastr=areastr+ilist[i]+":"+allarea[basd-1]+";     ";
        }

        var v = {"V":volume,"patient":uid,"features":feature,"area":areastr};

        var theMatrix=JSON.stringify(newallarray);

        $.ajax({
            type:"post",
            url:"/matrix",
            data:theMatrix,
            cache:false,
            async:false,
            success:function(data){
            },
            error:function(){
                alert("error!");
            },
        });

        $.ajax({
            type:"post",
            url:"/result",
            data:v,
            cache:false,
            async:false,
            success:function(data){
                alert("提交成功！");
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