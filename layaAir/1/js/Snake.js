var Snake = (function(){
    function Snake(x, y){
        Snake.super(this);

        this.r = 10;
        // this.angle = 180;
        this.x = x;
        this.y = y;
        // this.speed = 100;
        // this.length = 10;
        // this.body = [{x:x,y:y}];

        // this.item = {x:0,y:0};
        console.log(this.x,this.y,this.r)
        this.graphics.drawCircle(this.x,this.y,this.r,'#ff0000');

        this.graphics.drawCircle(this.x+10,this.y+10,this.r,'#ff0000');


        // Laya.timer.loop(1000,this,this.onloop);
    }
    Laya.class(Snake,"Snake",Laya.Sprite);
    // var _proto = Snake.prototype;

    // // 动画
    // _proto.onloop = function () {
    //     var modifier = Laya.timer.delta/1000;

    //     this.item.x = this.body[0].x - Laya.Browser.clientWidth/2;
	// 	this.item.y = this.body[0].y - Laya.Browser.clientHeight/2;

    //     this.x += this.speed * modifier * Math.cos( Math.PI*this.angle/180).toFixed(5);
	// 	this.y += this.speed * modifier * Math.sin( Math.PI*this.angle/180).toFixed(5);

    //     if (Math.abs(Math.floor(this.x) - this.body[0].x) >this.r/2 || Math.abs(Math.floor(this.y) - this.body[0].y) >this.r/2) {
	// 		this.body.unshift({x:Math.floor(this.x),y:Math.floor(this.y)})
	// 	}
    //     if (this.body.length > this.length) {
	// 		this.body.pop()
	// 	}

    //     for (var i in this.body) {
	// 		if (i>0) {
    //             this.graphics.drawCircle(this.x,this.y,this.r,'#ff0000');
	// 			// context.lineTo(this.body[i].x - ditu.item.x , snake.body[i].y - ditu.item.y)
	// 		}
	// 	}
    // }

    // // 转向
    // _proto.Steering = function(){

    // }

    return Snake;
})();