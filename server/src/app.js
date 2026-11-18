import express from "express";
import path from "path"
import bookRouter from "./routers/book.route.js";
import cors from "cors";
import rateLimiter from "./middlewares/rateLimiter.middleware.js";

// express app
const app = express();
const __dirname = path.resolve();
console.log(__dirname);

// app.use(
//   cors({
//     origin:process.env.CORS_ORIGIN
//   })
// );

// middleware for parsing JSON request body
app.use(express.json());

// middleware for enabling CORS

// middleware for rate limiting
app.use(rateLimiter);

// route for book API
app.use("/api/v1/books", bookRouter);

app.use(express.static(path.join(__dirname,"../client/dist")))

app.get('/*splat',(req, res)=>{
  res.sendFile(path.join(__dirname,"../client","dist","index.html"))
})

export default app;
