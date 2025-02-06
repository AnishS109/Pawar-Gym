import express from "express"
import { Addmember, fetchingMembers, updateActiveStatus, updateNextDueDate } from "../Controller/member.js"

const Router = express.Router()

Router.use(express.json())
Router.use(express.urlencoded({ extended:true }))

Router.post("/Add-Member", Addmember)
Router.post("/Add-Member-Active-ness", updateActiveStatus)
Router.post("/Payment-Status-Updated", updateNextDueDate)
Router.get("/Fetching-Members", fetchingMembers)

export default Router