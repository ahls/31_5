/** Command-line tool to generate Markov text. */
const { fileURLToPath } = require("url");
const {Markov} = require("./markov");
const fs = require("fs");
const axios = require("axios");
const args = process.argv;
let text;


function readFile(path)
{
    fs.readFile(path,'utf8', (err,data)=>
    {
        if(err != null)
        {
            console.log(`given path ${path} does not exist`)
        }
        else
        {
            let mm = new Markov(data)
            console.log(mm.makeText())
        }
    })
}
async function GetDataFromURL(path)
{
    try 
    {
        const res = await axios.get(path)
        let mm = new Markov(res.data)
        console.log(mm.makeText())
    }
    catch(err)
    {
        console.log(`error caught while fetching data from ${path}. ${err}`)
    }
}


if(args.length < 4) 
{
    console.log("need more arguments! the format must be:\nnode makeText.js (file|url) <path>")
    return;
}
if(args[2] == "file")
{
    text = readFile(args[3])
    
}
else if(args[2] == "url")
{
    text= GetDataFromURL(args[3])
}
else
{
    console.Log(`${args[2]} is an invalid option`)
}