const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config;

const prisma = new PrismaClient();

router.post("/post",async(req,res)=>{
    const { content } = req.body;
    if(!content){
        return res.status(400).json({message:"投稿内容がありません"});
    }

    try{
        const newPost = await prisma.post.create({
            data:{
                content,
                authorId: 1,
            },
        });

        res.status(201).json(newPost);
    } catch(err){
        console.log(err);
        return res.status(500).json({message:"サーバーエラーです。"});1
    }
})

// router.post("/login",async (req,res)=>{
//     const {email,password} = await req.body;

//     const user = await prisma.user.findUnique({where:{email}});

//     if(!user){
//         return res.status(401).json({erorr:"そのユーザーは存在しません"});
//     }

//     const isPasswordVaild = await bcrypt.compare(password,user.password);

//     if(!isPasswordVaild){
//         return res.status(401).json({erorr:"そのパスワードは間違っています"});
//     }

//     const token = jwt.sign({id: user.id},process.env.SECRET_KEY,{
//         expiresIn:"1d",
//     })
//     return res.json({token});
// });

module.exports = router;