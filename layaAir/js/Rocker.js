var Rocker = (function(){
    function Rocker(x, y){
        Rocker.super(this);

        this.angle = 180;

        this.r = 60;
        this.x = x;
        this.y = y;
        this.width = this.r*2;
        this.height = this.r*2;

        this.graphics.drawCircle(x,y,this.r,'#ccc');
        this.graphics.setAlpha(0.7);


        this.body = new Laya.Sprite();
        this.body.r = 20;

        this.body.graphics.drawCircle(x,y,this.body.r,'#000');
        this.graphics.setAlpha(0.5);
        this.addChild(this.body);



    }
    Laya.class(Rocker,"Rocker",Laya.Sprite);
    var _proto = Rocker.prototype;

    _proto.move = function (x,y){
        
        if (x > 0 && y > 0) {
			//那么角度在0到90之间
			this.angle = Math.floor((Math.atan((y-0)/(x-0))*180/Math.PI))
		}
		if (x < 0 && y > 0) {
			//那么角度在90到180之间
			this.angle = Math.floor((Math.atan((0-x)/(y-0))*180/Math.PI))+90
		}
		if (x < 0 && y < 0) {
			//那么角度在180到270之间
			this.angle = Math.floor((Math.atan((0-y)/(0-x))*180/Math.PI))+180
		}
		if (x >0 && y < 0) {
			//那么角度在0到90之间
			this.angle = Math.floor((Math.atan((0-x)/(y-0))*180/Math.PI))+270
		}
        console.log(this.angle+'°',x,y,this.x,this.y,this.body.x,this.body.y) ;

        var mouseX = x;
		var mouseY = y;
		var absx = Math.abs(x);
		var absy = Math.abs(y);
		if (Math.sqrt(Math.pow(absx,2)+Math.pow(absy,2)).toFixed(1)<(this.r-this.body.r) ) {
			this.body.pos(mouseX,mouseY);
		}  else {
			mouseX = 0 - Math.floor((this.r-this.body.r)*Math.sin( Math.PI*(this.angle-90)/180).toFixed(5))
			mouseY = 0 + Math.floor((this.r-this.body.r)*Math.cos( Math.PI*(this.angle-90)/180).toFixed(5))
			this.body.pos(mouseX,mouseY);
        }

    }

    _proto.mouseup = function () {
        this.body.pos(this.x,this.y);
    }

    return Rocker;
})();