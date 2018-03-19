var LayaSample = (function(){
    (function(){
        //初始化引擎
        Laya.init(320, 480, Laya.WebGL);
        Laya.stage.scaleMode = "showall";
        //设置背景颜色
        Laya.stage.bgColor = "#fff";
        //加载资源
        Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS)
    })();
    function onLoaded(){
        //实例化
        var arr = [[1,2,3,4,5,6,7,8],[8,7,6,5,4,3,2,1],[2,3,5,7,1,4,8,6]];

        var game = new Game(arr);
        Laya.stage.addChild(game);
    }
})();