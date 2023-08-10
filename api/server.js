const express = require("express");
const app = express();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config;

const PORT = 8000;

const prisma = new PrismaClient();

app.use(express.json());

app.post("/api/auth/register",async(req,res)=>{
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

app.post("/api/auth/login",async (req,res)=>{
    const {email,password} = await req.body;

    const user = prisma.user.findUnique({where:{email}});

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
})

app.listen(PORT, ()=>console.log(`server is runing on Port ${PORT}`));
