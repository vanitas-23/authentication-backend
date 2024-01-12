
const asyncHandler =require('express-async-handler');
const Contact=require('../models/contactModel');

const getContacts=asyncHandler(
    async(req,res)=>{
        const contact= await Contact.find({user_id:req.user.id});
        res.status(200).json(contact);
    }
);
const createContact= asyncHandler(
    async(req,res)=>{
        // console.log("HII");
         const {name,email,phone}=req.body;
         if(!name || !email || !phone){
             res.status(404);
             throw new Error("All fields are mandatory !");
         }
         const contact= await Contact.create(
           { name,
            email,
            phone,
            user_id:req.user.id
        }
         );
         res.status(201).json(contact);
         
     }
);
const getContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
const updateContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("NO premission regarding update on other user");
    }
    const updated=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updated);
});
const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("NO premission regarding update on other user");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
}  );
module.exports={getContacts,createContact,getContact,updateContact,deleteContact}