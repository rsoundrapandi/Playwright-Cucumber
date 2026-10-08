import { config as sit } from './sit.js';
import { config as uat } from './uat.js';

const environment = process.env.ENV;


const environments = {
    sit,
    uat
};

export const config = environments[environment];

if (!config) {
    throw new Error(
        `Invalid environment: ${environment}. Use sit or uat.`
    );
}
