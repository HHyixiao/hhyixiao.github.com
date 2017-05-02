window.onload=function(){
	// window_width = 512
	// window_height = 480

	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');



	// 游戏对象
	var snake = {
		jiaodu: 180,
		speed: 80, // 每秒移动的像素
		x: (canvas.width / 2),
		y: canvas.height / 2,
		r: 10,
		body: [
			{
				x: (canvas.width / 2),
				y: canvas.height / 2,
			}
		],
		snakeLength: 100

	};

	//地图对象
	var ditu = {
		w:canvas.width*3,
		h:canvas.height*3,
		canzhao: {
			x: canvas.width*3/2,
			y: canvas.height*3/2,
		},
		item:{
			x:0,
			y:0
		},
		snake:null,
		arr: [
			{
				x: canvas.width / 2 +200,
				y: canvas.height / 2 - 200,
				color:"yellow"
			},
			{
				x: canvas.width / 2 +200,
				y: canvas.height / 2 +200,
				color:"#ccc"
			},
			{
				x: canvas.width / 2 -200,
				y: canvas.height / 2 +200,
				color:"blue"
			},
			{
				x: canvas.width / 2 -200,
				y: canvas.height / 2 - 200,
				color:"#ccc"
			}
		]
	}
	// console.dir(ditu.w)

	// 摇杆
	var yaogan = {
		kg:false,
		jiaodu: 180,
		r:60,
		click: {
			x:60+10,
			y:canvas.height-110,
		},
		gan: {
			x:60+10,
			y:canvas.height-110,
			r:20
		},
		dot: {
			x:60+10,
			y:canvas.height-110
		}
	}
	// console.dir(yaogan.dot)

	// 绑定事件
	canvas.addEventListener('touchstart',touch,false);
	canvas.addEventListener('touchmove',touch,false);
	canvas.addEventListener('touchend',touch,false);

	function touch (event){
		var event = event || window.event
		switch(event.type){
			//按下屏幕
			case "touchstart":
				yaogan.kg = true;
				yaogan.click.x = Math.round(event.touches[0].clientX);
				yaogan.click.y = Math.round(event.touches[0].clientY);
				break;
			//离开屏幕
			case "touchend":
				yaogan.kg = false;
				yaogan.click.x = yaogan.dot.x;
				yaogan.click.y = yaogan.dot.y;
				break;
			// 触摸滑动
			case "touchmove":
				// 阻止冒泡
				event.preventDefault();
				yaogan.kg = true;
				yaogan.click = {x:Math.round(event.touches[0].clientX),y:Math.round(event.touches[0].clientY)};
				break;
		}
	}
	var panduanjiaodu = function () {
		var x = yaogan.click.x
		var y = yaogan.click.y
		if (x > yaogan.dot.x && y > yaogan.dot.y) {
			//那么角度在0到90之间
			yaogan.jiaodu = Math.floor((Math.atan((y-yaogan.dot.y)/(x-yaogan.dot.x))*180/Math.PI))
		}
		if (x < yaogan.dot.x && y > yaogan.dot.y) {
			//那么角度在90到180之间
			yaogan.jiaodu = Math.floor((Math.atan((yaogan.dot.x-x)/(y-yaogan.dot.y))*180/Math.PI))+90
		}
		if (x < yaogan.dot.x && y < yaogan.dot.y) {
			//那么角度在180到270之间
			yaogan.jiaodu = Math.floor((Math.atan((yaogan.dot.y-y)/(yaogan.dot.x-x))*180/Math.PI))+180
		}
		if (x > yaogan.dot.x && y < yaogan.dot.y) {
			//那么角度在0到90之间
			yaogan.jiaodu = Math.floor((Math.atan((yaogan.dot.x-x)/(y-yaogan.dot.y))*180/Math.PI))+270
		}
	}
	var update = function (modifier) {
		snake.body.length = snake.snakeLength
		// 限制每秒转向的角度
		if (yaogan.kg) {
			if (Math.abs(yaogan.jiaodu - snake.jiaodu)<180) {
				if (yaogan.jiaodu - snake.jiaodu>0) {
					snake.jiaodu +=120*modifier
				}
				if (yaogan.jiaodu - snake.jiaodu<0) {
					snake.jiaodu -=120*modifier
				}
			}
			if (Math.abs(yaogan.jiaodu - snake.jiaodu)>180) {
				if (yaogan.jiaodu - snake.jiaodu>0) {
					snake.jiaodu -=120*modifier
				}
				if (yaogan.jiaodu - snake.jiaodu<0) {
					snake.jiaodu +=120*modifier
				}
			}
			if (snake.jiaodu>360) {
				snake.jiaodu -= 360
			}
			if (snake.jiaodu<0) {
				snake.jiaodu += 360
			}
		}

		// 限制摇杆出去
		var absx = Math.abs(yaogan.click.x-yaogan.dot.x)
		var absy = Math.abs(yaogan.click.y-yaogan.dot.y)
		if (Math.sqrt(Math.pow(absx,2)+Math.pow(absy,2)).toFixed(1)<(yaogan.r-yaogan.gan.r) ) {
			yaogan.gan.x = yaogan.click.x
			yaogan.gan.y = yaogan.click.y
		} else {
			yaogan.gan.x = yaogan.dot.x - Math.floor((yaogan.r-yaogan.gan.r)*Math.sin( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			yaogan.gan.y = yaogan.dot.y + Math.floor((yaogan.r-yaogan.gan.r)*Math.cos( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			// if (x > yaogan.dot.x && y > yaogan.dot.y) {
			// 	//那么角度在0到90之间
			// 	yaogan.gan.x = 0.yaogan.dot.x - Math.floor(yaogan.r*Math.sin( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			// 	yaogan.gan.y = Math.floor(yaogan.r*Math.cos( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))+ yaogan.dot.y
			// }
			// if (x < yaogan.dot.x && y > yaogan.dot.y) {
			// 	//那么角度在90到180之间
			// 	yaogan.gan.x = yaogan.dot.x - Math.floor(yaogan.r*Math.sin( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			// 	yaogan.gan.y = Math.floor(yaogan.r*Math.cos( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))+ yaogan.dot.y
			// }
			// if (x < yaogan.dot.x && y < yaogan.dot.y) {
			// 	//那么角度在180到270之间
			// 	yaogan.gan.x = yaogan.dot.x - Math.floor(yaogan.r*Math.sin( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			// 	yaogan.gan.y = Math.floor(yaogan.r*Math.cos( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))+ yaogan.dot.y
			// }
			// if (x > yaogan.dot.x && y < yaogan.dot.y) {
			// 	//那么角度在0到90之间
			// 	yaogan.gan.x = yaogan.dot.x - Math.floor(yaogan.r*Math.sin( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			// 	yaogan.gan.y = Math.floor(yaogan.r*Math.cos( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))+ yaogan.dot.y
			// }
		}

		// 更新蛇头牵引坐标
		snake.x += snake.speed * modifier * Math.cos( Math.PI*snake.jiaodu/180).toFixed(5)
		snake.y += snake.speed * modifier * Math.sin( Math.PI*snake.jiaodu/180).toFixed(5)
		// snake.x = Math.abs(snake.x)
		// snake.y = Math.abs(snake.y)
		// 限制多余坐标
		if (Math.abs(Math.floor(snake.x) - snake.body[0].x) >1 || Math.abs(Math.floor(snake.y) - snake.body[0].y) >1) {
			snake.body.unshift({x:Math.floor(snake.x),y:Math.floor(snake.y)})
		}
		if (snake.body.length > snake.snakeLength) {
			snake.body.pop()
		}
		// console.dir("x="+snake.body[0].x+"&y="+snake.body[0].y)

		// 得到蛇的坐标变化
		ditu.item.x = snake.body[0].x - canvas.width/2;
		ditu.item.y = snake.body[0].y - canvas.height/2;

			
		// for (var i in snake.body) {
		// 	if (i != 0) {
		// 		snake.body[i].x = snake.body[i].x + x
		// 		snake.body[i].y = snake.body[i].y + y
		// 	}
		// }
		// console.dir("x="+x+"&y="+y)
		// 更新地图
		// ditu.canzhao.x = ditu.canzhao.x + (snake.body[0].x - canvas.width/2);
		// ditu.canzhao.y = ditu.canzhao.y + (snake.body[0].y - canvas.height/2);

		// ditu.arr
	};	

	// 画出所有物体
	var render = function () {
		{
			// 画背景
			context.beginPath()
			context.fillStyle = "white"
			context.fillRect(0,0,canvas.width,canvas.height);
			context.closePath();

			for (var i = 0; i < ditu.arr.length; i++) {
				context.beginPath()
				context.fillStyle = ditu.arr[i].color
				context.arc(ditu.arr[i].x - ditu.item.x, ditu.arr[i].y - ditu.item.y, 30 , 0 , 2*Math.PI)
				context.fill()
			}
			
		}
		// 绘制蛇
		context.beginPath()
		context.moveTo(snake.body[0].x - ditu.item.x,snake.body[0].y - ditu.item.y)
		for (var i in snake.body) {
		// for (var i =0 ; i<snake.body.length ; i++) {
			if (i>0) {
				context.lineTo(snake.body[i].x - ditu.item.x , snake.body[i].y - ditu.item.y)
			}
		}
		context.lineCap = "round";
		context.lineJoin = "round";
		context.lineWidth = snake.r*2
		context.strokeStyle = "#66ccff";
		context.stroke();
		context.closePath()
		// 绘制蛇头
		context.beginPath()
		context.fillStyle = "red"
		context.arc(snake.body[0].x - ditu.item.x, snake.body[0].y - ditu.item.y, snake.r , 0 , 2*Math.PI)
		context.fill()
		context.closePath()

		// 绘制摇杆的圈
		context.beginPath()
		context.fillStyle = 'rgba(204, 204, 204, 0.7)'
		context.arc( yaogan.dot.x, yaogan.dot.y, 60 , 0 , 2*Math.PI)
		context.fill()
		context.closePath()

		context.beginPath()
		context.fillStyle = 'rgba(0, 0, 0, 0.5)'
		context.arc( yaogan.gan.x, yaogan.gan.y, yaogan.gan.r , 0 , 2*Math.PI)
		context.fill()
		context.closePath()

		if (yaogan.kg) {
			// 显示参数
			context.beginPath();
			context.font="30px Arial";
			context.fillStyle="red";
			// context.fillText("x:"+Math.floor(yaogan.gan.x)+";y:"+Math.floor(yaogan.gan.y)+";角度:"+snake.jiaodu,10,50);
			context.fillText("x:"+Math.floor(snake.x)+";y:"+Math.floor(snake.y)+";角度:"+snake.jiaodu,10,50);
			context.closePath()


			
		}

		
	};
	// 游戏主函数
	var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		panduanjiaodu()
		render();

		then = now;
		// 立即调用主函数
		requestAnimationFrame(main);
	};
	// requestAnimationFrame 的浏览器兼容性处理
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var then = Date.now();
	main();
}