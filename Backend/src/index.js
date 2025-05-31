import app from "./app.js";
import connectDB  from "./db/dbConnection.js";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`\nServer is running on http://localhost:${PORT}`);
    })
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
