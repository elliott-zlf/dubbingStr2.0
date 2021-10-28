(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"dubbingStr2.0","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"dubbingStr2.0","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"dubbingStr2.0","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"dubbingStr2.0","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"dubbingStr2.0","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*******************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 13 */
/*!**************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 14));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 15));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 19));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 20));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 24));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 25));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 26));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 27));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 28));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 29));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 30));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 17));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 16));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 31));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 18));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 32));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 33));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 34));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 35));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 36));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 37);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 38));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 39));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 40));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!*************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/mixin/mixin.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 15 */
/*!***************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/request/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 16));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 16 */
/*!********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/deepMerge.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),
/* 17 */
/*!********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/deepClone.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),
/* 18 */
/*!***************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/test.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),
/* 19 */
/*!**********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/queryParams.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),
/* 20 */
/*!****************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/route.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 21 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 22);

/***/ }),
/* 22 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 23);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 23 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 24 */
/*!*********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/timeFormat.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),
/* 25 */
/*!*******************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/timeFrom.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),
/* 26 */
/*!************************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/colorGradient.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),
/* 27 */
/*!***************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/guid.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),
/* 28 */
/*!****************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/color.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),
/* 29 */
/*!********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/type2icon.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),
/* 30 */
/*!**********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/randomArray.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),
/* 31 */
/*!******************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/addUnit.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 32 */
/*!*****************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/random.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),
/* 33 */
/*!***************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/trim.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),
/* 34 */
/*!****************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/toast.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 35 */
/*!********************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/getParent.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),
/* 36 */
/*!******************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/$parent.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 37 */
/*!**************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/sys.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 38 */
/*!*******************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/debounce.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 39 */
/*!*******************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/function/throttle.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),
/* 40 */
/*!***************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/config/config.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-03-17
var version = '1.8.4';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),
/* 41 */
/*!***************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/uview-ui/libs/config/zIndex.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 42 */
/*!***********************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/store/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 43));

var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // uniapp 已默认安装，不需要重新下载
// 导入search.js 暴露的对象
// 安装Vuex插件
_vue.default.use(_vuex.default);
// 3. 创建store实列
var store = new _vuex.default.Store({
  modules: {
    user: _user.default } });var _default =


store;exports.default = _default;

/***/ }),
/* 43 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 44 */
/*!******************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/store/modules/user.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));var _index = __webpack_require__(/*! api/index */ 45);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var STORAGE_KEY = 'user-info';
var TOKEN_KEY = 'token';
var PHONE_NUM = 'phoneNumber';var _default =
{
  namespaced: true,
  state: function state() {
    return {
      // 用户 token
      token: uni.getStorageSync(TOKEN_KEY) || '',
      // 用户信息
      userInfo: uni.getStorageSync(STORAGE_KEY) || {},
      phoneNumber: uni.getStorageSync(PHONE_NUM) || '' };

  },
  mutations: {
    /**
                * 保存 token 到 vuex
                */
    setToken: function setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    /**
        * 保存 token 到 本地存储
        */
    saveToken: function saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token });

    },
    setPhone: function setPhone(state, phone) {
      state.phoneNumber = phone;
      this.commit('user/savePhone');
    },
    savePhone: function savePhone(state) {
      uni.setStorage({
        key: PHONE_NUM,
        data: state.phoneNumber });

    },
    /**
        * 删除 token
        */
    removeToken: function removeToken(state) {
      state.token = '';
      this.commit('user/saveToken');
    },
    /**
        * 保存 用户信息 到 vuex
        */
    setUserInfo: function setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit('user/saveUserInfo');
    },
    /**
        * 保存 用户信息 到 本地存储
        */
    saveUserInfo: function saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo });

    },
    /**
        * 删除用户信息
        */
    removeUserInfo: function removeUserInfo(state) {
      state.userInfo = {};
      this.commit('user/saveUserInfo');
    } },

  actions: {
    /**
              * 完成登录
              */
    login: function login(context, userProfile) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                  (0, _index.login)({
                    code: userProfile }));case 2:res = _context.sent;

                // 登录逻辑
                console.log('登录请求', res.data);
                _this.commit('user/setToken', res.data);
                // this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
              case 5:case "end":return _context.stop();}}}, _callee);}))();},
    saveUserInfo: function saveUserInfo(content, userProfile) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var data, wechatUser;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                console.log('user个人资料', userProfile);
                data = userProfile.userInfo;
                wechatUser = {
                  avatar: data.avatarUrl,
                  city: data.province,
                  nickname: data.nickName };

                // const res = await saveUserInfo(wechatUser)
                _this2.commit('user/setUserInfo', JSON.parse(userProfile.rawData));case 4:case "end":return _context2.stop();}}}, _callee2);}))();
    },
    getWechatUserInfo: function getWechatUserInfo(content) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var res;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                  (0, _index.getWechatUserInfo)());case 2:res = _context3.sent;
                _this3.commit('user/setPhone', res.data.phone);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
    },
    /**
        * 退出登录
        */
    logout: function logout(context) {
      this.commit('user/removeToken');
      this.commit('user/removeUserInfo');
    },
    /**
        * 进行登录判定
        */
    isLogin: function isLogin(context) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var _yield$uni$showModal, _yield$uni$showModal2, error, res, cancel, confirm;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
                context.state.token) {_context4.next = 2;break;}return _context4.abrupt("return", true);case 2:_context4.next = 4;return (

                  uni.showModal({
                    title: '登录之后才可以进行后续操作',
                    content: '立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）' }));case 4:_yield$uni$showModal = _context4.sent;_yield$uni$showModal2 = _slicedToArray(_yield$uni$showModal, 2);error = _yield$uni$showModal2[0];res = _yield$uni$showModal2[1];

                cancel = res.cancel, confirm = res.confirm;
                if (confirm) {
                  uni.navigateTo({
                    url: '/subpkg/pages/login-page/login-page' });

                }return _context4.abrupt("return",
                false);case 11:case "end":return _context4.stop();}}}, _callee4);}))();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 45 */
/*!*********************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/api/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.login = login;exports.getwechatDemand = getwechatDemand;exports.getWechatUserInfo = getWechatUserInfo;exports.saveUserInfo = saveUserInfo;exports.getAllteacher = getAllteacher;exports.serviceLits = serviceLits;exports.homeConfig = homeConfig;exports.loginShare = loginShare;var _request = _interopRequireDefault(__webpack_require__(/*! ../utils/request */ 46));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function login(data) {
  return (0, _request.default)({
    url: '/resources/login/login',
    method: 'POST',
    data: data });

}
function getwechatDemand(data) {
  return (0, _request.default)({
    url: '/wechatDemand/add',
    method: 'POST',
    data: data });

}
function getWechatUserInfo(data) {
  return (0, _request.default)({
    url: '/user/getWechatUserInfo',
    method: 'GET',
    data: data });

}
function saveUserInfo(data) {
  return (0, _request.default)({
    url: '/user/saveUserInfo',
    method: 'POST',
    data: data });

}
function getAllteacher() {
  return (0, _request.default)({
    url: '/resources/login/list',
    method: 'GET' });

}
function serviceLits(data) {
  return (0, _request.default)({
    url: '/resources/login/list',
    method: 'POST',
    data: data });

}
// 筛选标签
function homeConfig() {
  return (0, _request.default)({
    url: '/resources/home/config',
    method: 'GET' });

}
// 分享
function loginShare(data) {
  return (0, _request.default)({
    url: '/resources/login/share',
    method: 'POST',
    data: data });

}

/***/ }),
/* 46 */
/*!*************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/utils/request.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _store = _interopRequireDefault(__webpack_require__(/*! ../store */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// const BASE_URL = 'http://42.192.120.145:8001'
var BASE_URL = 'https://www.peiyinstreet.com';
function request(_ref) {var url = _ref.url,data = _ref.data,method = _ref.method;
  return new Promise(function (resolve, reject) {
    uni.request({
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        UserToken: _store.default.state.user.token || '' },

      success: function success(_ref2) {var data = _ref2.data;
        console.log('接口返回数据', data);
        if (data.errcode === 0) {
          resolve(data);
        } else {
          reject(data.message);
        }
      },
      fail: function fail(error) {
        reject(error);
      } });

  });
}var _default =

request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/*!*********************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/static/home/colorRed.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 54 */
/*!**********************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/static/home/colorBlue.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 55 */
/*!************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/static/home/colorYellow.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 56 */
/*!*****************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/static/home/play.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAADPElEQVRYhdWZQUsbQRTHcxG8C/kAgp/AD+BFxILnFqOhlQiFQFIx9FCEHkp7kkJLQNqKRERIq6VSElM8xIAQD4WAJdRDe2hLSVFK6VFSk/31MLtxdrNJZjeblX3wDlky//1l8mbemzehkAcGDANjwAQwC6R0n9WfjQHDXryrH8gwEANywAW97UL/bgwI+wk6DhwATQXITtbUNcYHCToKZAHNFqF2BienUCzDTl54sSye1c46gWu65qjXsEmgbnpVowGVKqQ3IZKAyUh3jyTEdytVMdZsdSDpBegQsG6eEw1KxxBd6g3ZyaNLQkNr+7PWgSG3sCPAkUnu8xeIr7gHtXp8RWia7QgYcTOzZtgPJZiOegdr+HRUaLdDq8+0KQwaTVjb8h7U6mtb4l1SeKjCJk2/1Q9YGdps3RciYuu62g0Kh/7BGm4OjzrdtjzEnni1wAYRsyoxbV6I2U6w4xhJQdO83Q2cenxF3vI07DIiIlUKKx1fH6zhpWN5lg+ssGGM2qDRcJ8UbtyGuw/gZrx/4OiSnBGbyAUTsNj6LZWqO9DdfXPK/fgJFlL9QVeq8iwvysC51uN0xrlwvoit1f/BxmuYmncHnM7IajkDdhi5nlUpZGSfv2cPK9vXbyJUnAJHErLKBTAcQpwGhNXOnIs+et4bGES4ZN+L8HGiby5Nx0KII4ywk1PnwE9fqQEb9qMGc0l1/ZNTefRECHHuElYsDx4Y4Pw3zCyo6RfL8sjZEOKwKGwn7w8wwLMNNf2dvDwqFQKWWx939/0D3jtQ09/dl0ctX09IAGzvuQ6JidZHPxYdiDpBNanYLLr+tjWnwJoGqy/V9W22tf4Sx+oLddhf53D/ibq2XeJoT82bzoBTj3uDNpvwtqC+lRme3pRVcnItEWs9dlr8TM11a5TA95+QeOg81CYj1uIn5l15eScFf/6aQS8vYfud+1NLt/LSkwJ+ZkEkgzc5WM/CrT5r4m4FfCCPSIE7hOrAwTrm69DBaaRI0MFpVenA7c3AwuHgmoGFQ+vMOmsG6tDBabdaZjoYDW0LeJcrg4yDK4PMYK8MLNDBuZSxgAfj2ssGPIxocTm9WFzEz4vFDvC+Xd3+B+qllXHhvqWUAAAAAElFTkSuQmCC"

/***/ }),
/* 57 */
/*!***********************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/static/home/palyActive.gif ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,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"

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/*!************************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/static/my/defaultAvatar.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/*!***********************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/api/message.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.logingroup = logingroup;exports.loginwebsite = loginwebsite;var _request = _interopRequireDefault(__webpack_require__(/*! ../utils/request */ 46));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function logingroup(data) {
  return (0, _request.default)({
    url: '/resources/login/group',
    method: 'POST',
    data: data });

}
function loginwebsite(data) {
  return (0, _request.default)({
    url: '/resources/login/website',
    method: 'POST',
    data: data });

}

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/*!**************************************************************!*\
  !*** /Users/elliott/Desktop/dubbingStr2.0/utils/uni-copy.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = uniCopy;function uniCopy(_ref) {var content = _ref.content,_success = _ref.success,error = _ref.error;
  if (!content) return error('复制的内容不能为空 !');
  content = typeof content === 'string' ? content : content.toString(); // 复制内容，必须字符串，数字需要转换为字符串
  /**
   * 小程序端 和 app端的复制逻辑
   */

  uni.setClipboardData({
    data: content,
    success: function success() {
      _success("复制链接成功，请在浏览器上打开下载");
      console.log('success');
    },
    fail: function fail() {
      _success("复制失败，请重新复制");
    } });



  /**
           * H5端的复制逻辑
           */



















}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map