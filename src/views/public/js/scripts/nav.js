
const searchIcon = document.querySelector("#search-icon-mobile");
const navOveraly = document.querySelector("#nav-overlay")
const childSearchContainer = document.querySelector("#child-search-container");
const mobileSearchContainer = document.querySelector("#mobile-search-container");
const menuContainer = document.querySelector("#menu-container");
const hamburgerMenu = document.querySelector("#open-mb-menu");
searchIcon.addEventListener("click", e => {
    mobileSearchContainer.classList.toggle("active");
    childSearchContainer.classList.toggle("active")
})

const openMobileMenu = () => {
    menuContainer.classList.toggle("active");
    navOveraly.classList.toggle("active")
    if ([...menuContainer.classList].indexOf("active") !== -1) {
        document.querySelector("body").style.maxHeight = "100vh"
        document.querySelector("body").style.overflow = "hidden"
    } else {
        document.querySelector("body").style.maxHeight = "auto"
        document.querySelector("body").style.overflow = "auto"
    }

}

hamburgerMenu.addEventListener("click", openMobileMenu)
navOveraly.addEventListener("click", openMobileMenu)

