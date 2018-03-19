var Wheel = (function(){
    function Wheel(imgSrcArr,x,y){
        Wheel.super(this);

        this.reset();

        this.recoup = 20;

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
        // console.log(this,this.y,this.x);

        // this.bg1 = new Laya.Sprite();
        // this.bg1.loadImage(imgSrc);
        // this.addChild(this.bg1);

        // this.bg2 = new Laya.Sprite();
        // this.bg2.loadImage(imgSrc);
        // this.addChild(this.bg2);
        // this.bg2.pos(this.bg1.x,this.bg1.y-this.height);
        
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
            this.slowDown = Laya.Browser.now() + this.speedAddTime;
            var index = this.returnImgSrcArrIndex(num);
            Laya.timer.frameLoop(1,this,this.endLoop,[index]);
        }
    }

    _proto.endLoop = function (num) {
        if (Laya.Browser.now() < this.slowDown && this.speed > 1) {
            this.speed -= this.acceleration
        } else {
            this.speed = 1;

            this.y = Math.round(this.y);

            

            var oneImgHeight = this.height * this.scaleValue / this.imgSrcArr.length;
            var item = oneImgHeight * (this.imgSrcArr.length-num)  ;
            // console.log(item,this.y,num,this.speed,index,this.imgSrcArr.length,Math.abs(this.y - item -this.recoup))
            // console.log(item,this.y,num,Math.abs(Math.round(this.y) - item - this.recoup))

            if (Math.abs(this.y - item - this.recoup)%(this.height * this.scaleValue) <= 1 ) {
            // if (Math.abs(this.y-24 - this.recoup) <= 1 ) {
                // console.log(this.y,this.height*this.scaleValue);
                this.stop = true;
                this.flag = true;
                Laya.timer.clear(this,this.endLoop);
            }

            // if (this.y >= item) {
            //     this.stop = true;
            //     this.flag = true;
            //     Laya.timer.clear(this,this.endLoop);
            // }
        }
    }

    _proto.returnImgSrcArrIndex = function(num){
        for (var i = 0; i < this.imgSrcArr.length; i++) {
            if (this.imgSrcArr[i] == num) {
                return i;
            }
        }
        return -1;
    }


    return Wheel;
})();