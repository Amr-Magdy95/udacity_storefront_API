"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
describe('Testing User Endpoints', () => {
    describe('POST /users', () => {
        it('testing create endpoint with empty values', async () => {
            const response = await request.post('/users');
            expect(response.status).toEqual(400);
        });
        it('testing create endpoint with non-empty values', async () => {
            const response = await request.post('/users').send({
                firstname: 'John',
                lastname: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'password@12',
            });
            expect(response.status).toEqual(200);
        });
    });
    describe('testing authenticating a user', () => {
        it('testing unauthorized user', async () => {
            const response = await request.post('/users/auth');
            expect(response.status).toEqual(400);
        });
        it('testing authorized user', async () => {
            const response = await request
                .post('/users/auth')
                .send({ email: 'johndoe@gmail.com', password: 'password@12' });
            expect(response.status).toEqual(200);
        });
    });
    describe('testing w/o auth token', () => {
        it('testing index endpoint', async () => {
            const response = await request.get('/users');
            expect(response.status).toEqual(401);
        });
        it('testing show endpoint', async () => {
            const response = await request.get('/users/1');
            expect(response.status).toEqual(401);
        });
    });
    describe('testing with auth token', () => {
        beforeAll(async () => {
            const response = await request
                .post('/users/auth')
                .set('Accept', 'application/json')
                .send({ email: 'johndoe@gmail.com', password: 'password@12' });
            exports.token = response.body;
        });
        it('testing index endpoint with token', async () => {
            const response = await request
                .get('/users')
                .set('Authorization', `Bearer ${exports.token}`)
                .set('Accept', 'application/json');
            expect(response.status).toEqual(200);
        });
        it('testing show endpoint with token', async () => {
            const response = await request
                .get('/users/1')
                .set('Authorization', `Bearer ${exports.token}`)
                .set('Accept', 'application/json');
            expect(response.status).toEqual(200);
        });
    });
    afterAll(async () => {
        const conn = database_1.default.connect();
        const sql = 'TRUNCATE users,orders,products,order_products RESTART IDENTITY CASCADE ';
        (await conn).query(sql);
        (await conn).release();
    });
});
