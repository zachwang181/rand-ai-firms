#!/usr/bin/env node
// data/firms.json + src/page.html -> index.html
const fs=require('fs');
const d=JSON.parse(fs.readFileSync(`${__dirname}/data/firms.json`,'utf8'));
const tpl=fs.readFileSync(`${__dirname}/src/page.html`,'utf8');
const html=tpl
  .replace('__DATA_D__',JSON.stringify({cats:d.cats,firms:d.firms}))
  .replace('__DATA_PROF__',JSON.stringify(d.profiles))
  .replace('__DATA_MKT__',JSON.stringify(d.market||{}))
  .replace('__DATA_ASOF__',JSON.stringify(d.marketAsOf||''))
  .replace('__DATA_GROUPS__',JSON.stringify(d.groups||[]))
  .replace('__DATA_PEERS__',JSON.stringify(d.peers||{}))
  .replace('__DATA_EDGES__',JSON.stringify(d.edges||{}));
fs.writeFileSync(`${__dirname}/index.html`,html);
console.log(`index.html 已產生 · ${(Buffer.byteLength(html)/1024).toFixed(1)} KB`);
