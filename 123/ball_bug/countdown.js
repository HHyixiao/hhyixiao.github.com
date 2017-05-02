// 申明全局变量
var window_width=1024;
var window_height=768;
var radius=8;
var margin_top=60;
var margin_left=30;
// 获取页面加载时的时间
var time_onload =new Date()
// 即使刷新的时间
var time_new =new Date()
// 计时秒数
var time_down_seconds=0
// 下一秒的时间
var next_time=0
// 申明空的小球数组
var balls=[]
// 颜色库。。只读
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

var hours=0;var minutes=0;var seconds=0
window.onload=function(){
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	canvas.width=window_width;
	canvas.height=window_height;
	
	// 获取页面加载时的时间
	time_onload = new Date();
	// console.dir(time_onload)

	setInterval(
		function (){
			render(context);
			update()
		}
		,50
		)
}
function update(){
	// 即使刷新的时间

	time_new = new Date()
	time_down_seconds =parseInt((time_new-time_onload)/1000)
	// +1S
	next_time = time_down_seconds+1
	seconds=Math.floor((time_down_seconds%60));
	minutes=Math.floor(time_down_seconds/60)%60;
	hours=parseInt(time_down_seconds/3600);
	


	var next_hours=parseInt(next_time/3600);
	var next_minutes=Math.floor(next_time/60)%60;
	var next_seconds=Math.floor((next_time%60));
	// console.dir(next_hours)
	if (seconds!=next_seconds) {
	// 秒钟个位
	addBalls(margin_left+93*(radius+1),margin_top,parseInt(seconds%10))
	// 秒钟十位
	parseInt(seconds/10)!=parseInt(next_seconds/10) && addBalls(margin_left+78*(radius+1),margin_top,parseInt(seconds/10))
	// 分钟个位
	parseInt(minutes%10)!=parseInt(next_minutes%10) && addBalls(margin_left+54*(radius+1),margin_top,parseInt(minutes%10))
	// 分钟十位
	parseInt(minutes/10)!=parseInt(next_minutes/10) && addBalls(margin_left+54*(radius+1),margin_top,parseInt(minutes/10))
	// 时钟个位
	parseInt(hours%10)!=parseInt(next_hours%10) && addBalls(margin_left+15*(radius+1),margin_top,parseInt(hours%10))
	// 时钟十位
	parseInt(hours/10)!=parseInt(next_hours/10) && addBalls(margin_left,margin_top,parseInt(hours/10))
	
	}
	updateBalls();
}
function updateBalls(){
	// cxt.clearRect(0, 0, canvas.width, canvas.height)
	for( var i = 0 ; i < balls.length ; i ++ ){

		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if( balls[i].y >= window_height-radius ){
			balls[i].y = window_height-radius;
			balls[i].vy = - balls[i].vy*0.75;
		}
	}
}

function addBalls(x , y , num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall ={
					x:x+j*2*(radius+1)+(radius+1),
					y:y+i*2*(radius+1)+(radius+1),
					g:1.5+Math.random(),
					vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
					vy:-5,
					color: colors[ Math.floor( Math.random()*colors.length ) ]
				}
				balls.push( aBall )
			}
		}
	}	
}


function render(cxt){
	// 清除原来的动画
	cxt.clearRect(0, 0, canvas.width, canvas.height)
	
	
	
	
	
	// console.dir(seconds)
	// console.dir(next_time)
	// 绘制数字
	// 时钟
	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt)
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),cxt)
	renderDigit(margin_left+30*(radius+1),margin_top,10,cxt)
	// 分钟
	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt)
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt)
	renderDigit(margin_left+69*(radius+1),margin_top,10,cxt)
	// 秒钟
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt)
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt)


	// 绘制小球
	for( var i = 0 ; i < balls.length ; i ++ ){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc( balls[i].x , balls[i].y , radius , 0 , 2*Math.PI , true );
		cxt.closePath();

		cxt.fill();
	}
}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}