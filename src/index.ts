import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
const helmet = require("helmet");
import routs from'./routes'
import RateLimit from 'express-rate-limit'
import errorMiddleware from'./middleware/error.middleware';
import db from './database'
//console.log(config);
const PORT = config.port || 3000;
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
//http security middleware
app.use(helmet());
//midlleware to pass incoming requests
app.use(express.json());
// Apply the rate limiting middleware to all requests
app.use(RateLimit(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message :'too many requests',
  }
))

app.use('/api',routs);

// add routing for / path
 app.get('/', (req: Request, res: Response) => {
 // throw new Error('Error exist');
  res.json({
    message: 'Hello World 🌍'
  })
}) 


db.connect().then((client)=>{
  return client.query('select now()').then((res)=>{
    client.release();
    console.log(res.rows);
  }).catch(err=>{
    client.release();
    console.log(err.stack);
  });
});


app.use(errorMiddleware);
  app.use((_req:Request,res:Response)=>
{
  res.status(404).json({
    message:'the path not found back to home',
  })
})


// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app