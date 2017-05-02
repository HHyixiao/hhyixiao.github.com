window.onload=function(){
	window_width = 512
	window_height = 480
	// FLAG先立在这里
	var FLAG = 1;
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	canvas.width=window_width;
	canvas.height=window_height;
	// 游戏对象
	var tanke = {
		speed: 256, // 每秒移动的像素
		x: canvas.width / 2,
		y: canvas.height / 2,
		// path 1234代表上右下左
		path:2
	};
	// 创建炮弹
	var paodans = new Array
	// 炮弹图片
	var paodanImage = new Image();
	paodanImage.src = "img/paodan.png"
	var monstersCaught = 0;
	// tanke图片
	var tankeReady = false;
	var tankeImage = new Image();
	tankeImage.onload = function () {
		tankeReady = true;
	};
	// 载入图片bug 开始
	tankeImage.src = "img/tanke_1.png";
	tankeImage.src = "img/tanke_2.png";
	tankeImage.src = "img/tanke_3.png";
	// 载入图片防止bug 结束
	// 载入初始图片覆盖原先垃圾代码
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

	addEventListener("keydown", function(e) {
		if (e.keyCode ==88) {
			addPaodan()
		}
	})
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
			tanke.path = 1;
		}
		if (40 in keysDown) { // 用户按的是↓
			tankeImage.src = "img/tanke_3.png";
			tanke.y += tanke.speed * modifier;
			tanke.path = 3;
		}
		if (37 in keysDown) { // 用户按的是←
			tankeImage.src = "img/tanke_2.png";
			tanke.x -= tanke.speed * modifier;
			tanke.path = 4;
		}
		if (39 in keysDown) { // 用户按的是→
			tankeImage.src = "img/tanke.png";
			tanke.x += tanke.speed * modifier;
			tanke.path = 2;
		}
	};
	var addPaodan = function () {
		// 添加炮弹
		if (88 in keysDown) {
			var paodan = {
				x:tanke.x+15,
				y:tanke.y,
				v:256,
				path:tanke.path
			}
			paodans.push(paodan)
		}
	}
	var updatePaodans = function (modifier) {
		for (var i = 0; i < paodans.length; i++) {
			console.log(paodans)
			if (paodans[i].path==1) {
				paodans[i].y -=paodans[i].v*modifier
				console.log(paodans)
			}
			if (paodans[i].path==2) {
				paodans[i].x+=paodans[i].v*modifier
			}
			if (paodans[i].path==3) {
				paodans[i].y +=paodans[i].v*modifier
			}
			if (paodans[i].path==4) {
				paodans[i].x -=paodans[i].v*modifier
			}
		}
		// 删除多余炮弹
		var cnt=0
		for (var i = 0; i < paodans.length; i++) {
			if (paodans[i].x+30>0 && paodans[i].x-30<window_width) {
				paodans[cnt++]=paodans[i]
			}
		}
		while(paodans.length>cnt){
			paodans.pop()
		}
		console.dir(paodans.length)
	}
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
			// 画坦克
			context.drawImage(tankeImage, tanke.x, tanke.y);
		}
		if (tankeReady) {

			for (var i = 0; i < paodans.length; i++) {
				context.drawImage(paodanImage,paodans[i].x-15,paodans[i].y)
			}
		}
	};
	// 游戏主函数
	var main = function () {
		var now = Date.now();
		var delta = now - then;
		update(delta / 1000);
		updatePaodans(delta / 1000)
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