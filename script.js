const selectleng = document.querySelectorAll('select');
const text = document.getElementById('text');
const translateoutput = document.getElementById('translation');
const button = document.querySelector('.translate-btn');
const exchange = document.querySelector('.fa-exchange-alt');
const icons = document.querySelectorAll('.buttons i');
const copyfrom = document.querySelector('.copy-from');
const copyto = document.querySelector('.copy-to');
selectleng.forEach((tag, id) => {
    for (let country in countries) {
        let selected;
        if (id == 0 && country == 'en-GB') {
            selected = 'selected';
        } else if (id == 1 && country == "ur-PK") {
            selected = 'selected';
        }
        let options = `<option value='${country}' ${selected}>${countries[country]}</option>`;
        tag.insertAdjacentHTML('beforeend', options);
    }
});


button.addEventListener('click', () => {
    translatetext = selectleng[0].value;
    translation = selectleng[1].value;
    if (text.value == '') {
        alert('You have to write somthing!')
    } else {
        translateoutput.value = "Translating...";
        let MyMemoryURL = `https://api.mymemory.translated.net/get?q=${text.value}&langpair=${translatetext}|${translation}`;
        fetch(MyMemoryURL).then(res => res.json()).then((data) => {
            translateoutput.value = data.responseData.translatedText;
        }).catch((error) => {
            translateoutput.value = 'oops somthing wrong!';
        })
    }
});

// exchanging-function
exchange.addEventListener('click', () => {
    exchange.classList.toggle('active');
    let templeng = selectleng[0].value;
    selectleng[0].value = selectleng[1].value;
    selectleng[1].value = templeng;
});


icons.forEach(icon => {
    icon.addEventListener('click', ({ target }) => {
        if (target.classList.contains('fa-volume-up')) {
            let utterance;
            if (target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(text.value);
                utterance.lang = selectleng[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(translateoutput.value);
                utterance.lang = selectleng[1].value;
            }
            speechSynthesis.speak(utterance);
        } else {
            if (target.id == 'from') {
                navigator.clipboard.writeText(text.value);
                copyfrom.classList.remove('copy-from');
                setTimeout(() => { copyfrom.classList.add('copy-from'); }, 500)
            } else {
                navigator.clipboard.writeText(translateoutput.value);
                copyto.classList.remove('copy-to');
                setTimeout(() => { copyto.classList.add('copy-to'); }, 500)
            }
        }
    });
})






// icon.addEventListener('click', (target) => {
//     if (target.classList.contains('fa-copy')) {
//         if (target.id == 'from') {
//             console.log('frome speacker clicked');
//         } else {
//             console.log('to speacker clicked');
//         }
//     } else {
//         console.log('copy icon clicked');
//     }
// })