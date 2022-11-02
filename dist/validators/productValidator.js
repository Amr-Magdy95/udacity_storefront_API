"use strict";
exports.__esModule = true;
exports.productValidator = void 0;
/* eslint-disable no-useless-escape */
var productValidator = function (name, price) {
    try {
        if (name === '' || price === '') {
            throw new Error('please enter non-empty values');
        }
        if (!/^[a-zA-Z\-]+$/.test(name)) {
            throw new Error('please enter a valid product name');
        }
        var intPrice = parseFloat(price);
        var regExp = /[a-zA-Z]/g;
        if (isNaN(intPrice) || intPrice <= 0 || regExp.test(price)) {
            throw new Error('Invalid price');
        }
    }
    catch (err) {
        throw new Error("".concat(err));
    }
};
exports.productValidator = productValidator;
