console.log("Client side JS is loaded")

const weatherForm = document.querySelector("form")
const searchInput = document.querySelector("input")
const message1 = document.querySelector("#msg1")
const message2 = document.querySelector("#msg2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const address = searchInput.value
    console.log(address)
    message1.textContent = "Loading..."
    message2.textContent = ""
    
    fetch("/weather?address=" + encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if(data.error)
                message1.textContent = data.error
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }    
        })
    })  
})


