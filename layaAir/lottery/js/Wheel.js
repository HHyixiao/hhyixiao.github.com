var Wheel = (function(){
    function Wheel(imgSrc,x,y){
        Wheel.super(this);

        this.reset();

        this.scaleValue = .2;

        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage(imgSrc);
        this.addChild(this.bg1);

        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage(imgSrc);
        this.addChild(this.bg2);
        this.bg2.pos(this.bg1.x,this.bg1.y-1366);
        
        this.oldY = y;

        this.pos(x,y);

        
        this.scale(this.scaleValue, this.scaleValue);
        // Laya.timer.frameLoop(1,this,this.onLoop);
        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    //注册类
    Laya.class(Wheel,"Wheel",Laya.Sprite);

    var _proto = Wheel.prototype;

    _proto.reset = function () {
        this.y = this.oldY;
        this.stop = true;
        this.flag = true;
        this.speed = 1;
        this.acceleration = .1;
        this.speedAddTime = 2000;
        this.stopAcceleration = Laya.Browser.now() + this.speedAddTime;
    }
    _proto.onLoop = function (){
        if ( this.stop ) return;

        if (Laya.Browser.now() < this.stopAcceleration) {
            this.speed += this.acceleration
        } else {
            this.speed >> 0
        }

        this.y += this.speed;
        
        if(this.y>=1366*this.scaleValue){
            this.y-=1366*this.scaleValue;
        }

    }
    _proto.startScroll = function(){
        if (this.flag) {
            this.reset();
            
            this.stop = false;
            this.flag = false;
        }

    }

    _proto.endScroll = function(num){
        if (!this.flag) {
            this.slowDown = Laya.Browser.now() + this.speedAddTime;
            Laya.timer.frameLoop(1,this,this.endLoop,[num]);
        }
    }

    _proto.endLoop = function (num) {
        if (Laya.Browser.now() < this.slowDown && this.speed >= 1) {
            this.speed -= this.acceleration
        } else {
            this.speed == 1;
            var item = 1366 * this.scaleValue / 11 * num;
            if (this.y >= item) {
                this.stop = true;
                this.flag = true;
                Laya.timer.clear(this,this.endLoop);
            }
        }
    }




    return Wheel;
})();