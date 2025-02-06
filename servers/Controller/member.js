import MemberSchema from "../Models/memberSchema.js";

// --------------- ADDING MEMBERS TO DATABASE ------------------------------

export const Addmember = async (req, res) => {
  const { name, phoneNumber, adharNumber, joinDate, monthsPaid } = req.body;

  try {
    const user = await MemberSchema.findOne({ name, phoneNumber });
    if (user) {
      return res.status(400).json({ message: "Member Already Exists" });
    }

    const paymentDate = new Date(joinDate);

    const nextDueDate = new Date(paymentDate);
    nextDueDate.setDate(nextDueDate.getDate() + monthsPaid * 30); 

    nextDueDate.setUTCHours(0, 0, 0, 0); 

    const newUser = new MemberSchema({
      name,
      phoneNumber,
      adharNumber,
      monthsPaid,
      paymentDate,
      nextDueDate,
      joinDate,
    });

    await newUser.save(); 
    return res.status(200).json({
      message: "Member Added Successfully",
      nextDueDate: nextDueDate.toISOString(), 
    });
  } catch (error) {
    console.log("Error while registering member", error);
    return res.status(500).json({ message: "Error while registering member" });
  }
};

// --------------- FETCHING MEMBERS FROM DATABASE ------------------------------

export const fetchingMembers = async(req, res) => {

  try {
    const users = await MemberSchema.find({})
    return res.status(200).json(users) 
  } catch (error) {
   return res.status(500).json({message:"Error while fetching data"}) 
  }
}

// ---------------------- UPDATING OFFLINE STATE --------------------

export const updateActiveStatus = async(req, res) => {
  const {name, phoneNumber} = req.body

  try {
    const user = await MemberSchema.findOne({name, phoneNumber})

    user.activeStatus = "false"
    await user.save()
    return res.status(200).json({message:`${user.name} is In-Active Successfully`})
  } catch (error) {
    return res.status(500).json({message:"Error while updating member"})
  }
}

// ---------------- UPDATING PAYMENT DATE & NEXT DUE DATE --------------------

export const updateNextDueDate = async(req, res) => {
  const {name, phoneNumber, months} = req.body

  try {
    const user = await MemberSchema.findOne({name,phoneNumber})

    const currentDate = new Date()

    if (user.nextDueDate > currentDate) {
      const remainingDays = Math.floor(
        (user.nextDueDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      const paymentDate = new Date();
      const nextDueDate = new Date(paymentDate);

      nextDueDate.setDate(nextDueDate.getDate() + months * 30 + remainingDays);
      nextDueDate.setUTCHours(0, 0, 0, 0);

      user.paymentDate = paymentDate;
      user.nextDueDate = nextDueDate;
      user.activeStatus = "true"
      await user.save();

      return res.status(200).json({ message: "Payment Status Updated" });
    }
    else {
      const paymentDate = new Date();

      const nextDueDate = new Date(paymentDate);
      nextDueDate.setDate(nextDueDate.getDate() + months * 30); 
  
      nextDueDate.setUTCHours(0, 0, 0, 0);

      user.paymentDate = paymentDate
      user.nextDueDate = nextDueDate
      user.activeStatus = "true"
      await user.save()
      return res.status(200).json({message:"Payment Status Updated"})
    } 
  } catch (error) {
    return res.status(500).json({message:"Error in Updating Payment Status "})
  }
}
