const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuid()
  }

  async save () {
    const courses = await Course.getAll()
    courses.push({
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    })
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          err && reject(err)
          resolve()
        }
      )
    })

  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, data) => {
          err && reject(err)
          resolve(JSON.parse(data))
        }
      )
    })
  }
}

module.exports = Course