const trim = value => value.split('+').join(' ');

const requestHandler = (req, res) => {
  const { url, method } = req

  res.setHeader('ContentType', 'text/html')

  if (url === '/' && method === "GET") {
    res.write('<html>')
    res.write('<head><title>My app</title></head>')
    res.write('<body><h1>HELLLOOOOOOOOOO</h1></body>')
    res.write('<form action="/create-message" method="post"><input type="text" name="message"></input><button type="submit">Click me!</button></form>')
    res.write('</html>')
    return res.end()
  }

  if (url === '/create-message' && method === "POST") {
    const message = []

    req.on('data', chunk => {
      message.push(chunk)
    })

    return req.on('end', () => {
      const parsedData = Buffer.concat(message).toString()
      const myMessage = parsedData.split("=")[1]

      console.log(`This is my message: ${trim(myMessage)}`)
      return res.end()
    })
  }

  if (url === '/users') {
    const users = ['Gabriela', 'Andrei', 'Ioana', 'Malina', 'Daniel']

    res.write('<html>')
    res.write('<head><title>My users</title></head>')
    res.write('<body><h1>These are my users</h1></body>')
    res.write('<ul>')
    for (index in users) {
      res.write(`<li>${users[index]}</li>`)
    }
    res.write('</ul>')
    res.write('</html>')

    return res.end()
  }
}

module.exports = requestHandler