const {nanoid}= require('nanoid');
const URL=require('../models/url');


async function handleGenerateNewURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(404).json({message:"URL is missing"});

    const shortID=nanoid(8);//create a short id and then store og id and shortend id in DB ,now when short id called redirect it using redirect URL in db of that shortID
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });

    return res.render("home",{
        id:shortID,
    });
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOneAndUpdate({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports={
    handleGenerateNewURL,
    handleGetAnalytics,
};