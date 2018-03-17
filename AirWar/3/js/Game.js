var Game = (function(){
    (function Game(){

        //子弹发射偏移位置表
        this.bulletPos = [[0],[-15,15],[-30,0,30],[-45,-15,15,45]];
        //关卡等级
        this.level = 0;
        //积分成绩
        this.score = 0;
        //升级等级所需的成绩数量
        this.levelUpScore = 10;
        //子弹级别
        this.bulletLevel = 0;

        //敌机血量
        this.hps = [1,2,10];
        //敌机速度
        this.speeds = [3,2,1];
        //敌机被击半径
        this.radius = [15,30,70];

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

        // 射击类型
        this.hero.shootType = 1;

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

                if (role.y > 1000 || !role.visible || (role.isBullet && role.y<-20) ) {
                    role.removeSelf();

                    // 回收前重置
                    role.isBullet = false;
                    role.visible = true;

                    // 回收
                    Laya.Pool.recover("role",role);
                }
            }
            
        }

        if (role.shootType > 0) {
            var time = Laya.Browser.now();

            if (time>role.shootTime) {
                role.shootTime = time+role.shootInterval;
                // var bullet = Laya.Pool.getItemByClass("role",Role);
                // bullet.init("bullet1",role.camp,1,-5,1);
                // bullet.isBullet = true;
                // bullet.pos(role.x,role.y-role.hitRadius - 10);

                // Laya.stage.addChild(bullet);

                //根据不同子弹类型，设置不同的数量及位置
                this.pos = this.bulletPos[role.shootType - 1];
                for (var index = 0; index < pos.length; index++) {
                    //从对象池里边创建一个子弹
                    var bullet = Laya.Pool.getItemByClass("role", Role);
                    //初始化子弹信息
                    bullet.init("bullet1", role.camp, 1, -4 - role.shootType - Math.floor(this.level / 15), 1, 1);
                    // //设置角色类型为子弹类型
                    bullet.isBullet = true;
                    //设置子弹发射初始化位置
                    bullet.pos(role.x + pos[index], role.y - role.hitRadius - 10);
                    //添加舞台上
                    Laya.stage.addChild(bullet);
                }
            }
        }

        // 碰撞监测
        for(var i = Laya.stage.numChildren-1; i > 0; i --){
            var role1 = Laya.stage.getChildAt(i);
            if (role.hp<1) continue;
            for (var j = i-1; j>0; j--) {
                // if die
                if (!role1.visible) continue;

                var role2 = Laya.stage.getChildAt(j);

                if (role2.hp>0 && role1.camp != role2.camp) {
                    var hitRadius = role1.hitRadius + role2.hitRadius;

                    if(Math.abs(role1.x-role2.x) < hitRadius && Math.abs(role1.y-role2.y) < hitRadius){
                        //碰撞后掉血
                        lostHp(role1,1);
                        lostHp(role2,1);
                    }
                    
                }
                
            }
        }

        // gameover
        if (this.hero.hp < 1) {
            Laya.timer.clear(this,onLoop);
            alert('游戏结束')
        }


        // 创建新的敌人
        if (Laya.timer.currFrame%60 === 0) {
            createEnemy(2);
        }
    }

    function lostHp(role,lostHp) {
        // 减血
        role.hp -= lostHp;
        if(role.hp>0){
            //如果未死亡，则播放爆炸动画
            role.playAction("hit");
        } else if (role.isBullet) {
            //如果是子弹，则直接隐藏
            role.visible = false;

        } else {
            role.playAction("down");
        }
    }

    function onMouseMove(){
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }



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