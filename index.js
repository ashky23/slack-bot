const Slackbot=require("slackbots");
const axios=require("axios")


// use the link that this comment contains to make a bot on slack `There is still a possibility to generate correct token - https://api.slack.com/apps?new_classic_app=1 and then in Bots you can add legacy bot user and generate correct token` - source: https://github.com/mishk0/slack-bot-api/issues/145
var bot = new Slackbot({
    token:TOKEN_ID,
    name:BOT_NAME    
});
bot.on('start',function(){
    var params={
        icon_emoji:':boom:'
    }

    const text="Ashky-bot is here to make you smile...  \nI can serve following services \n1. `ChuckNorris Joke`, \n2 `Dadjoke`, \n3. `Advice` \n4. `Quote`\n  Type `@ashky` with corresponding text or type `Random`";
    bot.postMessageToChannel('general',text,params);
    // bot.postMessageToUser('')
});

bot.on('error',(err)=>console.log(err));

bot.on('message',(data)=>{
    if(data.type!=="message" || data.subtype==='subtype')
    {
        // console.log("Error");
        return ;
        
    }
    // console.log(data);
    
    parseMessage(data.text);
})
function parseMessage(msg){
    if(msg.toLowerCase().includes(' chucknorris'))
        chucknorris();
    else if(msg.toLowerCase().includes(' dadjoke'))
        dadjoke();
    else if(msg.toLowerCase().includes(' advice'))
        advice();
    else if(msg.toLowerCase().includes(' quote'))
        quote();
    else if(msg.toLowerCase().includes(' random'))
        random();
    
}

async function chucknorris() {
    // console.log(msg);
    
    const response= await axios.get("http://api.icndb.com/jokes/random");
    var params={
        icon_emoji:':laughing:',
    }
    var text= response.data.value.joke;
    bot.postMessageToChannel('general',text,params);
}
async function dadjoke(){
    const response=await axios.get("https://icanhazdadjoke.com/",{
        headers:{
            'Accept':'application/json'
        }
    });


    // console.log(response);
    var params={
        icon_emoji:':laughing:',
    }
    var text=response.data.joke;
    bot.postMessageToChannel('general',text,params);
    
}
async function advice(){
    const response=await axios.get("https://api.adviceslip.com/advice");

    // console.log(response);
    var params={
        icon_emoji:':relieved:',
    }
    var text=response.data.slip.advice;
    bot.postMessageToChannel('general',text,params);
}
async function quote(){
    // console.log("Entered");
    
    const response=await axios.get("https://type.fit/api/quotes");
    // console.log(response);
    var params={
        icon_emoji:':fist:',
    }
    const arr=response.data;
    const ran=Math.floor(Math.random()*arr.length);
    // console.log(ran);
    
    var text=arr[ran].text;
    console.log(text);
    
    bot.postMessageToChannel('general',text,params);

    
}
async function random(){
    const ran=Math.floor(Math.random()*4)+1;
    // console.log(ran);
    
    if(ran===1)
        chucknorris();
    else if(ran===2)
        dadjoke();
    else if(ran===3)
        advice();
    else if(ran===4)
        quote();
    
}