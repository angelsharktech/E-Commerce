import express from 'express'
import {  getWebUserById, registeruser, signOut, signup, updateWebUser } from '../controller/webuser.js'
// import { login, registeruser } from '../controller/user.js'

const router = express.Router()

router.post('/register',registeruser)
router.post('/signup',signup)
router.put('/updateWebUser',updateWebUser)
router.get('/getWebUserById/:id',getWebUserById)

router.post('/signout', signOut);

export default router