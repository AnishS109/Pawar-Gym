import mongoose from "mongoose";

const memberschema = mongoose.Schema({
  name:{
    type:String
  },
  phoneNumber:{
    type:String
  },
  adharNumber:{
    type:String
  },
  joinDate:{
    type:Date
  },
  nextDueDate:{
    type:Date
  },
  paymentDate:{
    type:Date
  },
  monthsPaid:{
    type:Number
  },
  activeStatus:{
    type:String
  }
})

const MemberSchema = mongoose.model("Members", memberschema)
export default MemberSchema