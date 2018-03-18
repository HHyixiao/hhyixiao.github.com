(function () {
	var Sprite = Laya.Sprite;
	var Stage = Laya.Stage;
	var Text = Laya.Text;
	var Event = Laya.Event;
	var Browser = Laya.Browser;
	var WebGL = Laya.WebGL;

	var txt;

	(function () {
		Laya.Config.isAntialias = true;
		// 不支持WebGL时自动切换至Canvas
		Laya.init(320, 480, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#ffffff";

		main();
	})();

	function main() {
		var sanke = new Snake(Laya.stage.width/4,Laya.stage.height/4);
		var rocker = new Rocker(0,0);

		rocker.pos(80,400);

		Laya.stage.addChild(sanke);
		Laya.stage.addChild(rocker);


		Laya.stage.on("mouseup", rocker, rocker.mouseup)
        Laya.stage.on("mousemove",rocker, rockerMove)


		
	}

	function rockerMove() {
        this.move(this.mouseX,this.mouseY)
    }






})();