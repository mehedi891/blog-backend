import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';


const app:Application = express();

//Json parser (default feature in express)
app.use(express.json());

//enable cross origin connection
app.use(cors());


//Application routes
app.use('/api',router)

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message:'Server is running successfully'
  });
});

//not found route
app.use(notFound);

//Global error handler
app.use(globalErrorHandler);
export default app;