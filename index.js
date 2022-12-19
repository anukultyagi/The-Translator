const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector('.exchange');
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i")

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected
        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected"
        }
        // console.log(countries[country_code])
        const option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
    }
})

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value
    let tempLang = selectTag[0].value
    fromText.value = toText.value
    selectTag[0].value = selectTag[1].value
    toText.value = tempText
    selectTag[1].value = tempLang
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    const translateFrom = selectTag[0].value; //getting fromSelect tag value
    const translateTo = selectTag[1].value; //getting toSelect value

    if (text === "") {
        toText.value = "Enter Something to translate"
    } else {
        const apiURL = 'https://api.mymemory.translated.net/get?q=' + text + '&langpair=' + translateFrom + '|' + translateTo
        fetch(apiURL).then(response => response.json()).then(response => {
            toText.value = response.responseData.translatedText

        })
    }

})

icons.forEach((icon) => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
                // Alert the copied text
                alert("Copied the text: " + fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
                // Alert the copied text
                alert("Copied the text: " + toText.value);
            }
        } else {
            let msg;
            if (target.id == "from") {
                msg = new SpeechSynthesisUtterance(fromText.value);
                msg.lang = selectTag[0].value
            } else {
                msg = new SpeechSynthesisUtterance(toText.value);
                msg.lang = selectTag[1].value
            }
            speechSynthesis.speak(msg)
        }
    })

})