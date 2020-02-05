import cron from 'node-cron';
import { runCron } from './scrape';

cron.schedule(`1 * * * * *`, () => {
  console.log(`RUNNING THE CRON`);
  runCron();
});
