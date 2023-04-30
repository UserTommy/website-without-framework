let mainColors = localStorage.getItem("color-option");
if(mainColors !== null){
    document.documentElement.style.setProperty("--main-color", mainColors);
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
        if(element.dataset.color === mainColors){
            element.classList.add("active");
        }
    });
}
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");
if(backgroundLocalItem !== null){
    document.querySelectorAll(".random-backgrounds span").forEach(span => {
        span.classList.remove("active");
    });
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
document.querySelector(".toggle-settings .fa-gear").onclick = function (){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("opened");
};
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li=>{
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActive(e);
    });
});
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span=>{
    span.addEventListener("click", (e)=>{
        handleActive(e);
        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    });
});
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg",];
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(()=>{
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = `url(../imgs/${imgsArray[randomNumber]})`
        }, 5000);
    }
}
randomizeImgs();
let ourSkills = document.querySelector(".skills");
window.onscroll = function(){
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollY = this.scrollY;
    if(windowScrollY > skillsOffsetTop + skillsOuterHeight - windowHeight){
        let theSkills = document.querySelectorAll(".skill-box .skill-progress span");
        theSkills.forEach(skill => {
           skill.style.width = skill.dataset.progress; 
        });
    }
};
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if(Image.alt !== null){
            let imgHeading =document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
        window.onkeyup = function(e){
            if(e.key === "Escape"){
                overlay.remove();
                popupBox.remove();
            }
        }
        document.addEventListener("click", (e) => {
            if(e.target.className == "popup-overlay"){
                overlay.remove();
                popupBox.remove();
            }
        });
    });
});
document.addEventListener("click", (e) => {
    if (e.target.className == "close-button"){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
function scrollToSomewhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: document.querySelector(e.target.dataset.section).offsetTop,
                behavior:"smooth",
            });
        });
    });
}
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null){
    bulletsSpan.forEach(span=>{
        span.classList.remove("active");
    });
    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span=>{
    span.addEventListener("click", (e)=>{
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        }else{
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);
    });
});
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets_option");
    window.location.reload();
};
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");
toggleBtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
}
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== tlinks){
        if(tlinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
});
// tlinks.onclick = function(e){
//     e.stopPropagation();
// }