import express from "express"
import { Addmember } from "../Controller/member.js"

const Router = express.Router()

Router.use(express.json())
Router.use(express.urlencoded({ extended:true }))

Router.post("/Add-Member", Addmember)

export default Router