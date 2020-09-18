//webcomic downloader for offline reading
//the trick to dealing with lazy loaded images was headless:false and a 6 second delay after each page load

const puppeteer = require('puppeteer');           // include lib
var counter = 0;
const startpage = '';
const endpage = '';
const tapselector = '';

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {                                    // declare function
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });  // run browser
  const page = await browser.newPage();           // open new tab
  await page.setViewport({
    width: 1600,
    height: 900,
    deviceScaleFactor: 1,
  });
  await page.goto(startpage);          // go to site
  while(page.url() != endpage){
    await page.waitFor(6000);
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    })
    timeout(30000);
    const element = await page.$(tapselector);        // declare a variable with an ElementHandle
    await element.focus();
    await element.screenshot({path: counter + '.png'}); // take screenshot element in puppeteer
    counter++;
    await element.tap(); //move to the next page by tapping a image/link
  }
  await browser.close();                          // close browser
})();