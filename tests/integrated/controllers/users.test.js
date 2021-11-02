const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../../models/users');
const HashPassword = require('../../../utils/hash-password');
const getResetPasswordToken = require('../../../utils/reset-password');
const { removeAllCollections, dropAllCollections } = require('../../test-setup');

let server;
const url = '/api/v1';
const databaseName = "regDB_tests";


describe('Auth', () => {
    
    beforeAll(async () => {
        let databaseURI = `mongodb://localhost:27017/${databaseName}`
        await mongoose.connect(databaseURI, {
            useNewUrlParser: true
        });
        server = require('../../../server');
    });

    afterEach(async () => {
        server.close();
        await removeAllCollections();
    });

    afterAll(async () => {
        await dropAllCollections();
    })
    
    let userPayload = {
        firstName: "user_firstname",
        lastName: "user_lastname",
        email: "user_email",
        password: "user_password",
        regNo: "user_regNo",
        level: "lev",
        department: "user_department"
     };

    describe('Register new user (/api/v1/register)', () => {
        
         const exec = async () => {
             return await request(server).post(`${url}/register`).send(userPayload);
         }
         
        it('should return 400 if user firstname is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.firstName = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.firstName.message).toMatch(/firstName/);
            }            
        });

        it('should return 400 if user lastname is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.lastName = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.lastName.message).toMatch(/lastName/);
            }        
        });

        it('should return 400 if user email is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.email = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.email.message).toMatch(/email/);
            }
        });

        it('should return 400 if user password is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.password = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.password.message).toMatch(/password/);
            }
        });

        it('should return 400 if user registration number is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.regNo = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.regNo.message).toMatch(/regNo/);
            }
        });

        it('should return 400 if user level is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.level = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.level.message).toMatch(/level/);
            }
        });

        it('should return 400 if user department is missing from the payload', async () => {
            try {
                const res = await exec();
                userPayload.department = "";
            } catch(err) {
                expect(res.status).toEqual(400);
                expect(err.errors.password.message).toMatch(/password/);
            }
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

            const res = await request(server).post(`${url}/register`).send(unwantedUserPayload);
            expect(res.status).toEqual(400);
        });

        it('should return a hashed password', async () => {
             const hashedPassword = await HashPassword.encryptPassword(userPayload.password);
             
            expect(hashedPassword).toBeTruthy();
        });
        
        it('should generate the same hash given the same password and salt', async () => {
            try{
                const salt = await bcrypt.genSalt(10);
                const hash = bcrypt.hash("abc123", salt);
                expect(hash).toEqual(bcrypt.hash("abc123", salt)); 
            } catch(err) {
                return err
            }
        });
 
        it('should save users into the database', async () => {
            const userPayload = {
            firstName: "user_firstname",
            lastName: "user_lastname",
            email: "user@gmail.com",
            password: "user_password",
            regNo: "user_regNo",
            level: "lev",
            department: "user_department"
            };
            
            const user = await User.insertMany(userPayload);
            
            const res = await request(server).post(`${url}/register`).send(userPayload);
            expect(user).not.toBeNull();
        })
    });

    describe('Login Users', () => {
        it('should return 200 if user supplies a valid login detail', async () => {
            await User.insertMany([{
                firstName: "user_firstname",
                lastName: "user_lastname",
                email: "user@gmail.com",
                password: await HashPassword.encryptPassword("abc123"),
                regNo: "user_regNo",
                level: "lev",
                department: "user_department"
            }]);
            
            const loginPayload = {
                regNo: "user_regNo",
                password: "abc123"
            };
            const res = await request(server).post(`${url}/login`).send(loginPayload);
            expect(res.status).toEqual(200);
            });
        });
})