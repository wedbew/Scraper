/**
 * @name Otodom.com search
 *
 * @desc Finds link to offer and then go to each linki and scprace location.
 */
const puppeteer = require('puppeteer');
const url = 'https://www.otodom.pl/sprzedaz/mieszkanie/poznan/?search%5Bdescription%5D=1&search%5Bregion_id%5D=15&search%5Bsubregion_id%5D=462&search%5Bcity_id%5D=1&nrAdsPerPage=72';
process.setMaxListeners(0);
try {
  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    const script = await page.$$eval('.section-listing--list', item => item.dataset.facets);
    console.log(script);
    // const json = JSON.parse(script.dataset.facets);
    // console.log(json.private_business.all);
    
    await browser.close()
  })().then(console.log('First task endded'))
} catch (err) {
  console.log('Error occured in main function');
  console.error(err)
}

