const express = require("express");
const serverless = require("serverless-http");
const faunadb = require("faunadb");
const client = new faunadb.Client({
    secret: "fnAFCrKBmGAAUbsEbRCDnW8cPPlOlr0EZIGiXCT0",
});

const app = express();
const router = express.Router();

const {
    Ref,
    Paginate,
    Get,
    Match,
    Select,
    Index,
    Create,
    Collection,
    Join,
    Call,
    Function: Fn,
} = faunadb.query;

router.get("/", async (req, res) => {
    let msg = await client.query(
        Get(Ref(Collection("message"), "363298490799882320"))
    );

    res.send(msg.data);
});

app.use(`/.netlify/functions/msg`, router);

module.exports = app;
module.exports.handler = serverless(app);
