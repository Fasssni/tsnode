

const express=require('express')
const cors=require('cors')
const env=require('dotenv')
const mongoose=require('mongoose')

const EventEmitter=require("events")


const router=require('./router')


const PORT=process.env.PORT||3000
const emitter= new EventEmitter()
const DB_URL='mongodb+srv://sadikovinsaf99:user@cluster0.4tapckz.mongodb.net/?retryWrites=true&w=majority'

// emitter.on('test',()=>{
//     console.log("Worked")
// })

// emitter.emit('test') 


const app=express()
app.use(cors())
app.use(express.json())

app.use('/api',router)



async function startApp(){
      try{ 
         await mongoose.connect(DB_URL,{useUnifiedTopology:true,useNewUrlParser:true})
         app.listen(PORT,()=>console.log(`started at ${PORT}`))
      }catch(e){ 
        console.log(e)
      }

}



startApp()