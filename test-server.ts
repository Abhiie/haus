import express from 'express';
import dotenv from 'dotenv';
import sendEmailHandler from './api/send-email';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
    // Mock Vercel req/res objects
    const vercelReq = {
        method: 'POST',
        body: req.body,
        headers: req.headers
    } as any;

    const vercelRes = {
        status: (code: number) => ({
            json: (data: any) => res.status(code).json(data)
        })
    } as any;

    await sendEmailHandler(vercelReq, vercelRes);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n📧 Simple Test Server Running`);
    console.log(`-----------------------------------`);
    console.log(`Endpoint: http://localhost:${PORT}/api/send-email`);
    console.log(`Vite Proxy: /api -> :3001`);
    console.log(`-----------------------------------\n`);
});
