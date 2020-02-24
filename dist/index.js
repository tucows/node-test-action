module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
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
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 34:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(6)
const io = __webpack_require__(298)
const exec = __webpack_require__(273)

const PROJECT_DIR = core.getInput('directory')
const IS_GLOBAL_INSTALL = core.getInput('globalInstall')

const install = () => io
	.which('npm', true)
	.then(npm => {
		core.debug(`npm at "${npm}"`)

		if(PROJECT_DIR)
			process.chdir(`./${PROJECT_DIR}`)

		let install = IS_GLOBAL_INSTALL ? 'i -g' : 'i'
		return exec.exec(npm, install)
	})

const test = () => io
	.which('npm', true)
	.then(npm => exec.exec(npm, 'test'))

install()
.then(test)
.catch(error => {
	console.error(error)
	core.setFailed(error.message)
	process.exit(1)
})


/***/ }),

/***/ 273:
/***/ (function() {

eval("require")("@actions/exec");


/***/ }),

/***/ 298:
/***/ (function() {

eval("require")("@actions/io");


/***/ })

/******/ });
