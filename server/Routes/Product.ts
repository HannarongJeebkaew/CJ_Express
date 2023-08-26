import express from 'express'
const router = express.Router()
import {create,list,update,remove} from '../Controllers/product'
import { auth } from '../Middlewares/auth'
router.post('/product',create)
router.put('/product/:id',update)
router.get('/product',list)
router.delete('/product/:id',remove)
export default  router