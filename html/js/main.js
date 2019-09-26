
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);


var IEMobile = ua.match(/IEMobile/i);
var isIE9 = /MSIE 9/i.test(ua);
var isIE10 = /MSIE 10/i.test(ua);
var isIE11 = /rv:11.0/i.test(ua) && !IEMobile ? true : false;

if (isIE9 || isIE10 || isIE11) {
	$('body').addClass('isIE');
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

function fsEvent() {

	//Select list
	$('.fs-select-header').click(function (e) {
		var box = $(this).parent();
		if (box.hasClass('open')) {
			box.removeClass('open');
		} else {
			$('.fs-select').removeClass('open');
			box.addClass('open');
			selectItem();
		}
	});

	// $('.fs-select-box li').click(function () {
	// 	console.log('aaa');
	// 	var that = $(this);
	// 	var box = $(this).parent().parent().parent();

	// 	if (!that.hasClass('fs-select')) {
	// 		box.find('li').removeClass('fs-select');
	// 		that.addClass('fs-select');
	// 		box.removeClass('open');

	// 		box.find('.fs-select-header h3').html(that.text());
	// 		box.find('.fs-select-header p').html(that.text());

	// 	}
	// });


	// Click outside close popup select
	$(document).on('click touchstart', function (event) {
		if (!$(".fs-select").is(event.target) && $(".fs-select").has(event.target).length === 0) {
			$(".fs-select").removeClass("open");
		}
	});
	//End Select list


	//End

	//Close poppup
	// $('.overlay-form, .close-overlay').click(function (e) {
	// 	e.preventDefault();
	// 	popActive = false;
	// 	$('.overlay-form').removeClass('active');
	// 	$('body').removeClass('fs-no-scroll');
	// 	$('html,body').scrollTop(popPos);
	// });


	// //Close overlay
	// $('.fs-close-overlay').click(function () {
	// 	$('.fs-overlay').removeClass('active');
	// 	$('body').removeClass('fs-no-scroll');
	// });

	//	****** open popup after send
	// $('.fs-box-but .fs-button-send').click(function () {
	// 	$('.fs-overlay').addClass('active');
	// });

	$('.fs-box-but .fs-close-overlay').click(function () {
		$('.fs-overlay').removeClass('active');
	});

	inputHolder();
	getCity();
	getReason();
	selectItem();
	setDayArr();
	setMonthArr();
	setYearArr();
}


function inputHolder() {
	$('.fs_error_txt').click(function () {
		$(this).parent().removeClass('fs-show-error');
		$(this).parent().find('input').focus();
	});
	$('input[type="text"]').focus(function (e) {
		$(this).parent().removeClass('fs-show-error');
	});
	$('.fs-select').click(function () {
		$(this).parents().removeClass('fs-show-error');
	});
	$("input[type=checkbox]").on("change", function(){
		$(this).parent().removeClass('fs-show-error');
	});
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

var baseUrl = "http://localhost:53081/"

var cities;

var getCity = function () {
	$.ajax({
		url: baseUrl + "City/GetCityLookup",
		type: "GET",
		success: function (result) {
			cities = result;
			cities.forEach(function(city){
				$("#city").append('<li data-target="'+ city.KeyId +'" onclick="setDataTargetCity('+ city.KeyId +')" >'+ city.DisplayName +'</li>');
			})
		}
	});
}


var setDataTargetCity = function(id) {
	$('#city').attr("data-target", id);
}

var setDataTargetReason = function(id) {
	$('#reason').attr("data-target", id);
}

var reason;
var getReason = function () {
	$.ajax({
		url: baseUrl + "Register/ReasonTypeLookup",
		type: "GET",
		success: function (result) {
			reason = result;
			reason.forEach(function(item){
				$("#reason").append('<li data-target="'+ item.KeyId +'" onclick="setDataTargetReason('+ item.KeyId +')">'+ item.DisplayName +'</li>');
			}) 
		}
	});
}

var showMessageError = function(id){
	$('#' + id + '').addClass('fs-show-error');
}

var send = function () {
	var fullName = $('#fs_txt_name').val();
	var email = $('#fs_txt_mail').val();
	var phone = $('#fs_txt_phone').val();
	var day = $('#fs-day').find('h3').text();
	var month = $('#fs-month').find('h3').text();
	var year = $('#fs-year').find('h3').text();
	var birthDate = month + '/' + day + '/' + year;
	var reason = $('#fs_reason').find('h3').text();
	var city = $('#fs_city').find('h3').text();
	var address = $('#fs_txt_address').val();
	var subscrbeEmail = $('#fs-send-email').prop('checked');
	
	var failed = false;


	if (fullName == ''){
		showMessageError('fs-error-fullName');
		failed = true;
	}
	if (email == ''){
		failed = true;
		showMessageError('fs-error-email');
	}
	if (phone == ''){
		failed = true;
		showMessageError('fs-error-phone');
	}
	if ($('#reason').attr('data-target') == 0){
		failed = true;
		showMessageError('fs-error-reason');
	}
	if ($('#city').attr('data-target') == 0){
		failed = true;
		showMessageError('fs-error-city');
	}
	if (address == ''){
		failed = true;
		showMessageError('fs-error-address');
	}
	if (day == 'Ngày*' || month == 'Tháng*' || year == 'Năm Sinh*') {
		failed = true;
		showMessageError('fs-error-birthDate');
	}

	if (!$('#fs-condition').prop('checked')) {
		failed = true;
		showMessageError('fs-error-term-condition');
	}
	console.log(navigator.userAgent.search('FixFox'));
	console.log(navigator.userAgent);
	if (!failed) {
		var registerInfo = { 
			FullName: fullName,
			Email: email,
			Phone: phone,
			BirthDate: birthDate,
			Reason: reason,
			city: city,
			Address: address,
			SubcribeEmail: subscrbeEmail,
			Browser: navigator.userAgent
		};
		console.log(JSON.stringify(registerInfo));
		$.ajax({
			url: baseUrl + "Register/Create",
			type: "POST",
			// dataType: "json",
			data: registerInfo,
			success: function (result) {
				if (result) {
					showSuccessPopup();
				} else {}
			},
			error: function(xhr, textStatus, errorThrown){
			}
			
		});
	}
	
}


var showSuccessPopup = function(){ 
	$('.fs-box-but .fs-button-send').click(function () {
			$('.fs-overlay').addClass('active');
		});
}

var setDayArr = function() {
	for (i=1; i <=31; i++) {
		if (i < 10) {
			$("#day").append('<li data-target=0"'+ i +'" onclick="setDataTargetDay('+i+')">'+ "0" + i +'</li>');
		} else {
			$("#day").append('<li data-target="'+ i +'" onclick="setDataTargetDay('+i+')">'+ i +'</li>');
		}
	}
}

var setDataTargetDay = function(id) {
	$('#day').attr("data-target", id);
}


var setMonthArr = function() {
	for (i=1; i <=12; i++) {
		if (i < 10) {
			$("#month").append('<li data-target=0"'+ i +'" onclick="setDataTargetMonth('+i+')">'+ "0" + i +'</li>');
		} else {
			$("#month").append('<li data-target="'+ i +'" onclick="setDataTargetMonth('+i+')">'+ i +'</li>');
		}
	}
}

var setDataTargetMonth = function(id) {
	$('#month').attr("data-target", id);
}

var setYearArr = function() {
	for (i=2000; i >= 1970; i--) {
			$("#year").append('<li data-target="'+ i +'" onclick="setDataTargetYear('+i+')">'+ i +'</li>');
	}
}

var setDataTargetYear = function(id) {
	$('#year').attr("data-target", id);
}

var selectItem = function () {
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
}

$(window).on("orientationchange", Rotate);

(function () {
	ImgLazyLoad();
	// getCity();
	// getReason();

	//$('body').addClass('fs-no-scroll');
	//$('.fs-overlay').addClass('active');


})();


