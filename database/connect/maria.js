const maria = require("mysql");

const conn = maria.createConnection({
    host: "svc.gksl2.cloudtype.app",
    port: 30467,
    user: "root",
    password: "1234",
    database: "nodeDB",
});

module.exports = conn;
