module.exports = (client, instance) => {
  client.on('message', (message) => {
    console.clear
    console.log('logged in')
  })
}