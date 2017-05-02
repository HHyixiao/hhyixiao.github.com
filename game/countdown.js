
window.onload=function(){
	window_width = 512
	window_height = 480




	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	canvas.width=window_width;
	canvas.height=window_height;



	// 游戏对象
	var tanke = {
		speed: 256, // 每秒移动的像素
		x: canvas.width / 2,
		y: canvas.height / 2
	};
	console.dir(tanke)
	var monstersCaught = 0;

	// tanke图片
	var tankeReady = false;
	var tankeImage = new Image();
	tankeImage.onload = function () {
		tankeReady = true;
	};
	tankeImage.src = "img/tanke.png";
	
context.drawImage(tankeImage, tanke.x, tanke.y)

	// 处理按键,先创建保存点击的类
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);



	var update = function (modifier) {

		// 坦克与墙碰到了么？
		if (tanke.x+30<0 ) {
			tanke.x = canvas.width
		}
		if (tanke.x>512) {
			tanke.x = -30
		}
		if (tanke.y+30<0) {
			tanke.y = canvas.height
		}
		if (tanke.y>480) {
			tanke.y = -30
		}


		if (38 in keysDown) { // 用户按的是↑
			tankeImage.src = "img/tanke_1.png";
			tanke.y -= tanke.speed * modifier;
			// alert("111")
		}
		if (40 in keysDown) { // 用户按的是↓
			tankeImage.src = "img/tanke_3.png";
			tanke.y += tanke.speed * modifier;
		}
		if (37 in keysDown) { // 用户按的是←
			tankeImage.src = "img/tanke_2.png";
			tanke.x -= tanke.speed * modifier;
		}
		if (39 in keysDown) { // 用户按的是→
			tankeImage.src = "img/tanke.png";
			tanke.x += tanke.speed * modifier;
		}

		
	};

	// 画出所有物体
	var render = function () {
		if (tankeReady) {
			// 画背景
			context.beginPath()
			context.moveTo(0,0)
			context.lineTo(512,0)
			context.lineTo(512,480)
			context.lineTo(0,480)
			context.fillStyle = "white"
			context.fill()
		}
		
		if (tankeReady) {
			context.drawImage(tankeImage, tanke.x, tanke.y);
		}
	};


	// 游戏主函数
	var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
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