import MemberSchema from "../Models/memberSchema.js";

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
