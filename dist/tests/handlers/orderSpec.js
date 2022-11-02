"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const request = (0, supertest_1.default)(server_1.default);
describe('Testing Order Model', () => {
    let token;
    beforeAll(async () => {
        // Creating a user
        await userStore.create({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'password@12',
        });
        // Retrieving jwt for above user to use in future tests
        const response = await request
            .post('/users/auth')
            .send({ email: 'johndoe@gmail.com', password: 'password@12' });
        token = response.body;
    });
    afterAll(async () => {
        // Cleanup
        const conn = database_1.default.connect();
        const sql = 'TRUNCATE users,orders,products,order_products RESTART IDENTITY CASCADE';
        (await conn).query(sql);
        (await conn).release();
    });
    describe(' GET /orders', () => {
        it('GET /orders', async () => {
            const response = await request.get('/orders');
            expect(response.status).toEqual(200);
        });
    });
    describe('POST /orders', () => {
        it('POST /orders', async () => {
            const response = await request
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({ user_id: '1', status: 'incomplete' });
            expect(response.status).toEqual(200);
        });
    });
    it('GET /users/:id', async () => {
        const response = await request.get(`/orders/1`);
        expect(response.status).toEqual(200);
    });
    describe('POST /orders/:order_id/products', () => {
        beforeAll(async () => {
            await productStore.create({ name: 'Food', price: 12.25 });
        });
        it('proceeding on testing', async () => {
            const response = await request
                .post('/orders/1/products')
                .set('Authorization', `Bearer ${token}`)
                .send({ order_id: '1', product_id: '1', quantity: '5' });
            expect(response.status).toEqual(200);
        });
    });
});
