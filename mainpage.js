var test;
$("document").ready(function() {

	/**
	 * Binding buttons
	 */
	$('#button1').button().bind('click', getBuss);

});

function getBuss(){
		$.ajax({
		type: "GET",
		url: "https://reis.trafikanten.no/reisrest/realtime/getrealtimedata/3010333",
		dataType: "jsonp",
		success: function(response) {
			skriv(response);
			test = response;
		}
	});

};

function skriv(jsonTest){
   $("#aboutText").empty();
   $("#aboutText").append("Tid = " + new Date().toString().split(' ')[4]+ "<br>");
   $("#aboutText").append("<br> Mot Nydalen <br>");
   $("#aboutText1").empty();
   $("#aboutText1").append("Tid = " + new Date().toString().split(' ')[4]+ "<br>");
   $("#aboutText1").append("<br> Mot Sentrum <br>");
   for (i = 0; i < jsonTest.length; i++) {
   var tid = new Date(parseInt(jsonTest[i].ExpectedArrivalTime.substr(6)));
   var nå = new Date();
   var diff =  Math.abs(tid-nå)/60000;
   var avrundet = diff.toFixed(1)

   var tidString = new Date(parseInt(jsonTest[i].ExpectedArrivalTime.substr(6))).toString().split(' ')[4];
   var destinationName = jsonTest[i].DestinationName;
     if(destinationName == "Kjelsås stasjon"){
     var tekst = "Kjelsås stasjon = "+ tidString + " Antall minutter="+ avrundet;
        if(diff < 1){
                   $("#aboutText").append("<br> <font color=red>" + tekst + "</font><br>");
               }
               if(diff > 1 && diff < 2){
               $("#aboutText").append("<br> <font color=orange>" + tekst + "</font><br>");
               }
               if(diff > 2){
               $("#aboutText").append("<br> <font color=green>" + tekst + "</font><br>");
               }
     }
     if(destinationName == "Tåsen"){
     var tekst = "Tåsen = "+ tidString + " Antall minutter="+ avrundet;
        if(diff < 1){
            $("#aboutText").append("<br> <font color=red>" + tekst + "</font><br>");
        }
        if(diff > 1 && diff < 2){
        $("#aboutText").append("<br> <font color=orange>" + tekst + "</font><br>");
        }
        if(diff > 2){
        $("#aboutText").append("<br> <font color=green>" + tekst + "</font><br>");
        }
     }
     if(destinationName == "Aker brygge"){
          var tekst = "Aker brygge = "+ tidString + " Antall minutter="+ avrundet;
             if(diff < 1){
                 $("#aboutText1").append("<br> <font color=red>" + tekst + "</font><br>");
             }
             if(diff > 1 && diff < 2){
             $("#aboutText1").append("<br> <font color=orange>" + tekst + "</font><br>");
             }
             if(diff > 2){
             $("#aboutText1").append("<br> <font color=green>" + tekst + "</font><br>");
             }
          }
          if(destinationName == "Ekeberg hageby"){
               var tekst = "Ekeberg hageby = "+ tidString + " Antall minutter="+ avrundet;
                  if(diff < 1){
                      $("#aboutText1").append("<br> <font color=red>" + tekst + "</font><br>");
                  }
                  if(diff > 1 && diff < 2){
                  $("#aboutText1").append("<br> <font color=orange>" + tekst + "</font><br>");
                  }
                  if(diff > 2){
                  $("#aboutText1").append("<br> <font color=green>" + tekst + "</font><br>");
                  }
               }
   }
   setTimeout(getBuss, 5000);
}