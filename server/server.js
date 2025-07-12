import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

await connectDB();

const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());


// API Routes
app.get('/', (req, res) => res.send("Xong the deo nao duoc ha ????"));
app.use('/api/inngest', serve({ client: inngest, functions }));

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
