const NameValidation = (element)=>{
    const VALUE = element.value
    
    if (VALUE.length >= 2){
        let FILTERED_VALUE = VALUE.toLowerCase()
        
        FILTERED_VALUE = FILTERED_VALUE[0].toUpperCase() + FILTERED_VALUE.slice(1)
        
        return FILTERED_VALUE
    }else{
        return null
    }
}

const removeReuired = (element, e) => {
    let length = e.target.value.length

    if (length > 0) {
        element.classList.remove("input_required")
        element.classList.add("unactive")
    }else{
        element.classList.add("input_required")
        element.classList.remove("unactive")
    }
}

const sendDataToTelegram = (data)=>{
    fetch(`https://api.telegram.org/bot7167208214:AAHTpUVBibHVc0RksnxtgAUGqspxdwdK6WE/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: '6148293963',
      text: `Ім'я: ${data.name} \nНомер телефону: +380 ${data.phone} \nПримітка: ${data.message === '' ? "Немає" : data.message}`,
        
})
})
}

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"
}

const checkCookie = (name) => {
    const realName = name + "=";
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(realName) === 0) {
            return true
        }
    }

    return null
}

const getExpirationDate = (name) => {

}

const clearData = (elements)=>{
    elements.map((el)=>{
        el.value = null
    })
}

document.addEventListener("DOMContentLoaded", () => {

    const FORM = document.querySelector("#order__container_form")

    const NAME_INPUT = document.querySelector("#order__container_form_inputName")
    const PHONE_INPUT = document.querySelector("#order__container_form_inputPhone")
    const TEXT_AREA = document.querySelector("#order__container_form_textArea")

    PHONE_INPUT.addEventListener('input', (e) => {
        let input = e.target.value

        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    FORM.addEventListener("submit", (event) => {
        event.preventDefault()

        let cookie = checkCookie("ordered");

        if (cookie) {
            let expirationDate = 
            alert(`Ви вже оформили замовлення ! Наступне буде доступне з завтрашнього дня.`)
            return;
        }

        const name = NameValidation(NAME_INPUT)
        const phone = PHONE_INPUT.value
        const message = TEXT_AREA.value

        localStorage.setItem('ordered', true)
        clearData([NAME_INPUT, PHONE_INPUT, TEXT_AREA])

        setCookie("ordered", true, 1)

        if (name == null) {
            alert("Ім'я коротке")
        }else{
            const USER_DATA = { name, phone, message }
            sendDataToTelegram(USER_DATA)

            alert("Успішно оформлено замовлення")
            CloseOrderMenu(event)
        }
    })
})