const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

function getExecutablePath() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No Chrome or Edge browser executable found');
}

const screenshotsDir = path.resolve(__dirname, '..', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function capture() {
  console.log('🚀 Launching headless browser to capture project screenshots...');
  const executablePath = getExecutablePath();
  console.log('📍 Using browser:', executablePath);

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1440,960'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1.5 });

  try {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // 1. Home Page Hero & Stats
    console.log('📸 1/5 Capturing 01_hero_homepage.png...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '01_hero_homepage.png') });

    // 2. Marketplace Section
    console.log('📸 2/5 Capturing 02_marketplace_feedstock.png...');
    // Click on Marketplace nav button or navigate
    const navButtons = await page.$$('nav button');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Marketplace')) {
        await btn.click();
        break;
      }
    }
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotsDir, '02_marketplace_feedstock.png') });

    // 3. IBM Granite AI Copilot Modal
    console.log('📸 3/5 Capturing 03_ibm_granite_ai_copilot.png...');
    // Click IBM Granite AI button
    const allButtons = await page.$$('button');
    for (const btn of allButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('IBM Granite') || text.includes('Circular Copilot')) {
        await btn.click();
        break;
      }
    }
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotsDir, '03_ibm_granite_ai_copilot.png') });

    // Close AI modal
    const closeBtn = await page.$('.modal-backdrop button');
    if (closeBtn) await closeBtn.click();
    await sleep(600);

    // 4. SDG 12 Hub Showcase Modal
    console.log('📸 4/5 Capturing 04_sdg12_showcase_hub.png...');
    const allButtons2 = await page.$$('button');
    for (const btn of allButtons2) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('SDG 12 Hub')) {
        await btn.click();
        break;
      }
    }
    await sleep(1500);
    await page.screenshot({ path: path.join(screenshotsDir, '04_sdg12_showcase_hub.png') });

    // Close SDG modal
    const closeBtn2 = await page.$('.modal-backdrop button');
    if (closeBtn2) await closeBtn2.click();
    await sleep(600);

    // 5. Material Quick-View & AI Assay
    console.log('📸 5/5 Capturing 05_material_detail_and_assay.png...');
    // Click on the first material card
    const firstCard = await page.$('.group.relative.flex.flex-col');
    if (firstCard) {
      await firstCard.click();
      await sleep(1000);
      // Click Run Granite Assay inside the modal if present
      const allModalBtns = await page.$$('.modal-backdrop button');
      for (const btn of allModalBtns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Run Granite Assay') || text.includes('Assay')) {
          await btn.click();
          await sleep(1500);
          break;
        }
      }
    }
    await page.screenshot({ path: path.join(screenshotsDir, '05_material_detail_and_assay.png') });

    console.log('✅ All 5 high-resolution screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
