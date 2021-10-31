const request = require('supertest');
const User = require('../../../models/users');
const HashPassword = require('../../../utils/hash-password');

let server;
describe('/api/v1/users', () => {
    beforeEach(() => { 
        server = require('../../../server');
    });
    afterEach(async() => {
        server.close();
        await User.deleteMany({})
    });

    describe('Register/create new user', () => {
        
        let url = '/api/v1/register';

        let userPayload = {
            firstName: "user_firstname",
            lastName: "user_lastname",
            email: "user_email",
            password: "user_password",
            regNo: "user_regNo",
            department: "user_department",
            level: "lev"
         };
         
        it('should return 400 if user firstname is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.firstName = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user lastname is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.lastName = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user email is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.email = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user password is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.password = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user registration number is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.regNo = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user level is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.level = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user department is missing from the payload', async () => {
            const res = await request(server).post(url).send(userPayload);
            userPayload.department = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user already exists', async () => {
            //Populate user collection in the database;

             await User.insertMany({
                firstName: "user_firstname",
                lastName: "user_lastname",
                email: "user_email",
                password: "user_password",
                regNo: "user_regNo",
                department: "user_department",
                level: "lev"
             });
             
             const unwantedUserPayload = {
                regNo: "user_regNo"
             }

            const res = await request(server).post(url).send(unwantedUserPayload);
            expect(res.status).toEqual(400);
        });

        it('should return a hashed password', async () => {
             const hashedPassword = await HashPassword.encryptPassword(userPayload.password);
             
            expect(hashedPassword).toBeTruthy();
        });

        it('should create new users', async () => {
            
            const user = await User.create({
                firstName: "user_firstname",
                lastName: "user_lastname",
                email: "user_email",
                password: "user_password",
                regNo: "user_regNo",
                department: "user_department",
                level: "lev"
             });  
          
            expect(user).not.toBe(null);
            expect(user).toHaveProperty("_id");
        });

       
    });
})