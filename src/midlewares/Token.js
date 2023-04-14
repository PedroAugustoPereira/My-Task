const jwt = require("jsonwebtoken");
require('dotenv').config({path:"../../words.env"});


module.exports = {
    checkToken: (req, res, next) => {
        const auth = req.headers["authorization"];
        const token = auth && auth.split(" ")[1];
        const secret = process.env.SECRET;

        if(token){
            try{
                jwt.verify(token, secret);
                console.log("token validado")
                next()
            }catch(err){
                return res.status(400).json({msg: "Erro ao autenticar", status: false});
            }
        }else{

        }
    }
}