/**
 * Created by ArashMad on 04/07/2018.
 */




//  ----------------------------------------------------------------------------------------------------------------------
//  ------------------------------------------------------------------------------------- DOM element click event handling
//  ----------------------------------------------------------------------------------------------------------------------
$$(document).on('click', (e) => {
	if (e.target.className.indexOf('modal-overlay modal-overlay-visible active-state') >= 0 && e.target.tagName.toLowerCase() == 'div') {
		if (CurrentPage().name === 'app.main') {
			surveyApp.closeModal()
		}
	}
})


function openLeftMenu() { surveyApp.openPanel('left') }
function closeLeftMenu() { surveyApp.closePanel() }


//  ----------------------------------------------------------------------------------------------------------------------
//  ---------------------------------------------------------------------------------------------------------------------- Tabs (Form and Map)
//  ----------------------------------------------------------------------------------------------------------------------
function changeTab(tabname){
	var tabname = '#' + tabname
	$$('#tab-form').hide()
	$$('#tab-map').hide()
	$$(tabname).show()

	var addPointIcon = $$($$('[data-page="app.form"]>.navbar .right a')[0])
	var addFormIcon = $$($$('[data-page="app.form"]>.navbar .right a')[1])
	var saveFormIcon = $$($$('[data-page="app.form"]>.navbar .right a')[2])
	var backIcon = $$($$('[data-page="app.form"]>.navbar .left a')[0])
	var pageTitle = $$('#form_page_name')
	// var addLocationIcon = $$('[data-page="app.form"]>.navbar .right a')[3]
	if(tabname == '#tab-map') {
		addPointIcon.hide()
		backIcon.hide()
		addFormIcon.show()
		saveFormIcon.show()
		pageTitle.text('Map')
	} else {
		addPointIcon.show()
		backIcon.show()
		addFormIcon.hide()
		saveFormIcon.hide()
		pageTitle.text('Form')
	}
	// AppSettings('form_data', getFormData())
}

function displayForm(action) {
	switch (action) {
		case 'new':
			// clear form
			// appsettings -> form-status : new
			break;
		case 'edit':
			// fill form
			// appsettings -> form-status : edit
			break;
		default:
			break;
	}
	surveyApp.popup('.popup-form', false, false);
}


//  ----------------------------------------------------------------------------------------------------------------------
//  ---------------------------------------------------------------------------------------------------------------------- Form Management
//  ----------------------------------------------------------------------------------------------------------------------
function getFormData() {
	// var formData = surveyApp.formToData('#form-data')
	$$('input[name="create_date"]').val(getDate())
	$$('input[name="create_time"]').val(getTime())
	return surveyApp.formToData('#form-data')
}

function saveFormData() {
	// handing with modal and ???
	var formData = getFormData()
	// var formHeader = Object.keys(formData).join(',')
	ExportData(formData, function(res) {
		if (!res.err) {
			console.log('Form was saved successfully.')
		} else {
			console.log('Faild to save Form!')
		}
	})
}

function discardForm() {
	surveyApp.closeModal('.popup-form', false)
}

function deleteForm() { }

function createFormId() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1; if (m < 10) m = '0' + m
	var d = date.getDate(); if (d < 10) d = '0' + d
	var h = date.getHours(); if (h < 10) h = '0' + h
	var mi = date.getMinutes(); if (mi < 10) mi = '0' + mi
	var s = date.getSeconds(); if (s < 10) s = '0' + s
	return y + '' + m + '' + d + '' + h + '' + mi + '' + s
}


//  ----------------------------------------------------------------------------------------------------------------------
//  ---------------------------------------------------------------------------------------------------------------------- General functions
//  ----------------------------------------------------------------------------------------------------------------------
function getDate() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1; if (m < 10) m = '0' + m
	var d = date.getDate(); if (d < 10) d = '0' + d
	return y + '-' + m + '-' + d
}
function getTime() {
	var date = new Date();
	var h = date.getHours(); if (h < 10) h = '0' + h
	var m = date.getMinutes(); if (m < 10) mi = '0' + m
	var s = date.getSeconds(); if (s < 10) s = '0' + s
	return h + ':' + m + ':' + s
}

//  ----------------------------------------------------------------------------------------------------------------------
//  ---------------------------------------------------------------------------------------------------------------------- Map functions
//  ----------------------------------------------------------------------------------------------------------------------
var allStyles = {
	nullStyle: {
		fillColor: '#fff',
		fillOpacity: 0,
		color: '#fff',
		opacity: 0,
		weight: 0
	},
	nullStyle0: {
		color: '#fff',
		opacity: 0,
		weight: 0
	},
	provinceStyle: {
		fillColor: '#fff',
		fillOpacity: 0,
		color: '#444',
		opacity: 1,
		weight: 5
	},
	blockStyle: {
		fillColor: '#000',
		fillOpacity: 0.5,
		color: '#444',
		opacity: 1,
		weight: 1
	},
	blockStyle0: {
		color: '#ff4149',
		opacity: 1,
		weight: 5
	}
};

function createMarker(name) {
	// https://stackoverflow.com/questions/41590102/change-leaflet-marker-icon
	switch (name) {
		case 'marker-success':
				// https://www.flaticon.com/free-icon/check_484134
				return L.icon({
					iconUrl: 'img/marker-success.png',
					iconSize:     [30, 30],
					iconAnchor:   [15, 30],
					// popupAnchor:  [-5, 30]
				})
		
		case 'marker-warning':
			// https://www.flaticon.com/free-icon/ask_484133
			// https://www.flaticon.com/free-icon/alert_484132
			return L.icon({
				iconUrl: 'img/marker-success.png',
				iconSize:     [30, 30],
				iconAnchor:   [15, 30],
				// popupAnchor:  [-5, 30]
			})
	
		default:
			// https://www.flaticon.com/free-icon/add_484131
			return L.icon({
				iconUrl: 'img/marker.png',
				iconSize:     [30, 30], // size of the icon
				iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
				className: "my-custom-pin",
				// popupAnchor:  [-5, 30]
			})
	}
}

function createMap(mapID) {
	init_center = AppSettings('map_init_center').split(',')
	init_zoom = AppSettings('map_init_zoom')

	// user_location = 1
	// if (user_location) {
	// 	init_center = user_location
	// 	init_zoom = 18
	// }

	AppSettings(mapID, L.map(mapID, {
		center: [init_center[0], init_center[1]],
		zoom: init_zoom,
		zoomControl: false
	}));
}

function createLayer(layer) {
	switch (layer) {
		case 'osm_lyr':
			AppSettings('osm_lyr',
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					// maxZoom: 18,
					attribution: 'OpenStreetMap | INRS'
				}))
			break;

		case 'sat_lyr':
			AppSettings('sat_lyr',
				L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
					// maxZoom: 18,
					attribution: 'ESRI Imagery | INRS'
				}))
			break;

		case 'rec_lyr':
			// AppSettings('rec_lyr',
			// 	L.geoJSON(water_bodies, { style: featureStyles.water_body }))
			break;
	}
}

function changeBaseMap(layerName) {
	var mainMap = AppSettings('main_map')
	var satLayer = AppSettings('sat_lyr')
	var osmLayer = AppSettings('osm_lyr')
	var newLayer = AppSettings(layerName)

	mainMap.removeLayer(osmLayer)
	mainMap.removeLayer(satLayer)
	mainMap.addLayer(newLayer)

	closeLeftMenu()
}

function zoomTo(address1395) {
	var mainMap = AppSettings('map');
	mainMap.eachLayer(function (layer) {
		var feature = layer.feature;
		if (feature && feature.properties.adres1395) {
			if (feature.properties.adres1395 === address1395) {
				// if (feature.geometry.type.toLowerCase().indexOf('polygon') >= 0) {
				if (feature.geometry.type.toLowerCase().indexOf('line') >= 0) {
					mainMap.fitBounds(layer.getBounds(), { padding: [50, 50] });
				} else {
					var featureCenter = feature.geometry.coordinates;
					mainMap.setView(new L.LatLng(featureCenter[1], featureCenter[0]), 14);
				}
			}
		}
	})
}


// function displayBasemapList() {
// 	surveyApp.modal({
// 		text:
// 			'<div>' +
// 			'<div style="font-size:18px;font-weight:bold;">Select yout basemap</div>' +
// 			'<div style="margin:16px;"></div>' +
// 			'<div id="modal-basemap-list">' +
// 			'<div data-name="sat_lyr" style="display:flex;flex-direction:row;align-items:center;">' +
// 			'<img src="img/sat.jpg" style="width:40px;margin-right:16px;border-radius: 25%;border: solid #444 2px;"></img>' +
// 			'<p style="margin:0; font-size: 18px;">Satellite Map</p>' +
// 			'</div>' +
// 			'<div style="margin:8px;"></div>' +
// 			'<div data-name="osm_lyr" style="display:flex;flex-direction:row;align-items:center;">' +
// 			'<img src="img/osm.jpg" style="width:40px;margin-right:16px;border-radius: 25%;border: solid #444 2px;"></img>' +
// 			'<p style="margin:0; font-size: 18px;">Open Street Map</p>' +
// 			'</div>' +
// 			'</div>' +
// 			'</div>'
// 	})
// }


// if ($$('.picker-modal.modal-in').length > 0) {
// 	surveyApp.closeModal('.picker-modal.modal-in');
// }
// surveyApp.pickerModal(
// 	'<div class="picker-modal">' +
// 	'<div class="toolbar">' +
// 	'<div class="toolbar-inner">' +
// 	'<div class="left"></div>' +
// 	'<div class="right"><a href="#" class="close-picker">Close</a></div>' +
// 	'</div>' +
// 	'</div>' +
// 	'<div class="picker-modal-inner">' +
// 	'<div class="content-block">' +
// 	'<p>Lorem ipsum dolor ...</p>' +
// 	'</div>' +
// 	'</div>' +
// 	'</div>'
// )
// $$(document).on('click', '#modal-basemap-list div', function (e) {
// 	// if (e.target.closest('.modal') && e.target.closest('.modal').length)
// 	// 	return;
// 	if (CurrentPage().name === 'app.map' && $$(e.target).data('name')) {
// 		var mainMap = AppSettings('map')
// 		var satLayer = AppSettings('sat_lyr')
// 		var osmLayer = AppSettings('osm_lyr')
// 		var newLayer = AppSettings($$(e.target).data('name'))

// 		mainMap.removeLayer(osmLayer)
// 		mainMap.removeLayer(satLayer)
// 		mainMap.addLayer(newLayer)

// 		surveyApp.closeModal()
// 	}

// });