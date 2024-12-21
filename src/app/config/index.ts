import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    dbUrl: process.env.MONGO_URI,
    bSaltRounds: process.env.SALT_ROUNDS,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
}