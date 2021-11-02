require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../../models/users');
const HashPassword = require('../../../utils/hash-password');
const { setupTestDatabase } = require('../../test-setup');

let server;
const url = '/api/v1';

describe('Auth', () => {
    setupTestDatabase("regDB_tests")
    
    beforeEach(() => { server = require('../../../server')});

    afterEach(() => {
        server.close();
    })
    describe('Register new user (/api/v1/register)', () => {
        
        let userPayload = {
            firstName: "user_firstname",
            lastName: "user_lastname",
            email: "user_email",
            password: "user_password",
            regNo: "user_regNo",
            level: "lev",
            department: "user_department"
         };

         const exec = async () => {
             return await request(server).post(`${url}/register`).send(userPayload);
         }
         
        it('should return 400 if user firstname is missing from the payload', async () => {
            const res = await exec();
            userPayload.firstName = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user lastname is missing from the payload', async () => {
            const res = await exec();
            userPayload.lastName = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user email is missing from the payload', async () => {
            const res = await exec();
            userPayload.email = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user password is missing from the payload', async () => {
            const res = await exec();
            userPayload.password = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user registration number is missing from the payload', async () => {
            const res = await exec();
            userPayload.regNo = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user level is missing from the payload', async () => {
            const res = await exec();
            userPayload.level = "";
            expect(res.status).toEqual(400);
        });

        it('should return 400 if user department is missing from the payload', async () => {
            const res = await exec();
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

            const res = await request(server).post(`${url}/register`).send(unwantedUserPayload);
            expect(res.status).toEqual(400);
        });

        it('should return a hashed password', async () => {
             const hashedPassword = await HashPassword.encryptPassword(userPayload.password);
             
            expect(hashedPassword).toBeTruthy();
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
            
            const res = await request(server).post(`${url}/register`).send(userPayload);
            const user = await User.findOne({email: "user@gmail.com"});
            
            expect(res.body.firstName).toBeTruthy();
        })
    });

    // describe('Login Users', () => {
    //     it('should return 400 if user does not provide his password', async () => {
    //         let userDetails = {
    //             regNo: "user_regNo",
    //             password: "user_password"
    //         };
    //         const res = await request(server).post(`${url}/login`).send(userDetails);
    //         expect(res.status).toBe(400);
    //         })
    //     })

})