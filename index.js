import express, { response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// const apiKey = 'x-api-Key';

const API1 = "https://api.spoonacular.com/recipes/complexSearch?" ;
const API2 = "https://api.spoonacular.com/recipes/";
const API2_1 = "/information?includeNutrition=true";
const API_Random = "https://api.spoonacular.com/recipes/random?number=10"

const config ={
    headers: {
        "x-api-key": "7724091f93404e7595775a14efade20b"
    },
}

const values =[
    'value 1',
    'value 2',
    'value 3',
    'value 4',
     'value 5',
]

app.get('/', (req,res)=>{
    res.render("index.ejs", {content: "kkkkkkkkkkkkkkkkkkkkkk"});

} )




let check = false;
app.post('/get_recipe', async(req, res)=>{
    const ll = req.body.recipes;
    check= true;
    
    try{
        const result = await axios.get(API1+"query="+ req.body.recipes+ "&cuisine="+ req.body.cuisine+ "&includeIngredients="+req.body.includeIngredients+ "&excludeIngredients="+req.body.excludeIngredients ,config);
        
        res.render("index.ejs", {content: result.data, check:check, values:values});
        // console.log(result.data);
        console.log(ll);
    } catch(error){

    }
})

let check2 = false;
app.post('/get_information', async(req, res)=>{

    check2 = true;
    const id = req.body.information;
    try{ 
        
        const result = await axios.get(API2+id+API2_1,config);
        res.render("index.ejs",{data:result.data, check2:check2});
        console.log(result.data);
} catch(error){

}
})




app.listen(port, ()=>{
    console.log("listening on port 3000");
})