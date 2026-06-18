const jwt=require('jsonwebtoken');
const secret="shubh@123";//should be in env variable

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}

module.exports={setUser,getUser};

//you take user credentials, generate a signed token, and then use that token and the secret key to verify the user's identity on subsequent activities.



//isme baar baar login isliye nai karna padta kyuki jo cokkies generate hui usme hi mera data hai aur voh jwt token refresh karne pe kidhar nai jata ab jab mai koi function use karne ki try karta hu tab secret key token aur maine jo rakhi hai match hui toh aage badhega

//At the same time stateful me baar login karna padta tha kyuki refresh karne pe hash map ka data ud jata tha jisse token ke asssociated id with username gyab ho jata tha

