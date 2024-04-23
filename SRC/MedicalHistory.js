var express = require("express")
var Sequelize = require("sequelize")
var app = express()

app.use(express.json())

const sequelize_MedicalHistory = new Sequelize("database","username","password",{
    host: "localhost",
    dialect:"sqlite",
    storage: "./Database/SQLMedicalHistory.sqlite",
})
const MedicalHistory = sequelize_MedicalHistory.define("medicalHistory",{
    MedicalHistory_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Patient_ID:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Start_Date:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    End_Date:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Disease_ID:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Additional_Details:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize_MedicalHistory.sync()

app.get("/MedicalHistory",(req,res) =>{
    MedicalHistory.findAll().then((MedicalHistorys) =>{
        res.json(MedicalHistorys)
    }).catch((err) =>{
        res.status(500).send(err)    
    })
})

app.get("/MedicalHistory/MedicalHistory_ID",(req,res) =>{
    MedicalHistory.findByPk(req.params.MedicalHistory_ID)
    .then((MedicalHistorys) =>{
        if (!MedicalHistorys){
            res.status(404).send("MedicalHistory not found")
        } else {
            res.json(MedicalHistorys)
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.post("/MedicalHistory",(req,res) =>{
    MedicalHistory.create(req.body)
    .then((MedicalHistorys)=>{
        res.send(MedicalHistorys)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.put("/MedicalHistory/:MedicalHistory_ID", (req, res) => {

    MedicalHistory.findByPk(req.params.MedicalHistory_ID)
        .then((MedicalHistorys) => {
            if (!MedicalHistorys) {
                res.status.send("MedicalHistory not found");
            } else {
                MedicalHistorys
                    .update(req.body)
                    .then(() => {
                        res.send(MedicalHistorys);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

app.delete("/MedicalHistory/:MedicalHistory_ID",(req,res) =>{
    MedicalHistory.destroy({
        where:{
            MedicalHistory_ID: req.params.MedicalHistory_ID
        }
    })
    MedicalHistory.destroy({
        where:{
            MedicalHistory_ID: req.params.MedicalHistory_ID
        }
    })

    MedicalHistory.findByPk(req.params.MedicalHistory_ID).then((MedicalHistorys) =>{
        if(!MedicalHistorys){
            res.status.send("MedicalHistory not found")
        }else{
            MedicalHistorys.destroy().then(() =>{
                res.send({})
            }).catch((err) =>{
                res.status(500).send(err)
            })
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

const port = process.env.PORT || 5000;
app.listen(port,() => console.log (`Now The Server is listening on port ${port}`));