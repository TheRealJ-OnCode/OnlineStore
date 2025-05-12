import { updateCart } from "../utils/Cart.utils"
import { getElement } from "../utils/DOM.utils"

export class navView {
    constructor() {
        this.navOveraly = getElement("#nav-overlay");
        this.menuContainer = getElement("#menu-container");
        this.hamburgerMenu = getElement("#open-mb-menu");
        this.init()
    }
    init = () => {

        this.getParams();
        this.handleCartIconClicked()
        this.handleSearchIconClicked()
        this.handleNavOverlayClicked()
        this.handleHamburgerMenuClicked()
        this.handleSearch();
        updateCart()
    }
    getParams = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const productName = urlParams.get('product_name')
        if(productName){
            getElement("#search-input").value = productName;
        }
    }
    handleSearch = () => {
        const input = getElement("#search-input");
        const mobileInput = getElement("#mobile-search-input");

        const redirectOnEnter = (event) => {
            if (event.key === 'Enter') {
                const query = event.target.value.trim();
                if (query) {
                    window.location.href = "/products?product_name=" + query;
                }
            }
        };

        if (input) {
            input.addEventListener("keydown", redirectOnEnter);
        }

        if (mobileInput) {
            mobileInput.addEventListener("keydown", redirectOnEnter);
        }
    };

    handleCartIconClicked = () => {
        const cartIcon = getElement(".fa-cart-shopping");
        const cartContent = getElement("#cart-content");
        cartIcon.addEventListener('click', e => {

            if ([...cartContent.classList].indexOf('active') === -1) {
                updateCart()
            }
            cartContent.classList.toggle('active');
        })
    }
    openMobileMenu = () => {
        this.menuContainer.classList.toggle("active");
        this.navOveraly.classList.toggle("active")
        if ([...this.menuContainer.classList].indexOf("active") !== -1) {
            getElement("body").style.maxHeight = "100vh"
            getElement("body").style.overflow = "hidden"
        } else {
            getElement("body").style.maxHeight = "auto"
            getElement("body").style.overflow = "auto"
        }

    }
    handleSearchIconClicked = () => {
        const searchIcon = getElement("#search-icon-mobile");
        const childSearchContainer = getElement("#child-search-container");
        const mobileSearchContainer = getElement("#mobile-search-container");
        searchIcon.addEventListener("click", e => {
            mobileSearchContainer.classList.toggle("active");
            childSearchContainer.classList.toggle("active")
        })


    }

    handleNavOverlayClicked = () => {
        this.navOveraly.addEventListener("click", this.openMobileMenu)
    }
    handleHamburgerMenuClicked = () => {
        this.hamburgerMenu.addEventListener("click", this.openMobileMenu);
    }







}