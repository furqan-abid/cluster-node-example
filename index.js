const app = require('./app')
const os = require("os")
const cluster = require("cluster")

const cpus = os.cpus().length


if(cluster.isMaster){
    console.log(`master process ${process.pid} is running`)

    for(let i = 0; i < cpus; i++){
        cluster.fork()
    }

    cluster.on("exit",(worker)=>{
        console.log(`worker process died ${worker.process.pid} restarting...`);
        cluster.fork()
    })
}
else{
    app.listen(3000,()=>{
        console.log(`worker process ${process.pid} is working at port 3000`)
    })
}

