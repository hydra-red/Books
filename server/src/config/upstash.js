import {Redis} from "@upstash/redis";
import {Ratelimit} from "@upstash/ratelimit";
import dotenv from "dotenv"

dotenv.config();

// create a new ratelimiter, that allows 10 requests per 10 seconds
const rateLimit = new Ratelimit({
    // Upstash Redis instance
    redis:Redis.fromEnv(),
    // limit each IP to 10 requests per 10 seconds
    limiter:Ratelimit.slidingWindow(100,"60 s")
})

export default rateLimit;