const cards = document.querySelectorAll(".card");
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector(".close-modal");

const maximizeModal = document.querySelector(".maximize-modal");
const modal = document.querySelector(".modal");





for(let card of cards){
    card.addEventListener('click', function(){
        const videoId = card.getAttribute("id");
        window.location.href = `/video?id=${videoId}`
        
        
    })
}


    




/*Configurando Cards dos cursos*/


const cardsCourse = document.querySelectorAll(".card-course");
const modalCourse = document.querySelector('.course-modal-overlay');






for(let card of cardsCourse){
    card.addEventListener('click', function(){
        modalCourse.classList.add('active-course');
    })
}



closeModal.addEventListener('click', function(){
    modalCourse.classList.remove('active-course');
    modalCourse.querySelector("iframe").src = `https://www.rocketseat.com.br`;
    
})



