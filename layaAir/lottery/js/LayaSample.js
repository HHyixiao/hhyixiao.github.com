var LayaSample = (function(){
    (function(){
        //初始化引擎
        Laya.init(800,600);
        //设置背景颜色
        Laya.stage.bgColor = "#fff";
        //加载资源
        Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS)
    })();
    function onLoaded(){
        //实例化
        var game = new Game();
        Laya.stage.addChild(game);
    }
})();