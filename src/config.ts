import dotenv from'dotenv';
dotenv.config();
console.log(process.env);
const{
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_PASSWORD,
    POSTGRES_USER,
    BCRYPT_PASSWORD,
    SLAT_ROUNDS,
    TOKEN_SECRET,


}=process.env;
export default{
    port:PORT,
    database: NODE_ENV==='dev'?POSTGRES_DB:POSTGRES_DB_TEST,
    host: POSTGRES_HOST,
    dbPort:POSTGRES_PORT,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt:  SLAT_ROUNDS,
    Secret:TOKEN_SECRET,
};