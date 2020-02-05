import express from 'express';
import cors from 'cors';
import db from './lib/db';
import './lib/cron';

const app = express();
app.use(cors());


app.get(`/data`, async (req, res, next) => {
  const offers = db.value();
  res.json({ offers });
});



app.listen(2093, () => {
  console.log(`App running on port http://localhost:2093`);
});
