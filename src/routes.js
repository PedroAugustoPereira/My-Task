const { equal } = require("assert");
const {Router} = require("express");
const router = Router();
const path = require("path")

const TaskController = require("./controllers/TasksController");
const UserController = require("./controllers/UserController");
const Token = require("./midlewares/Token");


router.get("/tasks", TaskController.listar);

router.post("/insert", Token.checkToken ,(req, res) => {
    console.log(req.body.id)
    if(req.body.id != null){
        TaskController.alterar(req, res)
    }
    else{
        TaskController.insert(req,res);
    }
})

router.delete("/tasks/:id", Token.checkToken, TaskController.apagar);


router.get("/login", async (req, res, next)=>{
    res.status(200).json({msg: "página de login"});
})

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.get("/teste", Token.checkToken, (req, res) => {
    res.status(200).json({msg: "token foi"});
})

router.get("/", (req, res)=>{
    console.log("testando")
 });



module.exports = router;