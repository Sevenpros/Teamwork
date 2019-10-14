import express from 'express';
import dotenv from 'dotenv';
import router from './routes/route';
import dbRouter from './v2/routes/dbroute';

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WELLCOME TO TEAMWORK APIs');
});
app.use('/api/v1', router);
app.use('/api/v2', dbRouter);
app.use('/*', (req, res) => {
  res.send('The Provided Route doesn\'t exist');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

export default app;
