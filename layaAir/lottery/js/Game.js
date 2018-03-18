var Game = (function(_super){
    function Game(){
        Game.super(this);
        
            this.start = this.getChildByName("start");
            this.aaa = this.getChildByName("end");
            this.aaa.visible = false;

            this.bodyBox = new Laya.Panel(); //Panel
            this.bodyBox.pos(80,165);
            this.bodyBox.size(105,70);

            Laya.stage.addChild(this.bodyBox);

            this.body = [];
            for (var i = 0; i < 3; i++) {
                var wheel = new Wheel("comp/Wheel_"+(i+1)+".jpg",i*35,0);
                this.body.push(wheel);
                this.bodyBox.addChild(wheel);
                
            }

            this.txt = new Laya.Text();
            this.txt.text = "。。。";
            this.fontSize = 32;
            this.txt.color = "#c30c30";
            this.txt.pos(80,110);
            Laya.stage.addChild(this.txt);


            this.start.on(Laya.Event.CLICK,this,this.go);
            this.aaa.on(Laya.Event.CLICK,this,this.end);

    }

    Laya.class(Game,"Game",_super);

    var _proto = Game.prototype;

    _proto.go = function (){
        this.start.visible = false;
        // this.body[0].startScroll();
        // for (var i = 0; i < this.body.length; i++) {
        //     (function(index,arr){
                
        //     })(i,this.body);
        // }

        for (var i = 0; i < this.body.length; i++) {
            (function(index,arr){
                setTimeout(function() {
                    arr[index].startScroll();
                }, index*200);
            })(i,this.body)
            
        }


        Laya.timer.once(2000, this, function(){
            this.aaa.visible = true;
        });
    };

    _proto.end = function () {
        this.aaa.visible = false;

        this.txt.text = '';
        for (var i = 0; i < this.body.length; i++) {
            var num = Math.random()*11>>0;
            this.body[i].endScroll(num);
            this.txt.text += num +','
        }

    };

    //注册类
    return Game;
})(ui.lotteryUI);