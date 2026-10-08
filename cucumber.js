const common = {
    paths: [
        'features/**/*.feature'
    ],
    import: [
        'features/**/stepdefinitions/**/*.js',
        'features/**/hooks/**/*.js'
    ],
    format: [
        'progress',
        'html:reports/cucumber-report.html',
        'json:reports/cucumber-report.json'
    ],
};

const parallelProfile = (browser) => ({
    ...common,
    parallel: Number(process.env.PARALLEL),
    retry: Number(process.env.RETRIES),
    worldParameters: {
        browser,
        headless: process.env.HEADLESS !== 'false'
    }
});

export default common;
export const chrome_parallel = parallelProfile('chromium');
export const firefox_parallel = parallelProfile('firefox');
export const webkit_parallel = parallelProfile('webkit');