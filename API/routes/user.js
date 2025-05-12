import express from 'express'
import { login, registeruser } from '../controller/user.js'

const router = express.Router()

router.post('/register',registeruser)
router.post('/login',login)
export default router