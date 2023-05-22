import Redis from 'ioredis';


const REDIS_URL: string = process.env.REDIS_URL as string;

const client: Redis = new Redis(REDIS_URL);

export default client;
