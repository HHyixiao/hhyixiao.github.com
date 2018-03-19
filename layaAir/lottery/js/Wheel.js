var Wheel = (function(){
    function Wheel(imgSrcArr,x,y){
        Wheel.super(this);

        this.reset();

        this.recoup = 20; //补偿位置

        this.scaleValue = .2;

        this.imgSrcArr = imgSrcArr;

        this.width = 180;
        this.height = 120 * this.imgSrcArr.length;

        for (var i = 0; i < this.imgSrcArr.length*2; i++) {
            var sp = new Laya.Sprite();
            sp.loadImage('comp/'+this.imgSrcArr[i%imgSrcArr.length]+'.jpg');
            sp.pos(0,i*120-this.height);
            this.addChild(sp);
        }
        
        this.oldY = y;

        this.pos(x,y);
        
        this.scale(this.scaleValue, this.scaleValue);
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
        this.acceleration = .05;
        this.speedAddTime = 1000;
        this.stopAcceleration = Laya.Browser.now() + this.speedAddTime;
    }
    _proto.onLoop = function (){
        if ( this.stop ) return;

        if (Laya.Browser.now() < this.stopAcceleration) {
            this.speed += this.acceleration
        } else {
            this.speed >> 0;
        }

        this.y += this.speed;
        
        if(this.y>=this.height*this.scaleValue){
            this.y-=this.height*this.scaleValue;
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
            this.slowDown = Laya.Browser.now() + this.speedAddTime/2;
            var index = this.returnImgSrcArrIndex(num);
            Laya.timer.frameLoop(1,this,this.endLoop,[index]);
        }
    }

    _proto.endLoop = function (num) {
        if (Laya.Browser.now() < this.slowDown && this.speed > 1) {
            this.speed -= this.acceleration*2
        } else {
            this.speed = 1;

            var oneImgHeight = this.height * this.scaleValue / this.imgSrcArr.length;
            var item = oneImgHeight * (this.imgSrcArr.length-num)  ;

            if (Math.abs(this.y - item - this.recoup)%(this.height * this.scaleValue) <= 1 ) {
                this.stop = true;
                this.flag = true;
                Laya.timer.clear(this,this.endLoop);
            }

        }
    }

    _proto.returnImgSrcArrIndex = function(num){
        for (var i = 0; i < this.imgSrcArr.length; i++) {
            if (this.imgSrcArr[i] == num) return i;
        }
        return -1;
    }

    return Wheel;
})();