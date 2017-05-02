//window.onload=function(){
//	var picture=document.getElementsByClassName("picture")
//	
//	var lis=document.getElementsByClassName("lis")
//	console.log(picture)
//	console.log(lis)
//	for(var i=0;i<picture.length;i++){
//		lis[i].index= i
//		lis[i].onclick=function(){
////			alert("qqq")
//			for(var i=0;i<picture.length;i++){
//			picture[i].style.display="none"
//		}
//		picture[this.index].style.display="inline-block"
//		}
//
//	}	
//}
window.onload = function() {
	var pictures = document.getElementsByClassName("picture")
	var lis = document.getElementsByClassName("lis")
//	console.dir(lis[0].style.backgroundColor)
	for (var i = 0 ; i < pictures.length ; i ++ ) {
		lis[i].cwj = i;
		lis[i].onclick = function () {
			for (var i = 0 ; i < pictures.length ; i ++ ) {
				lis[i].style.backgroundColor="rgba(255,255,255,0.6)"
				pictures[i].setAttribute("class","picture");//修改类名
			}
			pictures[this.cwj].setAttribute("class","picture xianshi");
			this.style.backgroundColor="white"
		}
//		lis[i].onmouseleave = function () {
//			console.log("111")
//			for (var i = 0 ; i < pictures.length ; i ++ )
//			lis[i].style.backgroundColor="rgba(255,255,255,0.6)"
//		}
	}
	
//	放大镜切换

	var imgs = document.getElementsByClassName("po-img")[0].getElementsByTagName("img")
//				var imgs = document.getElementsByClassName("qqq")[0].getElementsByTagName("img")[0]
//	console.dir(imgs)
	var only = document.getElementsByClassName("only")[0]
//	console.dir(only)
	for(var i= 0;i<imgs.length;i++){
		imgs[i].fujiu=i
//		console.dir(imgs[i])s
//		imgs[i].onmouseover =function(){
//			only.style.display="block"
//		}
	}



}
	
	
