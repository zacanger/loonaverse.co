const cluster = require('cluster')
const { cpus } = require('os')

const procs = cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < procs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died! forking.`)
    cluster.fork()
  })
} else {
  require('./server')
}
