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
	var tankes = [
		tanke = {
			id:0,
			speed: 256, // 每秒移动的像素
			x: canvas.width* 1/4,
			y: canvas.height-30,
			// path 1234代表上右下左
			path:1
		},
		tanke = {
			id:1,
			speed: 256, // 每秒移动的像素
			x: canvas.width* 3/4,
			y: canvas.height-30,
			// path 1234代表上右下左
			path:1
		},
	]
	// 创建炮弹集合
	var paodans = new Array
	// tanke图片
	var tankeReady = false;
	// 创建坦克图片对象集合
	var tankeImages = new Array(2)
	for (var i = 0; i < tankeImages.length; i++) {
		tankeImages[i] = new Image();
		tankeImages[i].onload = function () {
			tankeReady = true;
		};
		tankeImages[i].src = "img/tanke_1.png";
	}

	// 创建炮弹图片对象集合
	var paodanImages = new Array(2)
	for (var i = 0; i < paodanImages.length; i++) {
		paodanImages[i] = new Image()
	}
	paodanImages[0].src = "img/paodan.png";
	paodanImages[1].src = "img/paodan_1.png";
	
	// 处理按键,先创建保存点击的类
	var keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	addEventListener("keydown", function(e) {
		if (88 in keysDown||80 in keysDown) {
			addPaodan()
		}
	})
	var update = function (modifier) {
		// 坦克与墙碰到了么？
		for (var i = 0; i < tankes.length; i++) {
			if (tankes[i].x+30<0 ) {
				tankes[i].x = canvas.width
			}
			if (tankes[i].x>512) {
				tankes[i].x = -30
			}
			if (tankes[i].y+30<0) {
				tankes[i].y = canvas.height
			}
			if (tankes[i].y>480) {
				tankes[i].y = -30
			}
		}
		
		// 1p坦克
		if (87 in keysDown) { // 用户按的是w
			tankeImages[0].src = "img/tanke_1.png";
			tankes[0].y -= tankes[0].speed * modifier;
			tankes[0].path = 1;
		}
		if (83 in keysDown) { // 用户按的是S
			tankeImages[0].src = "img/tanke_3.png";
			tankes[0].y += tankes[0].speed * modifier;
			tankes[0].path = 3;
		}
		if (65 in keysDown) { // 用户按的是A
			tankeImages[0].src = "img/tanke_2.png";
			tankes[0].x -= tankes[0].speed * modifier;
			tankes[0].path = 4;
		}
		if (68 in keysDown) { // 用户按的是D
			tankeImages[0].src = "img/tanke.png";
			tankes[0].x += tankes[0].speed * modifier;
			tankes[0].path = 2;
		}


		// 2p坦克
		if (38 in keysDown) { // 用户按的是↑
			tankeImages[1].src = "img/tanke_1.png";
			tankes[1].y -= tankes[1].speed * modifier;
			tankes[1].path = 1;
		}
		if (40 in keysDown) { // 用户按的是↓
			tankeImages[1].src = "img/tanke_3.png";
			tankes[1].y += tankes[1].speed * modifier;
			tankes[1].path = 3;
		}
		if (37 in keysDown) { // 用户按的是←
			tankeImages[1].src = "img/tanke_2.png";
			tankes[1].x -= tankes[1].speed * modifier;
			tankes[1].path = 4;
		}
		if (39 in keysDown) { // 用户按的是→
			tankeImages[1].src = "img/tanke.png";
			tankes[1].x += tankes[1].speed * modifier;
			tankes[1].path = 2;
		}
	};
	var addPaodan = function () {
		// 添加炮弹
		if (88 in keysDown) {
			var paodan = {
				id:tankes[0].id,
				x:tankes[0].x+15,
				y:tankes[0].y,
				v:256,
				path:tankes[0].path
			}
			paodans.push(paodan)
		}
		if (80 in keysDown) {
			var paodan = {
				id:tankes[1].id,
				x:tankes[1].x+15,
				y:tankes[1].y,
				v:256,
				path:tankes[1].path
			}
			paodans.push(paodan)
		}
	}
	var updatePaodans = function (modifier) {
		for (var i = 0; i < paodans.length; i++) {
			if (paodans[i].path==1) {
				paodans[i].y -=paodans[i].v*modifier
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
			// context.drawImage(tankeImage, tanke.x, tanke.y);
			for (var i = 0; i < tankes.length; i++) {
				context.drawImage(tankeImages[i], tankes[i].x, tankes[i].y);
			}
		}
		if (tankeReady) {
			for (var i = 0; i < paodans.length; i++) {
				if (paodans[i].id == 0) {
					context.drawImage(paodanImages[paodans[i].id],paodans[i].x-15,paodans[i].y)
				}
				if (paodans[i].id == 1) {
					context.drawImage(paodanImages[paodans[i].id],paodans[i].x-15,paodans[i].y)
				}
				
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