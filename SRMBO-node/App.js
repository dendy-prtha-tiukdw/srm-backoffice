const express = require("express");
const app = express();
const port = 8080;
const {google} = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");
const { response } = require("express");

//527371133243-u55mahrjjgb6d6a2hkl4ath7tjrhl6gg.apps.googleusercontent.com
//mcqG6y0uZgDxFSG9uMHj7heU

app.use (cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/getURL", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        //client id
        "527371133243-u55mahrjjgb6d6a2hkl4ath7tjrhl6gg.apps.googleusercontent.com",
        //secret
        "mcqG6y0uZgDxFSG9uMHj7heU",
        //link to redirect to 
        "http://localhost:8080/dashboard"
    );

        const scopes = [ "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile"]
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                userID: req.body.userid
            })
        })

        request(url, (err, response, body) => {
            console.log("error: ", err); 
            console.log("statusCode: ", response && response.statusCode);
            res.send({ url });
        })
    });

    app.get("/dashboard", async (req, res) => {
        const queryURL = new urlParse(req.url);
        const code = queryParse.parse(queryURL.query).code;

        const oauth2Client = new google.auth.OAuth2(
            //client id
            "527371133243-u55mahrjjgb6d6a2hkl4ath7tjrhl6gg.apps.googleusercontent.com",
            //secret
            "mcqG6y0uZgDxFSG9uMHj7heU",
            //link to redirect to 
            "http://localhost:8080/dashboard"
        );

        // const tokens = await oauth2Client.getToken(code);
        console.log("auth-code: " + code);
    //     console.log(tokens);
        res.send("Hello");

    //     let stepArray = [];

    //     try {
    //         const result = await axios({
    //             method: "POST",
    //             headers: {
    //                 authorization: "Bearer " + tokens.tokens.access_token
    //             },
    //             "Content-Type": "application/json;charset=utf-8" == "application/json",
    //             url: 'https://apps.dw.fti.ukdw.ac.id/srm/auth/signin',
    //     });
    // } catch (e){
    //     console.log(e);
    // }
})

app.listen(port, () => console.log(`SRM LISTENING ON PORT ${port}`))


 