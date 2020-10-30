/**
 * Created by ArashMad on 04/07/2018.
 */


//====================================================================================
//------------------------------------------------------------------------------------ Request functions
//====================================================================================
function getAddress(path) {
	var id = 3;
	// var id = 1;
	switch (id) {
		case 0:
			return 'http://192.168.111.136:3001/users';
		case 1:
			return 'http://192.168.111.117:8000/api/v1/' + path;
			// return 'http://192.168.111.102:8000/api/' + path;
		case 2:
			return 'http://app.mabnama.com/api/' + path;
		case 3:
			return 'http://app.mabnama.com/api/v1/' + path;
		case 4:
			return 'http://192.168.111.146:3001/' + path
	}
}
function SendRequest(_request, callback) {
	if (!NetworkConnection()) {
		NetworkError();
		return;
	}
	switch (_request._method) {
		case 'post': {
			$$.post(
					_request._url,
					_request._data,
					function (data) {
						callback({err:false,data:data})
					},
					function (xhr, status) {
						// console.log(xhr);
						// console.log(status);
						callback({err:true,msg:'',xhr:xhr,status:status})
					}
			);
			break;
		}
		case 'get': {
			$$.get(
					_request._url,
					function (data) {
						callback({err:false,data:data})
					},
					function (xhr, status) {
						callback({err:true,msg:'',xhr:xhr,status:status})
					}
			);
			break;
		}
	}
}


//====================================================================================
//------------------------------------------------------------------------------------ User Management App
//====================================================================================
function Register() {
	surveyApp.modalLogin(
			'<div style="text-align:center">' +
			'<div class="row no-gutter">' +
			'<div>' +
			'<span class="mdi mdi-36px mdi-fingerprint color-bluegray"></span>' +
			'</div>' +
			'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
			messages.app.title +
			'</div>' +
			'</div>' +
			'<div class="row no-gutter">' +
			'<div class="col-20"></div>' +
			'<div class="col-80">' +
			'<p style="text-align:right;font-size:16px;">'+ messages.app.register +'</p>' +
			'</div>' +
			'</div>' +
			'</div>',
			function (user_fName, user_code) {
				if (user_fName && user_code) {
					localStorage.setItem('user_fName', user_fName);
					localStorage.setItem('user_code', user_code);
					onRegistrationSuccess();
				} else {
					onRegistrationFailed();
				}
			}
	);
	$$('.modal-title').text('');
	$$('.modal-buttons.modal-buttons span:nth-child(1)').hide();
	$$('.modal-buttons.modal-buttons span:nth-child(2)').text('ثبت نام');
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
	$$('.modal .modal-inner .input-field input')[0].setAttribute('placeholder', 'نام و نام خانوادگی');
	$$('.modal .modal-inner .input-field input')[1].setAttribute('placeholder', 'کد پرسشگری');
	$$('.modal .modal-inner .input-field input')[1].setAttribute('type', 'text');
	$$('.modal .modal-inner .input-field input').css({
		'direction': 'ltr',
		'text-align': 'center',
		'padding': '12px 20px',
		'font-size': '13px !important',
		'border': '2px solid #f0f0f0',
		'border-radius': '4px',
		'background-color': '#f5f5f5'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
}
function onRegistrationSuccess() {
	var _msg = "خوش آمدید، ثبت نام شما در پرسان با موفقیت انجام شد.";
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-account-check color-green"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">'+ _msg +'</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: [{
			text: 'ادامه',
			onClick: function() {
				mainView.loadPage('app_main.html');
			}
		}]
	});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
}
function onRegistrationFailed() {
	var _msg = "خطا در ثبت نام! لطفا نام و نام خانوادگی و کد پرسشگری خود را وارد نمایید.";
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-account-remove mdi-flip-h color-red"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">' + _msg + '</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: [{
			text: 'تلاش مجدد',
			onClick: function() {
				Register();
			}
		}]
	});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
}

function Login() {
	surveyApp.modalLogin(
		'<div style="text-align:center">' +
		'<div class="row no-gutter">' +
		'<div>' +
		'<span class="mdi mdi-36px mdi-fingerprint color-bluegray"></span>' +
		'</div>' +
		'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
		messages.app.title +
		'</div>' +
		'</div>' +
		'<div class="row no-gutter">' +
		'<div class="col-20"></div>' +
		'<div class="col-80">' +
		'<p style="text-align:right;font-size:16px;">'+ messages.app.login +'</p>' +
		'</div>' +
		'</div>' +
		'</div>',
		function (uc, pc) {
			if (uc && pc) {
				uc = uc.replace(/ /g,'').toLowerCase();
				
				pc = pc.replace(/ /g,'').toLowerCase();
				var _request = {
					_method: 'post',
					_url: getAddress('login'),
					_data: {
						action: actions.USER_LOGIN,
						data: JSON.stringify({
							user: uc,
							pass: pc,
							v: AppSettings('version')
						})
					}
				};
				
				Spinner2(true,'log-in');
				SendRequest(_request, function(res) {
					Spinner2(false);
					if (!res.err) {
						var JSONres = JSON.parse(res.data);

						if (!JSONres.err) {
							var _uc = JSONres.data.uc;
							var _pc = JSONres.data.pc;
							var _location = JSONres.data.location;
							AppSettings('uc', _uc);
							AppSettings('pc', _pc);
							AppSettings('userLocation', _location);
							onLoginSuccess(JSONres.msg)
						} else {
							var link = JSONres.link;
							if (link) {
								onVersionFailed(JSONres.msg, {link:link});
							} else {
								onLoginFailed(JSONres.msg);
							}
						}
					} else {
						onLoginFailed(messages.app.server);
						return false;
					}
				});
			} else {
				onLoginFailed();
			}
		}
	);
	$$('.modal-title').text('');
	$$('.modal-buttons.modal-buttons span:nth-child(1)').hide();
	$$('.modal-buttons.modal-buttons span:nth-child(2)').text('ورود');
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
	$$('.modal .modal-inner .input-field input')[0].setAttribute('placeholder', 'نام کاربری');
	$$('.modal .modal-inner .input-field input')[1].setAttribute('placeholder', 'رمز عبور');
	$$('.modal .modal-inner .input-field input').css({
		'direction': 'ltr',
		'text-align': 'center',
		'padding': '12px 20px',
		'font-size': '13px !important',
		'border': '2px solid #f0f0f0',
		'border-radius': '4px',
		'background-color': '#f5f5f5'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
}
function onVersionFailed(_msg, _obj) {
	var _link = _obj.link;
	surveyApp.modal({
		title: '',
		text:
			'<div style="text-align:center">' +
			'<div class="row no-gutter">' +
			'<div>' +
			'<span class="mdi mdi-36px mdi-android mdi-flip-h" style="color:#a4c639"></span>' +
			'</div>' +
			'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
			messages.app.title +
			'</div>' +
			'</div>' +
			'<div class="row no-gutter">' +
			'<div class="col-20"></div>' +
			'<div class="col-80">' +
			'<p style="text-align:right;font-size:16px;">' + _msg + '</p>' +
			'</div>' +
			'</div>' +
			'</div>',
		buttons: [{
			text: 'به روزرسانی',
			onClick: function() {
				window.location = _link;
				navigator.app.exitApp();
			}
		}]
	});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
}
function onLoginSuccess(_msg) {
	if(!_msg)
		_msg = messages.app.welcome;
	surveyApp.modal({
		title: '',
		text:
			'<div style="text-align:center">' +
			'<div class="row no-gutter">' +
			'<div>' +
			'<span class="mdi mdi-36px mdi-account-check color-green"></span>' +
			'</div>' +
			'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
			messages.app.title +
			'</div>' +
			'</div>' +
			'<div class="row no-gutter">' +
			'<div class="col-20"></div>' +
			'<div class="col-80">' +
			'<p style="text-align:right;font-size:16px;">'+ _msg +'</p>' +
			'</div>' +
			'</div>' +
			'</div>',
		buttons: [{
			text: 'ادامه',
			onClick: function() {
				mainView.loadPage('app_main.html');
			}
		}]
	});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
}
function onLoginFailed(_msg, _obj) {
	if (!_msg)
		_msg = messages.app.no_welcome;
	
	surveyApp.modal({
		title: '',
		text:
			'<div style="text-align:center">' +
			'<div class="row no-gutter">' +
			'<div>' +
			'<span class="mdi mdi-36px mdi-account-remove mdi-flip-h color-red"></span>' +
			'</div>' +
			'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
			messages.app.title +
			'</div>' +
			'</div>' +
			'<div class="row no-gutter">' +
			'<div class="col-20"></div>' +
			'<div class="col-80">' +
			'<p style="text-align:right;font-size:16px;">' + _msg + '</p>' +
			'</div>' +
			'</div>' +
			'</div>',
		buttons: [{
			text: 'تلاش مجدد',
			onClick: function() {
				Login();
			}
		}]
	});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
}
// function Logout() {
// 	surveyApp.modal({
// 		title: '',
// 		text:
// 			'<div style="text-align:center">' +
// 			'<div class="row no-gutter">' +
// 			'<div>' +
// 			'<span class="mdi mdi-24px mdi-account-remove mdi-flip-h"></span>' +
// 			'</div>' +
// 			'<div class="col-80" style="text-align:right;font-size:14px;font-weight:bold;line-height:36px">' +
// 			messages.app.title +
// 			'</div>' +
// 			'</div>' +
// 			'<div class="row no-gutter">' +
// 			'<div class="col-20"></div>' +
// 			'<div class="col-80">' +
// 			'<p style="text-align:right;font-size:13px;">'+ messages.app.logout +'</p>' +
// 			'</div>' +
// 			'</div>' +
// 			'</div>',
// 		buttons: [{text: 'بستن'}]
// 	});
// 	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
// 	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
// 	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
// 	AppSettings('uc', '');
// 	AppSettings('pc', '');
// }


//====================================================================================
//------------------------------------------------------------------------------------ Porsan App Functions
//====================================================================================
function CreateFormElement(type, header, options, settings) {
	var elem = "";
	var input_class = "";
	var _class, _type, _icon;
	if (header[4] === 1)
		input_class += "necessary ";
	switch (type) {
		case 'radio':
		case 'check':
		case 'radio_text':
		case 'check_text': {
			input_class += "input_text_number";
			if (type === 'radio' || type === 'radio_text') {
				_class = "label-radio";
				_type = "radio";
				_icon = "icon-form-radio";
			} else if (type === 'check' || type === 'check_text') {
				_class = "label-checkbox";
				_type = "checkbox";
				_icon = "icon-form-checkbox";
			}
			
			elem +=
				'<div class="list-block no-hairlines no-hairlines-between" style="margin:0">' +
				'<ul style="padding-right:0 !important;">';
			$$.each(options, function (id, el) {
				if (type === 'radio_text' || type === 'check_text') {
					if (id === options.length-1) {
						
						elem +=
							'<li>' +
								'<label class="'+ _class +' item-content">' +
								'<input class="'+ input_class +'" type="'+ _type + '" name="' + header[3] + '" value="' + el[0] + '" data-type="combined">' +
								'<div class="item-media">' +
								'<i class="icon '+ _icon +'"></i>' +
								'</div>' +
								'<div class="item-inner">';
								
						if (el[2] === 'number') {
							if (el[3] === 'sep1000') {
								var _func = "NumberSeperator('" + header[3] + "')";
								elem +=
										'<input class="input_text_number" type="number" name="'+ header[3] +'" onkeyup="'+ _func +'" placeholder="'+ el[1] +'" disabled>';
							} else {
								elem +=
										'<input class="input_text_number" type="number" name="'+ header[3] +'" placeholder="'+ el[1] +'" disabled>';
							}
						} else {
							elem +=
									'<input class="input_text_number" type="text" name="'+ header[3] +'" placeholder="'+ el[1] +'" disabled>';
						}
						
						elem +=
								'</div>' +
								'</label>' +
							'</li>';
						
						if (el[3] === 'sep1000') {
							elem += '<div class="salary"><span></span> </div>';
						}
						
						if (settings.slide !== 'mixed')
							elem += '</ul></div>';
						return;
					}
				}
				elem +=
					'<li>' +
						'<label class="'+ _class +' item-content">' +
						'<input class="'+ input_class +'" type="'+ _type + '" name="' + header[3] + '" value="' + el[0] + '">' +
						'<div class="item-media">' +
						'<i class="icon '+ _icon +'"></i>' +
						'</div>' +
						'<div class="item-inner">' +
						'<div class="item-title">'+
						'<span style="display:inline-block;">'+ el[1]  +'</span>' +
						'</div>' +
						'</div>' +
						'</label>' +
					'</li>';
			});
			elem += '</ul></div>';
			break;
		}
		case 'radio_text_multi':
		case 'check_text_multi': {
			input_class += "input_text_number";
			if (type === 'radio_text_multi') {
				_class = "label-radio";
				_type = "radio";
				_icon = "icon-form-radio";
			} else if (type === 'check_text_multi') {
				_class = "label-checkbox";
				_type = "checkbox";
				_icon = "icon-form-checkbox";
			}
			
			elem +=
				'<div class="list-block no-hairlines no-hairlines-between" style="margin:0">' +
				'<ul style="padding-right:0 !important;">';
			$$.each(options, function (id, el) {
				if (el[3] === 'no-lbl') {
					elem +=
						'<span>'+ el[1] +'</span>' +
						'<span class="mdi mdi-arrow-bottom-left mdi-24px color-deeporange"></span>';
					if (el[2] === 'number')
						input_placeholder = 'عدد وارد کنید';
					else
						input_placeholder = 'تایپ کنید';
				}
				else
					input_placeholder = el[1];
				elem +=
					'<li>' +
						'<label class="'+ _class +' item-content">' +
						'<input class="'+ input_class +'" type="'+ _type + '" name="' + header[3] + '" value="' + el[0] + '" data-type="combined">' +
						'<div class="item-media">' +
						'<i class="icon '+ _icon +'"></i>' +
						'</div>' +
						'<div class="item-inner">';
				
				if (el[2] === 'number') {
					if (el[3] === 'sep1000') {
						var _func = "NumberSeperator('" + header[3] + "',"+ id +")";
						elem +=
								'<input class="input_text_number" type="number" data-type="multi" data-id="' + el[0] + '" name="'+ header[3] +'" onkeyup="'+ _func +'" placeholder="'+ input_placeholder +'" disabled>';
					} else {
						elem +=
								'<input class="input_text_number" type="number" data-type="multi" data-id="' + el[0] + '" name="'+ header[3] +'" placeholder="'+ input_placeholder +'" disabled>';
					}
				} else {
					elem +=
							'<input class="input_text_number" type="text" data-type="multi" data-id="' + el[0] + '" name="'+ header[3] +'" placeholder="'+ input_placeholder +'" disabled>';
				}
				elem +=
						'</div>' +
						'</label>' +
					'</li>';
				if (el[3] === 'sep1000') {
					elem += '<div class="salary"><span></span> </div>';
				}
			});
			elem += '</ul></div>';
			break;
		}
		case 'text': {
			input_class += "input_text_number";
			var input_placeholder = header[2] === 'quiz_text1' ? "اینجا بنویسید..." : header[2];
			elem +=
				'<div class="item-content">' +
					'<div class="item-inner">';
			if (settings && settings.label)
				elem +=
					'<div class="item-title label">'+ header[0] +'</div>';
			elem +=
				'<div class="item-input">';
			
			if (header[2] === 'date')
				elem +=
					'<input class="'+ input_class +'" type="text" name="'+ header[3] +'" value="'+ CurrentDate('date') +'" placeholder="'+ input_placeholder +'">';
			else {
				if (header[5] === 'number') {
					if (header[2] === 'sep1000') {
						input_placeholder = 'مبلغ به تومان';
						var _func = "NumberSeperator('" + header[3] + "')";
						elem +=
								'<input class="'+ input_class +'" type="number" name="'+ header[3] +'"  onkeyup="'+ _func +'" placeholder="'+ input_placeholder +'">' +
								'<div class="salary"><span></span> </div>';
					} else {
						elem +=
								'<input class="' + input_class + '" type="number" name="' + header[3] + '" placeholder="'+ input_placeholder +'">';
					}
				} else if (header[2] === 'read-only') {
					elem +=
							'<input class="' + input_class + '" type="number" name="' + header[3] + '" placeholder="'+ input_placeholder +'" disabled>';
				} else {
					elem +=
							'<input class="'+ input_class +'" type="text" name="'+ header[3] +'" placeholder="'+ input_placeholder +'">';
				}
			}
				
			elem +=
				'</div>' +
				'</div>' +
				'</div>';
			break;
		}
		case 'text_area': {
			input_class += "input_text_number";
			elem +=
				'<div class="item-content">' +
					'<div class="item-inner">' +
					'<div class="item-input">' +
						'<textarea class="'+ input_class +'" name="'+ header[3] +'" placeholder="اینجا بنویسید...">' +
						'</textarea>' +
					'</div>' +
					'</div>' +
				'</div>';
			break;
		}
		case 'picker': {
			input_class += "input_text_number";
			elem +=
					'<div class="item-content">' +
					'<div class="item-inner">';
			if (settings && settings.label)
				elem +=
					'<div class="item-title label">'+ header[0] +'</div>';
			elem +=
				'<div class="item-input">' +
				'<input type="text" class="'+ input_class +'" tmp_name="'+ header[2] +'" name="'+ header[3] +'" placeholder="انتخاب کنید" id="picker_'+ header[2] +'" readonly="">' +
				'</div>' +
				'</div>' +
				'</div>';
			break;
		}
		case 'list': {
			elem +=
				'<div class="item-content">' +
				'<div class="item-inner">' +
				'<div class="item-input" style=background-color: #f0f0f0>';
			
			// elem +=
			// 	header[1]
			// 		? '<select id="list_'+ header[2] +'_'+ header[3] +'">'
			// 		: '<select disabled id="list_'+ header[2] +'_'+ header[3] +'">';
			elem +=
				'<select class="'+ input_class +'" name="'+ header[3] +'" id="list_'+ header[2] +'_'+ header[3] +'">' +
				'<option value="">انتخاب از لیست</option>' +
				'</select>';
			elem +=
				'</div>' +
				'</div>' +
				'</div>';
			break;
		}
	}
	return elem;
}
function CreateSurvey(data, dir) {
	var i, html_slides = "", html_timeline = "", count = 0;
	var slide_no = data.length;
	
	for (i=0; i<slide_no; i++) {
		var part_quiz = data[i].item_desc;
		var part_elem = data[i].item_elem;
		var part_text, part_sub_text1, part_sub_text2='', input_type, slide_head, slide_options, settings;
		count += 1;
		html_timeline += '<a id="'+ count +'">'+ toPersian(count) +'</a>';
		
		if (part_elem.length > 1) {
			settings = {slide: 'mixed'};
			html_slides +=
				'<div class="content-block-inner slide" style="display:none;direction:'+ dir +' background-color:#fafafa;border-bottom:2px solid #f0f0f0;"' +
					'data-no="'+ count +'"' +
					'data-answer="0"' +
					'data-active="1"' +
					'data-type="mixed">' +
					'<div>'+
						'<p style="margin-top:0;font-size:16px">'+ part_quiz +'</p>' +
						'<hr/>' +
					'</div>';
			
			html_slides +=
					'<div class="list-block no-hairlines no-hairlines-between"><ul>';
			$$.each(part_elem, function (id, el) {
				input_type = Object.keys(el)[0];
				slide_head = el[input_type].container;
				slide_options = el[input_type].options;
				
				if (slide_head[4] === 1)
					part_sub_text2 = '<span class="text-background bg-red" style="font-size:14px;"> سوال ضروری (*) </span>';
				else
					part_sub_text2 = '';
				html_slides +=
						'<div class="item-header" style=" margin: 10px auto 0;" data-part-type="'+ input_type +'">'+
							'<span class="text-background bg-lime" style="margin-left:5px;font-size:14px;line-height:25px">'+
							// '<span class="text-background bg-lime" style="display:block;margin-left:5px;font-size:14px;line-height:25px">'+
								slide_head[0] +
							'</span>'+
							part_sub_text2+
						'</div>';
				
				if (input_type === 'text' || input_type === 'picker')
					settings['label'] = false;
				
				if (input_type === "text_area")
					html_slides +=
							'<li class="align-top">' + CreateFormElement(input_type, slide_head, slide_options, settings) + '</li>';
				else
					html_slides +=
							'<li>' + CreateFormElement(input_type, slide_head, slide_options, settings) + '</li>';
			});
			html_slides += '</ul></div>';
			
		}
		else if (part_elem.length === 1) {
			var skipBtn = '';
			settings = {slide: 'single'};
			input_type = Object.keys(part_elem[0])[0];
			slide_head = part_elem[0][input_type].container;
			slide_options = part_elem[0][input_type].options;
			
			if (slide_head[4] === 1) {
				part_sub_text2 = '<span class="text-background bg-red"> سوال ضروری (*) </span>';
			} else {
				part_sub_text2 = '';
				skipBtn = '<a href="javascript:ChangeSlide(null, \'skip\', true)" class="button button-fill color-deeporange" style="color: #000">عدم پاسخگویی</a>'
			}
			
			if (part_quiz) {
				part_sub_text1 =
						'<span class="text-background bg-lime" style="display:block;margin-left:5px;font-size:14px;line-height:25px">'+ slide_head[0] +'</span>';
				part_text =
					'<p style="margin-top:0;font-size:14px">'+ part_quiz +'</p>' +
					'<div style="display: flex; justify-content: flex-end; margin: 12px 0">' + skipBtn + '</div>' +
					'<hr/>' +
					'<p style="font-size:13px;width: fit-content">'+ part_sub_text1 + part_sub_text2 +'</p>';
			} else {
				part_text =
						'<p style="margin-top:0;font-size:14px">'+ slide_head[0] +'</p>' +
						'<div style="display: flex; justify-content: flex-end; margin: 12px 0">' + skipBtn + '</div>' +
						'<p style="font-size:13px">'+ part_sub_text2 +'</p>';
			}
			
			html_slides +=
					'<div class="content-block-inner slide" style="display:none;direction:'+ dir +'background-color:#fafafa;border-bottom:2px solid #f0f0f0;"' +
						'data-no="'+ count +'"' +
						'data-answer="0"' +
						'data-active="1"' +
						'data-type="'+ input_type +'">' +
					'<div>' + part_text + '</div>';
			
			if (input_type === "text_area")
				html_slides +=
						'<div class="list-block no-hairlines no-hairlines-between">' +
						' <ul>' +
						'<li class="align-top">' + CreateFormElement(input_type, slide_head, slide_options, settings) + '</li>' +
						'</ul>' +
						'</div>';
			else
				html_slides += CreateFormElement(input_type, slide_head, slide_options, settings);
		}
		html_slides += '</div>';
	}
	
	html_slides = '<form id="survey_form">'+ html_slides +'</form>';
	return {timeline:html_timeline, slides:html_slides}
}
function GetData() {
	var results = {}, form_part = [];
	
	var form_elem = Array.prototype.slice.call(document.getElementById('survey_form').elements);
	$$.each(form_elem, function (id,el) {
		if (el.dataset.type === "combined")
			return true;
		var el_key = el.getAttribute('name');
		form_part.push([el_key, el]);
	});
	var form = Group2DArray(form_part, 0);
	$$.each(form, function (_id, _el) {
		// if (!_id || _id === '0.00') {
		// 	return true;
		// }
		var _key = _id;
		var _part = _el;
		
		var first_elem = _el[0];
		var first_tag = first_elem.tagName.toLowerCase();
		var first_type;
		if (first_tag === 'input') {
			first_type = first_elem.getAttribute('type');
			if (first_type === 'text'|| first_type === 'number'|| first_type === 'email'|| first_type === 'password' || first_type === 'radio') {
				if (first_elem.dataset.type === 'multi') {
					results[_key] = {};
					for (var i=0; i<_part.length; i++) {
						results[_key][_part[i].dataset.id] = "";
					}
				} else {
					results[_key] = '';
				}
			} else {
				results[_key] = [];
			}
		} else {
			if (first_tag === 'textarea' || first_tag === 'select') {
				results[_key] = '';
			}
		}
		
		if (first_elem.closest('div.slide').dataset.active === '0')
			return true;
		
		$$.each(_part, function (_id1, _el1) {
			// var _value;
			// if (_part[0].tagName.toLowerCase() === 'select') {
			// 	_value = _part[0].value;
			// }
			
			var _tag =  _el1.tagName.toLowerCase();
			var _type;
			if (_tag === 'input') {
				_type = _el1.getAttribute('type');
			} else if (_tag === 'textarea') {
				_type = 'text_area';
			} else if (_tag === 'select') {
				_type = 'select'
			}
			
			var _value;
			switch (_type) {
				case 'text':
				case 'number':
				case 'text_area': {
					_value = _el1.value;
					if ((_type === 'text' || _type === 'number') && _el1.dataset.type === 'multi') {
						results[_key][_el1.dataset.id] = _value;
					} else {
						if (Array.isArray(results[_key])) {
							if (_value) {
								if ($$(_el1.closest('li')).find('input[type=checkbox]').length)
									_value += '**';
								results[_key].push(_value);
							}
						} else {
							if (!results[_key]) {
								if (_value) {
									if ($$(_el1.closest('li')).find('input[type=radio]').length)
										_value += '**';
									results[_key] = _value
								} else {
									results[_key] = _value ? _value : "";
								}
							}
							
						}
						// if (_el1.dataset.type === 'age') {
						// 	if (_value <= 15) {
						// 		return false;
						// 	}
						// }
					}
					break;
				}
				case 'radio': {
					if (_el1.checked) {
						_value = _el1.value;
						results[_key] = _value ? _value : ""
					}
					break;
				}
				case 'checkbox': {
					if (_el1.checked) {
						_value = _el1.value;
						if (_value)
							results[_key].push(_value);
					}
					break;
				}
				case 'select': {
					_value = _el1.value;
					results[_key] = _value ? _value : "";
					break
				}
			}
			
		});
	});
	
	// handle skipped questions
	var skipped = AppSettings('skipped');
	$$.each(Object.keys(results), function (id, el) {
		if (skipped.includes(el)) {
			if (!results[el])
				results[el] = '99'
		}
	});
	return results;
}

function SendData(survey, id) {
	var uc = AppSettings('uc');
	var pc = AppSettings('pc');
	if (!uc && !pc) {
		Login();
		return;
	}
	
	var _request = {
		_method: 'post',
		_url: getAddress('upload'),
		_data: {
			action: actions.UPLOAD_DATA,
			data: JSON.stringify({
				user: uc,
				pass: pc,
				v: AppSettings('version'),
				survey: survey[id]
			})
		}
	};
	
	SendRequest(_request, function(res1) {
		if (!res1.err) {
			var res = JSON.parse(res1.data);
			var uploadedSurvey = res.data;
			if (uploadedSurvey) {
				UpdateSurvey('upload', {id:uploadedSurvey}, function (res) {
					if (res.err === 0) {
						id += 1;
						if (id >= survey.length) {
							Spinner2(false);
							CreateRecoveryFile(function (res0) {
								console.log(res0.msg);
							});
							onUploadSuccess();
							return false;
						}
						SendData(survey, id);
					} else if (res.err === 1) {
						console.log(res.msg);
						Spinner2(false);
						onUploadFailed();
						console.log('Updating Surveys | Error in Client : ' + res.msg);
						return false;
					}
				})
			} else {
				var link = res.link;
				if (link) {
					Spinner2(false);
					onVersionFailed(res.msg, {link:link});
					return false;
				} else {
					console.log('Survey already has been inserted.');
					return true;
				}
			}
		} else {
			Spinner2(false);
			var tmpCode = res1.code;
			if (tmpCode === 1) {
				// isLoggedIn function return false
				onLoginFailed();
			} else if (tmpCode) {
				// isLoggedIn function error | server error
				// connect to database error | server error
				// running query error | server error > check if survey is existed!
				// running query error | server error > survey insertion
				onUploadFailed();
			}
		}
	});
}
function UploadData() {
	var uc = AppSettings('uc');
	var pc = AppSettings('pc');
	if (!uc && !pc) {
		Login();
		return;
	}
	
	var surveys = [];
	PrintTable('surveys_response', function(res) {
		if (res.err === 0) {
			
			Spinner2(true, 'upload-data');
			var rows = res.tb_res;
			$$.each(rows, function (id,row) {
				var isUploaded = row['upload'];
				if (isUploaded) return true;
				surveys.push({
					sid: row['sid'],
					fid: row['fid'],
					fname: row['fname'],
					pid: row['pid'],
					pname: row['pname'],
					geo_x: row['geo_x'],
					geo_y: row['geo_y'],
					date: row['date'],
					time_s: row['time_start'],
					time_e: row['time_end'] ? row['time_end'] : '00:00:00',
					completion: row['completion'],
					uploaded: isUploaded,
					slide: row['slide'],
					form_data: row['data']
				})
			});
			
			var count = 0;
			if (!surveys.length) {
				Spinner2(false);
				onUploadSuccess();
				return;
			}
			SendData(surveys, count);
		}
		else if (res.err === 1) {
			console.log('Failed in getting surveys: ' + res.msg);
		}
	});
}
function onUploadSuccess() {
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-checkbox-marked-circle color-green"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">'+ messages.app.upload_end.success +'</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: []
	});
	setTimeout(function () {
		surveyApp.closeModal();
	}, 3000);
}
function onUploadFailed() {
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-close-circle color-red"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">'+ messages.app.upload_end.failed +'</p>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: []
	});
	setTimeout(function () {
		surveyApp.closeModal();
	}, 3000);
}

function CreateRecoveryFile(callback) {
	var backDir = AppSettings('root') + 'backup/';
	var backName = 'recovery.txt';
	var content = '';
	PrintTable('surveys_response', function (res) {
		if (!res.err) {
			var dbSurveys = res.tb_res;
			if (!dbSurveys.length) {
				callback({err: 0, file: null, msg: "DB is empty. The recovery file cannot be created."})
			} else {
				FileExists(backDir, backName, function (res) {
					var recoveryFile = res.file;
					if (recoveryFile) {
						recoveryFile.remove(function (removedFile) {
							window.resolveLocalFileSystemURL(backDir, function(dir) {
								dir.getFile(backName, {create: true}, function (fileEntry) {
									dbSurveys.forEach(function (item, id) {
										content += JSON.stringify(item);
										if (id !== dbSurveys.length - 1)
											content += '.+.+.newLine.+.+.';
									});
									WriteFile(fileEntry, content);
									callback({err: 0, file: fileEntry, msg: "Recovery file has been created."})
								})
							})
						})
					} else {
						window.resolveLocalFileSystemURL(backDir, function(dir) {
							dir.getFile(backName, {create: true}, function (fileEntry) {
								dbSurveys.forEach(function (item, id) {
									content += JSON.stringify(item);
									if (id !== dbSurveys.length - 1)
										content += '.+.+.newLine.+.+.';
								});
								WriteFile(fileEntry, content);
								callback({err: 0, file: fileEntry, msg: "Recovery file has been created."})
							})
						})
					}
				})
			}
		}
	});
}
function OpenRecoveryFile(callback) {
	var recoveryFileDir = AppSettings('root') + 'backup/recovery.txt';
	window.resolveLocalFileSystemURL(recoveryFileDir, function(e) {
		e.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback({file: this.result})
			};
			reader.readAsText(file);
		})
	}, function (e) {
		console.log("FileSystem Error | " + e);
		callback({file:{}})
	});
}
function RestoreDatabase() {
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-database color-bluegray"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' + messages.app.title + '</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">'+ messages.data.backup[0] + "</br>" + messages.data.backup[1] + '</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: [{
			text: "انصراف",
			onClick: function() {}
		}, {
			text: "بازیابی",
			onClick: function() {
				var backDir = AppSettings('root') + 'backup/';
				var backName = 'recovery.txt';
				FileExists(backDir, backName, function (res) {
					var recoveryFile = res.file;
					if (recoveryFile) {
						PrintTable('surveys_response', function(res) {
							if (!res.err) {
								Spinner2(true,'restore-data');
								var sids = [];
								var rows = res.tb_res;
								rows.forEach(function (row) { sids.push(row['sid']) });
								OpenRecoveryFile(function (e) {
									var file = e.file;
									var surveys = file.split(".+.+.newLine.+.+.");
									surveys.forEach(function (item, id) {
										var survey = JSON.parse(item);
										var surveyId = survey['sid'];
										if (!sids.includes(surveyId)) {
											InsertSurvey(survey, function(res) {
												if (res.err === 0) {
													console.log('Item ' + surveyId + ' was recovered successfully.');
												} else if (res.err === 1) {
													console.log('Error in Backing up.');
												}
											});
											if (id === surveys.length - 1) {
												console.log('Backing up was finished successfully.');
											}
										}
										if (id === surveys.length - 1) {
											Spinner2(false);
										}
									});
								});
							}
						});
					}
					else {
						Spinner2(false);
						setTimeout(function() {
							surveyApp.modal({
								title: '',
								text:
										'<div style="text-align:center">' +
										'<div class="row no-gutter">' +
										'<div>' +
										'<span class="mdi mdi-36px mdi-alert-octagram color-orange"></span>' +
										'</div>' +
										'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
										messages.app.title +
										'</div>' +
										'</div>' +
										'<div class="row no-gutter">' +
										'<div class="col-20"></div>' +
										'<div class="col-80">' +
										'<p style="text-align:right;font-size:16px;">'+ messages.data.backupError +'</p>' +
										'</div>' +
										'</div>' +
										'</div>',
								buttons: [{
									text: "بستن",
									onClick: function() {}
								}]
							});
							$$('.modal-buttons.modal-buttons-1 span').css({'background-color':'#f0f0f0','font-weight':'normal'});
							$$('.modal-buttons.modal-buttons-1 span').css({'color':'#444'});
						}, 300);
					}
				});
			}
		}]
	});
	$$('.modal-buttons.modal-buttons-2 span').css({'background-color':'#f0f0f0'});
	$$('.modal-buttons.modal-buttons-2 span').css({'font-weight':'normal'});
	$$('.modal-buttons.modal-buttons-2 span:nth-child(2)').css({'color':'#f44336'});
}
function FileExists(path, name, callback) {
	window.resolveLocalFileSystemURL(path, function(dir) {
		dir.getFile(name, { create: false }, function(fileEntry) {
			callback({file: fileEntry})
		}, function () {
			callback({file: null})
		});
	});
}
function WriteFile(fileEntry, fileContent) {
	fileEntry.createWriter(function (fileWriter) {
		fileWriter.seek(fileWriter.length);
		var blob = new Blob([fileContent], {
			type: 'text/plain'
		});
		fileWriter.onwriteend = function() {
			console.log("File was written successfully.");
		};
		fileWriter.onerror = function (e) {
			console.log("Failed file write: " + e.toString());
		};
		fileWriter.write(blob);
	});
}

function recoverDatabase() {
	console.log("Recovering database ...")
}
function onExportSuccess() {

}
function EditForm(id) {
	GetSurvey(id, function(res) {
		if (res.err === 0) {
			var sid = res.tb_res.sid;
			var slide = res.tb_res.slide;
			var data = res.tb_res.data;
			var option = {sid:sid, slide:slide, data:JSON.stringify(data)};
			NavigateTo('app_surveyForm', 'edit', option);
		} else if (res.err === 1) {
			console.log(res.msg);
		}
	});
}
function ValidateData() {}
function SaveForm(options) {
	var current_slide = $$(CurrentSlide()['slide']);
	var current_slide_no = CurrentSlide()['slide-no'];
	var slide_type = current_slide[0].dataset.type;
	var input;
	var valid = true, validType;
	switch (slide_type) {
		case 'mixed': {
			$$.each($$('.slide:nth-child('+ current_slide_no +') div.item-header'), function (id,el) {
				if (!valid)
					return false;
				var part_type = el.dataset.partType;
				var input_container = $$(el).next();
				switch (part_type) {
					case 'picker':
					case 'text': {
						input = input_container.find('input[type=number],input[type=text]')[0];
						if (!CheckRule(input.name, input.value)) {
							valid = false;
							validType = 'content';
						}
						if (input.classList[0].indexOf("necessary") >= 0 && !input.value)
							valid = false;
						break;
					}
					case 'text_area': {
						//
						break;
					}
					case 'radio':
					case 'check': {
						if (current_slide.find('input')[0].classList[0].indexOf("necessary") >= 0) {
							if (!current_slide.find('input:checked').length) {
								valid = false;
							}
						}
						break;
					}
					case 'list': {
						if (input_container.find('select')[0].classList[0] ) {
							if (input_container.find('select')[0].classList[0].indexOf("necessary") >= 0) {
								if (!input_container.find('select')[0].value) {
									valid = false;
								}
							}
						}
						
					}
				}
			});
			break;
		}
	}
	// if first slide was mixed, ignore it.
	if (CurrentSlide().slide.dataset.no != 1) {
		if (!valid) {
			if (!validType)
				DisplayNotificationMessage(0,'<span style="font-size:12px">' + messages.app.slide.necessary + '</span>');
			return;
		}
	}
	
	var sql = options['sql'];
	var type = options['type'];
	var msg = options['msg'];
	if (sql === 'update' && msg !== 'off') {
		surveyApp.modal({
			title: '',
			text:
					'<div style="text-align:center">' +
					'<div class="row no-gutter">' +
					'<div>' +
					'<span class="mdi mdi-36px mdi-loading mdi-spin color-bluegray"></span>' +
					'</div>' +
					'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
					messages.app.title +
					'</div>' +
					'</div>' +
					'<div class="row no-gutter">' +
					'<div class="col-20"></div>' +
					'<div class="col-80">' +
					'<p style="text-align:right;font-size:16px;">'+
					messages.form.store.during[0] + "</br>" + messages.form.store.during[1] +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
			buttons: []
		});
	}

	if (sql === 'update') {
		UpdateSurvey(type, null, function(res) {
			if (res.err === 0) {
				CreateRecoveryFile(function (res1) {
					console.log(res1.msg);
					onSaveSuccess(options);
				});
			} else if (res.err === 1) {
				onSaveFailed(options);
			}
		});
	} else if (sql === 'insert') {
		InsertSurvey(null, function(res) {
			if (res.err === 0) {
				onSaveSuccess(null);
				AppSettings('sid', res.sid);
			} else if (res.err === 1) {
				onSaveFailed(null);
			}
		});
	}
}
function FillForm(data) {
	// data = JSON.parse(JSON.parse(data));
	
	
	data = JSON.parse('{"1.00":[],"2.00":"","3.00":"","4.00":[],"5.00":[],"6.00":"","7.00":"","8.00":"","9.00":"","10.00":"","11.00":"","12.00":"","13.00":"","14.00":"","15.00":"","16.00":"","17.00":"","18.00":"","19.00":"","20.00":"","21.00":"","22.00":"","23.00":"","24.00":"","25.00":"","26.00":"","27.00":"","28.00":"","29.00":"","30.00":"","31.00":"","32.00":"","33.00":"","34.00":"","35.00":"","36.00":"","37.00":"","38.00":"","39.00":"","40.00":"","41.00":"","42.00":"","43.00":"","44.00":"","45.00":"","46.00":"","47.00":"","48.00":"","49.00":"","50.00":"","51.00":"بوشهر","52.00":"دشتستان","53.00":"","54.00":"","55.00":"","56.00":"","57.00":"","58.00":""}');
	var form_part = [];
	var form_elem = Array.prototype.slice.call(document.getElementById('survey_form').elements);
	$$.each(form_elem, function (id,el) {
		if (el.dataset.type === "combined")
			return true;
		var el_key = el.getAttribute('name');
		form_part.push([el_key, el]);
	});
	var form = Group2DArray(form_part, 0);
	
	$$.each(form, function (_id, _el) {
		if (!_id) {
			return true;
		}
		
		var _key = _id;
		var _part = _el;
		var _dat = data[_key];
		if (!_dat || !_dat.length)
			return true;
		
		var input;
		
		if (_el[0].id && _el[0].id.indexOf('picker') >= 0) {
			var picker_name = _el[0].id;
			CreatePicker(picker_name, data);
		}
		
		
		if (Array.isArray(_dat)) {
			$$.each(_dat, function (id1, el1) {
				if (el1.indexOf('**') >= 0) {
					input = _part[_part.length-1];
					input.value = el1.substring(0,el1.length-2);
					$$(input.closest('li')).find('input[type=checkbox]')[0].checked = true;
				} else {
					input = _part[el1-1];
					input.checked = true;
					console.log('checked!');
				}
			})
		} else {
			if (_dat.indexOf('**') >= 0) {
				input = _part[_part.length-1];
				input.value = _dat.substring(0,_dat.length-2);
				$$(input.closest('li')).find('input[type=radio]')[0].checked = true;
			} else {
				input = _part[0];
				if (input.type === 'text' || input.type === 'textarea') {
					input.value = _dat;
				} else if (input.type === 'radio') {
					input = _part[_dat-1];
					input.checked = true;
					console.log('checked!');
				}
			}
			
		}
	});
}

// function ResetForm() {
// 	$$.each($$('#form_body input:checked'), function (id, el) {
// 		el.checked = false;
// 	});
//
// 	var first_slide = $$('#form_body .slide:first-child');
// 	var first_slide_no = first_slide.attr('data-no');
// 	ChangeSlide(first_slide_no, null, false);
//
// 	// remove history from db
// 	// remove history from interface
//
// 	surveyApp.modal({
// 		title: '',
// 		text: '<div style="text-align:center">' +
// 		'<span class="mdi mdi-check-circle-outline color-green mdi-36px"></span>' +
// 		'<p style="font-size:13px;margin:10px 0 0">' +
// 			messages.form.reset.after[0] + "</br>" + messages.form.reset.after[1] +
// 		'</p>' +
// 		'</div>',
// 		buttons: [{text: 'بستن'}]
// 	});
// 	$$('.modal-buttons.modal-buttons-1 span').css({color: '#444', 'background-color': '#f0f0f0'});
// }
function ExitForm() {
	var valid = false, data = GetData();
	$$.each(Object.keys(data), function (id,el) {
		var data_part = data[el];
		if (Array.isArray(data_part)) {
			if (data_part.length) {
				valid = true;
				return false;
			}
		} else {
			if (data_part) {
				valid = true;
				return false;
			}
		}
	});
	
	if (!valid) {
		var sid = AppSettings('sid');
		DeleteSurvey(sid, function(res) {
			if (res.err === 0)
				mainView.back({'url':'app_main.html'});
			else if (res.err === 1) {
				console.log(res.msg);
				return false;
			}
		});
		return;
	}
	
	FormChanged(function (res) {
		if (res) {
			surveyApp.modal({
				title: '',
				text:
						'<div style="text-align:center">' +
						'<div class="row no-gutter">' +
						'<div>' +
						'<span class="mdi mdi-36px mdi-alert-octagram color-orange"></span>' +
						'</div>' +
						'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
						messages.app.title +
						'</div>' +
						'</div>' +
						'<div class="row no-gutter">' +
						'<div class="col-20"></div>' +
						'<div class="col-80">' +
						'<p style="text-align:right;font-size:16px;">'+
						messages.form.exit[0] + "</br>" + messages.form.exit[1] +
						'</p>' +
						'</div>' +
						'</div>' +
						'</div>',
				buttons: [{
					text: "انصراف",
					onClick: function() {}
					}, {
						text: "خروج",
						onClick: function() {
							VoiceStop();
							mainView.loadPage("app_main.html");
						}
					}]
			});
			$$('.modal-buttons.modal-buttons-2 span').css({'background-color':'#f0f0f0'});
			$$('.modal-buttons.modal-buttons-2 span').css({'font-weight':'normal'});
			$$('.modal-buttons.modal-buttons-2 span:nth-child(2)').css({'color':'#f44336'});
			$$('.modal-buttons.modal-buttons-2 span:nth-child(1)').css({'color':'#4caf50'});
		} else if (!res) {
			VoiceStop();
			mainView.back({'url':'app_main.html'});
		}
	});
}
function CurrentSlide() {
	var slide = null;
	var slide_id = null;
	var slides = $$('#form_body .slide');
	$$.each(slides, function (id,el) {
		if (el.style.display !== 'none') {
			slide = el;
			slide_id = $$(el).attr('data-no');
			return true;
		}
	});
	return {'slide': slide, 'slide-no': slide_id};
}
function ChangeSlide(target, dir, validation) {
	var current_slide = $$(CurrentSlide()['slide']);
	var first_slide = $$('#form_body .slide:first-child');
	var last_slide = $$('#form_body .slide:last-child');
	
	if (dir === 'prev')
		validation = false;
	
	var slide_type = current_slide[0].dataset.type;
	if (validation) {
		var input, q_id, q_data;
		var valid = true;
		var valid_mix = true;
		var child_input;
		switch (slide_type) {
			case 'text': {
				input = current_slide.find('input[type=number],input[type=text]')[0];
				q_id = input.name;
				q_data = input.value;
				if (input.classList[0].indexOf("necessary") >= 0 && !input.value)
					valid = false;
				if (valid) {
					if (!CheckRule(q_id, q_data))
						return;
				}
				break;
			}
			case 'text_area': {
				input = current_slide.find('textarea')[0];
				if (input.classList[0].indexOf("necessary") >= 0 && !input.value)
					valid = false;
				break;
			}
			case 'check':
			case 'radio':{
				if (slide_type === 'check') {
					q_id = $$(CurrentSlide('slide').slide).find('input[type=checkbox]')[0].name;
				} else if (slide_type === 'radio') {
					q_id = $$(CurrentSlide('slide').slide).find('input[type=radio]')[0].name;
				}
				input = current_slide.find('input:checked');
				if (!input.length) {
					q_data = null;
					if (current_slide.find('input')[0].classList[0].indexOf("necessary") >= 0) {
						valid = false;
					}
				} else {
					if (slide_type === 'check') {
						q_data = [];
						$$.each(input, function (id,el) {
							if (el.value)
								q_data.push(el.value);
						})
					} else if (slide_type === 'radio') {
						if (input.val())
							q_data = input.val();
					}
				}
				if (valid)
					CheckRule(q_id, q_data);
				break;
			}
			case 'check_text':
			case 'radio_text':{
				if (slide_type === 'check_text') {
					q_id = $$(CurrentSlide('slide').slide).find('input[type=checkbox]')[0].name;
				} else if (slide_type === 'radio_text') {
					q_id = $$(CurrentSlide('slide').slide).find('input[type=radio]')[0].name;
				}
				
				input = current_slide.find('input:checked');
				if (!input.length) {
					q_data = null;
				} else {
					if (slide_type === 'check_text') {
						q_data = [];
						$$.each(input, function (id,el) {
							child_input = $$(el).closest('li').find('input[type=number],input[type=text], input[type=number]');
							if (child_input.length) {
								if (child_input.val())
									q_data.push(child_input.val());
							} else {
								if (el.value)
									q_data.push(el.value);
							}
						})
					} else if (slide_type === 'radio_text') {
						q_data = "";
						child_input = input.closest('li').find('input[type=number],input[type=text]');
						if (child_input.length) {
							if (child_input.val())
								q_data = child_input.val();
						} else {
							if (input.val())
								q_data = input.val();
						}
					}
					if (Array.isArray(q_data) && !q_data.length)
						q_data = null;
				}
				if (current_slide.find('input')[0].classList[0].indexOf("necessary") >= 0 && !q_data) {
					valid = false;
				}
				else {
					CheckRule(q_id, q_data);
				}
				break;
			}
			case 'check_text_multi':
			case 'radio_text_multi': {
				if (slide_type === 'check_text_multi') {
					input = current_slide.find('input[type=checkbox]');
				} else if (slide_type === 'radio_text_multi') {
					input = current_slide.find('input[type=radio]');
				}
				q_id = input[0].name;
				var multi = $$(CurrentSlide('slide').slide).find('.list-block li');
				var multi_data = [];
				$$.each(multi, function(id,el) {
					multi_data.push($$(el).find('input[type=number],input[type=text]').val());
				});
				if (input[0].classList[0].indexOf("necessary") >= 0 && !multi_data.join("")) {
					valid = false;
				} else {
					if (!CheckRule(q_id, multi_data))
						return;
				}
				break;
			}
			case 'mixed': {
				var mixed_parts = current_slide.find('.item-header');
				$$.each(mixed_parts, function (id,el) {
					if (valid_mix == false)
						return false;
					var part_type = el.dataset.partType;
					var input_container = $$(el).next();
					switch (part_type) {
						case 'text': {
							input = input_container.find('input[type=number],input[type=text]')[0];
							q_id = input.name;
							q_data = input.value;
							if (input.classList[0].indexOf("necessary") >= 0 && !input.value)
								valid = false;
							if (valid) {
								if (!CheckRule(q_id, q_data))
									valid_mix = false;
							}
							break;
						}
						case 'radio':
						case 'check': {
							if (current_slide.find('input')[0].classList[0].indexOf("necessary") >= 0) {
								if (!current_slide.find('input:checked').length) {
									valid = false;
								}
							}
							break;
						}
						case 'check_text':
						case 'radio_text':{
							if (part_type === 'check_text') {
								q_id = $$(CurrentSlide('slide').slide).find('input[type=checkbox]')[0].name;
							} else if (part_type === 'radio_text') {
								q_id = $$(CurrentSlide('slide').slide).find('input[type=radio]')[0].name;
							}
							
							input = current_slide.find('input:checked');
							if (!input.length) {
								q_data = null;
							} else {
								if (part_type === 'check_text') {
									q_data = [];
									$$.each(input, function (id,el) {
										child_input = $$(el).closest('li').find('input[type=number],input[type=text], input[type=number]');
										if (child_input.length) {
											if (child_input.val())
												q_data.push(child_input.val());
										} else {
											if (el.value)
												q_data.push(el.value);
										}
									})
								} else if (part_type === 'radio_text') {
									q_data = "";
									child_input = input.closest('li').find('input[type=number],input[type=text]');
									if (child_input.length) {
										if (child_input.val())
											q_data = child_input.val();
									} else {
										if (input.val())
											q_data = input.val();
									}
								}
								if (Array.isArray(q_data) && !q_data.length)
									q_data = null;
							}
							if (current_slide.find('input')[0].classList[0].indexOf("necessary") >= 0 && !q_data) {
								valid = false;
							}
							else {
								if (!CheckRule(q_id, q_data))
									valid_mix = false;
							}
							break;
						}
					}
				});
				if (valid_mix === false)
						return;
				break;
			}
		}
		if (dir === 'skip') {
			// valid = true;
			var skipped = AppSettings('skipped');
			if (!skipped.includes(q_id)) {
				skipped.push(q_id);
				AppSettings('skipped', skipped);
			}
		}
		if (!valid) {
			DisplayNotificationMessage(0,'<span style="font-size:12px">' + messages.app.slide.necessary + '</span>');
			return;
		}
	}
	
	if (!target) {
		var next_slide;
		if (dir === 'next' || dir === 'skip') {
			next_slide = current_slide.next();
			while (next_slide[0].dataset.active === '0') {
				next_slide = next_slide.next();
			}
		} else if (dir === 'prev') {
			if (current_slide[0] !== first_slide[0]) {
				next_slide = current_slide.prev();
				while (next_slide[0].dataset.active === '0') {
					next_slide = next_slide.prev();
				}
			}
			
		}
		if(next_slide) {
			current_slide.hide();
			next_slide.show();
		}
		var tmp_target = CurrentSlide()['slide-no'];
		$$('#form_timeline a').removeClass('active');
		$$('#form_timeline a[id="'+ tmp_target +'"]').addClass('active');
	} else {
		current_slide.hide();
		$$('#form_body .slide[data-no="'+ target +'"]').show();
		$$('#form_timeline a').removeClass('active');
		$$('#form_timeline a[id="'+ target +'"]').addClass('active');
	}
	var active_index = $$('.timeline a.active');
	var active_index_off = active_index.offset().left;
	var active_index_tmp = active_index[0].clientWidth/4;
	var ts = $$('.timeline')[0].scrollLeft;
	if (active_index_off < active_index_tmp)
		$$('.timeline')[0].scrollLeft = ts + active_index_off - (active_index_tmp);
	else if (active_index_off > ($$(window).width() - active_index_tmp))
		$$('.timeline')[0].scrollLeft = ts + active_index_off + (active_index_tmp*4) - $$(window).width();
	
	var prev_btn = $$('#form_control .buttons-row a:nth-child(1)');
	var next_btn = $$('#form_control .buttons-row a:nth-child(2)');
	var save_btn = $$('#form_control .buttons-row a:nth-child(3)');
	if ($$(CurrentSlide()['slide'])[0] === last_slide[0]) {
		next_btn.hide();
		save_btn.show();
	} else {
		next_btn.show();
		save_btn.hide();
	}
}
function CheckRule(id, data) {
	var valid = true;
	var map = survey_form[AppSettings('fid')].map;
	if (Object.keys(map).indexOf(id) >= 0) {
		var rule = map[id];
		$$.each(rule, function (i,r) {
			if (r.r) {
				var tmp, tmp_data, _constraint, _order;
				if (r.r === "<=") {
					tmp_data = GetData()[r.t];
					if (data > tmp_data) {
						DisplayErrorMessage(null, r.msg.replace("%n%", parseInt(r.t)));
						valid = false;
					}
				}
				else if (r.r === ">=") {
					tmp_data = GetData()[r.t];
					if (data < tmp_data) {
						DisplayErrorMessage(null, r.msg.replace("%n%", parseInt(r.t)));
						valid = false;
					}
				}
				else if (r.r === "content-validation") {
					_constraint = r.constraint;
					_order = r.order;
					if (_constraint.indexOf('~') >= 0) {
						var interval = _constraint.split('~').map(function(item) {
							return parseInt(item, 10);
						});
						var input_data = _order ? parseInt(toEnglish(data[_order-1])) : parseInt(toEnglish(data));
						if (!interval[1]) {
							if (input_data < interval[0]) {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						} else if (input_data < interval[0] || input_data > interval[1]) {
							if (r.msg.indexOf('digit') >= 0) {
								tmp = r.msg;
								tmp = tmp.replace('digit', interval[1]);
								DisplayErrorMessage(null, tmp);
							} else {
								DisplayErrorMessage(null, r.msg);
							}
							valid = false;
						}
					} else if (_constraint.indexOf('mobile-phone') >= 0) {
						if (data) {
							if (data.length !== 11 || data.substring(0,2) !== '09') {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						}
					} else if (_constraint.indexOf('constant-phone') >= 0) {
						if (data) {
							if (data.length !== 11 || data.substring(0,1) !== '0') {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						}
					} else if (_constraint.indexOf('phone') >= 0) {
						if (data) {
							if (data.length !== 11 || data.substring(0,1) !== '0') {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						}
					} else if (_constraint.indexOf('postal_code') >= 0) {
						if (data) {
							if (!isValidPostalCode(data)) {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						}
					} else if (_constraint.indexOf('national_id') >= 0) {
						if (data) {
							if (!isValidIranianNationalCode(data)) {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						}
					} else if (_constraint.indexOf('%') >= 0) {
						if (data) {
							var cons = _constraint.split('%');
							cons.pop();
							if (!cons.includes(data.substring(0,2)) || data.length !== 4) {
								DisplayErrorMessage(null, r.msg);
								valid = false;
							}
						}
					} else if (_constraint.indexOf('==') >= 0) {
						var point = _constraint.split('==')[1];
						if (_order === 'end') {
							var input_data = toEnglish(data[data.length-1]);
						} else {
							var input_data = _order ? toEnglish(data[_order-1]) : toEnglish(data);
						}
						if (input_data && point !== input_data) {
							DisplayErrorMessage(null, r.msg);
							valid = false;
						}
					} else if (_constraint.indexOf('related') >= 0) {
						var target, target_data;
						if (_constraint.indexOf('>=') >= 0) {
							target = _constraint.split('>=')[1];
							if (data) {
								data = parseInt(data);
								target_data = parseInt(GetData()[target]);
								if (data < target_data) {
									DisplayErrorMessage(null, r.msg);
									valid = false;
								}
							}
						} else if (_constraint.indexOf('>') >= 0) {
							target = _constraint.split('>')[1];
							if (data) {
								data = parseInt(data);
								target_data = parseInt(GetData()[target]);
								if (data <= target_data) {
									DisplayErrorMessage(null, r.msg);
									valid = false;
								}
							}
						}
					}
				}
				else if (r.r === 'limitation') {
					_constraint = r.constraint;
					input_data = parseInt(toEnglish(data));
					if (_constraint.indexOf('length') >= 0) {
						var validLength;
						if (_constraint.indexOf('=') >= 0) {
							validLength = parseInt(_constraint.split('length=')[1]);
							tmp = 0;
							if (ArrayHasDuplicates(data).length == 0) {
								data.forEach(function (item) {
									if (item) {
										var intItem = parseInt(toEnglish(item));
										tmp += 1;
										if (tmp > validLength) {
											DisplayErrorMessage(null, r.msg);
											valid = false;
											return false;
										}
										if (intItem == 0 || intItem > validLength) {
											DisplayErrorMessage(null, 'برای الویت بندی تنها مجاز به استفاده از اعداد 1 تا ' + validLength + ' هستید.');
											valid = false;
											return false;
										}
									}
								});
							} else {
								DisplayErrorMessage(null, 'در سوالات الویت بندی، هر گزینه یک الویت دارد و دو گزینه با الویت یکسان وجود ندارد.');
								valid = false;
								return false;
							}
						}
					}
				}
				else if (r.r === 'related-to') {
					_constraint = r.constraint;
					var relatedId, relatedAnswer;
					input_data = parseInt(toEnglish(data));
					if (_constraint.indexOf('answer') >= 0) {
						relatedId = _constraint.split('<=')[1];
						relatedAnswer = parseInt(toEnglish(GetData()[relatedId]));
						if (input_data > relatedAnswer) {
							DisplayErrorMessage(null, r.msg);
							valid = false;
						}
					}
				}
				else if (r.r === 'hide-items') {
					_constraint = r.constraint;
					input_data = parseInt(toEnglish(data));
					
					if (_constraint === input_data) {
						$$.each(r.hide, function (id, el) {
							$$("select[id*='"+el+"']").closest('li').hide();
							$$("select[id*='"+el+"']").closest('li').prev('div').hide();
							$$("input[name='"+el+"']").closest('li').hide();
							$$("input[name='"+el+"']").closest('li').prev('div').hide();
						});
						$$.each(r.show, function (id, el) {
							$$("select[id*='"+el+"']").closest('li').show();
							$$("select[id*='"+el+"']").closest('li').prev('div').show();
							$$("input[name='"+el+"']").closest('li').show();
							$$("input[name='"+el+"']").closest('li').prev('div').show();
						});
					}
				}
				return valid;
			}
			else {
				var slide_record = AppSettings('slides');
				var rule_a = r.a;
				if (rule_a === "><") {
					if (!data) {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						} else if (!slide_record[id]) {
							slide_record[id] = [[],[]];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						}
					} else {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
						}
					}
				}
				else if (rule_a.indexOf("!") >= 0) {
					var rule_data = (rule_a.split("=")[1]).split(',');
					var existed = false;
					if (Array.isArray(data)) {
						$$.each(data, function (id,item) {
							if (rule_data.indexOf(item) >= 0) {
								existed = true;
							}
						})
					}
					else {
						if (rule_data.indexOf(data) >= 0) {
							existed = true
						}
					}
					// if (id === '205.00' && data !== '1') {
					// 	if (GetData()['204.00'] !== '1') {
					// 		r.d = ['201.00', '203.00', '204.00', '205.00', '206.00', '207.00', '208.00', '209.00', '210.00', '211.00', '212.00', '213.00', '214.00', '215.00', '216.00', '217.00', '218.00', '219.00']
					// 		existed = false;
					// 	}
					// 	else
					// 		existed = true;
					// }
					// if (id === '135.00') {
					// 	if (data && data !== '1' && GetData()['137.00']) {
					// 		existed = false;
					// 		if (GetData()['137.00'] !== '1') {
					// 			// r.d = Array.prototype.push.apply(a, b);
					// 			r.d = ['134.00','137.00', '138.00', '139.00', '140.00', '141.00'];
					// 		} else {
					// 			r.e = ['137.00', '138.00', '139.00', '140.00', '141.00'];
					// 			r.d = ['134.00'];
					// 		}
					// 	} else if (data === '1') {
					// 		existed = true;
					// 		if (slide_record['137.00']) {
					// 			slide_record['137.00'][0] = [];
					// 			slide_record['137.00'][1] = ['136.00'];
					// 		}
					// 	}
					// }
					// if (id === '137.00') {
					// 	if (data && data !== '1' && GetData()['135.00']) {
					// 		existed = false;
					// 		if (GetData()['135.00'] !== '1') {
					// 			r.d = ['136.00','137.00', '138.00', '139.00', '140.00', '141.00'];
					// 		} else {
					// 			r.e = ['137.00', '138.00', '139.00', '140.00', '141.00'];
					// 			r.d = ['136.00'];
					// 		}
					// 	} else if (data === '1') {
					// 		if (slide_record['135.00']) {
					// 			slide_record['135.00'][0] = [];
					// 			slide_record['135.00'][1] = ['134.00'];
					// 		}
					// 		existed = true;
					// 	}
					// }
					
					if (!existed) {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						} else if (!slide_record[id]) {
							slide_record[id] = [[],[]];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						}
					}
					else {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
						}
					}
				}
				else if (rule_a.indexOf("=") >= 0) {
					var rule_data = (rule_a.split("=")[1]).split(',');
					var existed = false;
					if (Array.isArray(data)) {
						$$.each(data, function (id,item) {
							if (rule_data.indexOf(item) >= 0) {
								existed = true;
							}
						})
					} else {
						if (rule_data.indexOf(data) >= 0) {
							existed = true;
							tmp = true;
						}
						if (rule_data.indexOf('**') && !parseInt(data)) {
							existed = true;
						}
					}
					if (id === '299.00' && AppSettings('fid') === 'f9') {
						var siblings = ['292.00','293.00','294.00','295.00','296.00','297.00','298.00','299.00'];
						var count = 0;
						$$.each(siblings, function(id1,el1) {
							if (GetData()[el1] === '1')
								count += 1;
						});
						count > 1 ? existed = false : existed = true
					}
					if (AppSettings('fid') === 'f141' || AppSettings('fid') === 'f142') {
						if (id === '17.00' || id === '18.00' || id === '19.00') {
							tmp_data = [GetData()['17.00'],GetData()['18.00'],GetData()['19.00']];
							if (tmp_data[0] && tmp_data[1] && tmp_data[2]) {
								var age = getAge(tmp_data[0], tmp_data[1], tmp_data[2]);
								if (age < 5) {
									existed = true;
									r.d = ['15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00', '24.00', '25.00', '27.00', '28.00', '29.00', '30.00', '31.00', '32.00', '33.00', '34.00', '35.00', '36.00'];
								}
								else if (age < 6) {
									existed = true;
									r.d = ['15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00', '24.00', '25.00', '32.00', '33.00', '34.00', '35.00', '36.00'];
								}
								else if (age <10) {
									existed = true;
									r.d = ['15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00', '24.00', '25.00'];
								}
								else {
									existed = false;
									AppSettings('slides')['17:00'] = [[], []];
									AppSettings('slides')['18:00'] = [[], []];
									AppSettings('slides')['19:00'] = [[], []];
								}
							}
						} else if (id === '20.00') {
							tmp_data = GetData()['20.00'];
							if (tmp_data !== '4') {
								existed = true;
								r.d = ['16.00', '17.00'];
								if (tmp_data !== '1' && AppSettings('fid') === 'f141') {
									r.d.push('41.00');
								}
							} else {
								existed = true;
								r.d=[];
								if (tmp_data !== '1' && AppSettings('fid') === 'f141') {
									r.d = ['41.00'];
								}
							}
						} else if (id === '31.00') {
							tmp_data = [GetData()['17.00'],GetData()['18.00'],GetData()['19.00']];
							if (tmp_data[0] && tmp_data[1] && tmp_data[2]) {
								var age = getAge(tmp_data[0], tmp_data[1], tmp_data[2]);
								if (age > 18) {
									existed = true;
									r.d.push('36.00');
								} else {
									existed = false;
									AppSettings('slides')['31:00'] = [[], []];
								}
							}
						} else if (id === '37.00') {
							tmp_data = [GetData()['17.00'],GetData()['18.00'],GetData()['19.00']];
							var age = getAge(tmp_data[0], tmp_data[1], tmp_data[2]);
							if (GetData()['37.00'] === '1') {
								existed = true;
								r.d = ['36.00'];
							} else {
								if (age < 6 || age > 18) {
									existed = true;
									r.d = ['36.00'];
								} else {
									existed = false;
									AppSettings('slides')['37:00'] = [[], []];
								}
							}
						} else if (id === '81.00') {
							tmp_data = GetData()['81.00'];
							if (tmp_data === '1') {
								existed = true;
								r.d = ['66.00'];
							} else if (tmp_data === '4') {
								existed = true;
								r.d = ['65.00'];
							} else if (tmp_data === '2' || tmp_data === '3') {
								existed = true;
								r.d = ['65.00', '66.00'];
							}
						}
						
					}
					if (existed) {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						} else if (!slide_record[id]) {
							slide_record[id] = [[],[]];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						}
					} else {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
						}
					}
				}
				else if (rule_a.indexOf("<") >= 0) {
					var rule_data = Number(rule_a.split("<")[1]);
					if (data < Number(rule_data)) {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						} else if (!slide_record[id]) {
							slide_record[id] = [[],[]];
							slide_record[id][0] = (r.e) ? r.e : [];
							slide_record[id][1] = (r.d) ? r.d : [];
						}
					}
					else {
						if (slide_record[id]) {
							slide_record[id][0] = [];
							slide_record[id][1] = [];
						}
					}
				}
				UpdateForm(AppSettings('slides'));
			}
			if (tmp) {
				return false;
			}
		});
	}
	return valid;
}
function UpdateForm(option) {
	var slide_must_changed = Object.keys(option);
	if (!slide_must_changed.length) return;
	
	var _on = [], _off = [];
	for (var i=0; i<slide_must_changed.length; i++) {
		_on = _on.concat(option[slide_must_changed[i]][0]);
		_off = _off.concat(option[slide_must_changed[i]][1]);
	}
	$$.each($$('#form_body .slide'), function(id,el) {
		el.dataset.active = '1';
	});
	$$('#form_timeline a').removeClass('disable');
	$$.each(_on,function (id,el) {
		$$('#form_body .slide[data-no="'+ el.split(".")[0] +'"]')[0].dataset.active = '1';
		$$('#form_timeline a[id="'+ el.split(".")[0] +'"]').removeClass('disable');
	});
	$$.each(_off,function (id,el) {
		if (el) {
			$$('#form_body .slide[data-no="'+ el.split(".")[0] +'"]')[0].dataset.active = '0';
			$$('#form_timeline a[id="'+ el.split(".")[0] +'"]').addClass('disable');
		}
	});
	
}
function FormChanged(callback) {
	var _new = JSON.stringify(GetData());
	var sid = AppSettings('sid');
	GetSurvey(sid, function(res) {
		if (res.err === 0) {
			var _res;
			var _old = res.tb_res.data;
			if (_new === _old)
				_res = false;
			else
				_res = true;
			callback(_res);
		} else if (res.err === 1) {
			console.log(res.msg);
		}
	});
}
function NavigateTo(destination, type, option) {
	switch (destination) {
		case 'app.form': {
			mainView.loadPage('views/app.form.html?action=new');
			break;
		}


		case 'app_surveyForm': {
			var uc = AppSettings('pc');
			var pc = AppSettings('uc');
			if (!uc || !pc) {
				console.log('logging error!');
				Login();
				return;
			}
			GPSAuthorized(function(res) {
				if (res.err === 0) {
					MicrophoneAuthorized(function (e) {
						if(e.err === 1) {
							console.log("Microphone authorized (?) error: " + e.msg);
						}
						else if(e.err === 0) {
							AppSettings("fid", null);
							AppSettings("fid_tmp", null);
							surveyApp.popup(CreateList('forms_list2', forms));
							
							// surveyApp.modal({
							// 	title: '',
							// 	text: CreateList('forms_list', forms),
							// 	buttons: [{
							// 		text: "انصراف",
							// 		onClick: function() {
							// 			AppSettings("fid_tmp", null)
							// 		}
							// 	}, {
							// 		text: "نمایش فرم",
							// 		onClick: function() {
							// 			AppSettings("fid", AppSettings("fid_tmp"));
							// 			if (AppSettings("fid"))
							// 				mainView.loadPage('app_surveyForm.html?survey=new');
							// 		}
							// 	}]
							// });
							// $$('.modal-buttons.modal-buttons-2 span').css({'background-color':'#f0f0f0'});
							// $$('.modal-buttons.modal-buttons-2 span').css({'font-weight':'normal'});
							// $$('.modal-buttons.modal-buttons-2 span:nth-child(1)').css({'color':'#f44336'});
							// $$('.modal-buttons.modal-buttons-2 span:nth-child(2)').css({'color':'#4caf50'});
						}
					});
				} else {
					if (res.code === 1)
						console.log('error: '+ res.err + ' category: Authorization');
					else if (res.code === 2)
						console.log('error: '+ res.err + ' category: Activation');
				}
			});
			break;
		}
		case 'app_surveys': {
			mainView.loadPage("app_surveys.html?data=");
			break;
		}
		case 'app_status': {
			mainView.loadPage('app_status.html');
			break;
		}
		case 'app_surveyMap' : {
			mainView.loadPage('app_surveyMap.html');
			break;
		}
		case 'app_saveExport': {
			CreateRecoveryFile(function (res0) {
				console.log(res0.msg);
			});
			UploadData();
			break;
		}
		case 'app_restoreDB': {
			RestoreDatabase();
			break;
		}
		case 'app_downloadUpdates': {
			// window.location = "http://app.mabnama.com/dl/porsan.apk";
			// window.location = "http://naghshclick.org/porsan/porsan.apk";
			window.location = "http://naghshclick.org/porsan_new/porsan0.apk";
			navigator.app.exitApp();
			break;
		}
	}
}
function CreateList(key, obj) {
	var res= '', res0 = '';
	switch (key) {
		case 'forms_list': {
			res0 = '<div style="text-align:center">' +
					'<div class="row no-gutter">' +
					'<div>' +
					'<span class="mdi mdi-36px mdi-comment-text-outline"></span>' +
					'</div>' +
					'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
					messages.app.title +
					'</div>' +
					'</div>' +
					'<div class="list-block">'+
					'<p style="text-align:right;font-size:16px;">'+
					messages.app.select_form[0] + "</br>" + messages.app.select_form[1] +
					'</p>' +
					'<ul> list_content </ul>' +
					'</div>' +
					'</div>';
			Object.keys(obj).forEach(function (item) {
				res +=
						'<li>' +
						'<label class="label-radio item-content">' +
						'<input type="radio" name="surveyPlan" value="'+ item +'">' +
						'<div class="item-media">' +
						'<i class="icon icon-form-radio"></i>' +
						'</div>' +
						'<div class="item-inner">' +
						'<div class="item-title">'+ obj[item] +'</div>' +
						'</div>' +
						'</label>' +
						'</li>';
			});
			res0 = res0.replace(/list_content/, res);
			return res0
		}
		case 'forms_list2': {
			res0 =
				'<div class="popup">' +
					'<div class="content-block">'+
						// '<p><a href="#" class="close-popup">بستن</a></p>'+
						'<h1>طرح تمام شماری</h1>'+
						// '<p>برای شروع تمام شماری، فرم مورد نظر را انتخاب کنید.</p>'+
					'</div>' +
					'<div class="list-block">' +
						'<ul> list_content </ul>' +
					'</div>' +
				'</div>';
			Object.keys(obj).forEach(function (item) {
				var jsFunction = "javascript:PrepareForm('"+ item +"')"
				res += '<li>' +
					'<a href="'+ jsFunction +'" class="item-link item-content">' +
					'<div class="item-inner">' +
					'<div class="item-title">'+ obj[item] +'</div>' +
					'</div>' +
					'</a>' +
					'</li>'
			});
			res0 = res0.replace(/list_content/, res);
			return res0
		}
	}
}
function PrepareForm(fid) {
	AppSettings("fid", fid);
	surveyApp.closeModal();
	mainView.loadPage('app_surveyForm.html?survey=new');
	
	// $$('#panel_right').html();
	// $$('#panel_right').html(forms_list);
	// var c_date = toPersian(CurrentDate().yr + "/" + CurrentDate().mo + "/" + CurrentDate().dy);
	// $$('#panel_date').text(c_date);
	// $$('#panel_name span').text('وارد شوید!');
	//
	// if (LoggedIn) {
	// 	var uc = AppSettings('uc');
	// 	$$('#panel_name span').text(uc);
	// 	$$('#panel_name span').removeClass('text-background bg-yellow');
	// }
	// surveyApp.openPanel('right');
}


//====================================================================================
//------------------------------------------------------------------------------------  GPS
//====================================================================================
function GPSAuthorized(callback) {
	cordova.plugins.diagnostic.isLocationAuthorized(function(authorized) {
		console.log("App is " + (authorized ? "authorized" : "denied") + " to access to the GPS");
		if (authorized) {
			cordova.plugins.diagnostic.isLocationAvailable(function (response) {
				console.log("Location is " + (response ? "available" : "not available"));
				if (response) {
					callback({err:0});
				} else {
					callback({err:1, code:2, msg:''});
					surveyApp.modal({
						title: '',
						text:
							'<div style="text-align: center">' +
							'<div class="row no-gutter">' +
							'<div>' +
							'<span class="mdi mdi-36px mdi-map-marker-off color-orange"></span>' +
							'</div>' +
								'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
								messages.app.title +
								'</div>' +
							'</div>' +
							'<div class="row no-gutter">' +
							'<div class="col-20"></div>' +
							'<div class="col-80">' +
								'<p style="text-align:right;font-size:16px;">'+
								messages.app.access.gps.disable +
							'</p>' +
							'</div>' +
							'</div>' +
							'</div>',
						buttons: [{text: "بستن"}]
					});
					$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
					$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
					$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
				}
			}, function (error) {
				console.log("The following error occurred: " + error);
				callback({err:1, code:2, msg:error});
			});
		} else {
			callback({err:1, code:1, msg:''});
			surveyApp.modal({
				title: '',
				text:
						'<div style="text-align: center">' +
						'<div class="row no-gutter">' +
						'<div>' +
						'<span class="mdi mdi-36px mdi-map-marker-off color-orange"></span>' +
						'</div>' +
						'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
						messages.app.title +
						'</div>' +
						'</div>' +
						'<div class="row no-gutter">' +
						'<div class="col-20"></div>' +
						'<div class="col-80">' +
						'<p style="text-align:right;font-size:16px;">'+
						messages.app.access.gps.disable +
						'</p>' +
						'</div>' +
						'</div>' +
						'</div>',
				buttons: [{text: "بستن"}]
			});
			$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
			$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
			$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
		}
	}, function(error) {
		console.error("The following error occurred: "+error);
		callback({err:1, code:1, msg:error});
	});
}
function CurrentLocation(callback) {
	navigator.geolocation.getCurrentPosition(function (position) {
		callback({err:0, position:position.coords})
	}, function (positionError) {
		callback({err:1, code:positionError.code, msg:positionError.message});
	});
}
function LocationRecorder() {
	var geo = null;
	CurrentLocation(function (res) {
		if (res.err === 0) {
			var long = res.position.longitude;
			var lat = res.position.latitude;
			if (!long || !lat)
				AppSettings('geo', null);
			else {
				geo = lat + "|" + long;
				AppSettings('geo', geo);
			}
			
		}
	});
	setInterval(function() {
		CurrentLocation(function (res) {
			if (res.err === 0) {
				var long = res.position.longitude;
				var lat = res.position.latitude;
				if (!long || !lat)
					AppSettings('geo', null);
				else {
					geo = lat + "|" + long;
					AppSettings('geo', geo);
				}
			}
		});
	}, 5000);
}


//====================================================================================
//------------------------------------------------------------------------------------ Audio Recording Functions
//====================================================================================
function MicrophoneAuthorized(callback) {
	cordova.plugins.diagnostic.isMicrophoneAuthorized(function(authorized){
		console.log("App is " + (authorized ? "authorized" : "denied") + " access to the microphone");
		if (authorized) {
			callback({err:0});
		} else {
			callback({err:1, msg:''});
			surveyApp.modal({
				title: '',
				text:
					'<div style="text-align:center">' +
					'<div class="row no-gutter">' +
					'<div>' +
					'<span class="mdi mdi-36px mdi-microphone-off color-orange"></span>' +
					'</div>' +
						'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
						messages.app.title +
						'</div>' +
					'</div>' +
					'<div class="row no-gutter">' +
					'<div class="col-20"></div>' +
					'<div class="col-80">' +
						'<p style="text-align:right;font-size:16px;">'+
					messages.app.access.microphone +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
				buttons: [{text: "بستن"}]
			});
			$$('.modal-buttons.modal-buttons span').css({'background-color':'#f0f0f0'});
			$$('.modal-buttons.modal-buttons span').css({'font-weight':'normal'});
			$$('.modal-buttons.modal-buttons span').css({'color':'#444'});
		}
	}, function(error) {
		callback({err:1, msg:error});
		console.error("The following error occurred: " + error);
	});
}
function StorageAuthorized(callback) {
	cordova.plugins.diagnostic.isExternalStorageAuthorized(function(authorized) {
		console.log("App is " + (authorized ? "authorized" : "denied") + " access to the external storage");
		if (authorized) {
			callback({err:0});
		} else {
			callback({err:1});
			surveyApp.modal({
				title: '',
				text:
					'<div style="text-align: center">' +
					'<div class="row no-gutter">' +
					'<div>' +
					'<span class="mdi mdi-36px mdi-folder-open color-orange"></span>' +
					'</div>' +
						'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
						messages.app.title +
					'</div>' +
					'</div>' +
					'<div class="row no-gutter">' +
					'<div class="col-20"></div>' +
					'<div class="col-80">' +
						'<p style="text-align:right;font-size:16px;">'+
						messages.app.access.storage +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
				buttons: [{text: "بستن"}]
			});
			$$('.modal-buttons.modal-buttons span').css({'background-color':'#f0f0f0'});
			$$('.modal-buttons.modal-buttons span').css({'font-weight':'normal'});
			$$('.modal-buttons.modal-buttons span').css({'color':'#444'});
		}
	}, function(error) {
		callback({err:1,msg:error});
		console.error("The following error occurred: " + error);
	});
}
function CreateDirectory(dir, name) {
	window.resolveLocalFileSystemURL(dir , function (dirEntry) {
		dirEntry.getDirectory(name, {create: true},
			function () {
				console.log('Directory <<'+ name +'>> was created successfully.')
			},
			function (error) {
				console.log('Error in creating directory: '+ error)
			});
	})
}
function VoiceRecord(id) {
	var src = AppSettings('root') + 'audio/';
	if (id)
		src += id + "_" + CurrentDate().ho + "" + CurrentDate().mi +""+ CurrentDate().se + ".ogg";
	else
		src += CurrentDate('string') + "_" + CurrentDate().ho + "" + CurrentDate().mi +""+ CurrentDate().se + ".ogg";

	var mediaRec = new Media(src,
		function() {
			console.log("Media plugin | Started Success ...");
		},
		function(err) {
			console.log("Media plugin | Started Failed ... "+ err.code);
		}
	);
	AppSettings('media', mediaRec);
	mediaRec.startRecord();
}
function VoiceStop() {
	var mediaRec = AppSettings('media');
	if (mediaRec) {
		mediaRec.stopRecord();
		AppSettings('media', '');
		console.log("Media plugin | Saved.");
	}
}
// function StorageRegistered() {
// 	cordova.plugins.diagnostic.requestExternalStorageAuthorization(function(status){
// 		console.log("Authorization request for external storage use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
// 	}, function(error){
// 		console.error(error);
// 	});
// }
// function MicrophoneRegistered() {
// 	cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status){
// 		if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
// 			console.log("Microphone use is authorized");
// 		}
// 	}, function(error){
// 		console.error(error);
// 	});
// }


//====================================================================================
//------------------------------------------------------------------------------------ Database Functions
//====================================================================================
function OpenDB(db) {
	var db_name = db + '.db';
	var database = window.sqlitePlugin.openDatabase({
		name: db_name,
		location: 'default',
		androidDatabaseImplementation: 2
	});
	return database;
}
function GetSurvey(id, callback) {
	var res={};
	var sql = "SELECT * FROM surveys_response WHERE sid = " + id;
	var db = OpenDB('porsan');
	db.transaction(function(tx) {
		tx.executeSql(sql, [], function (tx, rs) {
			var row_str = "\n-------------------------------------------------------------------------------------\n";
			for(var x = 0; x < rs.rows.length; x++) {
				var row = rs.rows.item(x);
				var fields_name = Object.keys(row);
				$$.each(fields_name, function(id,el) {
					row_str += "\n" + el + ": " + row[el] + "\n";
					res[el] = row[el];
				});
			}
			if (!rs.rows.length) {
				row_str += "Item with id << " + id + " >> not found.";
				// row_str += "TEMP Item not found.";
			}
			row_str += "\n-------------------------------------------------------------------------------------\n";
			// console.log(row_str);

		}, function (tx, err) {
			callback({err:1, msg:err.message});
		});
	}, function (err) {
		callback({err:1, msg:err.message});
	}, function () {
		callback({err:0, msg:'transaction success.', tb_res:res});
	});
}
function InsertSurvey(survey, callback) {
	var sid, fid, fname, pid, pname, geo_x, geo_y, date, time_start, time_end, slide, data;
	var sql = '';
	if (survey) {
		var completion, upload;
		sid = survey.sid;
		fid = survey.fid;
		fname = survey.fname;
		pid = survey.pid;
		pname = survey.pname;
		geo_x = survey.geo_x;
		geo_y = survey.geo_y;
		date = survey.date;
		time_start = survey.time_start;
		time_end = survey.time_end;
		completion = survey.completion;
		upload = survey.upload;
		slide = survey.slide;
		data = survey.data ? survey.data : 'null';
		
		sql =
			"INSERT INTO surveys_response (sid, fid, fname, pid, pname, geo_x, geo_y, date, time_start, time_end, completion, upload, slide, data) " +
			"VALUES ("+
			sid +", '"+
			fid +"', '"+
			fname +"', '"+
			pid +"', '"+
			pname +"', '"+
			geo_x +"', '"+
			geo_y +"', '"+
			date +"', '"+
			time_start +"', '"+
			time_end +"', '"+
			slide +"', '" +
			completion +"', '" +
			upload +"', '" +
			data + "')";
	}
	else {
		var version = AppSettings('version');
		sid = CurrentDate('string');
		fid = AppSettings('fid') + '-' + version;
		fname = AppSettings('fname');
		pid = AppSettings('pc');
		pname = AppSettings('uc');
		var geo = AppSettings('geo');
		if (!geo) {
			geo_x = '00:00:00';
			geo_y = '00:00:00';
		} else {
			geo_x = geo.split("|")[0];
			geo_y = geo.split("|")[1];
		}
		date = CurrentDate('date');
		time_start = CurrentDate('time');
		time_end = '00:00:00';
		slide = $$('#form_body .slide:first-child').attr('data-no');
		if (GetData())
			data = JSON.stringify(GetData());
		else
			data = 'null';
		sql =
			"INSERT INTO surveys_response (sid, fid, fname, pid, pname, geo_x, geo_y, date, time_start, time_end, slide, data) " +
			"VALUES ("+
			sid +", '"+
			fid +"', '"+
			fname +"', '"+
			pid +"', '"+
			pname +"', '"+
			geo_x +"', '"+
			geo_y +"', '"+
			date +"', '"+
			time_start +"', '"+
			time_end +"', '"+
			slide +"', '" +
			data + "')";
	}
	
	var db = OpenDB('porsan');
	db.transaction(function(tx) {
		tx.executeSql(sql);
	}, function(err) {
		callback({err:1, msg:err.message});
		var tmp = AppSettings('err');
		tmp.push(err.message);
		CatchErrors();
	}, function() {
		callback({err:0, sid:sid, msg:'item inserted.'});
	});
}
function UpdateSurvey(type, option, callback) {
	var sql;
	if (type === 'upload') {
		var id = option.id;
		sql = "UPDATE surveys_response SET upload = 1 WHERE sid = "+ id;
	} else {
		var sid = AppSettings('sid');
		var time = CurrentDate('time');
		var slide = CurrentSlide()['slide-no'];
		var data;
		if (GetData()) {
			var data0 = GetData();
			data0['1000.00'] = localStorage.getItem('user_fName');
			data0['1001.00'] = localStorage.getItem('user_code');
			data = JSON.stringify(data0);
		} else {
			data = 'null';
		}
		
		if (type === 'end') {
			sql =
				"UPDATE surveys_response " +
				"SET time_end = '"+ time +"', completion = 1, slide = '"+ slide +"', data = '"+ data +"' " +
				"WHERE sid = "+ sid;
		} else {
			sql =
				"UPDATE surveys_response " +
				"SET slide = '"+ slide +"', data = '"+ data +"' " +
				"WHERE sid = "+ sid;
		}
	}
	var db = OpenDB('porsan');
	db.transaction(function(tx) {
		tx.executeSql(sql);
	}, function(err) {
		callback({err:1, msg:err.message});
		var tmp = AppSettings('err');
		tmp.push(err.message);
		CatchErrors();
	}, function() {
		callback({err:0, sid:sid, msg:'item updated.'});
	});
}
function DeleteSurvey(id, callback) {
	var db = OpenDB('porsan');
	var sql = "DELETE FROM surveys_response where sid = " + id;
	
	db.transaction(function(tx) {
		tx.executeSql(sql);
	}, function(err) {
		callback({err:1, msg:err.message});
	}, function() {
		callback({err:0, msg:'Item Dropped.'});
	});
}
function PrintTable(tb, callback) {
	var tmp = [];
	var tb_res = '';
	var sql = "SELECT * FROM " + tb;
	
	var db = OpenDB('porsan');
	db.transaction(function(tx) {
		tx.executeSql(sql, [], function (tx, rs) {
			var all_rows = rs.rows;
			for(var x = 0; x < all_rows.length; x++) {
				var tmp1 = {};
				var row = all_rows.item(x);
				var fields_names = Object.keys(row);
				$$.each(fields_names, function(id,el) {
					tmp1[el] = row[el];
				});
				tmp.push(tmp1);
			}
		}, function (tx, err) {
			callback({err:1, msg:err.message});
		});
	}, function (err) {
		callback({err:1, msg:err.message});
	}, function () {
		callback({err:0, msg:'table returned;', tb_res:tmp});
		
		// ::::     console print     ::::
		// callback({err:0, msg:'table returned;', tb_res:tb_res});
	});
}
function DropTable(tb, callback) {
	var db = OpenDB('porsan');
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE '+ tb +';');
	}, function(err) {
		callback({err:1, msg:err.message});
	}, function() {
		callback({err:0, msg:'table dropped.'});
	});
}
function DropTable2(tb) {
	DropTable('surveys', function(res) {
		console.log('transaction code:' + res.err);
		if (res.err === 0)
			console.log('success: ' + res.msg);
		else if (res.err === 1)
			console.log('failed: ' + res.msg);
	});
}
function DeleteTable(tb, callback) {
	var db = OpenDB('porsan');
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM '+ tb +';');
	}, function(err) {
		callback({err:1, msg:err.message});
	}, function() {
		callback({err:0, msg:'all rows deleted.'});
	});
}
function DisplayTable() {
	PrintTable('surveys_response', function(res) {
		if (res.err === 0) {
			var str =
				'<div class="popup">'+
				'<div class="content-block">'+
				'<p><a href="#" class="button button-fill color-red close-popup">بستن</a><p>';

			if (res.tb_res.length) {
				$$.each(res.tb_res, function(id,el) {
					str += '<div style="padding:10px 0;background-color:#f5f5f5;">';
					$$.each(el,function(id1, el1) {
						str +=
								'<div class="row" style="direction:ltr;font-size:14px">' +
								'<div class="col-30" style="padding-left:10px;font-weight:bold;">'+ el1[0] +'</div>' +
								'<div class="col-70">'+ el1[1] +'</div>' +
								'</div>';
					});
					str += "</div></br>";
				});
			} else {
				str += 'جدول خالی است و هیچ نظرسنجی ای تکمیل یا آغاز نشده است.'
			}
			str += '</p></div></div>';
		}
		else if (res.err === 1)
			console.log('failed: ' + res.msg);
	});
}
function DeleteTable1(tb) {
	DeleteTable(tb, function(res) {
		console.log('transaction code:' + res.err);
		if (res.err == 0)
			console.log('success: ' + res.msg);
		else if (res.err == 1)
			console.log('failed: ' + res.msg);
	});
}

function onSaveSuccess(options) {
	if (options) {
		var sql = options['sql'];
		var type = options['type'];
		var msg = options['msg'];
	}

	if (sql === 'update') {
		if (type === 'tmp' && msg === 'on') {
			setTimeout(function() {
				surveyApp.closeModal();
				surveyApp.modal({
					title: '',
					text:
							'<div style="text-align:center">' +
							'<div class="row no-gutter">' +
							'<div>' +
							'<span class="mdi mdi-36px mdi-checkbox-marked-circle color-green"></span>' +
							'</div>' +
							'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
							messages.app.title +
							'</div>' +
							'</div>' +
							'<div class="row no-gutter">' +
							'<div class="col-20"></div>' +
							'<div class="col-80">' +
							'<p style="text-align:right;font-size:16px;">'+ messages.form.store.after[0] +'</p>' +
							'</div>' +
							'</div>' +
							'</div>',
					buttons: [{
						text: "بستن",
						onClick: function() {}
					}]
				});
				$$('.modal-buttons.modal-buttons-1 span').css({'background-color':'#f0f0f0','font-weight':'normal'});
				$$('.modal-buttons.modal-buttons-1 span').css({'color':'#444'});
			}, 300);
		}
		else if (type === 'end') {
			VoiceStop();
			setTimeout(function() {
				surveyApp.closeModal();
				surveyApp.modal({
					title: '',
					text:
							'<div style="text-align:center">' +
							'<div class="row no-gutter">' +
							'<div>' +
							'<span class="mdi mdi-36px mdi-checkbox-marked-circle color-green"></span>' +
							'</div>' +
							'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
							messages.app.title +
							'</div>' +
							'</div>' +
							'<div class="row no-gutter">' +
							'<div class="col-20"></div>' +
							'<div class="col-80">' +
							'<p style="text-align:right;font-size:16px;">'+ messages.form.store.after[1] +'</p>' +
							'</div>' +
							'</div>' +
							'</div>',
					buttons: [
						{
							text: "خروج",
							onClick: function() {
								if (AppSettings('action') === 'new') {
									mainView.loadPage('app_main.html');
								} else if (AppSettings('action') === 'edit') {
									mainView.loadPage('app_surveys.html');
								}
							}
						}
					]
				});
				$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
				$$('.modal-buttons.modal-buttons span').css({'background-color':'#f0f0f0','font-weight':'normal'});
				$$('.modal-buttons.modal-buttons span').css({'color':'#444'});
			}, 300);
		}
	}
}
function onSaveFailed(type) {
	if (type === 'temp' || type === 'end' || type === 'update') {
		surveyApp.closeModal();
		setTimeout(function() {
			surveyApp.modal({
				title: '',
				text:
						'<div style="text-align:center">' +
						'<div class="row no-gutter">' +
						'<div>' +
						'<span class="mdi mdi-36px mdi-close-circle color-red"></span>' +
						'</div>' +
						'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
						messages.app.title +
						'</div>' +
						'</div>' +
						'<div class="row no-gutter">' +
						'<div class="col-20"></div>' +
						'<div class="col-80">' +
						'<p style="text-align:right;font-size:16px;">'+ messages.form.store.error +'</p>' +
						'</p>' +
						'</div>' +
						'</div>' +
						'</div>',
				buttons: [{
					text: "بستن",
					onClick: function() {}
				}]
			});
			$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
			$$('.modal-buttons.modal-buttons-1 span').css({'background-color':'#f0f0f0','font-weight':'normal'});
			$$('.modal-buttons.modal-buttons-1 span:nth-child(1)').css({'color':'#444'});
		}, 300);
	}
}


//====================================================================================
//------------------------------------------------------------------------------------ Device Handler Functions
//====================================================================================
function onDeviceReady() {
	//*****************************************   Plugins List:
	//*****************************************   cordova plugin add cordova.plugins.geolocation
	//*****************************************   cordova plugin add cordova.plugins.diagnostic
	//*****************************************   cordova plugin add cordova-plugin-media
	//*****************************************   cordova plugin add cordova-plugin-file
	//*****************************************   cordova plugin add cordova-sqlite-storage
	console.log('device is ready!');
	// StorageAuthorized(function(se) {
	// 	if (!se.err) {
	// 		var appRoot = AppSettings('root');
	// 		CreateDirectory(cordova.file.externalRootDirectory, 'Porsan');
	// 		CreateDirectory("file:///storage/emulated/0/Porsan/", "audio");
	// 		CreateDirectory("file:///storage/emulated/0/Porsan/", "backup");
	// 		CreateDirectory("file:///storage/emulated/0/Porsan/", "logs");
	// 	} else {
	// 		console.log("Error in Create Directory.");
	// 	}
	// });
	// var db = OpenDB('porsan');
	// db.transaction(function(tx) {
	// 	var sql =
	// 		'CREATE TABLE IF NOT EXISTS surveys_response (' +
	// 		'sid INTEGER PRIMARY KEY,' +
	// 		'fid TEXT,' +
	// 		'fname TEXT,' +
	// 		'pid Text,' +
	// 		'pname Text,' +
	// 		'geo_x TEXT,' +
	// 		'geo_y TEXT,' +
	// 		'date TEXT,' +
	// 		'time_start TEXT,' +
	// 		'time_end TEXT,' +
	// 		'completion INTEGER DEFAULT 0,' +
	// 		'upload INTEGER DEFAULT 0,' +
	// 		'slide TEXT,' +
	// 		'data TEXT)';
	// 	tx.executeSql(sql);
		
	// }, function(error) {
	// 	console.log('SQLite Database Message ... Transaction ERROR: ' + error.message);
	// }, function() {
	// 	console.log('SQLite Database Message ... Table Created Successfully');
	// });
	document.addEventListener("pause", onPauseApp, false);
	document.addEventListener("resume", onResumeApp, false);
	document.addEventListener("backbutton", onBackPressed, false);
	//document.addEventListener("menubutton", onMenuKeyDown, false);
}
function onPauseApp() {
	// device's display off/lock.
	// app go to background.
	console.log('app paused!');

	/*
	 if (current_page == app_surveyForm && voice is recording)
	 then
	 1) pause recording
	 2) store temporarily
	 */
}
function onResumeApp() {
	/*
	 if (current_page == app_surveyForm && voice is recording)
	 then :
	 1) resume recording
	 2) fill form if empty
	 */
	console.log('app resumed!');
}
function onBackPressed(e) {
	e.preventDefault();
	var current_page = CurrentPage().name;
	var view_history = mainView.history;
	var history_length = view_history.length;
	
	if ($$('.panel.active').length > 0) {
		surveyApp.closePanel('right');
		return;
	}
	
	if ($$('.modal-in').length && $$('.modal .modal-inner').dataset()) {
		if ($$('.modal .modal-inner').dataset().modal === 'not-allowed-close')
			return false;
	}
	
	
	if ($$('.modal-in').length && $$('.modal .modal-inner .modal-text div').dataset())
		if ($$('.modal .modal-inner .modal-text div').dataset().modal)
			var modal_type = $$('.modal .modal-inner .modal-text div').dataset().modal;
	
	if (current_page === 'surveyForm') {
		if ($$('.modal-in').length) {
			surveyApp.closeModal();
			if (modal_type === 'start' || modal_type === 'persist')
				mainView.back({'url':'app_main.html'});
			return false;
		}
		ExitForm();
		return false;
	} else {
		if (history_length <= 2) {
			if (current_page === 'main') {
				if ($$('.modal-in').length) {
					surveyApp.closeModal();
					return false;
				} else {
					surveyApp.modal({
						title: '',
						text:
								'<div style="text-align:center">' +
								'<div class="row no-gutter">' +
								'<div>' +
								'<span class="mdi mdi-36px mdi-alert-octagram color-orange"></span>' +
								'</div>' +
								'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
								messages.app.title +
								'</div>' +
								'</div>' +
								'<div class="row no-gutter">' +
								'<div class="col-20"></div>' +
								'<div class="col-80">' +
								'<p style="text-align:right;font-size:16px;">'+ messages.app.exit +'</p>' +
								'</p>' +
								'</div>' +
								'</div>' +
								'</div>',
						buttons: [
							{
								text: "انصراف",
								onClick: function() {}
							}, {
								text: 'خروج',
								onClick: function() {
									navigator.app.exitApp();
								}
							}
						]
					});
					$$('.modal-buttons.modal-buttons-2 span').css({'background-color':'#f0f0f0','font-weight':'normal'});
					$$('.modal-buttons.modal-buttons-2 span:nth-child(2)').css({'color':'#f44336'});
					$$('.modal-buttons.modal-buttons-2 span:nth-child(1)').css({'color':'#4caf50'});
					return false;
				}
			}
		} if (history_length > 2) {
			if (current_page === 'main') {
				if ($$('.modal-in').length) {
					surveyApp.closeModal();
					return false;
				}
			}
		}
	}

	var back_link = view_history[history_length - 2];
	view_history.splice(history_length - 2,2);
	mainView.loadPage(back_link);
}


//====================================================================================
//------------------------------------------------------------------------------------  General Functions
//====================================================================================
function AppSettings(_key, _content) {
	var app_cache = $$('body').data("app_setting");
	if (_content === undefined) {
		var _res = app_cache[_key];
		if (!Array.isArray(_res) && (_res === "" || !_res))
			_res = false;
		return _res;
	} else if (_content || _content === '') {
		app_cache[_key] = _content;
	}
}
function CurrentDate(type) {
	var res;
	var current = new Date();
	var yr = current.getFullYear(); yr = yr.toString();
	var mo = current.getMonth();    if (mo < 10) mo = '0' + mo; mo = mo.toString();
	var dy = current.getDate();     if (dy < 10) dy = '0' + dy; dy = dy.toString();
	var ho = current.getHours();    if (ho < 10) ho = '0' + ho; ho = ho.toString();
	var mi = current.getMinutes();  if (mi < 10) mi = '0' + mi; mi = mi.toString();
	var se = current.getSeconds();  if (se < 10) se = '0' + se; se = se.toString();

	if (type === 'string')
		res = parseInt(yr + mo + dy + ho + mi + se);
	else if (type === 'date')
		res = toPersian(yr) + "/" + toPersian(mo) + "/" + toPersian(dy);
	else if (type === 'time')
		res = toPersian(ho) + ":" + toPersian(mi) + ":" + toPersian(se);
	else if (type === 'file')
		res = yr + "_" + mo + "_" + dy + "_" + ho + "_" + mi + "_" + se;
	else {
		res = {
			yr: current.getFullYear(),
			mo: current.getMonth(),
			dy: current.getDate(),
			ho: current.getHours(),
			mi: current.getMinutes(),
			se: current.getSeconds()
		}
	}
	return res;
}
function GregorianToJalali(gy,gm,gd){
	var g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
	var jy;
	if(gy > 1600){
		jy=979;
		gy-=1600;
	}else{
		jy=0;
		gy-=621;
	}
	var gy2=(gm > 2)?(gy+1):gy;
	var days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
	jy+=33*(parseInt(days/12053));
	days%=12053;
	jy+=4*(parseInt(days/1461));
	days%=1461;
	if(days > 365){
		jy+=parseInt((days-1)/365);
		days=(days-1)%365;
	}
	var jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
	var jd=1+((days < 186)?(days%31):((days-186)%30));
	return [jy,jm,jd];
}
function toPersianPage(el) {
	var persian_numbers = {0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};
	if(el.nodeType === 3) {
		var list=el.data.match(/[0-9]/g);
		if(list!=null && list.length !== 0){
			for(var i=0;i<list.length;i++)
				el.data=el.data.replace(list[i],persian_numbers[list[i]]);
		}
	}
	for(var i=0;i<el.childNodes.length;i++){
		toPersianPage(el.childNodes[i]);
	}
}
function toPersian(t) {
	if (!t)
		return;
	if (typeof(t) === "number")
		t = t.toString();
	var b= ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
	for (var j=0;j<10;j++){
		while (t.indexOf(j)>=0) {
			t = t.replace(j,b[j]);
		}
	}
	while(t.indexOf('.')>=0) {
		t = t.replace('.', "/");
	}
	return t;
}
function toEnglish(t){
	if (!t)
		return;
	if (typeof(t) === 'number')
		t = t.toString();
	var b= ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
	for (var j=0;j<10;j++){
		while (t.indexOf(b[j]) >= 0) {
			t = t.replace(b[j], j);
		}
	}
	while(t.indexOf('/')>=0) {
		t = t.replace('/', ".");
	}
	return t;
}
function isFloat(n){
	return Number(n) === n && n % 1 !== 0;
}
function CreatePicker(id, data) {
	var name = id.split('_')[1];
	switch (name) {
		case 'province': {
			surveyApp.picker({
				input: '#picker_province',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="province">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: provinces['name']
					}
				
				]
			});
			break;
		}
		case 'county': {
			surveyApp.picker({
				input: '#picker_county',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="county">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'section': {
			surveyApp.picker({
				input: '#picker_section',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="section">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'city': {
			surveyApp.picker({
				input: '#picker_city',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="city">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'area': {
			surveyApp.picker({
				input: '#picker_area',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="area">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'block': {
			surveyApp.picker({
				input: '#picker_block',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="block">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'villageArea': {
			surveyApp.picker({
				input: '#picker_villageArea',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="villageArea">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'village': {
			surveyApp.picker({
				input: '#picker_village',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="village">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				
				]
			});
			break;
		}
		case 'person': {
			surveyApp.picker({
				input: '#picker_person',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="person">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: levels['name']
					}
				
				]
			});
			break;
		}
		case 'locations': {
			surveyApp.picker({
				input: '#picker_locations',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="locations">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data,
						onChange: function (p, value) {
							zoomTo(value.replace(/-/g, ""))
						}
					}
				]
			});
			break;
		}
		case 'category': {
			surveyApp.picker({
				input: '#picker_category',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="category">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				]
			});
			break;
		}
		case 'subCategory': {
			surveyApp.picker({
				input: '#picker_subCategory',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="subCategory">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				]
			});
			break;
		}
	}
}
function CreateDropdownList(id, codes, names) {
	var list = '<option value="">انتخاب از لیست</option>';
	$$.each(codes, function (id, code) {
		list += '<option value="'+ code +'">'+ names[id] +'</option>';
	});
	$$('[id^="'+ id +'"]').html(list);
}
function FindInArray(_array, _elem) {
	var res;
	for (var i=0; i<_array.length; i++) {
		if (_array[i] === _elem) {
			res = i;
			break;
		}
	}
	if (res === undefined)
		res = -1;
	return res;
}
function ArrayHasDuplicates(array) {
	var tmp = {};
	var res = [];
	
	array.forEach(function (item) {
		if (item && !tmp[item])
			tmp[item] = 0;
			tmp[item] += 1;
	});
	
	for (var prop in tmp) {
		if (tmp[prop] >= 2) {
			res.push(prop);
		}
	}
	return res
}
function Group2DArray(_array, _col) {
	var results = {};
	var tmp = [], target;
	if (_col === 0)
		target = 1;
	else if (_col === 1)
		target = 0;
	else
		return false;
	$$.each(_array, function (id, el) {
		var idx = el[_col];
		if (FindInArray(tmp, idx) < 0) {
			tmp.push(idx);
		}
	});
	$$.each(tmp, function (id, el) {
		var tmp1 = [];
		$$.each(_array, function (id1, el1) {
			if (el1[_col] === el) {
				tmp1.push(el1[target]);
				// _array.splice(id1, target);
			}
		});
		results[el] = tmp1;
	});
	return results;
}
function DisplayNotificationMessage(_type, _msg) {
	var _background;
	var _color = 'black';
	if (_type == -1) {
		_background = '#ef485a';
	} else if (_type == 0) {
		_background = '#f58229';
	} else if (_type == 1) {
		_background = '#23b8b0';
	} else {
		_background = '';
		_color = 'white'
	}
	surveyApp.addNotification({
		message: _msg,
		button: {
			text: 'بستن',
			color: _color
		}
	});
	$$('.notification-item').css('background-color', _background);
	$$('.notification-item .item-title').css('color', _color);
	$$('.notification-item .item-title').css('font-size', '12px');
	$$('.notification-item .item-after a').css('background-color', 'rgba(211, 211, 211, 0.4)');
	setTimeout(function () {
		surveyApp.closeNotification('.notification-item');
	}, 3000);
}
function DisplayErrorMessage(_type, _msg) {
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px  mdi-close-circle-outline color-red"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">' + _msg + '</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: [{text: "بستن"}]
	});
	$$('.modal-buttons.modal-buttons span').css({'background-color': '#f0f0f0'});
	$$('.modal-buttons.modal-buttons span').css({'font-weight': 'normal'});
	$$('.modal-buttons.modal-buttons span').css({'font-size': '15px'});
	$$('.modal-buttons.modal-buttons span').css({'color': '#444'});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
	
	// switch (_type) {
	// 	case "wrong_answer": {
	// 		break;
	// 	}
	// }
	
}
function CurrentPage() {
	var page = mainView.activePage.name;
	var page_name = page.split('_')[(page.split('_')).length-1];
	var page_id = '#' + page_name;
	return {'page':page, 'name':page_name, 'id':page_id};
}
function Spinner(act) {
	if (act === 'start') {
		surveyApp.showIndicator();
		//myApp.showPreloader();
		//$$('.modal').css({"background": "transparent", "box-shadow": "unset"});
		//$$('.modal-title').css({"display": "none"});
		var spin = $$('.preloader');
		spin.css({"width": "50px", "height": "50px"});
		spin.removeClass('preloader-white');
		spin.addClass('preloader-teal');
	} else if (act === 'stop') {
		surveyApp.hideIndicator();
		//myApp.hidePreloader();
	}
}
function Spinner2(_act, _type) {
	if (_act) {
		var message;
		switch (_type) {
			case 'log-in': {
				message = " شما در حال اتصال به پرسان هستید";
				break;
			}
			case 'upload-data': {
				message = "پرسان در حال ارسال پرسشنامه‌های شما است.";
				break;
			}
			case 'fetch-list': {
				message = "در حال آماده سازی لیست نظرسنجی های انجام شده...";
				break;
			}
			case 'fetch-status': {
				message = "در حال آماده سازی آمار نظرسنجی های طرح پایانه های فروش...";
				break;
			}
			case 'restore-data': {
				message = "در حال بازیابی اطلاعات قبلی هستیم.";
				break;
			}
			default: {
				message = "";
				break;
			}
		}
		
		surveyApp.modal({
			title: '',
			text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-loading mdi-spin color-bluegray"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">'+
				'منتظر بمانید...' + '<br>' + message +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>',
			buttons: []
		});
		$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
	} else {
		surveyApp.closeModal('.modal')
	}
}
function NetworkConnection() {
	return navigator.onLine;
}
function isValidIranianNationalCode(input) {
	if (!/^\d{10}$/.test(input))
		return false;
	
	var check = parseInt(input[9]);
	var sum = 0;
	var i;
	for (i = 0; i < 9; ++i) {
		sum += parseInt(input[i]) * (10 - i);
	}
	sum %= 11;
	
	return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
function isValidPostalCode(input) {
	if (/^\d{10}$/.test(input))
		return true;
	else
		return false
}
function getAge(yy ,mm ,dd ) {
	var y0=1399; var m0=4; var d0=1;
	var y1 = parseInt(yy);
	var m1 = parseInt(mm);
	var d1 = parseInt(dd);
	
	if (y0 == y1) {
		if (m0 <= m1) {
			return 0
			// return[0, m1 - m0, 0];
		}
	}
	
	if (d1 > d0) {
		m0 = m0 - 1;
		if (m0 == 0) {
			y0 = y0 - 1;
			m0 = m0 + 12;
		}
		if (m0 < 7) {
			d0 = d0 + 31
		} else {
			d0 = d0 + 30
		}
	}
	
	if (m1 > m0) {
		y0 = y0 - 1;
		m0 = m0 + 12;
	}
	
	var d_day = d0 - d1;
	var d_month = m0 - m1;
	var d_year = y0 - y1;
	return d_year;
	// return[d_year, d_month, d_day];
}


function NumberSeperator(id,order) {
	var fieldInfo, _value;
	if (order)
		fieldInfo = $$(CurrentSlide().slide).find(".salary")[order];
	else {
		var slide_type = CurrentSlide().slide.dataset.type;
		if (slide_type === 'mixed') {
			fieldInfo = $$('input[name="'+ id +'"]').parent().find(".salary")[0]
		} else {
			fieldInfo = $$(CurrentSlide().slide).find(".salary")[0];
		}
	}
	if ($$(CurrentSlide().slide)[0].dataset.type === "check_text_multi") {
		_value = GetData()[id][order + 1];
	} else {
		_value = GetData()[id];
	}
	if (isFloat(_value)) {
		_value = parseFloat(_value)
	} else {
		_value = parseInt(_value)
	}
	
	if (_value) {
		if (isFloat(_value) && _value < 1000) {
			_value = _value.toFixed(2);
		} else {
			_value = _value.toFixed();
			_value = _value.replace(/\B(?=(\d{3})+(?!\d))/g, "/");
		}
		fieldInfo.style.display = 'block';
		$$(fieldInfo).find('span').html (toPersian(_value) + ' تومان');
		$$(fieldInfo).find('span').css({marginTop:16, color:'green'})
	} else {
		fieldInfo.style.display = 'none';
	}
}

function NetworkError() {
	surveyApp.modal({
		title: '',
		text:
				'<div style="text-align:center">' +
				'<div class="row no-gutter">' +
				'<div>' +
				'<span class="mdi mdi-36px mdi-wifi-off color-orange"></span>' +
				'</div>' +
				'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
				messages.app.title +
				'</div>' +
				'</div>' +
				'<div class="row no-gutter">' +
				'<div class="col-20"></div>' +
				'<div class="col-80">' +
				'<p style="text-align:right;font-size:16px;">'+ messages.app.network[0]  + '<br />' + messages.app.network[1] +'</p>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>',
		buttons: []
	});
	$$('.modal .modal-inner')[0].dataset.modal = 'not-allowed-close';
	setTimeout(function () {
		surveyApp.closeModal();
	}, 2000);
}
function CatchErrors() {
	var tmp = AppSettings('err');
	var path = AppSettings('root') + 'logs/';
	var filename = 'log' + CurrentDate('string') + '.txt';
	
	var error_log = '';
	$$.each(tmp, function (id, el) {
		var err_line = el + '--newline--';
		error_log += err_line;
	});
	console.log(error_log);
	
	window.resolveLocalFileSystemURL(path, function(dir) {
		dir.getFile(filename, {create:true}, function(fileEntry) {
			WriteFile(fileEntry, error_log);
		});
	});
}

function OpenPicker(id) {
	var data = AppSettings("userBlocks");
	switch (id) {
		case 'blockLocations': {
			surveyApp.picker({
				input: '#blockLocations',
				rotateEffect: true,
				toolbarTemplate:
						'<div class="toolbar" data-name="blockLocation">' +
						'<div class="toolbar-inner">' +
						'<div class="right">' +
						'<a href="#" class="link close-picker">بستن</a>' +
						'</div>' +
						'</div>' +
						'</div>',
				cols: [
					{
						textAlign: 'center',
						values: data
					}
				]
			});
			break;
		}
	}
	surveyApp.pickerModal('.picker-modal');
}
function OpenAppBrowser(URI) {
	// var _url_ = 'https://www.khabaronline.ir/';
	var _target_ = '_blank';
	var _options_ = 'location=yes';
	cordova.InAppBrowser.open(encodeURI(URI), _target_, _options_);
}
function PersianDate(_a){
	////"2018-05-20 00:00:00"
	var b = _a.split(' ');
	var d = b[0].split('-');
	var e = GregorianToJalali(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]));
	return toPersian(e.join('/') + '  ' + b[1]);
}
function isInt(n){
	return Number(n) === n && n % 1 === 0;
}

function Fade(element) {
	this.el = element;
	this.state = 0;
	this.fadeout = function() {
		var element = this.el;
		var op = 1;
		var timer = setInterval(function () {
			if (op <= 0.0) {
				clearInterval(timer);
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= 0.1;
		}, 50);
	};
	this.fadein = function() {
		var element = this.el;
		var op = 0.0;
		var timer = setInterval(function () {
			if (op >= 1.0) {
				clearInterval(timer);
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += 0.1;
		}, 50);
	};
}

function _getSlide(id) {
	var slide = survey_form.f9.elements[id] ? survey_form.f9.elements[110] : null;
	console.log(slide);
}
function _getQuize(id) {
	var elems = survey_form.f9.elements;
	var quiz = null;
	$$.each(elems, function (id1,el1) {
		var elem = el1.item_elem;
		$$.each(Object.keys(elem), function (id2,el2) {
			var id_tmp = parseInt(el1[el2].container[3]);
			if(id_tmp == id) {
				quiz = parseInt(el1[el2].container[0]);
			}
		})
	});
	console.log(quiz)
}
function _getStructure() {
	var elems = survey_form.f9.elements;
	$$.each(elems, function (id0,el0) {
		$$.each(el0.item_elem, function (id1,el1) {
			$$.each(Object.keys(el1), function (id2,el2) {
				var quiz = el1[el2].container[3];
				console.log(quiz + " | " + (id0+1));
			})
		});
	});
}