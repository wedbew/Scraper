import puppeteer from 'puppeteer';
import db from './db';

export function createLink(descriptionVal, createdVal, cityVal) {
  const url                = 'https://www.otodom.pl/';
  const base               = 'sprzedaz/mieszkanie/poznan/';

  const description        = '?search%5Bdescription%5D=';
  const created            = '&search%5Bcreated_since%5D=';
  const city               = '&search%5Bcity_id%5D=';

  let   link = url + base + description + descriptionVal + created + createdVal + city + cityVal;
  return link;
}


export async function getNumberOfOffers(html) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  await page.goto(html, {waitUntil: 'networkidle2'});

  const data = await page.evaluate( () => { 
    const numberOfOffer = document.querySelector('.offers-index').querySelector('strong').textContent.trim();
    return numberOfOffer;
  });

  await browser.close();

  return data;
}

export async function getOffersCount() {
  const offers = await getNumberOfOffers(createLink(1,1,1));
  return offers;
}

export async function runCron() {
  const offers = await getOffersCount();
  // const offers = await Promise.all([
  //   getOffersCount(),
  // ]);
  db.get('offers')
    .push({
      date: Date.now(),
      count: offers,
    })
    .write();
  console.log('Done!');
}