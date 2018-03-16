var Game = (function(){
    (function Game(){
        Laya.init(480,582);

        var bg = new BackGround();

        Laya.stage.addChild(bg);

        // 加载图集
        Laya.loader.load("res/atlas/war.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
    })();

    function onLoaded(){
        this.hero = new Role();
        this.hero.pos(240,500)
        Laya.stage.addChild(this.hero);

        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMouseMove);
        
    }

    function onMouseMove(){
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }
})()