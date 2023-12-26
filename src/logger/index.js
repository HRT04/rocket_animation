// import { createLogger, StringifyObjectsHook, type LoggerHook, type LogEvent } from 'vue-logger-plugin'
// import axios from 'axios';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var DomLogger = /** @class */ (function () {
    function DomLogger() {
    }
    DomLogger.prototype.output = function () {
        var texts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            texts[_i] = arguments[_i];
        }
        var console_dom = document.getElementById("console");
        var text_node = document.createTextNode(texts.join(",") + "/");
        console_dom === null || console_dom === void 0 ? void 0 : console_dom.appendChild(text_node);
    };
    return DomLogger;
}());
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function () {
        var _a;
        var texts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            texts[_i] = arguments[_i];
        }
        (_a = this.hook) === null || _a === void 0 ? void 0 : _a.output.apply(_a, texts);
        console.log.apply(console, texts);
    };
    Logger.prototype.error = function () {
        var _a;
        var texts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            texts[_i] = arguments[_i];
        }
        (_a = this.hook) === null || _a === void 0 ? void 0 : _a.output.apply(_a, __spreadArray(["Error:"], texts, false));
        console.log.apply(console, texts);
    };
    return Logger;
}());
var useLogger = function () {
    var logger = new Logger();
    logger.hook = new DomLogger();
    return logger;
};
// const logger = createLogger({
//     // ... (other options)
//     beforeHooks: [StringifyObjectsHook],
//     afterHooks: [ServerLogHook]
// });
export default useLogger;
