/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var mykey = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c';
var calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';

var schedule = $.grabCalendar({
  type: "detailedEvents",
  clean_date: false,
  maxEvents: 20,
  upcoming: true,
});

var template = $('#gig').html();
Mustache.parse(template);

for (var i = 0; i < schedule.length; i++) {
  var date =  moment(schedule[i].start.dateTime).format('dddd, MMM Do YYYY');
  var start = moment(schedule[i].start.dateTime).format('h:mmA');
  var end = moment(schedule[i].end.dateTime).format('h:mmA');
  var band = schedule[i].summary;
  var venue = schedule[i].location;
  var venueMap = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(venue);

  var rendered = Mustache.render(template, {date: date, start: start, end: end, band: band, venueMap: venueMap});
  $('#gigs ul').append(rendered);
}



/***/ })
/******/ ]);