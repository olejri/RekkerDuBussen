var test;
$("document").ready(function() {
    hentFraLocalStorage();

   $("#box1").on("click", function() {
      settFavoritt();
    });
});

function hentFraRuter(){
        var bussid = document.getElementById("valg").value;
		$.ajax({
		type: "GET",
		url: "https://reis.trafikanten.no/reisrest/realtime/getrealtimedata/"+bussid,
		dataType: "jsonp",
		success: function(response) {
			skriv(response);
			test = response;
		}
	});

};

function skriv(jsonTest){
   $("#venstreDiv").empty();
   $("#venstreDiv").append("Klokken: " + new Date().toString().split(' ')[4]+ "<br>");
   $("#høyreDiv").empty();
   $("#høyreDiv").append("Klokken: " + new Date().toString().split(' ')[4]+ "<br>");
   var antall = 0;
   if (jsonTest.length > 30){
    antall = 30;
   } else {
   antall = jsonTest.length;
   }

   for (i = 0; i < antall; i++) {
       var tid = new Date(parseInt(jsonTest[i].ExpectedArrivalTime.substr(6)));
       var nå = new Date();
       var diff =  Math.abs(tid-nå)/60000;
       var avrundet = diff.toFixed(1)
       var jsonObj = jsonTest[i];
       var tidString = new Date(parseInt(jsonObj.ExpectedArrivalTime.substr(6))).toString().split(' ')[4];
       var holdePlassNummer = jsonObj.DirectionName;
       var publishedLineName = jsonObj.PublishedLineName;
       var destinationName = jsonObj.DestinationName;

       leggTilTekst(holdePlassNummer, diff, avrundet, tidString, publishedLineName, destinationName);
   }
   setTimeout(hentFraRuter, 5000);
}

function leggTilTekst(holdePlassNummer, diff, avrundet, tidString, publishedLineName, destinationName){
    var tekst =  publishedLineName + "-" + destinationName + ". "+ avrundet + " min";

    if(holdePlassNummer == 1) {
            if(diff < 1){
                $("#høyreDiv").append("<br> <font color=red>" + tekst + "</font><br>");
            }
            if(diff > 1 && diff < 2){
                $("#høyreDiv").append("<br> <font color=orange>" + tekst + "</font><br>");
            }
            if(diff > 2){
                $("#høyreDiv").append("<br> <font color=green>" + tekst + "</font><br>");
            }
    } else {
            if(diff < 1){
               $("#venstreDiv").append("<br> <font color=red>" + tekst + "</font><br>");
            }
            if(diff > 1 && diff < 2){
            $("#venstreDiv").append("<br> <font color=orange>" + tekst + "</font><br>");
            }
            if(diff > 2){
               $("#venstreDiv").append("<br> <font color=green>" + tekst + "</font><br>");
            }
         }
}


function settFavoritt(){
    if(document.getElementById("box1").checked) {
    var lagretFavoritt = localStorage.getItem('holdeplassid');
    var nyFavoritt = document.getElementById("valg").value;

    if(lagretFavoritt == null || lagretFavoritt != nyFavoritt){
        localStorage.setItem('holdeplassid', nyFavoritt);
    }

    } else {
    var lagretFavoritt = localStorage.getItem('holdeplassid');
        var nyFavoritt = document.getElementById("valg").value;

        if(lagretFavoritt == nyFavoritt) {
        localStorage.setItem('holdeplassid', 'ingen');
        }
    }
}

function nyttValg(){
    var nyttValg = document.getElementById("valg").value;
    var lagretFavoritt = localStorage.getItem('holdeplassid');

    if(lagretFavoritt != null && lagretFavoritt != 'ingen' && nyttValg == lagretFavoritt){
       document.getElementById("box1").checked = true;
    } else {
       document.getElementById("box1").checked = false;
    }
}

function hentFraLocalStorage(){
    var lagretFavoritt = localStorage.getItem('holdeplassid');
    var listeMedHoldeplasser = document.getElementById("valg").options;
    var antallHoldeplasser = document.getElementById("valg").options.length;

    for (var i = 0; i < antallHoldeplasser; i++) {
        console.log(listeMedHoldeplasser[i].value);
        console.log(lagretFavoritt);
        if(lagretFavoritt == listeMedHoldeplasser[i].value) {
            console.log("KOMMER INN HIT");
            listeMedHoldeplasser.selectedIndex = ""+i;
            document.getElementById("box1").checked = true;
            continue;

        }
    }
    hentFraRuter();
}