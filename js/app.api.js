/**
 * Created by ArashMad on 04/07/2018.
 */


// cordova version 7
// android version 6.2.3

var surveyApp = new Framework7({
	material: true,
	tapHold: true,
	smartSelectOpenIn: 'popup',
	preroute: function (view, options) {
		var current_page = CurrentPage().name;
		var target_url = options.url;
		if (!target_url)
			return false;
		// if (target_url.indexOf('app_main') >= 0) {
		// 	if (NetworkConnection()) {
		// 		var _request = {
		// 			_method: 'post',
		// 			_url: getAddress('version'),
		// 			_data: {
		// 				action: actions.CHECK_VERSION,
		// 				data: JSON.stringify({
		// 					v: AppSettings('version')
		// 				})
		// 			}
		// 		};
		//
		// 		Spinner2(true);
		// 		SendRequest(_request, function(res) {
		// 			Spinner2(false);
		// 			if (!res.err) {
		// 				var JSONres = JSON.parse(res.data);
		// 				if (JSONres.err) {
		// 					var link = JSONres.link;
		// 					if (link) {
		// 						$$('#update_badge').css({'display': 'block'});
		// 					}
		// 				} else {
		// 					$$('#update_badge').css({'display': 'none'});
		// 				}
		// 			}
		// 			// else {
		// 			// 	onLoginFailed(messages.app.server);
		// 			// 	return false;
		// 			// }
		// 		});
		// 	}
		// }
		// if (current_page === 'index') {
		// 	if (target_url.indexOf('app_main') >= 0) {
		// 		GPSAuthorized(function(res) {
		// 			if (res.err === 0) {
		// 				LocationRecorder();
		// 			} else {
		// 				if (res.code === 1)
		// 					console.log('error: '+ res.err + ' category: Authorization');
		// 				else if (res.code === 2)
		// 					// display a message to turn on GPS on device
		// 					console.log('error: '+ res.err + ' category: Activation');
		// 			}
		// 		});
		// 		if (!NetworkConnection()) {
		// 			NetworkError();
		// 		}
		// 	}
		// }

		// close modal if opened
		// close picker if opened
		// close panel if opened
	}
});

var mainView = surveyApp.addView('.view-main');
var $$ = Dom7;
// window.ODate = Date;
// window.Date = JDate;

document.addEventListener('deviceready', onDeviceReady, false);

$$("body").data("app_setting", {
	// App
	root: "file:///storage/emulated/0/datarecord/",
	data_name: 'data.csv',

	// Map Settings
	main_map: "",
	mini_map: "",
	osm_lyr: "",
	sat_lyr: "",
	rec_lyr: "",
	map_init_center: "46.8157475,-71.2315154",
	map_init_zoom: 12,

	// Form Settings
	form_action: "",
	// form_id: "",
	// form_data: "",
	// form_header: "",
	form_marker: "",
	form_location_lat: "",
	form_location_lng: ""

	// version: "1.0.0",
	// action: "new",
	// fid: "",
	// fid_tmp: "",
	// fname:"",
	// sid:"",
	// latitude: "",
	// longitude: ""
});

setTimeout(function () {
	mainView.loadPage('views/app.main.html');
}, 2000);


//------------------------------------------------------------------------------------  F7 handle GO touch on keypad
document.addEventListener('keydown', function (event) {
	var keyName = event.key;
	if (keyName === 'Enter') {
		// Stop app refresh on 'Go' button press
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
});


//------------------------------------------------------------------------------------  F7 user interactions handling
$$(document).on('click', '#mainmenu div', function (e) {
	if (e.target.closest('.modal') && e.target.closest('.modal').length)
		return;
	if (CurrentPage().name === 'main') {
		NavigateTo(this.id, null, null);
	}

});
$$(document).on('click', '.timeline a', function () {
	// ChangeSlide(this.id, null, true);
});
$$(document).on('click', '.navbar .right a', function () {
	// var control_option = Array.prototype.slice.call(this.classList)[0];

	// var control_option = Array.prototype.slice.call($$(this).find('span')[0].classList)[0];
	// switch (control_option) {
	// 	case 'form-store': {
	// 		SaveForm({sql:'update', type:'tmp', msg:'on'});
	// 		break;
	// 	}
	// 	case 'form-reset': {
	// 		surveyApp.modal({
	// 			title:  '',
	// 			text:
	// 			'<div style="text-align: center">' +
	// 			'<span class="mdi mdi-alert-octagram color-gray mdi-36px"></span>' +
	// 			'<p style="font-size:13px;margin:10px 0 0">' +
	// 				messages.form.reset.before[0] + "\n" + messages.form.reset.before[1] +
	// 			'</p>' +
	// 			'</div>',
	// 			buttons: [
	// 				{
	// 					text: 'انصراف',
	// 					onClick: function() {}
	// 				}, {
	// 					text: 'پاک شود',
	// 					onClick: function() {
	// 						var slide = $$('#form_body .slide:first-child').attr('data-no');
	// 						var sid = AppSettings('sid');
	// 						DeleteSurvey(sid, function(res) {
	// 							if (res.err === 0) {
	// 								ChangeSlide(slide);
	// 								ResetForm();
	// 								VoiceStop();
	// 								GPSAuthorized(function(res) {
	// 									if (res.err === 0) {
	// 										var geo = AppSettings('geo');
	// 										MicrophoneAuthorized(function (e) {
	// 											if(e.err === 0) {
	// 												AppSettings('geo', geo);
	// 												VoiceRecord(null);
	// 												SaveForm({sql:'insert', type:null, msg:'off'});
	// 											} else if(e.err === 1) {
	// 												console.log("Microphone authorized (?) error: " + e.msg);
	// 												mainView.back({'url':'app_main.html'});
	// 											}
	// 										});
	// 									} else {
	// 										if (res.code === 1)
	// 											console.log('GPS authorized (?) error | msg: ' + res.msg);
	// 										else if (res.code === 2)
	// 											console.log('GPS enable (?) error | msg: ' + res.msg);
	// 										mainView.back({'url':'app_main.html'});
	// 									}
	// 								});
	// 							} else if (res.err === 1) {
	// 								console.log('Failed: ' + res.msg);
	// 							}
	// 						})
	// 					}
	// 				}
	// 			]
	// 		});
	// 		$$('.modal-buttons.modal-buttons-2 span').css({'background-color':'#f0f0f0','font-weight':'normal'});
	// 		$$('.modal-buttons.modal-buttons-2 span:nth-child(1)').css({'color':'#444'});
	// 		$$('.modal-buttons.modal-buttons-2 span:nth-child(2)').css({'color':'#f44336'});
	// 		break;
	// 	}
	// 	case 'form-history': {
	// 		break;
	// 	}
	// }
});
$$(document).on('change', 'select', function (e) {
	var page_name = CurrentPage().name;
	switch (page_name) {
		case 'surveyForm': {
			var scale;
			var form_id = AppSettings('fid');
			var list_id = e.target.id.split('_')[1];
			var list_value = e.target.value;

			switch (list_id) {
				case 'province': {
					if (form_id === 'f9') {
						$$.each(['359.00', '360.00', '361.00', '362.00', '363.00', '364.00', '365.00', '366.00'], function (id, el) {
							$$("select[id*='" + el + "']").val('');
							$$("select[id*='" + el + "']").html('');
						});
						$$.each(['367.00', '368.00'], function (id, el) {
							$$("input[name='" + el + "']").val('');
						});
						var selectedCountiesName = [];
						var selectedCountiesCode;

						scale = GetData()['357.00'];
						if (scale == 1) {
							selectedCountiesCode = counties.code.filter(function (value) {
								return value.substring(0, 2) === list_value
							});

							$$.each(counties.code, function (id, el) {
								if (FindInArray(selectedCountiesCode, el) >= 0) {
									selectedCountiesName.push(counties.name[id]);
								}
							});
						}
						else if (scale == 2) {
							selectedCountiesCode = counties.code.filter(function (value) {
								return value.substring(0, 2) === list_value
							});

							$$.each(counties.code, function (id, el) {
								if (FindInArray(selectedCountiesCode, el) >= 0) {
									selectedCountiesName.push(counties.name[id]);
								}
							});
						}
						if (selectedCountiesName.length)
							CreateDropdownList('list_county', selectedCountiesCode, selectedCountiesName)
					}
					else if (form_id === 'f10') {
						$$("select[id*='40.00']").val('');
						$$("select[id*='40.00']").html('');
						var selectedCityCode = provinces.code.filter(function (value) {
							return value === list_value.substring(0, 2)
						});

						var selectedCityName = [];
						var selectedCityCode0 = [];
						$$.each(cities10.code, function (id, el) {
							if (FindInArray(selectedCityCode, el.substring(0, 2)) >= 0) {
								selectedCityName.push(cities10.name[id]);
								selectedCityCode0.push(cities10.code[id]);
							}
						});
						if (selectedCityName.length)
							CreateDropdownList('list_city', selectedCityCode0, selectedCityName);
					}
					break;
				}
				case 'county': {
					$$.each(['360.00', '361.00', '362.00', '363.00', '364.00', '365.00', '366.00'], function (id, el) {
						$$("select[id*='" + el + "']").val('');
						$$("select[id*='" + el + "']").html('');
					});
					$$.each(['367.00', '368.00'], function (id, el) {
						$$("input[name='" + el + "']").val('');
					});

					scale = GetData()['357.00'];
					if (scale == 1) {
						var selectedSectionName = [];
						var selectedSectionCode0 = [];
						var selectedSectionCode = counties.code.filter(function (value) {
							return value === list_value
						});

						$$.each(sections.code, function (id, el) {
							if (FindInArray(selectedSectionCode, el.substring(0, 4)) >= 0) {
								selectedSectionName.push(sections.name[id]);
								selectedSectionCode0.push(sections.name[id].split(" | ")[1])
							}
						});
						if (selectedSectionName.length)
							CreateDropdownList('list_section', selectedSectionCode0, selectedSectionName);
					}
					else if (scale == 2) {
						var selectedVillageAreaName = [];
						var selectedVillageAreaCode0 = [];
						var selectedVillageAreaCode = counties.code.filter(function (value) {
							return value === list_value
						});

						$$.each(villageArea.code, function (id, el) {
							if (FindInArray(selectedVillageAreaCode, el.substring(0, 4)) >= 0) {
								selectedVillageAreaName.push(villageArea.name[id]);
								selectedVillageAreaCode0.push(villageArea.code[id]);
							}
						});

						if (selectedVillageAreaName.length)
							CreateDropdownList('list_vArea', selectedVillageAreaCode0, selectedVillageAreaName);
					}
					break;
				}
				case 'section': {
					$$.each(['361.00', '362.00', '363.00', '366.00'], function (id, el) {
						$$("select[id*='" + el + "']").val('');
						$$("select[id*='" + el + "']").html('');
					});
					$$.each(['367.00', '368.00'], function (id, el) {
						$$("input[name='" + el + "']").val('');
					});

					selectedCityCode = sections.code.filter(function (value) {
						return value.substring(0, 6) === list_value
					});
					selectedCityName = [];
					selectedCityCode0 = [];
					$$.each(cities9.code, function (id, el) {
						if (FindInArray(selectedCityCode, el.substring(0, 6)) >= 0) {
							selectedCityName.push(cities9.name[id]);
						}
						if (FindInArray(selectedCityCode, el.substring(0, 6)) >= 0) {
							selectedCityCode0.push(cities9.code[id]);
						}
					});
					if (selectedCityName.length)
						CreateDropdownList('list_city', selectedCityCode0, selectedCityName);
					break;
				}
				case 'city': {
					if (form_id === 'f9') {
						$$.each(['362.00', '363.00', '366.00'], function (id, el) {
							$$("select[id*='" + el + "']").val('');
							$$("select[id*='" + el + "']").html('');
						});
						$$.each(['367.00', '368.00'], function (id, el) {
							$$("input[name='" + el + "']").val('');
						});

						var selectedAreaCode = areas.code.filter(function (value) {
							return value.substring(0, 10) === list_value
						});

						var selectedAreaName = [];
						$$.each(areas.code, function (id, el) {
							if (FindInArray(selectedAreaCode, el) >= 0) {
								selectedAreaName.push(areas.name[id]);
							}
						});
						if (selectedAreaName.length)
							CreateDropdownList('list_area', selectedAreaCode, selectedAreaName);
					}
					break;
				}
				case 'area': {
					$$.each(['363.00', '366.00'], function (id, el) {
						$$("select[id*='" + el + "']").val('');
						$$("select[id*='" + el + "']").html('');
					});
					$$.each(['367.00', '368.00'], function (id, el) {
						$$("input[name='" + el + "']").val('');
					});

					var selectedBlockCode = blocks.code.filter(function (value) {
						return value.substring(0, 13) === list_value
					});

					var selectedBlockName = [];
					$$.each(blocks.code, function (id, el) {
						if (FindInArray(selectedBlockCode, el) >= 0) {
							selectedBlockName.push(blocks.name[id]);
						}
					});
					if (selectedBlockName.length)
						CreateDropdownList('list_block', selectedBlockCode, selectedBlockName);
					break;
				}
				case 'block': {
					$$("select[id*='366.00']").val('');
					$$("select[id*='366.00']").html('');
					var place = FindInArray(unitRow91.code, list_value);
					var selectedUnitRowCode = unitRow91.name[place];
					var selectedUnitLevelCode = unitLevel91.name[place];
					$$('input[name="367.00"]').val(selectedUnitRowCode);
					$$('input[name="368.00"]').val(selectedUnitLevelCode);
					if (place) CreateDropdownList('list_person', levels.code, levels.name);
					break;
				}
				case 'vArea': {
					$$("select[id*='365.00']").val('');
					$$("select[id*='366.00']").val('');
					$$("select[id*='365.00']").html('');
					$$("select[id*='366.00']").html('');
					$$.each(['367.00', '368.00'], function (id, el) {
						$$("input[name='" + el + "']").val('');
					});

					var selectedVillageCode = village.code.filter(function (value) {
						return value.substring(0, 10) === list_value
					});

					var selectedVillageName = [];
					$$.each(village.code, function (id, el) {
						if (FindInArray(selectedVillageCode, el) >= 0) {
							selectedVillageName.push(village.name[id]);
						}
					});
					if (selectedVillageName.length)
						CreateDropdownList('list_village', selectedVillageCode, selectedVillageName);
					break;
				}
				case 'village': {
					$$("select[id*='366.00']").val('');
					$$("select[id*='366.00']").html('');
					var place = FindInArray(unitRow92.code, list_value);
					var selectedUnitRowCode = unitRow92.name[place];
					var selectedUnitLevelCode = unitLevel92.name[place];
					$$('input[name="367.00"]').val(selectedUnitRowCode);
					$$('input[name="368.00"]').val(selectedUnitLevelCode);
					if (place) CreateDropdownList('list_person', levels.code, levels.name);
					break;
				}
				case 'category': {
					$$("select[id*='42.00']").val('');
					$$("select[id*='42.00']").html('');
					var selectedCategoryCode = subCategories.code.filter(function (value) {
						return value.substring(0, 1) === list_value;
					});
					var selectedCategoryName = [];
					var selectedCategoryCode0 = [];
					$$.each(subCategories.code, function (id, el) {
						if (FindInArray(selectedCategoryCode, el) >= 0) {
							selectedCategoryName.push(subCategories.name[id]);
							selectedCategoryCode0.push(subCategories.code[id]);
						}
					});
					CreateDropdownList('list_subCategory_', selectedCategoryCode0, selectedCategoryName);
				}
			}
		}
		case 'surveyMap': {
			// var code = $$('#province_list select')[0].value;
			// var coordinates = coords[code];
			// if (!coordinates || !coordinates.label0.length) {
			// 	$$('#location_list').html("");
			// 	return;
			// }
			//
			// var location_list = "";
			// $$.each(coordinates.label0, function (id, el) {
			// 	var _lbl0 = el;
			// 	var _lbl1 = coordinates.label1[id];
			// 	var _lbl2 = coordinates.label2[id];
			// 	var _lbl3 = coordinates.label3[id];
			// 	var _lbl4 = coordinates.label4[id];
			// 	var _x = coordinates.lamda[id];
			// 	var _y = coordinates.phi[id];
			// 	var link_uri = "'https://www.google.com/maps/search/?api=1&query="+ _y +","+ _x +"'";
			//
			// 	location_list +=
			// 			'<li style="padding:0 16px 0">' +
			// 			'<a href="javascript:OpenAppBrowser('+ link_uri +')" class="item-link item-content">' +
			// 			'<div class="item-inner">' +
			// 			'<div class="item-title">'+
			// 			'<h3>کد: '+ toPersian(_lbl0) +'</h3>' +
			// 			'<div>'+
			// 				_lbl1 + '<br>' +
			// 			'شهر: ' + toPersian(_lbl2) + '<br>' +
			// 			'شماره حوزه: ' + toPersian(_lbl3) + '<br>' +
			// 			'شماره ÷: '+ toPersian(_lbl4)  +
			// 			'</div>' +
			// 			'</div>' +
			// 			'</div>' +
			// 			'</a>' +
			// 			'</li>'
			// });
			// $$('#location_list').html('<ul>' + location_list + '</ul>');
			break;
		}
	}
});
$$(document).on('change', 'input', function (e) {
	var page_name = CurrentPage().name;
	if (page_name === 'main') {
		if (e.target.name === 'surveyPlan') {
			AppSettings("fid_tmp", e.target.value)
		}
	}
	else if (page_name === 'surveyForm') {
		var input_type = this.getAttribute('type');
		var current_slide = $$(CurrentSlide()['slide']);
		if (current_slide[0] && current_slide[0].dataset.type === 'mixed') {
			if (AppSettings("fid") === 'f9') {
				if (e.target.name === '357.00') {
					$$.each(['359.00', '360.00', '361.00', '362.00', '363.00', '364.00', '365.00', '366.00'], function (id, el) {
						$$("select[id*='" + el + "']").val('');
						$$("select[id*='" + el + "']").html('');
					});
					$$.each(['367.00', '368.00'], function (id, el) {
						$$("input[name='" + el + "']").val('');
					});
					CheckRule(e.target.name, e.target.value);
					return;
				} else {
					return;
				}
			} else if (AppSettings("fid") === 'f141' || AppSettings("fid") === 'f142') {
				return
			}
		}

		var combined_input;
		if (input_type === 'radio') {
			combined_input = null;
			if ($$(this.closest('div.list-block')).find('input[type=number],input[type=text]').length) {
				combined_input = $$(this.closest('li')).find('input[type=number],input[type=text]');
				if (combined_input.length) {
					if (combined_input.prop('disabled')) {
						combined_input.prop('disabled', false);
						combined_input.focus();
					}
				} else {
					combined_input = $$(this.closest('div.list-block')).find('input[type=number],input[type=text]');
					combined_input.val("");
					if (!combined_input.prop('disabled')) {
						combined_input.prop('disabled', true);
						combined_input.focusout();
					}
					setTimeout(function () {
						ChangeSlide(null, 'next', true);
					}, 250);
				}
			} else {
				setTimeout(function () {
					ChangeSlide(null, 'next', true);
				}, 250);
			}
		} else if (input_type === 'checkbox') {
			combined_input = $$(this.closest('li')).find('input[type=number],input[type=text]');
			if (combined_input.length) {
				if (combined_input.prop('disabled')) {
					combined_input.prop('disabled', false);
					combined_input.focus();
				} else {
					if (!combined_input.prop('disabled')) {
						combined_input.prop('disabled', true);
						combined_input.focusout();
					}
					combined_input.val("");
				}
			}
		}
	}
});


//------------------------------------------------------------------------------------  F7 page events handler
surveyApp.onPageInit('*', function (page) {
	var page_name = page.name;
	switch (page_name) {
		case 'app.main': {
			init_center = AppSettings('map_init_center').split(',')
			init_zoom = AppSettings('map_init_zoom')

			// user_location = 1
			// if (user_location) {
			// 	init_center = user_location
			// 	init_zoom = 18
			// }

			AppSettings('main_map', L.map('main_map', {
				center: [init_center[0], init_center[1]],
				zoom: init_zoom,
				zoomControl: false,
				// attributionControl:false
			}));

			createLayer('sat_lyr')
			createLayer('osm_lyr')
			AppSettings('osm_lyr').addTo(AppSettings('main_map'));
			// AppSettings('sat_lyr').addTo(AppSettings('main_map'));
			// AppSettings('rec_lyr').addTo(AppSettings('main_map'));

			// var mapHeight = $$('#main_map').height() - 56
			// $$('#main_map').css("height", mapHeight + 'px')

			break;
		}
		case 'app.form': {
			var formAction = page.query.action
			AppSettings('form_action', formAction)

			init_center = AppSettings('map_init_center').split(',')
			init_zoom = AppSettings('map_init_zoom')

			// user_location = 1
			// if (user_location) {
			// 	init_center = user_location
			// 	init_zoom = 18
			// }

			var minimap = L.map('mini_map', {
				center: [init_center[0], init_center[1]],
				zoom: init_zoom,
				zoomControl: false,
				// attributionControl:false
			});

			createLayer('osm_lyr')
			AppSettings('mini_map', minimap)
			AppSettings('osm_lyr').addTo(minimap);

			minimap.on('click', function (e) {
				var coordinate = e.latlng;
				var lat = coordinate.lat;
				var lng = coordinate.lng;
				if (lat && lng) {
					// AppSettings('form_location_lat', lat)
					// AppSettings('form_location_lng', lng)
					$$('input[name="lat"]').val(lat)
					$$('input[name="lng"]').val(lng)
					if (AppSettings('form_marker')) {
						minimap.removeLayer(AppSettings('form_marker'))
					}
					var formMarker = L.marker([lat, lng], { icon: createMarker() }).addTo(minimap);
					AppSettings('form_marker', formMarker)
				}

			})

			switch (formAction) {
				case 'new':
					formID = createFormId()
					// AppSettings('form_id', formID)
					$$('input[name="id"]').val(formID)
					changeTab('tab-form')


					// clear form data
					break;

				case 'edit':
					// var formID = page.query.formID
					// AppSettings('form_id', formID)
					// changeTab('tab-?')
					// load data
					// update form
					// add location layer to map
					break;
			}
			break;
		}






		case 'test_page': {

			//InsertSurvey('start', function(res) {
			//	console.log('transaction code:' + res.err);
			//	if (res.err == 0) {
			//		console.log('success: ' + res.msg);
			//		console.log('results: ' + res.id + ' inserted');
			//	}
			//	else if (res.err == 1)
			//		console.log('failed: ' + res.msg);
			//});

			//PrintTable('surveys', function(res) {
			//	console.log('transaction code:' + res.err);
			//	if (res.err == 0) {
			//		//console.log('success: ' + res.msg);
			//		console.log('results: ' + res.tb_res);
			//
			//		var str;
			//		$$.each(res.tb_res, function(id,el) {
			//			$$.each(el,function(id1, el1) {
			//				str += "<span>" + el1 + "</span></br>";
			//			});
			//			str += "<span></span></br></br>";
			//		});
			//		$$('#test').html(str);
			//
			//		myApp.popup(str);
			//
			//	}
			//	else if (res.err == 1)
			//		console.log('failed: ' + res.msg);
			//});

			//DropTable('surveys', function(res) {
			//	console.log('transaction code:' + res.err);
			//	if (res.err == 0)
			//		console.log('success: ' + res.msg);
			//	else if (res.err == 1)
			//		console.log('failed: ' + res.msg);
			//});

			//DeleteTable('surveys', function(res) {
			//	console.log('transaction code:' + res.err);
			//	if (res.err == 0)
			//		console.log('success: ' + res.msg);
			//	else if (res.err == 1)
			//		console.log('failed: ' + res.msg);
			//});

			//GetSurvey('1397319131517', function(res) {
			//	// res.err : 0 (success)
			//	// res.err : 1 (error)
			//
			//	// res.msg
			//	// returned item : res.tb_res
			//});

			//GetSurvey(null, function(res) {
			//	if (res.err == 0) {
			//		console.log(res.tb_res.id)
			//	} else if (res.err == 1) {
			//		console.log(res.msg);
			//	}
			//	// res.err : 0 (success)
			//	// res.err : 1 (error)
			//
			//	// res.msg
			//	// returned item : res.tb_res
			//});

			//UpdateSurvey('1397319131517', function(res) {
			//	if (res.err == 0)
			//		console.log('success: ' + res.msg);
			//	else if (res.err == 1)
			//		console.log('failed: ' + res.msg);
			//});

			//DeleteSurvey('1397319131517', function(res) {
			//	if (res.err == 0)
			//		console.log('success: ' + res.msg);
			//	else if (res.err == 1)
			//		console.log('failed: ' + res.msg);
			//});

			break;
		}
		case 'app_main': {
			$$('#app_name').html(messages.app.title);
			break;
		}
		case 'app_surveyForm': {
			var form_id = AppSettings('fid');
			AppSettings('fname', forms[form_id]);
			var form_data = survey_form[form_id];
			var form_type = page.query.survey;

			var form_lang = form_data.lang === 'fa' ? 'rtl' : 'ltr';

			var survey = CreateSurvey(form_data.elements, form_lang);
			$$('#form_timeline').html(survey.timeline);
			$$('#form_body').html(survey.slides);
			$$('#form_title').text(form_data.name);
			$$('#form_desc p').text(form_data.desc);
			$$('#form_body .slide:first-child').show();
			$$('#form_timeline a:first-child').addClass('active');

			var button_text;
			if (form_type === 'edit') {
				button_text = 'ادامه';
			} else if (form_type === 'new') {
				AppSettings('slides', {});
				button_text = 'شروع';
			}

			surveyApp.modal({
				title: '',
				text:
					'<div style="text-align:center" data-modal="start">' +
					'<div class="row no-gutter">' +
					'<div>' +
					'<span class="mdi mdi-36px mdi-comment-plus-outline color-bluegray"></span>' +
					'</div>' +
					'<div class="col-80" style="text-align:right;font-size:18px;font-weight:bold;line-height:56px">' +
					messages.app.title +
					'</div>' +
					'</div>' +
					'<div class="row no-gutter">' +
					'<div class="col-20"></div>' +
					'<div class="col-80">' +
					'<p style="text-align:right;font-size:16px;">' + messages.form.start0 + '</p>' +
					// '<p style="text-align:right;font-size:16px;">'+ messages.form.start +'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
				buttons: [
					{
						text: button_text,
						onClick: function () {
							if (form_type === 'new') {
								GPSAuthorized(function (res) {
									if (res.err === 0) {
										MicrophoneAuthorized(function (e) {
											if (e.err === 0) {
												VoiceRecord(null);
												SaveForm({ sql: 'insert', type: null, msg: 'off' });
											} else if (e.err === 1) {
												console.log("Microphone authorized (?) error: " + e.msg);
												mainView.back({ 'url': 'app_main.html' });
											}
										});
									} else {
										if (res.code === 1)
											console.log('GPS authorized (?) error | msg: ' + res.msg);
										else if (res.code === 2)
											console.log('GPS enable (?) error | msg: ' + res.msg);
										mainView.back({ 'url': 'app_main.html' });
									}
								});
							}
							else if (form_type === 'edit') {
								GPSAuthorized(function (res) {
									if (res.err === 0) {
										CurrentLocation(function (res) {
											if (res.err === 0) {
												MicrophoneAuthorized(function (e) {
													if (e.err === 0) {
														var f_sid = page.query.f_sid;
														var f_slide = page.query.f_slide;
														var f_data = page.query.f_data;
														FillForm(f_data);
														ChangeSlide(f_slide, null, false);
														VoiceRecord(f_sid);
														AppSettings('sid', f_sid);
														AppSettings('action', form_type);
													} else if (e.err === 1) {
														console.log("Microphone authorized (?) error: " + e.msg);
														mainView.back({ 'url': 'app_main.html' });
													}
												});
											} else if (res.err === 1) {
												console.log('GPS geolocation (?) error | code ' + res.code + '| msg: ' + res.msg);
												mainView.back({ 'url': 'app_main.html' });
											}
										});
									} else {
										if (res.code === 1)
											console.log('GPS authorized (?) error | msg: ' + res.msg);
										else if (res.code === 2)
											console.log('GPS enable (?) error | msg: ' + res.msg);
										mainView.back({ 'url': 'app_main.html' });
									}
								});
							}
						}
					}
				]
			});
			$$('.modal-buttons.modal-buttons-1 span').css({ 'background-color': '#f0f0f0' });
			$$('.modal-buttons.modal-buttons-1 span').css({ 'font-weight': 'normal' });
			$$('.modal-buttons.modal-buttons span').css({ 'font-size': '15px' });
			$$('.modal-buttons.modal-buttons-1 span').css({ 'color': '#4caf50' });

			break;
		}
	}
});
surveyApp.onPageAfterAnimation('*', function (page) {
	var page_name = page.name;
	switch (page_name) {
		case 'app_main': {
			// PrintTable('surveys_response', function(res) {
			// 	if (res.err === 0) {
			// 		var catA = 0, catB = 0, catC = 0, catD = 0;
			// 		if (res.tb_res.length) {
			// 			for (var i=0; i<res.tb_res.length; i++) {
			// 				var row = res.tb_res[i];
			// 				var fid = row['fid'].split('-')[0];
			// 				var completion = row['completion'];
			// 				if (completion === 1 && fid === 'f10') {
			// 					var cat = JSON.parse(row['data'])['41.00'];
			// 					if (cat === 'A') catA += 1;
			// 					else if (cat === 'B') catB += 1;
			// 					else if (cat === 'C') catC += 1;
			// 					else if (cat === 'D') catD += 1;
			// 				}
			// 			}
			//
			// 			var allCategories =
			// 				'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
			// 					'<span style="font-size: 14px"> پرسشنامه تکمیل شده در صنف A:</span>' +
			// 					'<span style="font-size: 13px">'+ toPersian(String(catA)) +'</span>' +
			// 				'</div>'+
			// 				'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
			// 					'<span style="font-size: 14px"> پرسشنامه تکمیل شده در صنف B:</span>' +
			// 					'<span style="font-size: 13px">'+ toPersian(String(catB)) +'</span>' +
			// 				'</div>'+
			// 				'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
			// 					'<span style="font-size: 14px"> پرسشنامه تکمیل شده در صنف C:</span>' +
			// 					'<span style="font-size: 13px">'+ toPersian(String(catC)) +'</span>' +
			// 				'</div>'+
			// 				'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
			// 					'<span style="font-size: 14px"> پرسشنامه تکمیل شده در صنف D:</span>' +
			// 					'<span style="font-size: 13px">'+ toPersian(String(catD)) +'</span>' +
			// 				'</div>';
			// 		}
			// 		$$('#allCategories').html(allCategories);
			// 	}
			// 	else if (res.err === 1) {
			// 		console.log('failed: ' + res.msg);
			// 	}
			// });
			break;
		}
		case 'app_surveyForm': {
			var form_id = AppSettings('fid');
			CreateDropdownList('list_province_', provinces['code'], provinces['name']);
			if (form_id === 'f9') {
				$$.each(['358.00', '359.00', '360.00', '361.00', '362.00', '363.00', '364.00', '365.00', '366.00'], function (id, el) {
					$$("select[id*='" + el + "']").closest('li').hide();
					$$("select[id*='" + el + "']").closest('li').prev('div').hide();
				});
				$$.each(['367.00', '368.00'], function (id, el) {
					$$("input[name='" + el + "']").closest('li').hide();
					$$("input[name='" + el + "']").closest('li').prev('div').hide();
				});
			} else if (form_id === 'f10') {
				CreateDropdownList('list_category_', categories['code'], categories['name']);
				CreateDropdownList('list_categoryType_', [1, 2], ['تجاری', 'خدماتی']);
				CreateDropdownList('list_categoryPlace_', [1, 2, 3], ['مراکز تجاری یا بورس‌های مهم', 'خیابان اصلی', 'خیابان فرعی']);
				CreateDropdownList('list_connection_', [1, 2, 3], ['تلفنی', 'اینترنتی', 'موبایلی']);
			} else if (['f111', 'f112', 'f113', 'f114', 'f115', 'f116'].includes(form_id)) {
				CreateDropdownList('list_bank', branches['code'], branches['name']);
			}
			break;
		}
		case 'app_surveys': {
			var pageContent = '';
			var plans = {};
			Object.keys(forms).forEach(function (value) {
				plans[value] = {}
			});
			OpenRecoveryFile(function (e) {
				var file = e.file;
				if (!Object.keys(file).length) {
					pageContent =
						"<div style='height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;'>" +
						"<div style='margin: 0 16px; max-width: 350px; text-align: center'>" +
						"<h2>لیست خالی است</h2>" +
						"<p style='font-size: 1em'>برای مشاهده لیست آخرین پرسشنامه‌های انجام شده، ابتدا از منوی اصلی ذخیره و ارسال را انتخاب کنید و مجددا به این صفحه وارد شوید. </p>" +
						"</div>" +
						"</div>"
				} else {
					var surveys = file.split(".+.+.newLine.+.+.");
					if (surveys.length) {
						surveys.forEach(function (item) {
							var survey = JSON.parse(item);
							var fid = survey.fid.split("-")[0];
							var pname = survey.pname;
							var completed = survey.completion;  //int 0 or 1
							var uploaded = survey.upload;     //int 0 or 1
							if (!plans[fid][pname]) {
								plans[fid][pname] = [0, 0];
								if (completed) {
									plans[fid][pname][0] = 1;
									if (uploaded) {
										plans[fid][pname][1] = 1;
									}
								}
							} else {
								if (completed) {
									plans[fid][pname][0] = plans[fid][pname][0] + 1;
									if (uploaded) {
										plans[fid][pname][1] = plans[fid][pname][1] + 1;
									}
								}
							}
						});


						Object.keys(plans).forEach(function (planId) {
							var plan = plans[planId];
							if ((Object.keys(plan).length) === 0)
								return true;
							var formName = forms[planId];
							pageContent +=
								"<p style='font-size: 1em'>برای مشاهده لیست آخرین پرسشنامه‌های انجام شده، ابتدا از منوی اصلی ذخیره و ارسال را انتخاب کنید و مجددا به این صفحه وارد شوید. </p>" +
								'<div style="background-color: #f0f0f0">' +
								'<div class="content-block-title"' +
								'style="font-size:16px; font-weight:bold;color:#000">' + formName + '</div>' +
								'<div class="content-block inset">' +
								'<div class="content-block-inner">';
							var tmp = '';
							Object.keys(plan).forEach(function (pname) {
								var completed = plan[pname][0];
								var uploaded = plan[pname][1];
								tmp +=
									'<div class="row">' +
									'<div class="col-40">نام کاربری</div>' +
									'<div class="col-30" style="text-align: center">نمونه تکمیل شده</div>' +
									'<div class="col-30" style="text-align: center">نمونه ارسال شده</div>' +
									'</div>' +
									'<div class="row">' +
									'<div class="col-40">' + pname + '</div>' +
									'<div class="col-30" style="text-align: center">' + completed + '</div>' +
									'<div class="col-30" style="text-align: center">' + uploaded + '</div>' +
									'</div>';
							});
							pageContent += tmp;
							pageContent +=
								'</div>' +
								'</div>' +
								'</div>';
						});
					}
				}
				$$('#surveys_list').html(pageContent);
			});
			break;
		}
		case 'app_surveyMap': {
			// var userLocation = AppSettings('userLocation');
			// if (!userLocation)
			// 	userLocation = '00';
			// var subFeatures = [];
			// $$.each(tmp.blocks[userLocation].features, function (id,el) {
			// 	var _code = el.properties.adres1395;
			// 	var _name =
			// 			_code.substring(0,2) + "-" +
			// 			_code.substring(2,4) + "-" +
			// 			_code.substring(4,6) + "-" +
			// 			_code.substring(6,10) + "-" +
			// 			_code.substring(10,13) + "-" +
			// 			_code.substring(13,19);
			// 	subFeatures.push(_name)
			// });
			// $$.each(tmp.villages.features, function (id,el) {
			// 	var _code = el.properties.adres1395;
			// 	if (_code.substring(0,2) === userLocation) {
			// 		var _name =
			// 				_code.substring(0,2) + "-" +
			// 				_code.substring(2,4) + "-" +
			// 				_code.substring(4,6) + "-" +
			// 				_code.substring(6,10) + "-" +
			// 				_code.substring(10,13) + "-" +
			// 				_code.substring(13,19);
			// 		subFeatures.push(_name)
			// 	}
			// });

			// CreatePicker('picker_locations', subFeatures);
			break;
		}
		case 'app_status': {
			var uc = AppSettings('uc');
			var pc = AppSettings('pc');
			var f111 = 0, f112 = 0, f113 = 0, f114 = 0, f115 = 0, f116 = 0;

			var _request = {
				_method: 'post',
				_url: getAddress('export'),
				_data: {
					action: actions.GET_STATUS,
					data: JSON.stringify({
						user: uc,
						pass: pc,
						// fid: 'f10',
						fid: '%f10',
						v: AppSettings('version')
					})
				}
			};

			Spinner2(true, 'fetch-status');
			SendRequest(_request, function (res) {
				Spinner2(false);
				if (!res.err) {
					var JSONres = JSON.parse(res.data);
					$$.each(JSONres, function (id, el) {
						// local > int
						// host > string
						if (el.completion === '1') {
							var fname = el.fname;
							if (fname === 'f111') f111 += 1;
							else if (fname === 'f112') f112 += 1;
							else if (fname === 'f113') f113 += 1;
							else if (fname === 'f114') f114 += 1;
							else if (fname === 'f115') f115 += 1;
							else if (fname === 'f116') f116 += 1;
						}
					});
					var allCategories =
						'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
						'<span style="font-size: 14px">' + forms['f111'] + '</span>' +
						'<span style="font-size: 13px">' + toPersian(String(f111)) + '</span>' +
						'</div>' +
						'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
						'<span style="font-size: 14px">' + forms['f112'] + '</span>' +
						'<span style="font-size: 13px">' + toPersian(String(f112)) + '</span>' +
						'</div>' +
						'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
						'<span style="font-size: 14px">' + forms['f113'] + '</span>' +
						'<span style="font-size: 13px">' + toPersian(String(f113)) + '</span>' +
						'</div>' +
						'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
						'<span style="font-size: 14px">' + forms['f114'] + '</span>' +
						'<span style="font-size: 13px">' + toPersian(String(f114)) + '</span>' +
						'</div>' +
						'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
						'<span style="font-size: 14px">' + forms['f115'] + '</span>' +
						'<span style="font-size: 13px">' + toPersian(String(f115)) + '</span>' +
						'</div>' +
						'<div style="display:flex;justify-content:space-around;align-items:center;line-height:40px;">' +
						'<span style="font-size: 14px">' + forms['f116'] + '</span>' +
						'<span style="font-size: 13px">' + toPersian(String(f116)) + '</span>' +
						'</div>';
					$$('#allCategories').html(allCategories);
				}
			});
			break;
		}
	}
});


//------------------------------------------------------------------------------------  Cordova Plugin Management
function onDeviceReady() {
	//*****************************************   Plugins List:
	//*****************************************   cordova plugin add cordova.plugins.geolocation		[]
	//*****************************************   cordova plugin add cordova.plugins.diagnostic@3		[OK]
	//*****************************************   cordova plugin add cordova-plugin-media				[]
	//*****************************************   cordova plugin add cordova-plugin-file				[OK]
	//*****************************************   cordova plugin add cordova-sqlite-storage				[OK]
	console.log('device is ready!')
	StorageAuthorized(function (res0) {
		if (!res0.err) {
			var datarecordRoot = AppSettings('root')
			CreateDirectory(cordova.file.externalRootDirectory, 'datarecord', function (res1) {
				if (!res1.err) {
					CreateDirectory(datarecordRoot, "forms", function (res2) {
						if (!res2.err) {
							var csvDir = AppSettings('root') + 'forms/'
							var csvName = AppSettings('data_name');
							var scvContent = '';
							window.resolveLocalFileSystemURL(csvDir, function (dir) {
								dir.getFile(csvName, { create: true }, function (fileEntry) {
									WriteFile(fileEntry, scvContent);
									// console.log('(Cordova Plugins => File) Create an empty <data.csv> file in /datarecord/forms successfully.')
								})
							})
						}
					})
					CreateDirectory(datarecordRoot, "image", function (res2) { a = 1 })
					CreateDirectory(datarecordRoot, "audio", function (res2) { a = 1 })
				} else {
					console.log('(Cordova Plugins => File) Error in creating directory: <<datarecord>>')
				}
			});
		}
	});

	// document.addEventListener("pause", onPauseApp, false);
	// document.addEventListener("resume", onResumeApp, false);
	// document.addEventListener("backbutton", onBackPressed, false);
	//document.addEventListener("menubutton", onMenuKeyDown, false);
}
function StorageAuthorized(callback) {
	cordova.plugins.diagnostic.isExternalStorageAuthorized(function (authorized) {
		if (authorized) {
			console.log('(Cordova Plugins => Storage) Access to device storage. ===> Granted')
			callback({ err: 0 });
		} else {
			console.log('(Cordova Plugins => Storage) Access to device storage. ===> Denied')
			callback({ err: 1 });
			surveyApp.modal({
				title: '',
				text:
					'<div>' +
					'<div class="row no-gutter">' +
					'<div>' +
					'<span class="mdi mdi-36px mdi-folder-account"></span>' +
					'</div>' +
					'<div class="col-80" style="text-align:left;font-weight:bold;line-height:60px">' +
					messages.app.title +
					'</div>' +
					'</div>' +
					'<div class="row no-gutter">' +
					'<div class="col-20"></div>' +
					'<div class="col-80">' +
					'<p style="text-align:left;font-size:16px;">' +
					messages.app.access.storage +
					'</p>' +
					'</div>' +
					'</div>' +
					'</div>',
				buttons: [{ text: "close" }]
			});
		}
	}, function (error) {
		callback({ err: 1, msg: error });
		console.error("(Cordova Plugins => Storage) Error in checking storage accessibility! ===> " + error);
	});
}


//------------------------------------------------------------------------------------  Hardware interaction
function CreateDirectory(dir, name, callback) {
	window.resolveLocalFileSystemURL(dir, function (dirEntry) {
		dirEntry.getDirectory(name, { create: true },
			function () {
				console.log('(Cordova Plugins => File) Directory <<' + name + '>> was created successfully.')
				callback({ err: 0 });
			},
			function (error) {
				console.log('(Cordova Plugins => File) Error in creating directory: <<' + name + '>> ===> ' + error)
				callback({ err: 1 });
			});
	})
}

function DeleteFile(filePath, fileName, callback) {
	window.resolveLocalFileSystemURL(filePath, function (e) {
		e.getFile(fileName, { create: false }, function (fileEntry) {
			fileEntry.remove(function (file) {
				callback({ err: 0, msg: `${fileName} removed.` })
			}, function (error) {
				callback({ err: 1, msg: `error occurred: ${error.code}` })
			}, function () {
				callback({ err: 1, msg: `${fileName} does not exist.` })
			});
		});
	});
}

function WriteFile(fileEntry, fileContent) {
	console.log('FileEntry', fileEntry.name)
	fileEntry.createWriter(function (fileWriter) {
		fileWriter.seek(fileWriter.length);
		var blob = new Blob([fileContent], { type: 'text/plain' });
		fileWriter.onwriteend = function () {
			console.log("(Write File) File was written successfully.");
			// console.log('(Write File) File <<'+ fileEntry.name +'>> was written successfully.');
		};
		fileWriter.onerror = function (e) {
			console.log("(Write File) Failed to write file. ===> " + e.toString());
			// console.log('(Write File) Failed to write file <<'+ fileEntry.name +'>>. ===> ', e.toString());
		};
		fileWriter.write(blob);
	});
}

function OpenExportData(fileFullPath, callback) {
	window.resolveLocalFileSystemURL(fileFullPath, function (e) {
		e.file(function (file) {
			var reader = new FileReader();
			reader.onloadend = function () {
				callback({ err: 0, file: this.result })
			};
			reader.readAsText(file);
		})
	}, function (e) {
		callback({ err: 1, file: {}, msg: `error occurred: ${e}` })
	});
}

function ExportData(data, callback) {
	var csvDir = AppSettings('root') + 'forms/'
	var csvName = AppSettings('data_name')
	var csvPath = csvDir + csvName

	OpenExportData(csvPath, function (res) {
		var fileContent = res.file;
		var data0 = fileContent.split("\n")
		if (data0.length >= 2) { data0 = data0.shift() }
		var data0 = data0.join('\n')

		var row0 = '', row1 = ''
		Object.keys(data).forEach(function (item, id) {
			var qName = item
			var qValue = data[item]
			if (Array.isArray(qValue)) {
				qValue = qValue.join('-')
			}
			row0 += qName + ','
			row1 += qValue + ','
		})

		row0 = row0.substring(0, row0.length - 1)
		row1 = row1.substring(0, row1.length - 1)
		content = row0 + '\n' + data0 + '\n' + row1

		DeleteFile(csvDir, csvName, function (res) {
			console.log(res.msg)
			window.resolveLocalFileSystemURL(csvDir, function (dir) {
				dir.getFile(csvName, { create: true }, function (fileEntry) {
					WriteFile(fileEntry, content);
					callback({ err: 0, file: fileEntry, msg: "data.csv file has been created." })
				})
			})
		})
	});
	// read exist file
	// add new data to existed file
	// FileExists(csvDir, csvName, function (res) {
	// 	var dataFile = res.file;
	// 	if (dataFile) {
	// 		dataFile.remove(function (removedFile) {
	// 			window.resolveLocalFileSystemURL(csvDir, function (dir) {
	// 				dir.getFile(csvName, { create: true }, function (fileEntry) {
	// 					dbSurveys.forEach(function (item, id) {
	// 						content += JSON.stringify(item);
	// 						if (id !== dbSurveys.length - 1)
	// 							content += '.+.+.newLine.+.+.';
	// 					});
	// 					WriteFile(fileEntry, content);
	// 					callback({ err: 0, file: fileEntry, msg: "data.csv file has been created." })
	// 				})
	// 			})
	// 		})
	// 	} else {
	// 		window.resolveLocalFileSystemURL(csvDir, function (dir) {
	// 			dir.getFile(csvName, { create: true }, function (fileEntry) {
	// 				dbSurveys.forEach(function (item, id) {
	// 					content += JSON.stringify(item);
	// 					if (id !== dbSurveys.length - 1)
	// 						content += '.+.+.newLine.+.+.';
	// 				});
	// 				WriteFile(fileEntry, content);
	// 				callback({ err: 0, file: fileEntry, msg: "data.csv file has been created." })
	// 			})
	// 		})
	// 	}
	// })
}




function testModal() {

}