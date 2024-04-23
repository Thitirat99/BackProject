var express = require("express")
var Sequelize = require("sequelize")
var app = express()

app.use(express.json())

const sequelize_Patients = new Sequelize("database","username","password",{
    host: "localhost",
    dialect:"sqlite",
    storage: "./Database/SQLPatients.sqlite",
})
const Patient = sequelize_Patients.define("patient",{
    Patient_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    First_Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Last_Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Gender:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Age:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Address:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Phone_Number:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize_Patients.sync()
app.get("/Patients",(req,res) =>{
    Patient.findAll().then((Patients) =>{
        res.json(Patients)
    }).catch((err) =>{
        res.status(500).send(err)    
    })
})

app.get("/Patients/:Patient_ID",(req,res) =>{
    Patient.findByPk(req.params.Patient_ID)
    .then((Patients) =>{
        if (!Patients){
            res.status(404).send("Patient not found")
        } else {
            res.json(Patients)
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.post("/Patients",(req,res) =>{
    Patient.create(req.body)
    .then((Patients)=>{
        res.send(Patients)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.put("/Patients/:Patient_ID", (req, res) => {

    Patient.findByPk(req.params.Patient_ID)
        .then((patient) => {
            if (!patient) {
                res.status.send("Patient not found");
            } else {
                patient
                    .update(req.body)
                    .then(() => {
                        res.send(patient);
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
app.delete("/Patients/:Patient_ID", (req, res) => {
    Patient.findByPk(req.params.Patient_ID)
      .then((patient) => {
        if (!patient) {
          res.status(404).send("Patient not found");
        } else {
          MedicalHistory.destroy({
            where: {
              Patient_ID: req.params.Patient_ID
            }
          }).then(() => {
            patient.destroy().then(() => {
              res.send({});
            }).catch((err) => {
              res.status(500).send(err);
            });
          }).catch((err) => {
            res.status(500).send(err);
          });
        }
      }).catch((err) => {
        res.status(500).send(err);
      });
  });

const port = process.env.PORT || 5000;
app.listen(port,() => console.log (`Now The Server is listening on port ${port}`));