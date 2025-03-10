import * as dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
    ENV: str({ choices: ['local', 'production'], default: 'local' }),
    PORT: port({ default: 5000 }),
    JWT_SECRET_KEY: str({
        default:
            'eyJhbGciOiJIUzI1NiJ9.naJSb2xlIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGVtYy5jb20ifQ.xCyQt3wQXRj8NojG-m26LS9GktX90VBxU15BoxLuTS8',
    }),
    SHOP_JWT_SECRET_KEY: str({
        default:
            'eyJhbGciOiJIUzI1NiJ9.naJSb2xlIsdfghfusgyfsfYgRtaW4iLCJlbWFpbCI6ImFkbWluQGVtYy5jb20ifQ.xCyQt3wQXRj8NojG-m26LS9GktX90VBxU15BoxLuTS8',
    }),
    JWT_EXPIRES: str({ default: '60 days' }),
    ADMIN_EMAIL: str({ default: 'admin@smartcity.com' }),
	ADMIN_PASSWORD: str({ default: 'admin' }),
   
  
});

export default env;