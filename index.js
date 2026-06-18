const express=require("express");
const path=require("path");
const {connectToMongoDB}=require("./connect");
const cookieParser=require("cookie-parser");
const {checkForAuthentication,restrictTo}=require("./middleware/auth");

const URL=require("./models/url");

const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");


const app=express();
const port=8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("Connected to MongoDB"));

app.set("view engine","ejs");//ejs files are HTML files
app.set("views",path.resolve("./views"));//views folder in root directory


app.use(express.json());
app.use(express.urlencoded({extended:false}));//Means support json data as well as form data
app.use(cookieParser());
app.use(checkForAuthentication)


app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
//static route means frontend pages
app.use("/",staticRoute);



app.get("/url/:shortid",async(req,res)=>{
    const shortId=req.params.shortid;
    const entry=await URL.findOneAndUpdate({
        shortId

    },{$push:{
        visitHistory:{
            timestamp:Date.now()
        },
    }})
    res.redirect(entry.redirectURL);
})//gives shortid and on that shortid I have to redirect to og url


app.listen(port,()=>console.log(`Server running on port ${port}`));
