window.onload=function(){
	// window_width = 512
	// window_height = 480

	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');

	// 游戏对象
	var snake = {
		jiaodu: 180,
		speed: 80, // 每秒移动的像素
		x: (canvas.width / 2)+20*0,
		y: canvas.height / 2,
		r: 10,
		body: [
			{
				x: (canvas.width / 2)+20*0,
				y: canvas.height / 2,
			}
		],
		snakeLength: 100

	};
	// console.dir(snake)


	var yaogan = {
		kg:false,
		jiaodu: 180,
		r:60,
		click: {
			x:0,
			y:0
		},
		gan: {
			x:60,
			y:canvas.height-110
		},
		dot: {
			x:60,
			y:canvas.height-110
		}
	}
	console.dir(yaogan.dot)
// context.font="40px Arial";
// context.fillText("x="+snake.x+";"+"y="+snake.y,10,50);
// context.font="40px Arial";
// context.fillText("Hello World",10,50);
	// 处理按键,先创建保存点击的类
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	canvas.addEventListener('touchstart',touch,false);
	canvas.addEventListener('touchmove',touch,false);
	canvas.addEventListener('touchend',touch,false);

	function touch (event){
		var event = event || window.event
		switch(event.type){
			case "touchstart":
			// console.dir(event.touches[0])
			// oInp.innerHTML ="Touch started (" + event.touches[0].clientX +"," + event.touches[0].clientY +")";
			break;
			case "touchend":
			yaogan.kg = false
			//离开屏幕
			// oInp.innerHTML ="<br>Touch end (" + event.changedTouches[0].clientX +"," + event.changedTouches[0].clientY +")";
			break;
			case "touchmove":
			event.preventDefault();
			yaogan.kg = true
			yaogan.click = {x:event.touches[0].clientX,y:event.touches[0].clientY}
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

		// 限制摇杆出去
		var absx = Math.abs(yaogan.click.x-yaogan.dot.x)
		var absy = Math.abs(yaogan.click.y-yaogan.dot.y)
		if (Math.sqrt(Math.pow(absx,2)+Math.pow(absy,2)).toFixed(1)<yaogan.r ) {
			yaogan.gan.x = yaogan.click.x
			yaogan.gan.y = yaogan.click.y
		}else{
			yaogan.gan.x = yaogan.dot.x - Math.floor(yaogan.r*Math.sin( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
			yaogan.gan.y = yaogan.dot.y + Math.floor(yaogan.r*Math.cos( Math.PI*(yaogan.jiaodu-90)/180).toFixed(5))
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


		snake.x += snake.speed * modifier * Math.cos( Math.PI*snake.jiaodu/180).toFixed(5)
		snake.y += snake.speed * modifier * Math.sin( Math.PI*snake.jiaodu/180).toFixed(5)
		// snake.x = Math.abs(snake.x)
		// snake.y = Math.abs(snake.y)
		// yaogan.gan.x = 

		if (Math.floor(snake.x) != snake.body[0].x || Math.floor(snake.y) != snake.body[0].y) {
			snake.body.unshift({x:Math.floor(snake.x),y:Math.floor(snake.y)})
		}
		if (snake.body.length > snake.snakeLength) {
			snake.body.pop()
		}
		
	};

	// 画出所有物体
	var render = function () {
		{
			// 画背景
			context.fillStyle = "white"
			context.fillRect(0,0,canvas.width,canvas.height);
		}
		// 绘制摇杆的圈
		context.beginPath()
		context.fillStyle = 'rgba(204, 204, 204, 0.7)'
		context.arc( yaogan.dot.x, yaogan.dot.y, 60 , 0 , 2*Math.PI)
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


			context.beginPath()
			context.fillStyle = 'rgba(0, 0, 0, 0.5)'
			context.arc( yaogan.gan.x, yaogan.gan.y, 30 , 0 , 2*Math.PI)
			context.fill()
			context.closePath()
		}

		// 绘制蛇
		context.beginPath()
		context.moveTo(snake.body[0].x,snake.body[0].y)

		for (var i in snake.body) {
			// console.dir(snake.body.length)
		// for (var i =0 ; i<snake.body.length ; i++) {
			context.fillStyle = "#66ccff"
			context.lineTo(snake.body[i].x , snake.body[i].y)
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
		context.arc(snake.x , snake.y , snake.r , 0 , 2*Math.PI)
		
		context.fill()
		context.closePath()
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