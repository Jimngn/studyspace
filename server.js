const WebSocket = require('ws')
const http = require('http')
const wss = new WebSocket.Server({ port: 1234 })

wss.on('connection', function connection(ws) {
  console.log('Client connected')
  
  ws.on('message', function incoming(message) {
    // Broadcast the message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})

console.log('WebSocket server running on ws://localhost:1234') 