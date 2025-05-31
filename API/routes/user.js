import express from 'express'
import { login, registeruser, updateUser } from '../controller/user.js'

const router = express.Router()

router.post('/register',registeruser)
router.post('/login',login)
router.put('/updateUser/:id',updateUser)
export default router