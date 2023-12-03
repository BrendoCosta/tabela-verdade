// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
    packageManager: "pnpm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "vitest",
    coverageAnalysis: "perTest",
    plugins: ["@stryker-mutator/vitest-runner"],
    mutate: [
        './src/library/**/*.js',
    ],
};
export default config;
