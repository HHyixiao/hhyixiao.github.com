var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var lotteryUI=(function(_super){
		function lotteryUI(){
			

			lotteryUI.__super.call(this);
		}

		CLASS$(lotteryUI,'ui.lotteryUI',_super);
		var __proto__=lotteryUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(lotteryUI.uiView);

		}

		lotteryUI.uiView={"type":"View","props":{"width":320,"height":480},"child":[{"type":"Button","props":{"y":257,"x":57,"skin":"comp/button.png","name":"start","label":"开始"}},{"type":"Image","props":{"y":148,"x":58,"width":148,"skin":"comp/box1.png","height":100}},{"type":"Button","props":{"y":257,"x":139,"skin":"comp/button.png","name":"end","label":"结束"}}]};
		return lotteryUI;
	})(View);