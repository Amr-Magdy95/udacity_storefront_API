"use strict";
exports.__esModule = true;
exports.idQuantityValidator = void 0;
/* eslint-disable no-useless-escape */
var idQuantityValidator = function (value, type) {
    if (type === void 0) { type = 'id'; }
    var intValue = parseInt(value);
    var regExp = /[a-zA-Z]/g;
    if (isNaN(intValue) || intValue <= 0 || regExp.test(value)) {
        throw new Error("Invalid ".concat(type));
    }
    // if(isInt===true && !/[1-9][0-9]*/.test(value)){
    //   throw new Error('enter a valid integer for quantity and id');
    // }
};
exports.idQuantityValidator = idQuantityValidator;
