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
        // 初始化主角
        this.hero.init("hero",0,5,0,30);
        this.hero.pos(240,500);
        Laya.stage.addChild(this.hero);

        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMouseMove);
        

        // 创建敌人
        // createEnemy(10);

        Laya.timer.frameLoop(1,this,onLoop);
    }

    function onLoop() {
        // 遍历所有飞机，更改飞机状态
        for (var i = Laya.stage.numChildren-1; i > 0; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                // 根据
                role.y += role.speed;

                if (role.y > 1000) {
                    role.removeSelf();
                    Laya.Pool.recover("role",role);
                }
            }
            
        }

        if (Laya.timer.currFrame%60 === 0) {
            createEnemy(2);
        }
    }

    function onMouseMove(){
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }

    //敌机血量
    this.hps = [1,2,10];
    //敌机速度
    this.speeds = [3,2,1];
    //敌机被击半径
    this.radius = [15,30,70];

    function createEnemy(num){
        for(var i=0;i<num;i++){
            //随机出现敌人
            var r = Math.random();
            // //根据随机数，随机敌人
            var type = r<0.7?0:r<0.95?1:2;
            //创建敌人
            var enemy = Laya.Pool.getItemByClass("role",Role);
            //初始化角色
            enemy.init("enemy"+(type+1),1,this.hps[type],this.speeds[type],this.radius[type]);
            //随机位置
            enemy.pos(Math.random()*400+40,-Math.random()*200);
            //添加到舞台上
            Laya.stage.addChild(enemy);
        }
    }

})()