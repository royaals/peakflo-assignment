import express from 'express';
import cors from 'cors';
import fareRoutes from './routes/FareRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/fares', fareRoutes);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {  
  res.send('Welcome to the Metro Fare Calculator API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});