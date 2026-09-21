const puppeteer = require('puppeteer-core');
const GIFEncoder = require('gif-encoder-2');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

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

const WIDTH = 1024;
const HEIGHT = 640;
const outputPath = path.resolve(__dirname, '..', 'screenshots', 'project_walkthrough.gif');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function record() {
  console.log('🎬 Starting automated project recording...');
  const executablePath = getExecutablePath();
  
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      `--window-size=${WIDTH},${HEIGHT}`
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  const encoder = new GIFEncoder(WIDTH, HEIGHT, 'neuquant', true);
  const writeStream = fs.createWriteStream(outputPath);
  encoder.createReadStream().pipe(writeStream);
  
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setQuality(10); // 10 is balanced quality/speed

  async function captureFrame(delayMs = 300) {
    encoder.setDelay(delayMs);
    const screenshotBuffer = await page.screenshot({ type: 'png' });
    const png = PNG.sync.read(screenshotBuffer);
    encoder.addFrame(png.data);
  }

  try {
    console.log('📍 1. Navigating to Homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1000);
    for (let i = 0; i < 4; i++) await captureFrame(400);

    // Smooth scroll down hero
    console.log('📍 2. Scrolling Hero telemetry & stats...');
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await sleep(600);
    for (let i = 0; i < 3; i++) await captureFrame(300);

    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await sleep(600);
    for (let i = 0; i < 3; i++) await captureFrame(300);

    // Navigate to Marketplace
    console.log('📍 3. Navigating to Marketplace...');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await sleep(400);
    const navButtons = await page.$$('nav button');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Marketplace')) {
        await btn.click();
        break;
      }
    }
    await sleep(1000);
    for (let i = 0; i < 4; i++) await captureFrame(400);

    // Open SDG 12 Hub Modal
    console.log('📍 4. Opening SDG 12 Hub Showcase Modal...');
    const allButtons = await page.$$('button');
    for (const btn of allButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('SDG 12 Hub')) {
        await btn.click();
        break;
      }
    }
    await sleep(1000);
    for (let i = 0; i < 6; i++) await captureFrame(500);

    // Close SDG Modal
    console.log('📍 5. Closing SDG Hub modal...');
    const closeBtn = await page.$('.modal-backdrop button');
    if (closeBtn) await closeBtn.click();
    await sleep(500);
    for (let i = 0; i < 2; i++) await captureFrame(300);

    // Open IBM Granite AI Copilot Modal
    console.log('📍 6. Opening IBM Granite AI Circular Copilot...');
    const allButtons2 = await page.$$('button');
    for (const btn of allButtons2) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('IBM Granite') || text.includes('Circular Copilot')) {
        await btn.click();
        break;
      }
    }
    await sleep(1000);
    for (let i = 0; i < 4; i++) await captureFrame(400);

    // Click quick prompt option
    console.log('📍 7. Triggering IBM Granite Scope 3 prompt in Copilot...');
    const suggestionBtn = await page.$('.modal-backdrop button.text-\\[11px\\]');
    if (suggestionBtn) {
      await suggestionBtn.click();
      await sleep(1200);
    }
    for (let i = 0; i < 7; i++) await captureFrame(500);

    // Open watsonx config drawer
    console.log('📍 8. Opening watsonx Config drawer...');
    const configBtn = await page.$('.modal-backdrop button[title*="Configure IBM"]');
    if (configBtn) {
      await configBtn.click();
      await sleep(800);
    }
    for (let i = 0; i < 5; i++) await captureFrame(400);

    // Close AI Modal
    console.log('📍 9. Closing AI Copilot modal...');
    const closeAiBtn = await page.$('.modal-backdrop button');
    if (closeAiBtn) await closeAiBtn.click();
    await sleep(500);
    for (let i = 0; i < 2; i++) await captureFrame(300);

    // Open Material Quick View Modal & Run Granite Assay
    console.log('📍 10. Opening Material Detail & Running IBM Granite Assay...');
    const firstCard = await page.$('.group.relative.flex.flex-col');
    if (firstCard) {
      await firstCard.click();
      await sleep(1000);
      for (let i = 0; i < 3; i++) await captureFrame(400);

      // Click Run Granite Assay
      const allModalBtns = await page.$$('.modal-backdrop button');
      for (const btn of allModalBtns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Run Granite Assay') || text.includes('Assay')) {
          await btn.click();
          await sleep(1500);
          break;
        }
      }
      for (let i = 0; i < 6; i++) await captureFrame(500);
    }

    console.log('📍 11. Finalizing GIF encode...');
    encoder.finish();
    await new Promise((resolve) => writeStream.on('finish', resolve));

    console.log(`✅ Project working video recording successfully generated at: ${outputPath}`);
  } catch (err) {
    console.error('Recording error:', err);
  } finally {
    await browser.close();
  }
}

record();
