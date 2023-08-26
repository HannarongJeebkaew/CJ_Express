import express from 'express'
const router = express.Router()
import {create,list,update,remove} from '../Controllers/product'
import { auth,authapi } from '../Middlewares/auth'
router.post('/product',authapi,create)
router.put('/product/:id',authapi,update)
router.get('/product',authapi,list)
router.delete('/product/:id',authapi,remove)
export default  router