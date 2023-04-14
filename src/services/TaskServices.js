const db = require("../db");

module.exports = {

    buscarTodos: ()=>{
        return new Promise((yes, no) => {
            db.query('SELECT * FROM tasks', (error, results) => {
                if(error){
                    no(error);
                    return;
                }
                else{
                    yes(results);
                }
            })
        })
    },


    insert: (nome,feito, titulo)=>{
        return new Promise((yes, no) => {
            db.query('INSERT INTO tasks (nome, feito, titulo) VALUES (?, ?, ?)', [nome, feito, titulo] ,(error, results) => {
                if(error){
                    no(error);
                    return;
                }
                else{
                    yes(results.insertId);
                }
            })
        })
    },

    alterar: (id, nome,feito, titulo)=>{
        return new Promise((yes, no) => {
            db.query('UPDATE tasks SET nome = ?, titulo = ? WHERE id = ?', [nome, titulo, id] ,(error, results) => {
                if(error){
                    no(error);
                    return;
                }
                else{
                    yes(results);
                }
            })
        })
    },

    apagar: id =>{
        return new Promise((yes, no) => {
            db.query('DELETE FROM tasks WHERE id = ?', [id],  (error, results) => {
                if(error){
                    no(error);
                    return;
                }
                else{
                    yes(results);
                }
            })
        })
    },

}