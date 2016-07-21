function log(m,s)
{
	delete_mess()
	//-------------------------------
	//创建提示弹层        
	//By：   Chenanyi
	//		 2015.08.29
	var d = document.createElement("div");
	d.id = "message";
	d.className = "Chenanyi";
	var inner = document.createElement("div");
	inner.className = "Chenanyi-inner";
	inner.innerText=m;
	d.appendChild(inner);
	document.body.appendChild(d);
	//提示弹层结束
	//-------------------------------
	//定时执 行，s秒后执行showalert() 
	var time = 3000;
	if (s!=null&&s!=undefined&&s!="") {
		time = parseInt(s)*1000;
	}
	var temp = document.getElementById("message");
	//不加""会tm直接执行：   日了狗了
	setTimeout("delete_mess()",time);
}
function delete_mess() {
	var mess = document.getElementById("message");
	if (mess) {
		//弹层已存在---删除弹层
		document.body.removeChild(mess);
	}
}