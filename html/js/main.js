
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);


var IEMobile = ua.match(/IEMobile/i);
var isIE9 = /MSIE 9/i.test(ua);
var isIE10 = /MSIE 10/i.test(ua);
var isIE11 = /rv:11.0/i.test(ua) && !IEMobile ? true : false;

if (isIE9 || isIE10 || isIE11) {
	$('body').addClass('isIE');
}

function inputHolder() {
	$('.fs_error_txt').click(function () {
		$(this).parent().removeClass('fs-show-error');
		$(this).parent().find('input').focus();
	});
	$('input[type="text"]').focus(function (e) {
		$(this).parent().removeClass('fs-show-error');
	});

}


var threshold = 300;
function ImgLazyLoad() {

	var winH = $(window).height();

	//lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy, .active .cmPic.fs-lazyExtra, .active .pcPic.fs-lazyExtra') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy, .active .cmPic.fs-lazyExtra, .active .spPic.fs-lazyExtra');
	lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy, .cmPic.fs-lazyExtra, .pcPic.fs-lazyExtra') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy, .cmPic.fs-lazyExtra, .spPic.fs-lazyExtra');
	[].slice.call(lazyImages).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= winH + threshold) {
			var src = elm.getAttribute('data-src');
			elm.setAttribute('src', src);
			elm.classList.remove('fs-lazy');
		}
	});

	// lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy, .active .pcBg.fs-lazyExtra, .active .cmBg.fs-lazyExtra') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy, .active .cmBg.fs-lazyExtra, .active .spBg.fs-lazyExtra');
	lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy, .pcBg.fs-lazyExtra, .cmBg.fs-lazyExtra') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy, .cmBg.fs-lazyExtra, .spBg.fs-lazyExtra');
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (elm.getBoundingClientRect().top <= winH + threshold) {
			var src = elm.getAttribute('data-src');
			elm.style.backgroundImage = 'url(' + src + ')';
			elm.classList.remove('fs-lazy');
			elm.classList.remove('fs-lazyExtra');
		}
	});

}

//SET LIMITED TIME FOR BOOT TICKET


function fsEvent() {

	//Select list
	$('.fs-select-header').click(function (e) {
		var box = $(this).parent();
		if (box.hasClass('open')) {
			box.removeClass('open');
		} else {
			$('.fs-select').removeClass('open');
			box.addClass('open');
		}
	});

	$('.fs-select-box li').click(function () {
		var that = $(this);
		var box = $(this).parent().parent().parent();

		if (!that.hasClass('fs-select')) {
			box.find('li').removeClass('fs-select');
			that.addClass('fs-select');
			box.removeClass('open');

			box.find('.fs-select-header h3').html(that.text());
			box.find('.fs-select-header p').html(that.text());

		}
	});

	// Click outside close popup select
	$(document).on('click touchstart', function (event) {
		if (!$(".fs-select").is(event.target) && $(".fs-select").has(event.target).length === 0) {
			$(".fs-select").removeClass("open");
		}
	});

	
	//End

	$('.fs-box-but .fs-button-send').click(function(){
		$('.fs-overlay').addClass('active');
	});

	$('.fs-box-but .fs-close-overlay').click(function(){
		$('.fs-overlay').removeClass('active');
	});

	inputHolder();

}


function inputHolder() {
	$('.fs_error_txt').click(function () {
		$(this).parent().removeClass('fs-show-error');
		$(this).parent().find('input').focus();
	});
	$('input[type="text"]').focus(function (e) {
		$(this).parent().removeClass('fs-show-error');
	});
	$('.fs-select').click(function(){
		$(this).parents().removeClass('fs-show-error');
	})
}




function onScroll() {
	curPos = $(window).scrollTop();
	ImgLazyLoad();

}

function Rotate() {
	ImgLazyLoad();
}

function Resize() {
	if (!isMobile) {
		ImgLazyLoad();
	}
}

$(window).on('scroll', onScroll);

$(window).on('resize', Resize);

$(window).on('load', function () {
	ImgLazyLoad();
	$('.fs-cnt-wrap').animate({ 'opacity': 1 }, 1000, function () {
		ImgLazyLoad();
	});
	fsEvent();
});

$(window).on("orientationchange", Rotate);

(function () {
	ImgLazyLoad();
})();