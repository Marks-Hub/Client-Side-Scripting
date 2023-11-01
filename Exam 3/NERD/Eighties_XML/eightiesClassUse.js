//Mark Okin
document.getElementById("selEighties").addEventListener("change", selectRamen)

let element = [];
window.onload = function() {
    Clear();
  };
fetch('eighties.xml')
    .then((res) => res.text())
    .then(function (data) {
        // need help parsing XML
        let parser = (new window.DOMParser()).parseFromString(data, "text/xml");

        console.log(parser.getElementsByTagName("element").length);
        for (let i = 0; i < parser.getElementsByTagName("element").length; i++) {
            //console.log(parser.getElementsByTagName("dogName")[i].childNodes[0].nodeValue);
            actor = parser.getElementsByTagName("actor")[i].childNodes[0].nodeValue;
            character = parser.getElementsByTagName("character")[i].childNodes[0].nodeValue;
            image = parser.getElementsByTagName("image")[i].childNodes[0].nodeValue;
            imdb = parser.getElementsByTagName("imdb")[i].childNodes[0].nodeValue;
            movie = parser.getElementsByTagName("movie")[i].childNodes[0].nodeValue;
            text = parser.getElementsByTagName("text")[i].childNodes[0].nodeValue;
            year = parser.getElementsByTagName("year")[i].childNodes[0].nodeValue;
            youtube = parser.getElementsByTagName("youtube")[i].childNodes[0].nodeValue;
            //console.log(dogImage);
            element[i] = new eightiesClass(actor, character, image, imdb, movie, text, year, youtube);
        }

        mySelect = document.getElementById("selEighties");
        for (i = 0; i < element.length; i++) {
            let myOption = document.createElement("option");
            myOption.text = element[i].actor;
            myOption.value = i;
            mySelect.appendChild(myOption);
        }
        mySelect.value = 0;
        let event = new Event('change');
        mySelect.dispatchEvent(event);
        // trigger a change event for the drop-down select
        
    })//end fetch

// when user selects a dog
function Clear(){
    mySelect.value = 0;
    let event = new Event('change');
        mySelect.dispatchEvent(event);
        

    document.getElementById("taCart").value = " ";
}

function selectRamen() {
    let myIndex = document.getElementById("selEighties").value;
    let userEighties = element[myIndex];
    document.getElementById("Years").innerHTML = userEighties.year;
    document.getElementById("Characters").innerHTML = userEighties.character;
    document.getElementById("Actor").innerHTML = userEighties.actor;
    document.getElementById("quotes").innerHTML = userEighties.text;
    document.getElementById("imageEighties").src = userEighties.image;
    document.getElementById("link").href = userEighties.imdb;
    document.getElementById("frames").src = "https://www.youtube.com/embed/" + userEighties.youtube;


    


    
}


