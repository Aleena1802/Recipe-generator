const span=document.querySelectorAll('span');
for(let i=0; i<span.length; i++){
span[i].addEventListener("click", function () {
    lead(this.id); // Pass the id attribute of the clicked span to the lead function
});
} //if we do span[i].addEventListener("click", lead(this.id)), then this directly calls the lead() funciton whereas the above code there is a function that
//passess the id attribute to the lead function


function lead(id) {
    if (id === "ingredients") {
        window.location.href = "ingredients.html";
    } else if (id === "nutrition") {
        window.location.href = "services.html";
    } else if (id === "diet") {
        window.location.href = "services.html";
    } else if (id === "intolerances") {
        window.location.href = "services.html";
    } else if (id === "cuisines") {
        window.location.href = "services.html";
    }
}



const paragraph = document.querySelector('section');
function handleScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 100) {
    paragraph.classList.add('active');
  } else {
    paragraph.classList.remove('active');
  }
}
    window.addEventListener('scroll', handleScroll);

// Trigger the animation if the paragraph is already in view when the page loads
window.addEventListener('DOMContentLoaded', () => {
  handleScroll();
});
    