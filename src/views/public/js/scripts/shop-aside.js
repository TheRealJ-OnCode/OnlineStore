const menuControllers = document.querySelectorAll(".filter-text");
menuControllers.forEach(controller => {
    controller.addEventListener("click",e=>{
        const parentElement = controller.parentElement;
        const filterContent = controller.parentElement.querySelector(".filter-content")
        filterContent.classList.toggle("active")
    })
    
});
