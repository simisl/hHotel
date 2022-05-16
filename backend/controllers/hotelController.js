import { db } from '../config/db.config.js';


const hotelDetails = (req,res)=>{
  db.dbConnection.connect((err)=>{
    if(!err){
      console.log('connected')
      db.dbConnection.query("select * from hotelData",(err,result)=>{
        // console.log(result)
        res.json(result)
      })
    }
    else{
      console.log('not connected',err)
    }
  })
}
const updatevisitors = (req,res)=>{
  db.dbConnection.connect((err)=>{
    if(!err){
      console.log('connected',req.body.visitors,req.params.id)
      db.dbConnection.query("update hotelData SET visitors=? WHERE id=?",[req.body.visitors,req.params.id],(err,result)=>{
        console.log(result)
        res.json(result)
      })
    }
    else{
      console.log('not connected',err)
    }
  })
}
const savedraft = (req,res)=>{
  db.dbConnection.connect((err)=>{
    if(!err){
      console.log('savedraft',req.body)
      db.dbConnection.query("insert into booking set ?",[req.body],(err,result)=>{
        console.log(result)
        res.json(result)
      })
    }
    else{
      console.log('not connected',err)
    }
  })
}
const filterhotel = (req,res)=>{
  var fields;
  var word;
  db.dbConnection.connect((err)=>{
    if(!err){
      req.params.data = req.params.data.replace(/,/g,"='Yes' and ");
      req.params.data=req.params.data+ "='Yes'"
      db.dbConnection.query(`select * from hotelData where ${req.params.data}`,(err,result)=>{
        // console.log(result)
        res.json(result)
      })
    }
    else{
      console.log('not connected',err)
    }
  })
}
const hotelbooking = (req,res)=>{
  db.dbConnection.connect((err)=>{
    if(!err){
      console.log('savedraft',req.body)
      db.dbConnection.query("update booking set ? where hotelid=? and userid=?",[req.body,req.body.hotelid,req.body.userid],(err,result)=>{
        console.log(result)
        res.json(result)
      })
    }
    else{
      console.log('not connected',err)
    }
  })
}
const loginuser = (req,res)=>{
  db.dbConnection.connect((err)=>{
    if(!err){
      console.log(req.body)
      db.dbConnection.query("select name,id from userData where name=? and password=?",[req.body.name,req.body.password],(err,result)=>{

          res.json(result)
      })
    }
  })
}
const viewbooking = (req,res)=>{
  db.dbConnection.connect((err)=>{
    if(!err){
      console.log('savedraft',req.body)
      db.dbConnection.query("select * from booking where userid=? and status=?",[req.params.id,req.params.status],(err,result)=>{
        console.log(result)
        res.json(result)
      })
    }
    else{
      console.log('not connected',err)
    }
  })
}
export const hotelctrl = {
  hotelDetails,
  updatevisitors,
  savedraft,
  filterhotel,
  hotelbooking,
  loginuser,
  viewbooking
}
