$(function () {
    var $skillContainer = $("#skill .container"),
        $navBar 		= $("#navbar"),
        $book 			= $('#book'),
        $postHeader 	= $('#post-header'),
        $postContent 	= $('#post-content'),
        $skillH1 		= $('#skill h1'),
        $window         = $(window),
        $header         = $('#header'),
        $intro          = $('#intro'),
        $arrow          = $('.arrow'),
        windowHeight    = $window.height(),
        headerHeight 	= $header.height(),
        skillHeight 	= $('#skill').height(),
        educationHeight = $('#education').height(),
        top 			= headerHeight + skillHeight + educationHeight - windowHeight;

    $header.css('height', windowHeight + 'px');
    $intro.css('height', windowHeight + 'px');

	function throttle(method, context) {
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 100);
	}
    $window.scroll(function() {
		throttle(_scroll);
	});

	function _scroll() {
        var scrollTop = $(document).scrollTop();
        switch(true) {
            case scrollTop === 0:
                $arrow.css('display', 'block');
                $navBar.removeClass("attop");
                break;
        	case scrollTop > 0 && scrollTop <= windowHeight / 2:
                $arrow.css('display', 'none');
        		$navBar.removeClass("attop");
        		break;
        	case scrollTop > windowHeight / 2 && scrollTop < windowHeight - 71:
        		$skillContainer.addClass("animated flipInX").removeClass("toggleOpacity");
        		$navBar.removeClass("attop");
                $arrow.css('display', 'none');
        		break;
        	case scrollTop >= (windowHeight - 71) && scrollTop < top:
        		$skillContainer.addClass("animated flipInX").removeClass("toggleOpacity");
        		$navBar.addClass("attop");
        		break;
        	case scrollTop >= top && scrollTop < 2 * windowHeight:
        		$navBar.addClass("attop");
			$postHeader.animate({
			    opacity:"1",
			    filter: "alpha(opacity=100)",
			    paddingTop:"87px"
			}, 500);
			$postContent.animate({
			    filter: "alpha(opacity=100)",
			    opacity:"1"
			}, 500);
        		break;
        	case scrollTop >= 2*windowHeight:
        		$navBar.addClass("attop");
        		$skillH1.addClass('animated zoomInLeft');
        		slideIn();
			$postHeader.animate({
			    opacity:"1",
			    filter: "alpha(opacity=100)",
			    paddingTop:"87px"
			}, 500);
			$postContent.animate({
			    filter: "alpha(opacity=100)",
			    opacity:"1"
			}, 500);
        		break;
        	default:
        }
    } 

	var y 		  = 0,
     	x 		  = -10,
    	remainder = 0,
    	delta 	  = 0,
    	disX 	  = 0,
    	disY 	  = 0,
    	$body 	  = $('#stageBody');
    $body.mousedown(function(ev) {
        var deltaY = y;
        disX = ev.pageX / 10 - y;
        disY = -ev.pageY / 10 - x;
        $(document).mousemove(function(event) {
            x = -event.pageY / 10 - disY;
            y = event.pageX / 10 - disX;
            delta = event.pageX;
            $body[0].style.transform = 'perspective(1200px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
            $body[0].style.transition = '';
        });
        $(document).mouseup(function() {
            delta = delta-ev.pageX;
            remainder = Math.abs(deltaY - y);
            deltaY = y;
            if (delta > 0) right();
            if (delta < 0) left();
            $(this).unbind('mousemove');
            $(this).unbind('mouseup');
        });
        return false;
    });
    $('#btn1').bind('click', left);
    $('#btn2').bind('click', right);
    function left() {
        x = -10;
        if(remainder !== 0) {
            if(delta > 0){
                y -= remainder;
            } else {
                y -= (60 - remainder);
            }
        } else {
            y -= 60;
        }
        $body[0].style.transform = 'perspective(1200px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
        $body[0].style.transition = 'transform 1s ease';
        remainder = 0;
        return false;
    }
    function right() {
        x = -10;
        if(remainder !== 0) {
            if(delta < 0){
                y += remainder;
            } else {
                y += (60 - remainder);
            }
        } else {
            y += 60;
        }
        $body[0].style.transform = 'perspective(1200px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
        $body[0].style.transition = 'transform 1s ease';
        delta = 0;
        remainder = 0;
        return false;
    }


	var $slideBars = $('.progress'),
		$skills    = $('.skill'),
		len 	   = $slideBars.length;
    function slideIn() {
    	for (var i = 0; i < len; i++) {
    		(function (j) {
    			setTimeout(function() {
	    			$slideBars.eq(j).addClass('animated flipInX').removeClass('toggleOpacity');
	    			$skills.eq(j).addClass('animated slideInLeft').removeClass('toggleOpacity');
	    		}, 100*j);
    		})(i);
    	}
    }

    $('a[href*="#"]').click(function() {
        var $target = $(this.hash);  
        if ($target.length) {  
            var targetOffset = $target.offset().top - 70;  
            $('html,body').animate({  
                scrollTop: targetOffset  
            }, 500);  
            return false;  
        }
    });
});
