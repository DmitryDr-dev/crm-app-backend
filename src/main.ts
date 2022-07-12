import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`[App] Server runs on port: ${PORT}`);
});

app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'test message',
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: 'Internal Server Error:' });
});
