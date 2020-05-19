const server = require('./api/server')
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** THE SERVER IS COMING FROM INSIDE THE PORT ${port}**\n`))