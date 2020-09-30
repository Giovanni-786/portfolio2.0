const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const videos = require("./data")
const courses = require("./dataCourses")

server.use(express.static('public'))

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.get("/", function(req, res){
    const about = {
        avatar_url: "https://pbs.twimg.com/profile_images/1290445925081427968/aTQbXkvB_400x400.jpg",
        name: "Giovanni lima",
        role: "Progamador",
        description: 'Iniciante em Programação web e mobile, apaixonado por novas tecnologias que impulsionam cada dia mais as aplicações web Aluno da <a href=https://rocketseat.com.br/" target="_blank">Rocketseat',
        links: [
            {name: "Github", url:"https://github.com/Giovanni-786"},
            {name: "Twitter", url: "https://twitter.com/GiSenaa7"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/giovanni-sena/"}
        ]
    }
    
    return res.render("about", {about: about})

})

server.get("/portfolio", function(req, res){
    
    return res.render("portfolio", {items:videos})

})


server.get("/course", function(req, res){
    
    return res.render("course", {items:courses})

})



server.get("/video", function(req,res){
    
    const id = req.query.id;

    //utilizando o método find para encontrar o id de cada vídeo e colocar na variável
    const video = videos.find(function(video){
    //retorna um boolean    
        return video.id == id   
    })

    if(!video){
        return res.render('not-found')
    }

    return res.render("video", {item: video })

})




server.get("/courses/:id", function(req, res) {
    const id = req.params.id;
  
    const course = courses.find(function(course){
        return course.id == id
        
    })

    if(!course){
        return res.render('not-found')
    }

    
    return res.render(`${id}`, {items:courses})
     
  });





/* === COURSES === */

server.get("/starter", function(req, res){
    return res.render("starter")
})

server.get("/launchbase", function(req, res){
    return res.render("launchbase")
})


server.get("/gostack", function(req, res){
    return res.render("gostack")
})






server.use(function(req, res) {
    res.status(404).render("not-found");
});


server.listen(5000, function(){
    console.log("Server is running")
})