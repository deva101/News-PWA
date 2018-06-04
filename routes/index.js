var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (app) {
    // Index page
    router.get('/', function(req, res){
        // console.log("Rendering!");
        res.render("index.ejs");
        // res.send(200);
    });

    return router;
};


/*

const key = '0bdbad9f8d994439be18a349c19bcf84';             // Authentication key
const main = document.querySelector('main');                // Add news
const sourceSelector = document.querySelector('#source');   // Source of the News
const defaultSource = 'the-washington-post';                // Default Source for news


window.addEventListener('load', async e => {
    // Update News
    updateNews();

    // Update Source initially
    await updateSources();
    // Set default value in selector
    sourceSelector.value = defaultSource;

    // If source is Updated
    sourceSelector.addEventListener('change',e => {
        updateNews(e.target.value);
    });

    //Service Worker
    if('serviceWorker' in navigator){
        // Register
        try {
            navigator.serviceWorker.register('sw.js');
            console.log("Registration Successful");
        }catch (e) {
            console.log("Registeration Unsuccesful");
        }
    }
});


async function updateSources(){
    const res = await fetch('https://newsapi.org/v1/sources');
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}" >${src.name}</option>`).join('\n');
}


async function updateNews(source = defaultSource){
    res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${key}`);
    json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    var str = article.publishedAt;
    var date = str.split('T');

    return `
        
    <div class="container well">
        <div class="col-md-9 blogShort ">
            <h1>${article.title}</h1>

            <img src="${article.urlToImage}" alt="Image" Hspace = "30" class="iconDetails pull-left img-responsive thumb margin10 img-thumbnail">
            
            <p><em>(${date[0]})</em></p>
            <article class="show">
                <p>${article.description}</p>
            </article>

            <div>
                <p>by-${article.author}</p>
            </div>
            
            <a class="rightb" href="${article.url}" target="_blank"><button type="button" class="btn btn-dark btn-outline-success">Read Full Post Here</button></a>
        </div>
    </div>
    `;
}
*/