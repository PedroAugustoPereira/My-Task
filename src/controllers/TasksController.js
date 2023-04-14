const { format } = require("../db");
const TaskServices = require("../services/TaskServices");

module.exports = {
    listar: async (req, res) => {
        let json = {
            error: '',
            result: [],
        }

        let tasks = await TaskServices.buscarTodos();

        for(let i in tasks){
            json.result.push({
                id : tasks[i].id,
                nome: tasks[i].nome,
                titulo: tasks[i].titulo
            });
        }

        res.json(json);
    },

    insert: async (req, res) => {
        let json = {
            error: '',
            result: [],
        }

        let nome = req.body.nome;
        let feito = req.body.feito;
        let titulo = req.body.titulo;

        if(nome && titulo){
            let idTask = await TaskServices.insert(nome, feito,  titulo);

            json.result = {
                codigo: idTask,
                feito,
                nome,
                titulo
            };
        }
        else{
            json.error = "campos não enviados";
        }

        res.json(json);
    },


    alterar: async (req, res) => {
        let json = {
            error: '',
            result: [],
        }

        let id = req.body.id;
        let nome = req.body.nome;
        let feito = req.body.feito;
        let titulo = req.body.titulo;

        if(nome && titulo && id){
            await TaskServices.alterar(id, nome, feito,  titulo);

            json.result = {
                id,
                feito,
                nome,
                titulo
            };
        }
        else{
            json.error = "campos não enviados";
        }


        res.json(json);
    },


    apagar: async (req, res)=>{
        let id = req.params.id
    
        
        let json = {
            error: '',
            result: [],
        }

        if(id){
            await TaskServices.apagar(id);

            json.result = {
                id,
            };
        }
        else{
            json.error = "ERRO";
        }
        
        res.json(json);
    }


}