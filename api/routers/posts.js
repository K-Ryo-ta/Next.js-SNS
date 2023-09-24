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

router.get("/get_latest_post",async (req,res)=>{
    try{
        const latestPosts = await prisma.post.findMany({
            take:10, 
            orderBy:{createdAt:"desc"},
            include:{
                author:true,
            },
        });
        return res.json(latestPosts);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"サーバーエラーです。"});
    }
});
module.exports = router;
