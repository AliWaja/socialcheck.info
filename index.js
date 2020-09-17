const express = require('express');
const path = require('path');
const fetch = require("node-fetch");
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/getbackgroundCheck', (req,res) => {
    (async () => {
        res.json(await getCheckResults(req.query.username));
      })()
});


async function getCheckResults(username){
    var status = 100;
    var politweets = [];
    var homophobiatweets = [];
    var rnstweets = [];
    var dnatweets = [];
    var gnvtweets = [];
    var max_id = -1;
    var url2 = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + username + "&count=200" + "";
    var url = "";
    var poliRegEx = /\btrump\b|\bbiden\b/;
    var homoRegEx = /\bgay\b|lgbt|lesbian|bisexual|transgender/;
    var raceRegEx = /\bblm\b|\women\b/;
    var drugRegEx = /\bweed\b|\bmarijuana\b|\bbeer\b/;
    var gunRegEx = /\bgun violence\b|\bgun control\b|\bgun laws\b|\bguns\b/;



while(true){
    if(max_id == -1)
    {
        url = url2;
    }
    else
        url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + username + "&count=200" + "&max_id=" + max_id + "";
    try {
            const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Authorization' : 'Bearer ' + '!REMOVED!'
            },
        }
        
        
        );
        if (response.ok) {
            const json = await response.json();
            if((json[json.length-1].id_str >= max_id) && (max_id != -1)){
                return {status: 200, list1: politweets, list2: homophobiatweets, list3: rnstweets, list4: dnatweets, list5: gnvtweets};
            }
            max_id = json[json.length-1].id_str;
            var i = 0;
            for(i = 0; i<json.length; i++)
            {
                
                if(poliRegEx.test(json[i].text.toLowerCase()))
                {
                    politweets.push(json[i].id_str);
                }
                if(homoRegEx.test(json[i].text.toLowerCase()))
                {
                    homophobiatweets.push(json[i].id_str);
                }
                if(raceRegEx.test(json[i].text.toLowerCase()))
                {
                    rnstweets.push(json[i].id_str);
                }
                if(drugRegEx.test(json[i].text.toLowerCase()))
                {
                    dnatweets.push(json[i].id_str);
                }
                if(gunRegEx.test(json[i].text.toLowerCase()))
                {
                    gnvtweets.push(json[i].id_str);
                }
            }
            }
            else {
                let msg = (`authorization request response status: ${response.status}`);
                throw new Error(msg);    
            }
        }
        catch (err) {
            ts = new Date();
            let msg = (`${ts.toISOString()} getTweetBatch - query:${'from:realDonaldTrump -RT'} - ${err}`);
            return {status: 400, list1: politweets, list2: homophobiatweets, list3: rnstweets, list4: dnatweets, list5: gnvtweets};
            throw err;
        }
    }
}

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
