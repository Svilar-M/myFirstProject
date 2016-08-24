var background1DivClass = "bg2";
var background2DivClass = "bg3";
var displayedBackground = 1;

// SCROLL BUTTON
var scrollupHiddenClass = "scrollupHidden";
var scrollupVisibleClass = "scrollupVisible";
var isScrollingInProccess = false;

$(document).ready(function(){
	$("." + background1DivClass).show();
	$("." + background2DivClass).hide();

	setBackgroundSwitcher();

	registerScrollEvent();

	// set height of header background to be equal to hight of window
	$('.hero').css('height', $(window).height());
});

function setBackgroundSwitcher(){
	setInterval(function(){
		if(displayedBackground == 1){
			$("." + background1DivClass).fadeOut(1000, "easeInOutSine", function(){
				$("." + background2DivClass).fadeIn(1000, "easeInOutSine");
			});
			displayedBackground = 2;
		}
		else if(displayedBackground == 2){
			$("." + background2DivClass).fadeOut(1000, "easeInOutSine", function(){
				$("." + background1DivClass).fadeIn(1000, "easeInOutSine");
			});
			displayedBackground = 1;
		}
	}, 6000);
}

function registerScrollEvent(){
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();

        // parallax effect
        $(".logo").css({
        	'transform': 'translate(0px, '+ scrollTop/20 +'%)'
        });

		// show "scroll to top" button
		if(!isScrollingInProccess){
			if (scrollTop > 100) {
			    $( "." + scrollupHiddenClass).switchClass( scrollupHiddenClass, scrollupVisibleClass, 1000 );
	        } else {
			    $( "." + scrollupVisibleClass).switchClass( scrollupVisibleClass, scrollupHiddenClass, 1000 );
	        }
        }

        if(scrollTop > $('.prozor').offset().top - $(window).height()){

		    var opacity = (scrollTop - $('.prozor').offset().top + 500) / (scrollTop / 2.3);

		    $('.roletna').css({'opacity': opacity});

  		}
	});
}

function scrollTo(offsetTop){
	isScrollingInProccess = true;

	var scrollToPosition = offsetTop;
	if(!offsetTop)
		scrollToPosition = 0;

	$('html,body').animate({
  		scrollTop: scrollToPosition
    }, 1000, function(){
	    $( "." + scrollupVisibleClass).switchClass( scrollupVisibleClass, scrollupHiddenClass, 1000 );	
    	isScrollingInProccess = false;
    });

    return false;
}