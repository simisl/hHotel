import express from 'express';
import cors from 'cors';
import { route } from './routes/hotelroutes.js';
var corsOptions = {
  origin: "http://localhost:4200"
}
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOptions))

app.get('/', (req,res)=>{
  res.json('Welcome! Server is running')

})
app.use('/hotel', route.router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
