import { Before, After } from '@cucumber/cucumber';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { chromium, firefox, webkit } from 'playwright';
import { config } from '../config/config.js';

const browsers = { chromium, firefox, webkit };

Before(async function () {
    const reportDirectories = [
        'reports/videos/',
        'reports/screenshots/',
        'reports/traces/',
    ];

    await Promise.all(
        reportDirectories.map((directory) =>
            mkdir(directory, { recursive: true }),
        ),
    );

    const browserName = this.parameters.browser;
    const browserType = browsers[browserName];

    if (!browserType) {
        throw new Error(`Unsupported browser "${browserName}"`);
    }

    this.browser = await browserType.launch({
        headless: this.parameters.headless
    });

    this.context = await this.browser.newContext({
        recordVideo: {
            dir: 'reports/videos/'
        }
    });

    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true,
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(config.timeout);
});

After(async function (scenario) {
    const failed = scenario.result?.status === 'FAILED';
    const scenarioName = scenario.pickle.name.replace(
        /[^a-zA-Z0-9]/g,
        '_',
    );
    const artifactName = `${scenarioName}-${randomUUID()}`;

    const screenshot = await this.page.screenshot({
        path: `reports/screenshots/${artifactName}.png`,
        fullPage: true,
    });

    await this.attach(screenshot, 'image/png');

    const tracePath = `reports/traces/${artifactName}-trace.zip`;
    await this.context.tracing.stop({ path: tracePath });

    const video = this.page.video();
    await this.context.close();

    if (failed && video) {
        const videoPath = await video.path();
        console.log(`Failed video: ${videoPath}`);
    } else if (video) {
        const videoPath = await video.path();

        if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
        }
    }

    await this.browser.close();
});