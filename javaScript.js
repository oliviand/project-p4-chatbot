// All the DOM selectors stored as short variables
const chat = document.getElementById("chat")
const nameForm = document.getElementById("name-form")
const nameInput = document.getElementById("name-input")

// Vi hämtar input-wrapper från HTML:en för att kunna byta ut innehållet
const inputWrapper = document.getElementById("input-wrapper")

// Menyer (ändrar i HTML-koden)
//Den första i menyn är disabled så man inte ska kunna välja den
const economyMenu =`
<select id="select">
<option value="" select diabled>Antal incheckade bagage per person...</option>
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
</select>
`

const businessMenu =`
<select id="select">
<option value="" select diabled>Antal incheckade bagage per person...</option>
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
</select>
`

const firstMenu =`
<select id="select">
<option value="" select diabled>Antal incheckade bagage per person...</option>
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
</select>
`
// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

// Vi deklarerar vår sista funktion med två parametrar
const askForConfirmation = (amount, selectedBagage) => {
  
  // Vi tömmer input-fältet
  inputWrapper.innerHTML = ""

  // Vi skickar ett meddelande från botten med hjälp av parametrarna
  showMessage(`Okej, låter toppen! Vill du gå vidare och välja datum eller vill du börja om från början?`, "bot")
  
  // Vi byter ut HTML:en till två knappar och ger dem varsitt id
  inputWrapper.innerHTML = `
    <button id="restart">Börja om ✋</button>
    <button id="confirm">Gå vidare 😋</button>
  `
  
  // Vi hämtar knapparna för att sedan kunna lyssna på knapptryck
  // Nej-knappen har id="restart" och då kallar vi på en inbyggd
  // JavaScript-funktion för att ladda om sidan.
  document.getElementById("restart").addEventListener("click", () => location.reload())
  
  // Ja-knappen har id="confirm"
  document.getElementById("confirm").addEventListener("click", () => {
    
    // Vi tömmer då input-fältet
    inputWrapper.innerHTML = ""

    // Vi skickar ett meddelande från användaren
    showMessage("Gå vidare 😋", "user")

    // Vi skickar vårt sista meddelande från boten och använder dels
    // parametrarna amount och selectedDish, men också den globala
    // variabeln userName
    setTimeout(() => showMessage(`Då forstätter vi med att bestämma datum`, "bot"), 1000)
  })
}


//Fråga 4

const askForPeople = selectedBagage => {
  
  // Vi skickar ett meddelande från boten och hämtar då upp parametern
  showMessage(`Hur många personer är det i ditt sällskap?`, "bot")

  // Vi byter ut input-fältets HTML för att visa en numerisk input och
  // en knapp. Vi ger dem varsitt id för att kunna använda dem  nedan.
  inputWrapper.innerHTML = `
    <input type="number" id="amount"/>
    <button id="amount-btn" class="send-btn">
      Skicka
    </button>
  `
  
  // Vi sparar den numeriska inputten i en variabel
  const peopleInput = document.getElementById("amount")

  // Vi hämtar knappen för att kunna lyssna på knapptrycket.
  document.getElementById("amount-btn").addEventListener("click", () => {
    
    // Vid knapptryck skickar vi först ett meddelande från användaren
    // med värdet av den numeriska inputten
    showMessage(peopleInput.value, "user")

    // Därefter kallar vi på nästa funktion med en fördröjning. Vi skickar
    // med både värdet av den numeriska inputten och den valda maträtten
    // som argument.
    setTimeout(() => askForConfirmation(peopleInput.value, selectedBagage), 1000)
  })
}

//Fråga 3

// Vi definierar climateChoice som en parameter för att kunna ta emot
// plats-valet som ett argument ("pizza", "pasta" eller "sallad")
const askForComfort = comfortChoice => {
  showMessage(`${comfortChoice}` , "user")
  setTimeout(() => showMessage(`Hur många incheckade bagage vill ni ha per person?`, "bot"), 1000)

  // Vi skriver ett villkor för om användaren valt pizza
  if (comfortChoice === "Ekonomi") {
    // Vi definierade menyerna som variabler högst upp i dokumentet
    // Vi byter ut innehållet i inputWrapper från knappar till en rullgardinsmeny
    inputWrapper.innerHTML = economyMenu

  } else if (comfortChoice === "Business") {
    // Visa pastameny
    inputWrapper.innerHTML = businessMenu

  } else {
    // Visa salladsmeny
    inputWrapper.innerHTML = firstMenu
  }

  const selectedBagage = document.getElementById("select")

    // Vi hämtar rullgardins-menyn från HTML:en med hjälp av dess id

    // Vi lyssnar på en förändring i rullgardinmenyn
    selectedBagage.addEventListener("change", () => {
    
    // Vi skickar värdet av rullgardinsvalet som ett meddelande från
    // användaren.
    showMessage(selectedBagage.value, "user")

    // Vi kallar på askForAmount-funktionen med fördröjning. Vi skickar
    // med värdet av rullgardinsmenyn som ett argument.
    setTimeout(() => askForPeople(selectedBagage.value), 1000)
  })

}
// Fråga 2
// Vi definierar userName som parameter för att kunna skicka med
// den från vår förra funktion.


const askForPlace = destination => {
   
  showMessage(`Bra val! ${destination} är ett av mina favoritställen! Hur vill du resa?`, "bot")

  // Vi byter ut innehållet i inputWrapper från text-input till knappar
  inputWrapper.innerHTML=`
    <button id="economyButton">Ekonomi</button>
    <button id="businessButton">Business</button>
    <button id="firstButton">Första klass</button>
  `
  // Vi hämtar knapparna med hjälp av dess id:n.
  // Vi lyssnar på klick-händelsen och kallar då på funktionen som styr nästa fråga (askForDish)
  // Vi skickar med valet av mat som ett argument i form av en sträng
  // PS. Man kan skriva document.getElementById("pizzaButton").addEventListener("click", () => askForDish("pizza"))
  // på en rad, men för att göra det mer läsbart kan man formattera det som nedan
  
  document
    .getElementById("economyButton")
    .addEventListener("click", () => askForComfort("Ekonomi"))
  document
    .getElementById("businessButton")
    .addEventListener("click", () => askForComfort("Business"))
  document
    .getElementById("firstButton")
    .addEventListener("click", () => askForComfort("Första klass"))
}

//Fråga 1
// Vi definierar händelsen som en parameter för att kunna förhindra
// formulärets standardbeteende (som är att ladda om sidan)

const handleNameInput = event => {

event.preventDefault()
const destination = nameInput.value
nameInput.value = ""
showMessage (destination, "user")

  // Med 1 sekunds fördröjning kallar vi på askForPlace-funktionen
  // och skickar med userName-variabeln som argument.
  setTimeout(() => askForPlace(destination), 1000)
}

// Starts here
const greeting = () => {
  showMessage(`Hej, kul att du har valt att boka din nästa resa! Börja med att skriva in ditt resmål`, "bot")
  // Just to check it out, change 'bot' to 'user' here 👆
}

// Set up your eventlisteners here
// När formuläret skickas anropas handleNameInput-funktionen.
nameForm.addEventListener("submit", handleNameInput)


// When website loaded, chatbot asks first question.
// normally we would invoke a function like this:
// greeting()
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greeting, 1000)
