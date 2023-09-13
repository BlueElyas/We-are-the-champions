import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js"
import { getDatabase, ref, push, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"

let realtimeDatabase = {
    databaseURL: "https://we-are-the-champions-54d9e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(realtimeDatabase)
const databaseEndorsmentForApp = getDatabase(app) 
const endorsementsInDB = ref(databaseEndorsmentForApp, "endorsements")
const endorsmentInput = document.getElementById("endorsement-element")
const endorsementBtn = document.getElementById("push-for-endorsement")
let endorsementListEl = document.getElementById("endorsement-list")


endorsementBtn.addEventListener("click", function() {
    let inputValue = endorsmentInput.value.trim() 
    if (inputValue) {
        push(endorsementsInDB, inputValue)
        appendItemsToEndorsements()
        clearInputValue()
    }
})

get(child(endorsementsInDB, "endorsements"), function keepElementOnPage(snapshot) {
    if (snapshot.exists()) {
        appendItemsToEndorsements(snapshot.val())
    } else {
        return false
    }

})

// onValue(endorsementsInDB, function(snapshot) {
//     const data = snapshot.val()
//     endorsementsInDB(postElement, data)
// })



function clearInputValue() {
    endorsmentInput.value = ""
}

function appendItemsToEndorsements() {
    let itemValue = endorsmentInput.value
    let newList = document.createElement("li", "br")
    newList.innerHTML = itemValue
    endorsementListEl.append(newList)
}