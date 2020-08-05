const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000

app.listen(PORT,function () {
    console.log("Sever in running ...");
})
// var counter = 0;
// app.get("/",function (req,res) {
//     counter++;
//     let x = 1;
//     x++;
//     res.send("Xin chao"+counter+"va x = "+x);
// });

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/login",function (req,res) {
    res.send("Day la trang login");
})
var counter = 0;
app.get("/",function (req,res) {
    // res.sendFile(__dirname+"/views/ass13.ejs");
    let title = "du bao thoi tiet";
    counter++;
    res.render("ass13",{
        title: title,
        counter: counter
    });
});

const fs = require("fs");

app.get("/danh-muc",function (req,res) {
    let cats = fs.readFileSync("data/data.json","UTF-8");
    cats = JSON.parse(cats);
    res.render("chua_lab10",{
        cats: cats
    });
})

app.get("/chi-tiet/:id",function (req,res) {
    let ID = req.params.id;
    let cats = fs.readFileSync("data/data.json","UTF-8");
    cats = JSON.parse(cats);
    let count = 0;
    cats.map(e=>{
        count++;
        if(e.id == ID){
            res.render("chitiet",{
                cat: e
                //e chi dung dc trong ham, cat gui sang ejs
            });
            count=0;
        }
    })
    if(count >= cats.length){
        res.send("Khong tim thay");
    }
    // res.render("chitiet");
    //req: gui yeu cau ve
    //res: phan hoi cho nguoi dung
})