let mySongs = [];

//page load
window.addEventListener("load", function () {

   document.getElementById("selecSong").addEventListener("change", chooseSong);

   //big long string to parse
   let KidSongData = "The Muffin Man,2:07,muffin.png,fXFg5QsTcLQ,muffin.txt|The Ants Go Marching,3:52,ants.png,2S__fbCGwOM,ants.txt|Twinkle Twinkle Little Star,2:33,twinkle.png,yCjJyiqpAuU,twinkle.txt|Old MacDonald Had A Farm,3:29,mcdonald.png,5oYKonYBujg,mcdonald.txt|Hickory Dickory Dock,3:01,hickory.png,HGgsklW-mtg,hickory.txt|The Farmer In The Dell,1:48,farmer.png,E-krsNziXEw,farmer.txt|Jack & Jill,1:46,jack.png,EFj0K38sPmA,jack.txt|Hot Cross Buns,1:43,hot.png,re3gXNTtwig,hot.txt";

   //parse/split the data first on the # delimiter
   let KidSongDataLines = KidSongData.split("|");

   //loop over results of above splitting
   KidSongDataLines.forEach((el, i) => {
      //second parsing on | delimiter
      let subdata = el.split(",");
      //instantiate an object (an element of an array of objects)
      mySongs[i] = new kidsSong(...subdata);
      //alert(mySongs[i].Title);
   });

   //load up Songs into select
   let mySelect = document.getElementById("selecSong");
   for (let i = 0; i < mySongs.length; i++) {
      let myOption = document.createElement("option");
      myOption.text = mySongs[i].Name;
      myOption.value = i;
      mySelect.appendChild(myOption);
   }

   // trigger a change event for the drop-down select
   let event = new Event('change');
   mySelect.dispatchEvent(event);

});

function chooseSong() {
    let myIndex = document.getElementById("selecSong").value;
    let userSong=mySongs[myIndex];
    document.getElementById("imgPlace").src = "http://www1.lasalle.edu/~blum/c230wks/Songs/" + userSong.Picture;
    document.getElementById("songDesc").src = "http://www1.lasalle.edu/~blum/c230wks/Songs/" + userSong.Desc;
    document.getElementById("youtubelink").src = "https://www.youtube.com/embed/" + userSong.YoutubeLink;
    document.getElementById("vidLength").innerHTML = userSong.Time;
 }
 