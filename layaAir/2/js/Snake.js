var Snake = (function(){
    function Snake(x, y){
        Snake.super(this);

        this.r = 10;
        this.angle = 180;
        this.x = x;
        this.y = y;
        this.speed = 100;
        this.length = 5;
        this.body = [];
        this.bodySpace = 20;

        this.path = [];

        for (var i = 0; i < this.length; i++) {
            var element = new Laya.Sprite();
            element.graphics.drawCircle(x,y,this.r,'#66ccff');
            element.pos(x,this.y);
            element.visible = false;
            this.body.push(element);
            Laya.stage.addChild(element);
            
        }

        this.item = {x:0,y:0};
        console.log(this.x,this.y,this.r)
        this.graphics.drawCircle(this.x,this.y,this.r,'#ff0000');


        Laya.timer.loop(1,this,this.onloop);
    }
    Laya.class(Snake,"Snake",Laya.Sprite);
    var _proto = Snake.prototype;

    // 动画
    _proto.onloop = function () {
        var modifier = Laya.timer.delta/1000;
        this.move(modifier);

        
    }

    // // 转向
    _proto.Steering = function(angle){
        Laya.timer.loop(1,this,function(){
            var modifier = Laya.timer.delta/1000;
            if (Math.abs(angle - this.angle) < 180) {
                if (angle - this.angle > 0) {
                    this.angle += 180 * modifier
                }
                if (angle - this.angle < 0) {
                    this.angle -= 180 * modifier
                }
            }
            if (Math.abs(angle - this.angle) > 180) {
                if (angle - this.angle > 0) {
                    this.angle -= 180 * modifier
                }
                if (angle - this.angle < 0) {
                    this.angle += 180 * modifier
                }
            }
            if (this.angle > 360) {
                this.angle -= 360
            }
            if (this.angle < 0) {
                this.angle += 360
            }
            this.angle >> 0
            // console.log(angle, this.angle)
            
        });
    }

    // 移动
    _proto.move = function(modifier){

        var posBefore = { x: this.x, y: this.y }

        this.x += this.speed * modifier * Math.cos(Math.PI * this.angle / 180).toFixed(5);
        this.y += this.speed * modifier * Math.sin(Math.PI * this.angle / 180).toFixed(5);

        
        // for (let index = 1; index <= this.speed; index++) {
        //     this.path.unshift({x:this.x,y:this.y});
        // }
        // console.log(Laya.timer.currFrame,this.bodySpace,"!!!")
        if (Laya.timer.currFrame%(this.bodySpace/2) === 0) {
            this.path.unshift({x:this.x,y:this.y});
            
        }

        

        // console.log(this.x>>0,this.y>>0)
        // console.log(this.body[0].x>>0,this.body[0].y>>0,"------",this.body[0].localToGlowbal)


        for (var i = 0; i < this.body.length; i++) {
            let element = this.body[i];
            if (this.path[i]) {
                element.visible = true;
                element.pos(this.path[i]["x"], this.path[i]["y"])
            }else{
                element.visible = false;
            }
            if (this.path.length > this.body.length+10) {
                this.path.pop()
            }
            // if (this.path[(i + 1) * this.bodySpace]) {
            //     // element.rotation = Math.atan2(
            //     //     this.path[(i + 1) * this.bodySpace]["y"] - element.y
            //     //     , this.path[(i + 1) * this.bodySpace]["x"] - element.x
            //     // ) / Math.PI * 180
            //     element.pos(this.path[(i + 1) * this.bodySpace]["x"], this.path[(i + 1) * this.bodySpace]["y"])
            // }
            // if (this.path.length > this.body.length * (1 + this.bodySpace)) {
            //     this.path.pop()
            // }
        }
        // console.log(Laya.timer.currFrame)

        this.item.x = this.x - Laya.stage.width/4;
		this.item.y = this.y - Laya.stage.height/4;
    }

    _proto.center = function(modifier){
        this.pos(this.x-this.item.x,this.y-this.item.y)
    }

    return Snake;
})();