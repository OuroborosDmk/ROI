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
    var middleindex=-1;//储存标注图像序列
    var xmlbuttonsign=0;//判断XML界面是否被点击
    var middlearray=new Array();//中间数组确认保存后传递给提交结果部分
    var canvaslist=new Array(thenumofpic);//储存标注过的影像资料序号
    var surface;//覆盖层
    
    for(var i=0;i<thenumofpic;i++){
        canvaslist[i]=0;
    }

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
        middlearray[i]=new Array();
        for(var j=0;j<canvasheight;j++){
            middlearray[i][j]=new Array();
        }
    }

    for(var i=0;i<thenumofpic;i++){
        for(var j=0;j<canvasheight;j++){
            for(var k=0;k<canvaswidth;k++){
                middlearray[i][j][k]=0;
            }
        }
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
    
    $("canvas").click(function(e){
        if(clicksign==0){
            getid=$(e.target).attr('id');
            openNew();
        }
    });//点击要标注的canvas还原大小以进行标注
    
    function openNew(){//悬浮层弹出，还原canvas大小
        clicksign=1;
        var linecolor="#0000FF";
        var rightboxw=document.getElementById("rightbox").clientWidth;//获取实际宽度
        var oMask=document.createElement("div");
            oMask.id="canvasbg";
            oMask.style.height="667px";
            oMask.style.width=rightboxw+"px";
            document.getElementById("rightbox").appendChild(oMask);//弹出悬浮层
        var arr=[];//储存图像信息的栈

        //弹出工具栏
        var tools=document.createElement("div");
            tools.id="toolbox";
            document.getElementById("rightbox").appendChild(tools);
        var colortools=document.createElement("div");
            colortools.id="colorbox";
            document.getElementById("rightbox").appendChild(colortools);       
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
        var savetools=document.createElement("button");
            savetools.id="savetool";
            savetools.innerHTML="保存";
            tools.appendChild(savetools);
        var returntools=document.createElement("button");
            returntools.id="returntool";
            returntools.innerHTML="放弃";
            tools.appendChild(returntools);
        for(var i=0;i<33;i++){
            var newcolorbox=$("<div></div>");
            $("#colorbox").append(newcolorbox);
            newcolorbox.attr("class","colordiv")
                       .attr("id","color"+i);
        }
        
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
        
        $(".colordiv").click(function(){
            var boxcolor=this.id;
            boxcolor=String(boxcolor);
            boxcolor=boxcolor.replace(/color/,"");
            if(boxcolor=="0"){
                linecolor="#FFFFFF";
            }
            else if(boxcolor=="1"){
                linecolor="#C8C8C8";
            }
            else if(boxcolor=="2"){
                linecolor="#888888";
            }
            else if(boxcolor=="3"){
                linecolor="#404040";
            }
            else if(boxcolor=="4"){
                linecolor="#000000";
            }
            else if(boxcolor=="5"){
                linecolor="#280000";
            }
            else if(boxcolor=="6"){
                linecolor="#800000";
            }
            else if(boxcolor=="7"){
                linecolor="#C80000";
            }
            else if(boxcolor=="8"){
                linecolor="#CC3300";
            }
            else if(boxcolor=="9"){
                linecolor="#CC6600";
            }
            else if(boxcolor=="10"){
                linecolor="#CCFF00";
            }
            else if(boxcolor=="11"){
                linecolor="#FF0066";
            }
            else if(boxcolor=="12"){
                linecolor="#FF66FF";
            }
            else if(boxcolor=="13"){
                linecolor="#FF00CC";
            }
            else if(boxcolor=="14"){
                linecolor="#993399";
            }
            else if(boxcolor=="15"){
                linecolor="#990066";
            }
            else if(boxcolor=="16"){
                linecolor="#660066";
            }
            else if(boxcolor=="17"){
                linecolor="#6633FF";
            }
            else if(boxcolor=="18"){
                linecolor="#330000";
            }
            else if(boxcolor=="19"){
                linecolor="#330033";
            }
            else if(boxcolor=="20"){
                linecolor="#330066";
            }
            else if(boxcolor=="21"){
                linecolor="#3300CC";
            }
            else if(boxcolor=="22"){
                linecolor="#000099";
            }
            else if(boxcolor=="23"){
                linecolor="#0000FF";
            }
            else if(boxcolor=="24"){
                linecolor="#0066FF";
            }
            else if(boxcolor=="25"){
                linecolor="#00CCFF";
            }
            else if(boxcolor=="26"){
                linecolor="#00FFFF";
            }
            else if(boxcolor=="27"){
                linecolor="#00FF66";
            }
            else if(boxcolor=="28"){
                linecolor="#00FF33";
            }
            else if(boxcolor=="29"){
                linecolor="#00FF00";
            }
            else if(boxcolor=="30"){
                linecolor="#00CC00";
            }
            else if(boxcolor=="31"){
                linecolor="#009900";
            }
            else if(boxcolor=="32"){
                linecolor="#006600";
            }
        });

        $("#savetool").click(function(){
            var returnsign=confirm("确认保存并返回？");
            if(returnsign==true){
                var count=0;
                if(middleindex!=-1){
                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            if(allarray[middleindex][i][j]!=0){
                                count+=1;
                            }
                        }
                    }
                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            middlearray[middleindex][i][j]=allarray[middleindex][i][j];
                        }
                    }
                    canvaslist[middleindex]=1;//该资料已经被标注过
                    allarea[middleindex]=count;
                }
                var cxt=$("#"+getid)[0].getContext("2d");
                cxt.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                document.getElementById("rightbox").removeChild(oMask);
                document.getElementById("rightbox").removeChild(toolbox);
                document.getElementById("rightbox").removeChild(colorbox);
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
                $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
                linecolor="#0000FF";
            }
        });

        //点击return关闭Canvas
        $("#returntool").click(function(){
            var returnsign=confirm("确认返回？");
            if(returnsign==true){
                var cxt=$("#"+getid)[0].getContext("2d");
                cxt.clearRect(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height);
                document.getElementById("rightbox").removeChild(oMask);
                document.getElementById("rightbox").removeChild(toolbox);
                document.getElementById("rightbox").removeChild(colorbox);
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
                $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
                if(middleindex!=-1){
                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            allarray[middleindex][i][j]=0;
                        }
                    }
                }
                linecolor="#0000FF";
            }
        });

        $("#revoketool").click(function(){//撤销上次操作
            var ctx=$("#"+getid)[0].getContext('2d');
            
            if(middleindex!=-1){
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
            var startX,startY;//储存开始坐标
            var locationX=new Array();
            var locationY=new Array();
            var maxX,maxY,minX,minY;//最大范围，最小范围
             

                ctx=$("#"+getid)[0].getContext("2d");
             
                $("#"+getid).mousedown(function(e){
                    if(index>=8){
                        alert("达到标记上限！");
                        return false;
                    }
                    mousePressed=true;
                    locationX.length=0;
                    locationY.length=0;
                    Draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,false);
                    startX=e.pageX-$(this).offset().left;
                    startY=e.pageY-$(this).offset().top;
                });
             
                $("#"+getid).mousemove(function(e){
                    if(mousePressed){
                        Draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,true);
                    
                        function getLocation(x, y){  
                            var mouse=$("#"+getid)[0].getBoundingClientRect();  
                            return {  
                                x:x-mouse.left,  
                                y:y-mouse.top
                            };  
                        }
                        var lofmouse=getLocation(e.clientX,e.clientY);
                        locationX.push(parseInt(lofmouse.x));
                        locationY.push(parseInt(lofmouse.y));
                    }
                });
             
                $("#"+getid).mouseup(function(e){
                    mousePressed=false;
                    
                    if(parseInt(startX)!=parseInt(lastX)||parseInt(startY)!=parseInt(lastY)){
                        ctx.beginPath();
                        ctx.moveTo(lastX,lastY);
                        ctx.lineTo(startX,startY);
                        ctx.strokeStyle=linecolor;
                        ctx.lineWidth=1;
                        ctx.lineJoin="round";
                        ctx.closePath();
                        ctx.stroke();
                    }
                    arr.push(ctx.getImageData(0,0,$("#"+getid)[0].width,$("#"+getid)[0].height));
                    var numofid=String(getid);
                    numofid=numofid.replace(/Canvas/,"");
                    numofid=parseInt(numofid);
                    var areaarray=new Array();
                    maxX=locationX[0];
                    maxY=locationY[0];
                    minX=locationX[0];
                    minY=locationY[0];

                    for(var i=0;i<canvasheight;i++){
                        areaarray[i]=new Array();
                    }

                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            areaarray[i][j]="0";
                        }
                    }

                    for(var i=0;i<locationX.length;i++){
                        if(maxX<locationX[i]){
                            maxX=locationX[i];
                        }
                    }

                    for(var i=0;i<locationX.length;i++){
                        if(minX>locationX[i]){
                            minX=locationX[i];
                        }
                    }

                    for(var i=0;i<locationY.length;i++){
                        if(maxY<locationY[i]){
                            maxY=locationY[i];
                        }
                    }

                    for(var i=0;i<locationY.length;i++){
                        if(minY>locationY[i]){
                            minY=locationY[i];
                        }
                    }

                    var indexcount;//中间变量
                    for(var k=0;k<locationX.length;k++){
                        indexcount=locationX[k];
                        for(var i=0;i<locationX.length;i++){
                            if(locationY[k]==locationY[i]){
                                if(indexcount>locationX[i]){
                                    for(var j=indexcount;j>=locationX[i];j--){
                                        areaarray[locationY[i]][j]="a";
                                    }
                                }
                                else if(indexcount<locationX[i]){
                                    for(var j=indexcount;j<=locationX[i];j++){
                                        areaarray[locationY[i]][j]="a";
                                    }
                                }
                            }
                        }
                    }

                    for(var i=minY;i<maxY;i++){
                        for(var j=minX;j<maxX;j++){
                            if((i-2>=0)&&(i+2>=0)){
                                if((areaarray[i][j]=="0")&&(areaarray[i-1][j]=="a")&&(areaarray[i+1][j]=="a")){
                                    areaarray[i][j]="a";
                                }

                                if((areaarray[i][j]=="0")&&(areaarray[i-2][j]=="a")&&(areaarray[i+2][j]=="a")&&(areaarray[i-1][j]=="0")&&(areaarray[i+1][j]=="0")){
                                    areaarray[i][j]="a";
                                }

                                if((areaarray[i][j]=="0")&&(areaarray[i-1][j]=="a")&&(areaarray[i+1][j]=="0")&&(areaarray[i+2][j]=="a")){
                                    areaarray[i][j]="a";
                                }

                                if((areaarray[i][j]=="0")&&(areaarray[i+1][j]=="a")&&(areaarray[i-1][j]=="0")&&(areaarray[i-2][j]=="a")){
                                    areaarray[i][j]="a";
                                }

                            }
                            
                        }
                    }

                    for(var i=0;i<canvasheight;i++){
                        for(var j=0;j<canvaswidth;j++){
                            if(i<maxY&&i>minY&&j<maxX&&j>minX){
                                if(areaarray[i][j]=="a"){  
                                    allarray[numofid-1][i][j]+=Math.pow(2,index);
                                }
                            }          
                        }
                    }   

                    middleindex=numofid-1;
                    if(index<8){
                        index+=1;
                    }
                });
    
                /*$("#"+getid).mouseleave(function(e){
                    mousePressed=false;
                });*/
             
            function Draw(x,y,isDown){
                if (isDown){
                    ctx.beginPath();
                    ctx.strokeStyle=linecolor;
                    ctx.lineWidth=1;
                    ctx.lineJoin="round";
                    ctx.moveTo(lastX,lastY);
                    ctx.lineTo(x,y);
                    ctx.closePath();
                    ctx.stroke();
                    
                }
                lastX=x; lastY=y;
            }

        });

        $("#circletool").click(function(){//用圆线标注图像
            $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
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
                    var numofid=String(getid);
                    numofid=numofid.replace(/Canvas/,"");
                    numofid=parseInt(numofid);
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
                        ctx.strokeStyle=linecolor; 
                    }
                });

            }

            InitThisCircle();
        });

        $("#rectangletool").click(function(){//用矩形线标注图像
            $("#"+getid).unbind("mousedown mouseup mousemove mouseleave");
            function InitThisRe(){
                var ctx=$("#"+getid)[0].getContext('2d');
                      
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
                    var numofid=String(getid);
                    numofid=numofid.replace(/Canvas/,"");
                    numofid=parseInt(numofid);
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
                        ctx.strokeStyle=linecolor;
                    }
                });
                      
            }
            InitThisRe();
        });   
    }

    $("#stepone").click(function(){//点击显示影像资料界面
        if(xmlbuttonsign==1){
            document.getElementById("rightbox").removeChild(surface);
            $(".canvasdiv").css("display","");
            xmlbuttonsign=0;
        }
    });

    $("#returnbutton").click(function(){
        var returnsign=confirm("确认返回？");
        if(returnsign==true){
            window.location.href = "/index";
        }
    });

    $("#steptwo").click(function(){//标记肿瘤种类函数

        if(xmlbuttonsign==0){
            xmlbuttonsign=1;
            var rightboxw=document.getElementById("rightbox").clientWidth;
            surface=document.createElement("div");
            surface.id="tablebg";
            surface.style.height="694px";
            surface.style.width=rightboxw+"px";
            document.getElementById("rightbox").appendChild(surface);//弹出悬浮层
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
                var createi=$("<span></span>");
                $("#theform").append(createi);
                createi.html(x[i].getElementsByTagName("TYPENAME")[0].childNodes[0].nodeValue);
                if(i!=(x.length-1)){
                    formname[i]=x[i].getElementsByTagName("TYPENAME")[0].childNodes[0].nodeValue;
                }
                var createc=$("<input></input>");
                $("#theform").append(createc);
                
                createc.attr("type",x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue);
                createc.attr("name",x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue);
                createc.attr("value",x[i].getElementsByTagName("VALUE")[0].childNodes[0].nodeValue);
                if(createc.attr("type")=="submit"){
                    createc.attr("id","theinput");//提交按钮的id为theinput
                    createc.attr("value","点击提交");
                }
                else{
                    createc.attr("class","moreinput")
                    createc.attr("id","Input"+i)
                }
            }
            var creater=$("<input></input>");
            $("#theform").append(creater);
            creater.attr("id","returnbtn");
            creater.attr("type","submit");
            creater.attr("value","点击返回");

            $("#theinput").click(function(){
                var str="";
                var formvalue=new Array(x.length-1);//储存表单的值
                for(var i=0;i<(x.length-1);i++){
                    formvalue[i]=$("#Input"+i).val();
                    str=str+formname[i]+":"+formvalue[i]+";";
                }
                feature=str;
                alert("填写完毕！");
                document.getElementById("rightbox").removeChild(surface);
                $(".canvasdiv").css("display","");
                xmlbuttonsign=0;
            });

            $("#returnbtn").click(function(){
                document.getElementById("rightbox").removeChild(surface);
                $(".canvasdiv").css("display","");
                xmlbuttonsign=0;
            });
        }
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
                    newallarray[i][j][k]=middlearray[asd-1][j][k];
                }
            }
        }
        var countofx=0;
        var countofy=0;
        var middlestr;
        for(var i=0;i<newarrayl;i++){
            for(var j=0;j<canvasheight;j++){
                for(var k=0;k<canvaswidth;k++){
                    if(newallarray[i][j][k]<10){
                        middlestr=String(newallarray[i][j][k]);
                        newallarray[i][j][k]="a"+middlestr+"a";
                    }
                    else if((newallarray[i][j][k]>=10)&&(newallarray[i][j][k]<100)){
                        middlestr=String(newallarray[i][j][k]);
                        newallarray[i][j][k]="a"+middlestr;
                    }
                }
            }
        }

        var areastr="";
        for(var i=0;i<newarrayl;i++){
            basd=parseInt(ilist[i]);
            areastr=areastr+ilist[i]+":"+allarea[basd-1]+";     ";
        }

        if(numofpic==1){
            volume=parseInt(allarea[0])*1;
        }
        else if(numofpic%2==0){
            volume=(parseInt(allarea[thenumofpic/2-1])+parseInt(allarea[thenumofpic/2]))/2*thenumofpic;
        }
        else if(numofpic%2==1){
            volume=parseInt(allarea[(thenumofpic+1)/2-1])*thenumofpic;
        }

        if(isNaN(volume)){
            volume=0;
        }
        else{
            volume=parseInt(volume);
        }

        var c_username=getCookie('username');
        newallarray.push("username:"+c_username);
        var v={"V":volume,"patient":uid,"features":feature,"area":areastr,"username":c_username};
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
    var c_username=getCookie('username');
    var username={"username":c_username};
    $.ajax({
        async:false,//同步请求，相应完成后继续脚步操作
        type:"post",
        url:"/main",
        data:username,
        success:function(data){
            getjson=data;
        },
    });
}

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
    var username=getCookie('username');
    if(username!=null&&username!=""){
        return true;
    }
    else{
        alert("还没有进行登录！");
        window.location.href="/";
    }
}



var getjson;

checkCookie();//检查用户是否登陆以及获取登陆信息
getthejson();//向后端提交请求并返回数据
createCanvas();

}