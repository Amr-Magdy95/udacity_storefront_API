"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../../models/user");
const order_1 = require("../../models/order");
const userStore = new user_1.UserStore();
const orderStore = new order_1.OrderStore();
const request = (0, supertest_1.default)(server_1.default);
describe('Testing Dashboard Queries ', () => {
    beforeAll(async () => {
        // Creating a user
        await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'password@12',
        });
        // Creating an order
        await orderStore.create({
            user_id: '1',
            status: 'incomplete',
        });
    });
    afterAll(async () => {
        // Cleanup
        const conn = database_1.default.connect();
        const sql = 'TRUNCATE users,orders RESTART IDENTITY CASCADE';
        (await conn).query(sql);
        (await conn).release();
    });
    it('GET /users/:id/orders', async () => {
        const response = await request.get('/users/1/orders');
        expect(response.status).toEqual(200);
    });
});
