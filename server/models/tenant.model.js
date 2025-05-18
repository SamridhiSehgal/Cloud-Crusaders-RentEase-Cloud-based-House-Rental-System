const mongoose=require('mongoose');

const tenantSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        enum:['Male','Female','Others']
    },
    password:{
        type:String,
        required:true,
    },
    //update at time of booking again form will show most details are field with login data if not logined then sighup or login first before booking
    occupancyType: { 
        type: String, 
        enum: ['Student', 'Family', 'Job Holder', 'Single', 'PG'], 
        required: true 
    },
    address:{
        state:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        pincode:{
            type:Number,
            requied:true,
        }
    },
    roomsRented: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room' 
    }],
})
const tenantModel=mongoose.Model('Tenant',tenantSchema);
module.exports=tenantModel;