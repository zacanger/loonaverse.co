const { readFileSync } = require('fs')
const { resolve } = require('path')
const css = readFileSync(resolve(__dirname, 'style.css')).toString()

module.exports = `
 <head>
    <title>Loonaverse</title>
    <meta name="author" content="Zac Anger">
    <meta name="description" content="Social post aggregator for Loona content">
    <meta name="keywords" content="loona">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <meta charset="utf-8">
    <style type="text/css">${css}</style>
  </head>
`
