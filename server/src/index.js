import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

// .env configration
dotenv.config({
  path: "./.env",
});

//port
const port = process.env.PORT || 3000;

// database connection and app starting
connectDB()
.then(() => {
  app.listen(port, () => {
    console.log(`App listening on port:http://localhost:${port}`);
  });
}).catch((error)=>{
    console.log("Error connecting to Database",error.message)
});
