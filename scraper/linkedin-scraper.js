/**
 * LinkedIn Creator Profile Scraper — Playwright Boilerplate
 *
 * This script scrapes a creator's LinkedIn profile and returns structured data
 * that can be imported into the LinkedCRM app.
 *
 * Usage:
 *   node linkedin-scraper.js "https://linkedin.com/in/garyvee"
 *
 * Prerequisites:
 *   npm install playwright
 *
 * IMPORTANT: LinkedIn's Terms of Service restrict automated scraping.
 * Use this script responsibly and only for personal, non-commercial purposes.
 * You must be logged into LinkedIn in the browser context.
 */

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const LINKEDIN_COOKIES_PATH = './linkedin-cookies.json'; // Export from browser

async function scrapeCreatorProfile(profileUrl) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  // Load cookies if available (you need to export these from your browser)
  try {
    const { readFileSync } = await import('fs');
    const cookies = JSON.parse(readFileSync(LINKEDIN_COOKIES_PATH, 'utf-8'));
    await context.addCookies(cookies);
  } catch {
    console.warn('No cookies file found. You may need to log in manually.');
  }

  const page = await context.newPage();

  try {
    console.log(`Navigating to ${profileUrl}...`);
    await page.goto(profileUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for profile content to load
    await page.waitForSelector('.text-heading-xlarge, .top-card-layout__title', { timeout: 15000 });

    const result = await page.evaluate(() => {
      // Name
      const nameEl =
        document.querySelector('.text-heading-xlarge') ||
        document.querySelector('.top-card-layout__title');
      const name = nameEl?.textContent?.trim() || 'Unknown';

      // Headline
      const headlineEl =
        document.querySelector('.text-body-medium.break-words') ||
        document.querySelector('.top-card-layout__headline');
      const headline = headlineEl?.textContent?.trim() || '';

      // Follower count — look for "X followers" text
      let followerCount = 0;
      const spans = document.querySelectorAll('span');
      for (const span of spans) {
        const text = span.textContent?.trim() || '';
        const match = text.match(/([\d,.]+[KMkm]?)\s+followers/i);
        if (match) {
          let raw = match[1].replace(/,/g, '');
          if (raw.endsWith('K') || raw.endsWith('k')) {
            followerCount = Math.round(parseFloat(raw) * 1000);
          } else if (raw.endsWith('M') || raw.endsWith('m')) {
            followerCount = Math.round(parseFloat(raw) * 1_000_000);
          } else {
            followerCount = parseInt(raw) || 0;
          }
          break;
        }
      }

      // Mutual connections count
      let mutualConnections = 0;
      for (const span of spans) {
        const text = span.textContent?.trim() || '';
        const mutualMatch = text.match(/([\d]+)\s+mutual\s+connection/i);
        if (mutualMatch) {
          mutualConnections = parseInt(mutualMatch[1]) || 0;
          break;
        }
      }

      // Top influencer badge (LinkedIn Top Voice / Creator)
      const badges = document.querySelectorAll('.pv-text-details__about-this-profile-entrypoint, .top-voice-badge, [aria-label*="Top Voice"], [aria-label*="Creator"]');
      const bodyText = document.body.innerText;
      const topInfluencerStatus =
        badges.length > 0 ||
        /Top Voice|LinkedIn Creator|LinkedIn Influencer/i.test(bodyText);

      return {
        name,
        headline,
        followerCount,
        mutualConnections,
        topInfluencerStatus,
      };
    });

    console.log('\nScrape result:');
    console.log(JSON.stringify(result, null, 2));

    return result;
  } catch (err) {
    console.error('Scrape failed:', err.message);
    return null;
  } finally {
    await browser.close();
  }
}

// --- Mock API server (for development without Playwright) ---

export function createMockApiResponse(overrides = {}) {
  return {
    followerCount: 150000,
    mutualConnections: 12,
    topInfluencerStatus: true,
    name: 'Sample Creator',
    headline: 'CEO & Founder | Building in public',
    ...overrides,
  };
}

// --- CLI entry point ---

const url = process.argv[2];
if (url) {
  scrapeCreatorProfile(url).then((data) => {
    if (data) {
      const outFile = `scrape-result-${Date.now()}.json`;
      writeFileSync(outFile, JSON.stringify(data, null, 2));
      console.log(`\nSaved to ${outFile}`);
    }
  });
} else {
  console.log('Usage: node linkedin-scraper.js <linkedin-profile-url>');
  console.log('\nExample mock response:');
  console.log(JSON.stringify(createMockApiResponse(), null, 2));
}
