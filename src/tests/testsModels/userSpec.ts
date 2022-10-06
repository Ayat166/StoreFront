import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('User Model',()=>{
    describe('Test methods exists',()=>{
        it('should have an Get Many Users method',()=>{
            expect(userModel.getMany).toBeDefined();
        });
        it('should have a Get One User method',()=>{
            expect(userModel.getOne).toBeDefined();
        });
        it('should have a Create User method',()=>{
            expect(userModel.create).toBeDefined();
        });
        it('should have a Update User method',()=>{
            expect(userModel.updateOne).toBeDefined();
        });
        it('should have a Delete User method',()=>{
            expect(userModel.deleteOne).toBeDefined();
        });
        it('should have an Authenticate User method',()=>{
            expect(userModel.authenticate).toBeDefined();
         });
    });
    describe('Test User Model Logic',()=>{
          const user={
            email:'test@gmail.com',
            userName:'testUser',
            firstName:'Test',
            lastName:'User',
            password:'123',
          }  as User;
          beforeAll(async()=>{
            const createdUser=await userModel.create(user);
            user.id=createdUser.id;
          })
          afterAll(async()=>{
            const connection = await db.connect();
            const sql='DELETE FROM users;';
            await connection.query(sql);
            connection.release();
        });
        it('Create method should return a new user',async()=>{
            const createdUser= await userModel.create({
                email:'test2@gmail.com',
                userName:'test2User',
                firstName:'Test',
                lastName:'User',
                password:'123',
            }as User);
            expect(createdUser).toEqual({
                id:createdUser.id,
                email:'test2@gmail.com',
                userName:'test2User',
                firstName:'Test',
                lastName:'User',
            }as User);
        });
        it('Get Many method should return All available users in DB',async()=>{
            const users = await userModel.getMany();
            expect(users.length).toBe(2);
        });
        it('Get One method should return testUser when called with ID',async()=>{
            const returnedUser=await userModel.getOne(user.id as string);
            expect(returnedUser[0].id).toBe(user.id);
            expect(returnedUser[0].email).toBe(user.email);
            expect(returnedUser[0].userName).toBe(user.userName);
            expect(returnedUser[0].firstName).toBe(user.firstName);
            expect(returnedUser[0].lastName).toBe(user.lastName);
        });
        it('Updated One method should return a user ',async()=>{
            const updatedUser= await userModel.updateOne({
                ...user,
                userName:'testUsser Updated',
                firstName:'Mohamed',
                lastName:'Ali',
            }) ;
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.userName).toBe(user.userName);
            expect(updatedUser.firstName).toBe(user.firstName);
            expect(updatedUser.lastName).toBe(user.lastName);

        });
        it('Delete One method should delete user from DB',async()=>{
            const deletedUser=await userModel.deleteOne(user.id as string);
            expect(deletedUser.id).toBe(user.id);
        });

    });

});