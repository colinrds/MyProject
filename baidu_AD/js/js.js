(function($){
	var $doc = $(document), //一眼就知道这是一个zepto获取的dom 
		$container = $(".container"),
		$navs = $(".navigate li"),
		_vm = window.innerWidth,
		startx,
		endx,
		distx,
		cleft,
		_dir, //方向
		cindex = 0;
		
		$doc.on("touchstart", startCallBack);
		$doc.on("touchmove", moveCallBack);
		$doc.on("touchend", endCallBack);
		
		function startCallBack (e){
			startx = e.touches[0].clientX;
			cleft = $container.offset().left;
			cindex = Math.abs(cleft / _vm);
		}
		
		function moveCallBack (e){
			endx = e.touches[0].clientX;
			distx = startx - endx;
			_dir = distx > 0 ? "L" : "R";
			
			if(_dir == "R" && cindex == 0 || _dir == "L" && cindex == 3) {
				return;
			}
			
			$container.css({left: -distx + cleft + "px"});
		}
		
		function endCallBack() {
			var abs = Math.abs(distx),
				_left;
			if(abs > 250) {
				if(_dir == "L" && cindex != 3) {
					_left = -_vm + cleft;
					$navs.eq(cindex + 1).addClass('active').siblings().removeClass("active");
					
				} else if (_dir == "R" && cindex != 0) {
					$navs.eq(cindex - 1).addClass('active').siblings().removeClass("active");
					_left = _vm + cleft;
				}
			} else {
				_left = cleft;
			}
			
			$container.css({left: _left + "px"});
		};
		
})(Zepto);
