const puppeteer = require('puppeteer')
const { puppeteerOpt, MAX_WSE } = require('config')
const { log } = require('../utils')
const path = require('path')

const WSE_LIST = [] //存储browserWSEndpoint列表

async function onInit() {
  try {
    for (var i = 0; i < MAX_WSE; i++) {
      const browser = await puppeteer.launch(puppeteerOpt)
      WSE_LIST[i] = await browser.wsEndpoint()
    }
    log({
      msg:
        `chrome headless broswer ready, WSE_LIST:` + JSON.stringify(WSE_LIST),
    })
  } catch (err) {
    log({
      type: 'error',
      msg: 'puppeteer launch error ' + err,
    })
  }
}

async function onVisit({ url, uid, filename }) {
  const downloadUrl = url
  let page
  try {
    let browserWSEndpoint = randomEndpoint()
    console.log('browserWSEndpoint', browserWSEndpoint)
    let browser

    try {
      browser = await puppeteer.connect({ browserWSEndpoint })
    } catch (err) {
      log({
        msg: `step3 puppeteer connected connect err: ${err}`,
        uid,
      })
      browserWSEndpoint = randomEndpoint(browserWSEndpoint)
      browser = await puppeteer.connect({ browserWSEndpoint })
    }

    log({
      msg: `step3 puppeteer connected success, browserWSEndpoint: ${browserWSEndpoint}`,
      uid,
    })

    page = await browser.newPage()
    log({ msg: `step4 puppeteer newPage`, uid })

    // await page.setCacheEnabled(false)
    log({ msg: `downloadUrl ==> ${downloadUrl}`, uid })

    await page.goto(downloadUrl, {
      timeout: 2000000,
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    })
    log({ msg: ` step5 page.goto ${downloadUrl} `, uid })

    await page.content()
    log({ msg: `step6 page content contentTime`, uid })

    const wfRes = await page
      .waitForSelector('#isPDFVisible', {
        timeout: 2000000,
      })
      .catch((e) => {
        log({ msg: 'catch isPDFVisible page.waitForSelector' + e })
      })

    log({ msg: `step7 isPDFVisible`, uid })

    // await page.click('#downLoadBtn', { delay: 3000 })
    // log({ msg: `step7 downLoadBtn click btnClickTim`, uid })

    const pdfBuffer = await page.pdf({
      printBackground: true,
      path: filename
        ? path.resolve(__dirname, `../../static/pdf/${filename}`)
        : null,
    })

    log({ msg: `step8 pdf done success`, uid })

    await page.close()
    return pdfBuffer
  } catch (err) {
    log({ type: 'error', msg: err, uid })
    ;(await page) && page.close()
    throw new Error(err)
  }
}

function randomEndpoint(point) {
  let tmp = Math.floor(Math.random() * MAX_WSE)
  let browserWSEndpoint = WSE_LIST[tmp]
  if (point) {
    const list = WSE_LIST.slice().filter((i) => i !== point)
    let tmp = Math.floor(Math.random() * list.length)
    browserWSEndpoint = WSE_LIST[tmp]
    return browserWSEndpoint
  }
  //   browserWSEndpoint = browserWSEndpoint.slice(0, browserWSEndpoint.length - 10)
  return browserWSEndpoint
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

module.exports = {
  onInit,
  onVisit,
}
