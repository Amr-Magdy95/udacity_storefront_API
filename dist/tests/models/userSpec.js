"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
describe('Testing User Model', () => {
    describe('Testing Definitions', () => {
        it('testing whether the user model index is defined', () => {
            expect(userStore.index).toBeDefined();
        });
        it('testing whether the user model show is defined', () => {
            expect(userStore.show).toBeDefined();
        });
        it('testing whether the user model create is defined', () => {
            expect(userStore.create).toBeDefined();
        });
        it('testing whether the user model authenticate is defined', () => {
            expect(userStore.authenticate).toBeDefined();
        });
    });
    // afterAll( async()=>{
    //     const conn = await  Client.connect();
    //     const sql = "TRUNCATE users,orders RESTART IDENTITY CASCADE";
    //     const result = await conn.query(sql);
    //     conn.release();
    // })
    describe('Testing Functionality', () => {
        // beforeAll(async()=>{
        //     const result = await userStore.create({
        //         "firstname": "John",
        //         "lastname": "Doe",
        //         "email": "johndoe@gmail.com",
        //         "password": "password@12"
        //     });
        // });
        it('Testing create', async () => {
            const result = await userStore.create({
                firstname: 'John',
                lastname: 'Doe',
                email: 'johndoe@gmai.com',
                password: 'password@12',
            });
            expect(result).toBeTruthy();
        });
        describe('testing index and authenticate', () => {
            beforeAll(async () => {
                await userStore.create({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'johndoe@gmail.com',
                    password: 'password@12',
                });
            });
            it('testing index', async () => {
                const result = await userStore.index();
                expect(result).toBeTruthy();
            });
            it('testing authenticate', async () => {
                const result = await userStore.authenticate('johndoe@gmail.com', 'password@12');
                expect(result).toBeTruthy();
            });
        });
    });
});
