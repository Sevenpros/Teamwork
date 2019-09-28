import express from 'express';
import router from './routes/route';

const app = express();

const port = process.env.PORT || 3000;
app.use('/', router);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

export default app;
