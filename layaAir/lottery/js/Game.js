var Game = (function(_super){
    function Game(arr){
        Game.super(this);

            this.txt = new Laya.Text();
            this.fontSize = 32;
            this.txt.color = "#c30c30";
            this.txt.pos(80,110);
            Laya.stage.addChild(this.txt);

            this.reset();
        
            this.start = this.getChildByName("start");
            this.aaa = this.getChildByName("end");
            this.aaa.visible = false;

            this.bodyBox = new Laya.Panel(); //Panel Sprite
            this.bodyBox.pos(80,165);
            this.bodyBox.size(105,70);

            Laya.stage.addChild(this.bodyBox);

            this.body = [];
            // for (var i = 0; i < 3; i++) {
            //     var wheel = new Wheel("comp/Wheel_"+(i+1)+".jpg",i*35,0);
            //     this.body.push(wheel);
            //     this.bodyBox.addChild(wheel);
            // }

            for (var i = 0; i < arr.length; i++) {
                var wheel = new Wheel(arr[i],i*35,0);
                this.body.push(wheel);
                this.bodyBox.addChild(wheel);
            }



            // 抽奖结果
            this.result = new Laya.Sprite();
            this.result.scale(.2, .2);
            for (var i = 0; i < this.body.length; i++) {
                var sp = new Laya.Sprite();
                sp.pos(180*i,0)
                this.result.addChild(sp);
            }
            Laya.stage.addChild(this.result);

            this.start.on(Laya.Event.CLICK,this,this.go);
            this.aaa.on(Laya.Event.CLICK,this,this.end);

    }

    Laya.class(Game,"Game",_super);

    var _proto = Game.prototype;

    _proto.reset = function (){
        this.count = 0;
        this.txt.text = "。。。";
        
    }
    _proto.go = function (){
        this.reset();
        this.start.visible = false;

        for (var i = 0; i < this.body.length; i++) {
            (function(index,arr){
                setTimeout(function() {
                    arr[index].startScroll();
                }, index*200);
            })(i,this.body);
        }


        Laya.timer.once(2000, this, function(){
            this.aaa.visible = true;
        });
    };

    _proto.end = function () {
        this.aaa.visible = false;

        this.txt.text = '';

        this.endOnewheel(this.count);

        Laya.timer.frameLoop(1,this,this.onLoop);
        // for (var i = 0; i < this.body.length; i++) {
        //     var num = Math.random()*8>>0;
        //     // var num = 0;
        //     num = num + 1;
        //     this.body[i].endScroll(num);
        //     this.txt.text += num +',';
        //     this.result.getChildAt(i).loadImage('comp/'+num+'.jpg');
        // }

        Laya.timer.once(2000, this, function(){
            this.start.visible = true;
        });
    };

    _proto.onLoop = function () {
        if (this.body[this.count].stop ) {
            this.count++;
            if (this.count > this.body.length-1) {
                Laya.timer.clear(this,this.onLoop);
                return
            }
            this.endOnewheel(this.count);
        }
    }

    _proto.endOnewheel = function (i) {
        var num = Math.random()*8>>0;
        // var num = 0;
        num = num + 1;
        this.body[i].endScroll(num);
        this.txt.text += num +',';
        this.result.getChildAt(i).loadImage('comp/'+num+'.jpg');
    }

    //注册类
    return Game;
})(ui.lotteryUI);