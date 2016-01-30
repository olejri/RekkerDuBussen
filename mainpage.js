var test;
$("document").ready(function() {
    hentFraRuter();
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