const { format } = require("../db");
const bcrypt = require("bcrypt");
const UserServices = require("../services/UsersServices");
require('dotenv').config({path:"../../words.env"});
const jwt = require("jsonwebtoken");
const { findForToken } = require("../services/UsersServices");


module.exports = {
    register: async (req, res) =>{
        const {name, email, password, confirmpassword} = req.body;
       
        //VERIFICAÇÃO DE CAMPOS VAZIOS
        if(!name){
            return res.status(422).json({msg: "Nome obrigatório"});
        }
    
        if(!email){
            return res.status(422).json({msg: "Email obrigatório"});
        }
    
        if(!password){
            return res.status(422).json({msg: "Senha é obrigatório"});
        }
    
        if(password !== confirmpassword){
            return res.status(422).json({msg: "As senhas não conferem"});
        }

        //VERIFICANDO EMAIL
        const userExists = await UserServices.find(email);
        console.log(userExists.length);

        if(userExists && userExists.length > 0){
            return res.status(422).json({msg: "Esse email já foi utilizado!", status: "false"});
        }

        // MANIPULANDO SENHAS
        const salt  = await bcrypt.genSalt(12);
        const passwordHash =  await bcrypt.hash(password, salt);


        //CRIANDO USUÁRIO
        const user = {
            name : name,
            email: email,
            password: passwordHash
        }

        try{
            UserServices.createUser(user.name, user.email, user.password)

            res.status(201).json({msg: "usuario criado com successo", status: "true"});
    
        }catch(error){
            console.log("Erro ao criar usuário");
            res.status(500).json({msg: "erro! algo aconteceu!"});
        }
    },

    login: async (req, res) => { 
        const {email, password} = req.body;
        
        //verificando campos nulos
        if(!email){
            return res.status(422).json({msg: "Email obrigatório"});
        }
        if(!password){
            return res.status(422).json({msg: "Senha é obrigatório"});
        }
        const salt  = await bcrypt.genSalt(12);
        const userExists = await UserServices.find(email);
        
        //buscando email
        if(userExists && userExists.length > 0){
            const hashPass = await UserServices.loginUser(email)
            if(hashPass){
                const checkPassword = await bcrypt.compare(password, hashPass[0].senha)
                if(!checkPassword){
                    res.status(401).json({msg: "Senha inválida", status: "false"});
                }
                else{

                    try{
                        const secret = process.env.SECRET;
                        const idUser =  await findForToken(email);
                        if(idUser && idUser.length > 0){
                            const token = jwt.sign(
                                {
                                    id: idUser[0].id
                                },
                                secret
                            )
                            res.status(201).json({msg: "usuario logado com sucesso", status: "true", token});
                        }

                    }catch(err){
                        console.log(err);
                        res.status(401).json({msg: "Erro ao logar", status: "false"});
                    }
                }               
            }
            else{
                res.status(401).json({msg: "Erro ao logar", status: "false"});
            }
        }
        else{
            return res.status(422).json({msg: "Esse email não foi registrado", status: "false"});
        }
    }
}



