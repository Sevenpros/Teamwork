import express from 'express';
import router from './routes/route';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WELLCOME TO TEAMWORK APIs');
});
app.use('/api/v1', router);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

export default app;
