/**
 * @name Otodom.com search
 *
 * @desc Finds link to offer and then go to each linki and scprace location.
 */
const puppeteer = require('puppeteer')
const screenshot = 'otodom.png';
process.setMaxListeners(0);
try {
  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.otodom.pl/sprzedaz/mieszkanie/poznan/?search%5Bdescription%5D=1&search%5Bcreated_since%5D=1&search%5Bregion_id%5D=15&search%5Bsubregion_id%5D=462&search%5Bcity_id%5D=1')
    // await page.screenshot({ path: screenshot })
    const offers = await page.$$eval('.offer-item-header', anchors => {
      return anchors.map(anchor => anchor.querySelector('a').href.trim())
    })
    console.log(offers.length);
    try {
      (async () => {
        offers.forEach(async (offer, index) => {
          const browser = await puppeteer.launch()
          const page = await browser.newPage()
          await page.goto(offer, {
            timeout: 0
          }).catch(error => {
            console.log('Page go to error');
            console.error(error)
          });
          // await page.screenshot({ path: `otodom_${index}.png` })
          const data = await page.$$eval('#server-app-state', anchors => {
            return anchors.map(anchor => anchor.textContent)
          })
          const json = await JSON.parse(data);

          // console.log(json.initialProps.data.advert.location.coordinates);
          console.log(index);
          await browser.close()
        })
      })().then(console.log('Second task endded'))
    } catch (err) {
      console.log('Error occured in forEach');
      console.log(err);
    }
    
    await browser.close()
  })().then(console.log('First task endded'))
} catch (err) {
  console.log('Error occured in main function');
  console.error(err)
}

