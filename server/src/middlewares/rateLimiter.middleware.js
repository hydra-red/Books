import rateLimit from "../config/upstash.js";

// middleware function for rate limiting
const rateLimiter = async (req, res, next) => {
  try {
    // apply rate limiting using Upstash
    const { success } = await rateLimit.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request. Try again later" });
    }
    next();
  } catch (error) {
    console.log("Something wrong with Upstash rateLimit", error.message);
    res.status(500).json({ message: "Rate Limit Error" });
  }
};

export default rateLimiter