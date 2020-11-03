/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const nav_ul = document.getElementById('navbar__list');
const nav_bar = document.querySelector('.page__header');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function create_nav_elements(){
    let newfragment = document.createDocumentFragment();
    for (section of sections){
        let new_li = document.createElement("li");
        let new_a = document.createElement("a");
        new_a.innerText = section.getAttribute('data-nav');
        new_a.setAttribute('data-nav',section.id);
        new_li.id = section.getAttribute('data-nav');
        new_li.classList.add('menu__link');
        new_li.appendChild(new_a);
        newfragment.appendChild(new_li);
    }
    return newfragment;
}

let observer = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("your-active-class");
            nlist = document.querySelectorAll("li");
            let current_li = document.getElementById(entry.target.getAttribute('data-nav'));
            current_li.classList.add('menu_link_active');
            current_li.classList.remove('menu__link');
        }
        else
        {
            entry.target.classList.remove("your-active-class");
            nlist = document.querySelectorAll("li");
            let current_li = document.getElementById(entry.target.getAttribute('data-nav'));
            current_li.classList.remove('menu_link_active');
            current_li.classList.add('menu__link');
        }
    })
}, {threshold:0.3});

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function build_nav (){
    let newfragment = create_nav_elements();
    nav_ul.appendChild(newfragment);
}
// Add class 'active' to section when near top of viewport
function activate_section(){
sections.forEach(section => {
    observer.observe(section);
});
}
// Scroll to anchor ID using scrollTO event
function scroll_to_section(){
    let anchors = document.getElementsByTagName('a');
    for(anchor of anchors){
        anchor.addEventListener('click',
        (event)=>{
            let target_section = document.getElementById(event.target.getAttribute('data-nav'));
            target_section.scrollIntoView( {behavior:"smooth",block:"center"} );
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
build_nav();

// Scroll to section on link click
scroll_to_section();

// Set sections as active
activate_section();

//Suggested edit: nav-bar auto-hide
let mouse = false;
window.addEventListener('mousemove',(event)=>{ if (event.clientY<50){
    nav_bar.style.display = 'block';
    mouse = true;
}else {mouse =false;}}  );

window.addEventListener("scroll",()=>{ nav_bar.style.display = 'block';
setTimeout(()=>{
    if(!mouse){nav_bar.style.display = 'none'; }},2000 )});
