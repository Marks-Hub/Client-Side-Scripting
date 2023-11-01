//Mark Okin
document.getElementById("selRamen").addEventListener("change", selectRamen)

let ramen = [];
window.onload = function() {
    
  };
fetch('ramen.xml')
    .then((res) => res.text())
    .then(function (data) {
        // need help parsing XML
        let parser = (new window.DOMParser()).parseFromString(data, "text/xml");

        console.log(parser.getElementsByTagName("ramen").length);
        for (let i = 0; i < parser.getElementsByTagName("ramen").length; i++) {
            //console.log(parser.getElementsByTagName("dogName")[i].childNodes[0].nodeValue);
            name = parser.getElementsByTagName("name")[i].childNodes[0].nodeValue;
            num_serve = parser.getElementsByTagName("num_serve")[i].childNodes[0].nodeValue;
            serving_size = parser.getElementsByTagName("serving_size")[i].childNodes[0].nodeValue;
            calories = parser.getElementsByTagName("calories")[i].childNodes[0].nodeValue;
            carbs = parser.getElementsByTagName("carbs")[i].childNodes[0].nodeValue;
            sodium = parser.getElementsByTagName("sodium")[i].childNodes[0].nodeValue;
            image = parser.getElementsByTagName("image")[i].childNodes[0].nodeValue;
            amazon = parser.getElementsByTagName("amazon")[i].childNodes[0].nodeValue;
            desc = parser.getElementsByTagName("desc")[i].childNodes[0].nodeValue;
            //console.log(dogImage);
            ramen[i] = new ramenClass(name, num_serve, serving_size, calories, carbs, sodium, image, amazon, desc);
        }

        mySelect = document.getElementById("selRamen");
        for (i = 0; i < ramen.length; i++) {
            let myOption = document.createElement("option");
            myOption.text = ramen[i].name;
            myOption.value = i;
            mySelect.appendChild(myOption);
        }
        mySelect.value = Math.floor(Math.random() * ramen.length);
        let event = new Event('change');
        mySelect.dispatchEvent(event);
        // trigger a change event for the drop-down select
        
    })//end fetch

// when user selects a dog


function selectRamen() {
    let myIndex = document.getElementById("selRamen").value;
    let userRamen = ramen[myIndex];
    document.getElementById("servings").innerHTML = userRamen.num_serve;
    document.getElementById("servingsSize").innerHTML = userRamen.serving_size;
    document.getElementById("CalorieServings").innerHTML = userRamen.calories;
    document.getElementById("CarbServings").innerHTML = userRamen.carbs;
    document.getElementById("SodiumServings").innerHTML = userRamen.sodium;
    document.getElementById("description").innerHTML = userRamen.desc;
    document.getElementById("imageRamen").src = userRamen.image;

    


    
}



function handleTimeSel(){
    document.getElementById("taCart").value = " ";
}
