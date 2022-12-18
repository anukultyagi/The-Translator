const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector('.exchange');
const translateBtn = document.querySelector("button");

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
    const apiURL = 'https://api.mymemory.translated.net/get?q=' + text + '&langpair=' + translateFrom + '|' + translateTo
    fetch(apiURL).then(response => response.json()).then(response => {
        toText.value = response.responseData.translatedText

    })


})