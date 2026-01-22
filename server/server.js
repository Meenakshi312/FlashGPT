import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditRoutes.js'
import { stripeWebhooks } from './controllers/webhooks.js'

const app = express()

app.use(cors({
    origin: 'https://flash-gpt-ruby.vercel.app', // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // If your frontend sends cookies or auth headers
}));
await connectDB()

// Stripe Webhooks
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res)=> res.send('Server is Live!'))
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";

// import userRouter from "./routes/userRoutes.js";
// import chatRouter from "./routes/chatRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
// import creditRouter from "./routes/creditRoutes.js";
// import { stripeWebhooks } from "./controllers/webhooks.js";

// const app = express();

// await connectDB();

// // 🔥 FORCE CORS HEADERS (Vercel fix)
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//     );
//     res.header("Access-Control-Allow-Credentials", "true");

//     if (req.method === "OPTIONS") {
//         return res.sendStatus(204);
//     }

//     next();
// });

// // Normal cors (still needed)
// app.use(
//     cors({
//         origin: true,
//         credentials: true,
//     })
// );

// // Stripe webhook (raw body)
// app.post(
//     "/api/stripe",
//     express.raw({ type: "application/json" }),
//     stripeWebhooks
// );

// // JSON AFTER webhook
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => res.send("Server is Live!"));
// app.use("/api/user", userRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/message", messageRouter);
// app.use("/api/credit", creditRouter);

// export default app; // 🔥 IMPORTANT FOR VERCEL
