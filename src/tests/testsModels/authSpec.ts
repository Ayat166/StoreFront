import UserModel from '../../models/user.model';
import db from '../../database';
import User from '../../types/user.type';


const userModel = new UserModel();

describe('Authentication Module',()=>{
    describe('Test methods exists',()=>{
        it('should have an Authenticate User method',()=>{
           expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test Authentication Logic',()=>{
        const user ={
            email:'test@gmail.com',
            userName:'testUser',
            firstName:'Test',
            lastName:'User',
            password:'123',
        }as User;
        beforeAll(async()=>{
            const createdUser=await userModel.create(user);
            user.id=createdUser.id;
        });
        afterAll(async()=>{
            const connection = await db.connect();
            const sql='DELETE FROM users;';
            await connection.query(sql);
            connection.release();
        });
        it('Authenticate method should return the authenticated user',async()=>{
            const authenticatedUser= await userModel.authenticate(
                user.email as string,
                user.password as string
            );
            expect(authenticatedUser?.email).toBe(user.email);
            expect(authenticatedUser?.userName).toBe(user.userName);
            expect(authenticatedUser?.firstName).toBe(user.firstName);
            expect(authenticatedUser?.lastName).toBe(user.lastName);

        }); 
        it('Authenticate method should return null for wrong credentials',async()=>{
            const authenticatedUser=await userModel.authenticate(
                'm@gmail.com',
                'fakePassword'
            );
            expect(authenticatedUser).toBe(null);
        });


    });
});