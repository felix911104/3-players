
    var origin;
    var destination;
    var departdate;
    var cabin;//e - Economy | b - Business | p - Premium Economy | f - First
    var adults;
    $("#Search-btn").on("click", function(event) {
        event.preventDefault();
        origin=$("#departure").val();
        destination=$("#destination").val();
        departdate = $("#example-date-input").val();
        cabin=$("#cabin").val();
        // adults=$("#adults").val(); 
        search();
    })


function search(){
    var queryURL="https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1="+origin+ "&destination1="+destination+"&departdate1="+departdate+"&cabin="+cabin+"&currency=USD&adults=1&bags=0"
        
    var flightInfo=[];
    $.ajax({
        url:queryURL,
        method:"GET",
        headers:{"X-RapidAPI-Host":"apidojo-kayak-v1.p.rapidapi.com",
        "X-RapidAPI-Key":"1736090860msh8920abe5b0cbfabp10ddd9jsn61f4b43be699"
        },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
    }).then(function(response) {
    var keyset =Object.entries( response.segset);
    var priceset = Object.entries(response.tripset);
    var totalPrice = 0;

    // console.log(keyset);
    for(var i=0;i<5;i++){
        var info = keyset[i][1];
        var flightNo = info.airlineCode + info.flightNumber;
        var leaveTime = info.leaveTimeDisplay;
        var arriveTime = info.arriveTimeDisplay;
        var price = priceset[i][1].displayLow;
        totalPrice += (parseInt(price.substr(1)));
        console.log(totalPrice);

    flightInfo.push({flightNumber: flightNo, 
    leaveTime:leaveTime,
    arriveTime:arriveTime,
    price:price
    });
    }
        var avePrice = totalPrice/5;

        // var newTable=$('<table class="table table-bordered">');
        // var newThead=$("<thead>");

        var newTbody=$("#flightInfo");
        
        var newTr=$("<tr>");
        newTr.append(
            $('<th scope="col">').text("Flight Number"),
            $('<th scope="col">').text("Departure"),
            $('<th scope="col">').text("Arrival"),
            $('<th scope="col">').text("Ticket Price"),
            );
            $("#flight-thead").empty();
            $("#flight-thead").append(newTr);
            newTbody.empty();
            for(var i=0;i<5;i++){
                var newTbodyTr=$("<tr>").append(
                    $("<td>").text(flightInfo[i].flightNumber),
                    $("<td>").text(flightInfo[i].leaveTime),
                    $("<td>").text(flightInfo[i].arriveTime),
                    $('<td>').text(flightInfo[i].price),
                    );
                    newTbody.append(newTbodyTr);
                }
            // $("#apt1").text("Average Ticket Price: $");
            $("#atp").empty();
            $("#atp").text("Average Ticket Price: $"+avePrice);
        // newThead.append(newTr);
        // newTable.append(newThead,newTbody);
        // $("#flight-display").append(newTable);
        
       



        });
}
