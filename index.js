const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

const maria = require("./database/connect/maria");
maria.connect();

// Cross-Origin Resource Sharing
// 서비스된 도메인 밖의 다른 도메인으로부터 요청할 수 있게 허용하는 구조
app.use(cors());

app.get("/", (req, res) => {
    res.send("안녕 세상아");
});

app.get("/user/:id", (req, res) => {
    // const q = req.params;    //:id 부분을 받아옴
    // console.log(q.id);
    const q = req.query; //? = & = ... url 파라미터를 받아옴
    console.log(q.id);

    res.send({ userId: q.id });
});

app.get("/sound/:name", (req, res) => {
    // {name : dog} json 형식의 key를 입력해서 바로 받아올 수 있음
    const { name } = req.params;
    console.log(name);

    maria.query(`INSERT INTO sound_log(keyword) VALUES("${name}")`, function (err, rows, fields) {
        if (!err) {
            //res.send(rows); // responses send rows
            if (name == "dog") {
                res.send({ sound: "멍멍" });
            } else if (name == "cat") {
                res.send({ sound: "야옹" });
            } else if (name == "pig") {
                res.send({ sound: "꿀꿀" });
            } else if (name == "yeonji") {
                res.send({ sound: "우아해 ~ 🥰" });
            } else {
                res.send({ sound: "알수없음" });
            }
        } else {
            console.log("err : " + err);
            res.send({ error: err, sound: "DB 에러" }); // responses send error
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
