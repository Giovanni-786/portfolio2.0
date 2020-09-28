const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const videos = require("./data")

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


server.get("/courses", function(req, res){
    const courses = {
        card_course: [

            {id_course:"starter",  
            card_url: "https://storage.googleapis.com/golden-wind/bootcamp-launchbase/assets/starter.svg",
            description_custom:"Torne-se um programador desejado", 
            description_default: "no mercado com esses cursos gratuitos", 
            price_course:"Free",
            class_custom: "customize-starter"},
            
            {id_course:"launchbase",
            card_url: "https://storage.googleapis.com/golden-wind/bootcamp-launchbase/assets/launchbase.svg",
            description_custom:"Domine programação do zero",
            description_default: "e tenha acesso às melhores oportunidades do mercado",
            price_course:"Paid",
            class_custom: "customize-launchbase"},
            
            {id_course: "gostack",
            card_url: "https://storage.googleapis.com/golden-wind/bootcamp-launchbase/assets/gostack.svg",
            description_custom:"Treinamento imersivo",
            description_default:"nas tecnologias mais modernas de desenvolvimento web e mobile",
            price_course: "Paid",
            class_custom: "customize-gostack"}
            
        ]

    }
    
    


    return res.render("courses", {courses:courses})

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
  

      //utilizando o método find para encontrar o id de cada vídeo e colocar na variável
      const course = courses.find(function(course){
        //retorna um boolean    
            return course.id == id   
        })
    
        if(!course){
            return res.render('not-found')
        }
    
        return res.render("courses", {courses:courses})

  });





server.use(function(req, res) {
    res.status(404).render("not-found");
});


server.listen(5000, function(){
    console.log("Server is running")
})