import express from "express";
import cors from "cors";
import scanRoutes from './routes/scanRoutes.js';

const app = express();



app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json());


app.use('/api', scanRoutes); 

app.get("/", (req, res) => {
  res.send("Server is running...");
});





export default app;
