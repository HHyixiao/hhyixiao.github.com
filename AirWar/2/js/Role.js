var Role = (function(){
    function Role(){
        Role.super(this);

    }
    Laya.class(Role,"Role",Laya.Sprite);

    // 是否缓存了动画
    Role.cached = false;

    var _proto = Role.prototype;
    _proto.init = function(_type,_camp,_hp,_speed,_hitRadius,_heroType){

        //角色类型
        this.type = _type;
        //阵营
        this.camp = _camp;
        //血量
        this.hp = _hp;
        //速度
        this.speed = _speed;
        //被击半径
        this.hitRadius = _hitRadius;
        //0普通，1子弹，2炸药，3补给品
        this.heroType = _heroType;

        //射击类型
        this.shootType = 0;
        //射击间隔
        this.shootInterval = 500;
        //下次射击时间
        this.shootTime = Laya.Browser.now()+2000;
        //当前动作
        this.action = "";
        //是否是子弹
        this.isBullet = false;


        if (!Role.cached) {
            Role.cached = true;

            // 缓存飞机的动作
            Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
            Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png","war/hero_down3.png","war/hero_down4.png"],"hero_down");

            // 敌机1
            Laya.Animation.createFrames(["war/enemy1_fly1.png"],"enemy1_fly");
            // 敌机1 boom
            Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png","war/enemy1_down4.png"],"enemy1_down");

            //敌机2
            Laya.Animation.createFrames(["war/enemy2_fly1.png"],"enemy2_fly");
            //敌机2 boom
            Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png"
            ,"war/enemy2_down4.png"],"enemy2_down");
            //敌机2碰撞动作
            Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");

            //敌机3
            Laya.Animation.createFrames(["war/enemy3_fly1.png","war/enemy3_fly2.png"],"enemy3_fly");
            //敌机3 boom
            Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png"
            ,"war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");
            //敌机3碰撞动作
            Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");

            // //子弹动画
            // Laya.Animation.createFrames(["war/bullet1.png"],"bullet1_fly");

            // //缓存强化包
            // Laya.Animation.createFrames(["war/ufo1.png"],"ufo1_fly");
            // //缓存医疗包
            // Laya.Animation.createFrames(["war/ufo2.png"],"ufo2_fly");
        }
        if (!this.body) {
            this.body = new Laya.Animation();

            this.addChild(this.body);
        }



        this.playAction('fly');
    }
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0,true,this.type+"_"+action);
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2,-this.bound.height/2);
    }

    return Role;
})();