import { getAllElement, getElement } from "../utils/DOM.utils"
// ! Demeli filtrler bir yerde uygulanmir category uygulananda , price a baxanda , sadece bir denesi uygulanir
// ! in stock filtri guncel deyil
// ! replace pushstates with fucking redirects


export class shopView {
    constructor() {

        this.init();

    }
    init = () => {
        this.regex = /^[0-9]+$/;
        this.minPrice = 0;
        this.maxPrice = 1000;
        this.categories = [];
        this.inStock = true;
        this.ascDescPrice = "all"
        this.controlFilters();
        this.numericInputController();
        this.handlePriceChanged();
        this.applyOnloadFilters();
        this.handleClearFilters();

    }
    clearFilters = () => {
        this.categories = [];
        this.minPrice = 0;
        this.maxPrice = 1000;
        this.inStock = undefined;

        getAllElement(".category-filter-checkbox").forEach(checkbox => checkbox.checked = false);
        getElement("input#min").value = this.minPrice;
        getElement("input#max").value = this.maxPrice;
        getElement("#inStock").checked = false;
        getElement("#outOfStock").checked = false;

        window.history.replaceState(null, '', '/products');

        this.applyOnloadFilters();
    }
    applyOnloadFilters = () => {
        const params = new URLSearchParams(window.location.search);
        const paramsJSON = Object.fromEntries(params.entries());
        const { maxPrice, minPrice, categories, inStock, priceType } = paramsJSON;
        if (categories) {
            categories.split(",").forEach(category => {
                getAllElement(".category-filter-checkbox").forEach(input => {
                    if (input.name === category) {
                        input.checked = true;
                        this.categories.push(category)
                    }
                });
                getElement("#category-filter > .filter-content").classList.add("active")
            });
        }

        if (this.regex.test(maxPrice) && this.regex.test(minPrice)) {
            this.maxPrice = maxPrice;
            this.minPrice = minPrice;
        }
        this.inStock = inStock;
        if (this.inStock === "true") {
            getElement("#outOfStock").checked = false
            getElement("#inStock").checked = true;
        }
        else if (this.inStock === "false") {
            getElement("#inStock").checked = false;
            getElement("#outOfStock").checked = true
        }
        else if (this.inStock === undefined) {
            getElement("#inStock").checked = false;
            getElement("#outOfStock").checked = false

        }
        getElement("input#min").value = this.minPrice;
        getElement("input#max").value = this.maxPrice;
        const selectBox = getElement("#sort-product");
        if (priceType === "asc") {
            selectBox.selectedIndex = 0;
        } else if (priceType === "desc") {
            selectBox.selectedIndex = 1
        }else{
            selectBox.selectedIndex = 2;
        }
    }


    controlFilters = () => {
        // ! filters div controls
        const menuControllers = getAllElement(".filter-text");
        menuControllers.forEach(controller => {
            controller.addEventListener("click", e => {
                const filterContent = controller.parentElement.querySelector(".filter-content")
                filterContent.classList.toggle("active")
            })
        });
        // ? apply category filters
        const categoryCheckBoxes = getAllElement(".category-filter-checkbox");
        categoryCheckBoxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selectedCategories = Array.from(categoryCheckBoxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.name);
                this.categories = selectedCategories;
            });
        });
        // ! instock filter
        const stockFilter = getAllElement(".stock-filter");
        stockFilter.forEach(filter => {
            filter.addEventListener("change", e => {
                console.log(this.inStock);

                const id = e.target.id;
                if (id === "inStock") this.inStock = true;
                else this.inStock = false;
            })
        })
        // * price (asc desc) select
        const sortProduct = getElement("#sort-product");
        sortProduct.addEventListener("change", e => {
            this.ascDescPrice = sortProduct.value


        })
    }
    numericInputController = () => {
        const numericInputs = getAllElement(".numeric-input");
        numericInputs.forEach(input => {
            input.addEventListener('input', e => {
                const currentValue = e.target.value.trim();
                const newValue = currentValue.replace(/[^\d]/g, '');
                if (currentValue !== newValue) e.target.value = newValue;
            });
        });
    }

    validatePricesInput = () => {
        const minInput = getElement("input#min");
        const maxInput = getElement("input#max");

        const minInputValue = minInput.value.trim();
        const maxInputValue = maxInput.value.trim();

        if (!this.regex.test(minInputValue) || !this.regex.test(maxInputValue)) {
            const invalidInput = !this.regex.test(minInputValue) ? minInput : maxInput;
            invalidInput.style.borderColor = "#ed2939";
            return false;
        }

        this.minPrice = minInputValue;
        this.maxPrice = maxInputValue;
        maxInput.style.borderColor = "#e5e5e5";
        return true;
    }

    handlePriceChanged = () => {

        const filterPricesBtn = getElement("#filter-prices");
        filterPricesBtn.addEventListener("click", e => {
            if (this.validatePricesInput()) {
                return window.location.href = `/products?minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&categories=${this.categories.join(",")}&inStock=${this.inStock}&priceType=${this.ascDescPrice}`
            }
        })
    }
    handleClearFilters = () => {
        const clearFiltersButton = getElement("button#clear-filters");
        clearFiltersButton.addEventListener("click", e => {
            this.clearFilters();
        })
    }
};
