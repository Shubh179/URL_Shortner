const {getUser}=require("../service/auth");


//  Authentication
function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;
    if(!tokenCookie) return next();

    const token=tokenCookie;
    const user=getUser(token);

    req.user=user;
    return next();
}


//  Authorization
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();
    }
}



module.exports={checkForAuthentication,restrictTo};

//Isme pehle user ne login kiya usse cookies generate hui jisse uid mila jo har request ke sath bheja jata hai
//Phir middleware me check karte hai ki kya uid cookies me hai ,agar hai toh usse user ko in memory store se get karte hai
//Agar user mil jata hai toh request object me user ko attach kar dete hai aur next() call karte hai
//Agar uid cookies me nai hai ya user milta nai hai toh login page pe redirect kar dete hai