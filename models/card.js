const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'card.json'
)

class Card {
  static async add (course) {
    const card = await Card.fetch()
    const idx = card.courses.findIndex(c => c.id === course.id)
    const candidate = card.courses[idx]
    if (candidate) {
      // there is
      candidate.count++
      // card.courses[idx] = candidate
    } else {
      // there is not 
      course.count = 1
      card.courses.push(course)
    }
    card.price += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        err && reject(err)
        resolve()
      })
    })
  }
  static async fetch () {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, data) => {
        err && reject(err)
        resolve(JSON.parse(data))
      })
    })
  }
}

module.exports = Card