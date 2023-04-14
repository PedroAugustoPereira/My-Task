const db = require("../db");
const bcrypt = require("bcrypt");



module.exports = {

    find: (email) => {
        return new Promise((accept, recuse)=> {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if(error){
                    error.status = false;
                    recuse(error);
                    return;
                }
                else{     
                    accept(results);
                }
            })
        });
    },


    createUser: (nome, email, senha) => {
        return new Promise((accept, recuse) => {
            db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha] , (error, results) => {
                if(error){
                    recuse(error);
                    return;
                }
                else{
                    accept(results);
                }
            }) 
        });
    },


    loginUser: (email) => {
        return new Promise((accept, recuse) => {
            db.query('SELECT senha FROM users WHERE email = ?', [email], (error, results) => {
                if(error){
                    recuse(error);
                    return;
                }
                else{
                    accept(results);
                }
            })
        })
    },


    findForToken: (email) => {
        return new Promise((accept, recuse)=> {
            db.query('SELECT id FROM users WHERE email = ?', [email], (error, results) => {
                if(error){
                    recuse(error);
                    return;
                }
                else{     
                    accept(results);
                }
            })
        });
    }
}