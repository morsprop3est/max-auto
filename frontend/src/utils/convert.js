import fs from 'fs'

const fileContent = fs.readFileSync('auction.txt', 'utf-8')

const [copartRaw, iaaiRaw] = fileContent
  .split('\n]')
  .map(str => str.replace(/[\[\]]/g, '').trim())
  .filter(Boolean)

const copart = copartRaw
  .split('\n')
  .map(line => line.replace(/"|,/, '').trim())
  .filter(Boolean)
  .map(name => ({ name, auctionType: 'copart' }))

const iaai = iaaiRaw
  .split('\n')
  .map(line => line.replace(/"|,/, '').trim())
  .filter(Boolean)
  .map(name => ({ name, auctionType: 'iaai' }))

const all = [...copart, ...iaai]

fs.writeFileSync('auctions.json', JSON.stringify(all, null, 2), 'utf-8')
console.log('auctions.json created!')