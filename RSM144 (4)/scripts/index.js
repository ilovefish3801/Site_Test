
const OpenOrderMenu = function () {
    let MenuClassList = document.querySelector(".order").classList
    let Body = document.querySelector(".body")

    if (!MenuClassList.contains("active")) {
        MenuClassList.add("active")
        Body.classList.add("bodyActive")
    }
    
}
const CloseOrderMenu = function (event) {
    let Body = document.querySelector(".body")
    let MenuClassList = document.querySelector(".order").classList

    if (MenuClassList.contains("active")) {
        if (event.target === event.currentTarget) {
            MenuClassList.remove("active")
            Body.classList.remove("bodyActive")
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {
    
})