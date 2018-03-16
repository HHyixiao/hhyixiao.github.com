var Role = (function(){
    function Role(){
        Role.super(this);

        this.init();
    }
    Laya.class(Role,"Role",Laya.Sprite);

    var _proto = Role.prototype;
    _proto.init = function(){
        // 缓存飞机的动作
        Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png","war/hero_down3.png","war/hero_down4.png"],"hero_down");

        this.body = new Laya.Animation();

        this.addChild(this.body);

        this.playAction('hero_fly');
    }
    _proto.playAction = function(acttion){
        this.body.play(0,true,acttion);
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2,-this.bound.height/2);
    }

    return Role;
})();