document.getElementById("selTitle").addEventListener("change", selectTitle)
document.getElementById("search").addEventListener("click", button)
document.getElementById("selMax").addEventListener("change", handleTimeSel)
document.getElementById("selMin").addEventListener("change", handleTimeSel)

// declare an array 
let tedTalk = [];
window.onload = function() {
    Clear();
  };
fetch('ted.xml')
    .then((res) => res.text())
    .then(function (data) {
        // need help parsing XML
        let parser = (new window.DOMParser()).parseFromString(data, "text/xml");

        console.log(parser.getElementsByTagName("talks").length);
        for (let i = 0; i < parser.getElementsByTagName("talks").length; i++) {
            //console.log(parser.getElementsByTagName("dogName")[i].childNodes[0].nodeValue);
            tedRank = parser.getElementsByTagName("tedRank")[i].childNodes[0].nodeValue;
            tedTitle = parser.getElementsByTagName("tedTitle")[i].childNodes[0].nodeValue;
            tedAuthor = parser.getElementsByTagName("tedAuthor")[i].childNodes[0].nodeValue;
            tedTime = parser.getElementsByTagName("tedTime")[i].childNodes[0].nodeValue;
            tedViews = parser.getElementsByTagName("tedViews")[i].childNodes[0].nodeValue;
            tedDesc = parser.getElementsByTagName("tedDesc")[i].childNodes[0].nodeValue;
            tedYoutube = parser.getElementsByTagName("tedYoutube")[i].childNodes[0].nodeValue;
            //console.log(dogImage);
            tedTalk[i] = new ted_class(tedRank, tedTitle, tedAuthor, tedTime, tedViews, tedDesc, tedYoutube);
        }

        mySelect = document.getElementById("selTitle");
        for (i = 0; i < tedTalk.length; i++) {
            let myOption = document.createElement("option");
            myOption.text = tedTalk[i].tedTitle + " | Rank: " + tedTalk[i].tedRank;
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
low = document.getElementById("selMin");
high = document.getElementById("selMax");
function selectTitle() {
    let myIndex = document.getElementById("selTitle").value;
    let userTed = tedTalk[myIndex];
    document.getElementById("spnAuthor").innerHTML = userTed.tedAuthor;
    document.getElementById("spnRuntime").innerHTML = userTed.tedTime;
    document.getElementById("spnViews").innerHTML = userTed.tedViews;
    document.getElementById("spnDesc").innerHTML = userTed.tedDesc;
    document.getElementById("YTVid").src = "https://www.youtube.com/embed/" + userTed.tedYoutube;

    


    
}

function button(){

    for (i = 0; i < tedTalk.length; i++) {
        let time = parseInt(tedTalk[i].tedTime);

        if (time >= parseInt(low.value) && time <= parseInt(high.value) ){
            let results = tedTalk[i].tedTitle + " " + tedTalk[i].tedTime + "\n \n ";
             document.getElementById("taCart").value += results;
        }
        
    }
}

function handleTimeSel(){
    document.getElementById("taCart").value = " ";
}
