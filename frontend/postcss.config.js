const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './**/*.html',
        './**/*.svelte'
    ],
    whitelistPatterns: [/svelte-/],
    defaultExtractor: content =>  content.match(/[A-Za-z0-9-_:/]+/g) || []
})

const production = !process.env.ROLLUP_WATCH
