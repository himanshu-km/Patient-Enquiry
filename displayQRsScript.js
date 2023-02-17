async function displayQRs(){
    // console.log("inside display qr function");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response =  await fetch("https://api.beaconstac.com/api/2.0/qrcodes/", requestOptions);
    let parsedResponse = await response.json();
    let qrArray = parsedResponse.results;
    //console.log(qrArray);
    for(let i = 0; i < 8; i++){
        //console.log(qrArray[i].id);
        getQRLink(qrArray[i].id);
    }
}

async function getQRLink(qr_id){
   var myHeaders = new Headers();
   myHeaders.append("Authorization", "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c");
   
   var requestOptions = {
     method: 'GET',
     headers: myHeaders,
     redirect: 'follow'
   };
   
   let response3 = await fetch(
     "https://appserver.beaconstac.com/api/2.0/qrcodes/"+qr_id+"/download/?size=1024&canvas_type=png",
     requestOptions
   );
   let parsedResponse3 = await response3.json();
   //console.log("parsedResponsePrinted", parsedResponse3);
   let qr_link = parsedResponse3.urls;
   //console.log("qr_link", qr_link.png);

   displayQRImage(qr_link.png);
 }

 function displayQRImage(qrLink){
    let output = document.getElementById("output");
    let img = document.createElement("img");
    //img.src = `https://www.example.com/images/${i}.png`
    //console.log(img);
    img.src = qrLink;
    img.width = 400;
    img.height = 400;
    //console.log(img.src);
    output.appendChild(img);
    let br = document.createElement("br");
    output.appendChild(br);
    //console.log(output);
 }
