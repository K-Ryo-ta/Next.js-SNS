const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config;

const prisma = new PrismaClient();

router.post("/register",async(req,res)=>{
    const {username, email, password} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedpassword,
        },
    });
    return res.json({user});
})

router.post("/login",async (req,res)=>{
    const {email,password} = await req.body;

    const user = await prisma.user.findUnique({where:{email}});

    if(!user){
        return res.status(401).json({erorr:"そのユーザーは存在しません"});
    }

    const isPasswordVaild = await bcrypt.compare(password,user.password);

    if(!isPasswordVaild){
        return res.status(401).json({erorr:"そのパスワードは間違っています"});
    }

    const token = jwt.sign({id: user.id},process.env.SECRET_KEY,{
        expiresIn:"1d",
    })
    return res.json({token});
});

module.exports = router;
