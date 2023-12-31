const express = require('express')
const mysql = require('mysql2');


const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})


app.get("/SA4/getAge", (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "SA4"
      });

    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT SA4_CODE, age FROM income_info WHERE SA4_CODE IN (${req.query.codes.split(",")}) ORDER BY age ASC;`, function (err, result, fields) {
            if (err) throw err;
            
            //console.log(result);
            res.json(result)
        });
    })
})

app.get("/GCCSA/getAge", (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "GCCSA"
      });

    con.connect(function(err) {
        if (err) throw err;
        const codesArray = req.query.codes.split(",").map(code => `'${code.trim()}'`);
        const query = `SELECT GCCSA_CODE, age FROM income_info WHERE GCCSA_CODE IN (${codesArray.join(", ")}) ORDER BY age ASC;`;

        con.query(query, function (err, result, fields) {
            if (err) throw err;
            
            //console.log(result);
            res.json(result)
        });
    })
})

app.listen(5000, () => {console.log("Server stated on port 5000")})