"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// in order to be able to use env variables
dotenv_1["default"].config();
// retrieving env variables
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB_DEV = _a.POSTGRES_DB_DEV, POSTGRES_USER_DEV = _a.POSTGRES_USER_DEV, POSTGRES_PASSWORD_DEV = _a.POSTGRES_PASSWORD_DEV, ENV = _a.ENV, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER_TEST = _a.POSTGRES_USER_TEST, POSTGRES_PASSWORD_TEST = _a.POSTGRES_PASSWORD_TEST;
var client = new pg_1.Pool({});
// initiating a connection with the database
if ((ENV === null || ENV === void 0 ? void 0 : ENV.trim()) == 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_DEV,
        user: POSTGRES_USER_DEV,
        password: POSTGRES_PASSWORD_DEV
    });
}
if ((ENV === null || ENV === void 0 ? void 0 : ENV.trim()) == 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER_TEST,
        password: POSTGRES_PASSWORD_TEST
    });
}
exports["default"] = client;
