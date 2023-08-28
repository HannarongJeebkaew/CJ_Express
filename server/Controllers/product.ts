import Product from '../Models/products'
import mongoose from 'mongoose';
import { Request,Response } from 'express';

export const list = async(req:Request,res:Response)=>{
    try{
        const product = await Product.find()
        return res.send(product).status(200)
        
    }catch(err){
        console.log(err);
    }
}
export const create = async(req:Request,res:Response)=>{
    try{
        // console.log(req.body);
        const product = await new Product(req.body).save()
        return res.send(product).status(200)
    }catch(err){
        console.log(err);
    }
}
export const update = async(req:Request,res:Response)=>{
    try{
        // console.log(req.params.id);
        // console.log(req.body);
        const product = await Product.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
        return res.send(product).status(200)
    }catch(err){
        console.log(err);
    }
}
export const remove = async(req:Request,res:Response)=>{
    try{
        // console.log(req.params.id);
        const product = await Product.findOneAndDelete({_id:req.params.id})
        return res.send(product).status(200)
    }catch(err){
        console.log(err);
    }
}