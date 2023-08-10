const express = require("express");
const app = express();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const PORT = 8000;

const prisma = new PrismaClient();

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

app.listen(PORT, ()=>console.log(`server is runing on Port ${PORT}`));
