async function createLanding() {

  let btn = document.getElementById("btn_content");
  btn.innerHTML = 'Downloading...';
  document.getElementById('submit_btn').disabled = true;

  
  let form = document.getElementById("myForm");
  console.log(form.elements);

  let myname = form.elements[0].value;
  console.log(myname);
  let pdob = form.elements[1].value;
  console.log(pdob);
  let pemail = form.elements[2].value;
  console.log(pemail);
  let pmobile = form.elements[3].value;
  console.log(pmobile);
  let pgender = form.elements[4].value;
  console.log(pgender);
  let poccupation = form.elements[5].value;
  console.log(poccupation);

  let pidtype = form.elements[6].value;
  console.log(pidtype);
  let pidnum = form.elements[7].value;
  console.log(pidnum);
  let pissue = form.elements[8].value;
  console.log(pissue);

  let ename = form.elements[9].value;
  console.log(ename);
  let emob = form.elements[10].value;
  console.log(emob);
  let egender = form.elements[11].value;
  console.log("egender",egender);

  let atype = form.elements[13].value;
  console.log("atype",atype);
  let anat = form.elements[14].value;
  console.log("anat",anat);
  let astate = form.elements[15].value;
  console.log(astate);
  let adis = form.elements[16].value;
  console.log(adis);
  let ablock = form.elements[17].value;
  console.log(ablock);
  let awrd = form.elements[18].value;
  console.log(awrd);

  let hreason = form.elements[19].value;
  console.log(hreason);
  let hcri = form.elements[20].value;
  console.log(hcri);
  let hmeds = form.elements[21].value;
  console.log(hmeds);

  let icomp = form.elements[22].value;
  console.log(icomp);
  let iid = form.elements[23].value;
  console.log(iid);
  let iname = form.elements[24].value;
  console.log(iname);

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    organization: 26724,
    title: "Information Page of " + myname,
    markdown_body: "",
    html_body:'<title>Information</title></head><body> <div class="container"> <h1>Form Information</h1> <ul> <li><span>Full Name:</span>'+myname+'</li> <li><span>Date of Birth:</span>'+pdob+'</li> <li><span>Email:</span>'+pemail+'</li> <li><span>Mobile Number:</span>'+pmobile+'</li> <li><span>Gender:</span>'+pgender+'</li> <li><span>Occupation:</span>'+poccupation+'</li> <li><span>ID Type:</span>'+pidtype+'</li> <li><span>ID Number:</span>'+pidnum+'</li> <li><span>Issued Authority:</span>'+pissue+'</li> <li><span>Emergency Contact:</span>'+ename+'</li> <li><span>Emergency Contact Mobile Number:</span>'+emob+'</li> <li><span>Emergency Contact Gender:</span>'+egender+'</li> <li><span>Address Type:</span>'+atype+'</li> <li><span>Nationality:</span>'+anat+'</li> <li><span>State:</span>'+astate+'</li> <li><span>District:</span>'+adis+'</li> <li><span>Block Number:</span>'+ablock+'</li> <li><span>Ward Number:</span>'+awrd+'</li> <li><span>Reason for Registration:</span>'+hreason+'</li> <li><span>Criticality:</span>'+hcri+'</li> <li><span>Ongoing Medication:</span>'+hmeds+'</li> <li><span>Insurance Company:</span>'+icomp+'</li> <li><span>Insurance ID:</span>'+iid+'</li> <li><span>Policy Holder\'s Name:</span>'+iname+'</li> </ul> </div></body></html>',
    css_body: "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(
    "https://api.beaconstac.com/api/2.0/markdowncards/",
    requestOptions
  );
  let parsedResponse = await response.json();
  let markdown_id = parsedResponse.id;
  console.log("markdown_id", markdown_id);

  createQR(markdown_id, myname);
}

async function createQR(markdown_id, myname){
  console.log("myname2",myname);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": "Markdown Card",
    "organization": 26724,
    "qr_type": 2,
    "campaign": {
      "content_type": 2,
      "markdown_card": markdown_id
    },
    "location_enabled": false,
    "attributes": {
      "color": "#2595ff",
      "colorDark": "#2595ff",
      "margin": 80,
      "isVCard": false,
      "frameText": myname,
      "logoImage": "https://d1bqobzsowu5wu.cloudfront.net/15406/36caec11f02d460aad0604fa26799c50",
      "logoScale": 0.1992,
      "frameColor": "#2595FF",
      "frameStyle": "banner-bottom",
      "logoMargin": 10,
      "dataPattern": "square",
      "eyeBallShape": "circle",
      "gradientType": "none",
      "eyeFrameColor": "#2595FF",
      "eyeFrameShape": "rounded"
    }
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // fetch("https://api.beaconstac.com/api/2.0/qrcodes/", requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => console.log(result.id))
  //   .catch((error) => console.log("error", error));

  let response2 = await fetch(
    "https://api.beaconstac.com/api/2.0/qrcodes/",
    requestOptions
  );
  let parsedResponse2 = await response2.json();
  let qr_id = parsedResponse2.id;
  console.log("qr_id", qr_id);

  downloadQR(qr_id);
}


async function downloadQR(qr_id){
   console.log("from downloadQR", qr_id)
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  // console.log("https://api.beaconstac.com/api/2.0/qrcodes/"+ qr_id +"/download/?size=1024&error_correction_level=5&canvas_type=png");
  let response3 = await fetch(
    "https://appserver.beaconstac.com/api/2.0/qrcodes/"+qr_id+"/download/?size=1024&canvas_type=png",
    requestOptions
  );
  let parsedResponse3 = await response3.json();
  console.log("parsedResponsePrinted", parsedResponse3);
  let qr_link = parsedResponse3.urls;
  console.log("qr_link", qr_link);

  // fetch("https://api.beaconstac.com/api/2.0/qrcodes/1561020/download/?size=1024&error_correction_level=5&canvas_type=png", requestOptions)
  //   .then(response => response.json())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));  
  downloadImage(qr_link.png);

  
  // document.getElementById('submit_btn').innerHTML = '<div class="boxLoading">Downloaded</div>';
  document.getElementById('btn_content').innerHTML = 'Download Again';
  document.getElementById('submit_btn').disabled = false;
}

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageSrc;
  link.download = "Your " + "QR";
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/* 
async function deleteAll()
{
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
  );
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: 'follow'
  };
  let data;
  do {

    let final=await fetch(
      "https://api.beaconstac.com/api/2.0/markdowncards/",
      requestOptions
      )
      data= await final.json();
      let results=data.results;
      console.log(results);
      for(let i=0;i<results.length;i++)
      {
        fetch("https://appserver.beaconstac.com/api/2.0/markdowncards/"+String(results[i].id)+"/?organization=26724&force_delete=true",{method:"DELETE",headers:myHeaders})
        .then(console.log("Deleted index"+String(i)));
      }
    }while(data.next);

  }
*/    

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

  for(let i = 0; i < 10; i++){
      let qr_id = qrArray[i].id;
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
      let qr_link = parsedResponse3.urls.png;


      let products = document.querySelector('.products');
      let description = "Sponsored by Beaconstac";
            let title = "Scan QR Code";
            products.innerHTML += `
            <div class="product">
                <img src="${qr_link}" alt="Category Name" class="product-img">
                <div class="product-content">
                <h2 class="product-title">${
                  title.length > 18 ? title.substring(0, 18).concat(' ...') : title
                }</h2>
                
                <p class="product-description">${
                  description.length > 80
                    ? description.substring(0, 80).concat(' ...more')
                    : description
                }</p>
                <div class="product-price-container">
                    <a href="#" onclick = "delete_qr(${qr_id})" data-productId="ID" class="add-to-cart"><ion-icon name="trash-outline"></ion-icon></a>
                    <a href="#" onclick = "downloadQR2(${qr_id})" data-productId="ID" class="add-to-cart"><ion-icon name="download-outline"></ion-icon></a>
                    <a href="#" onclick = "some_function()" data-productId="ID" class="add-to-cart"><ion-icon name="create-outline"></ion-icon></a>
                </div>
                </div>
                
            </div>
            `;
    }
}

function delete_qr(qr_id){
console.log("Deleted qr_id");
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.beaconstac.com/api/2.0/qrcodes/"+ qr_id + "/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  window.location.reload();
}



async function downloadQR2(qr_id){
  console.log("from downloadQR2", qr_id)
   var myHeaders = new Headers();
 myHeaders.append("Authorization", "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c");
 
 var requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
 };
 
 // console.log("https://api.beaconstac.com/api/2.0/qrcodes/"+ qr_id +"/download/?size=1024&error_correction_level=5&canvas_type=png");
 let response3 = await fetch(
   "https://appserver.beaconstac.com/api/2.0/qrcodes/"+qr_id+"/download/?size=1024&canvas_type=png",
   requestOptions
 );
 let parsedResponse3 = await response3.json();
 console.log("parsedResponsePrinted", parsedResponse3);
 let qr_link = parsedResponse3.urls;
 console.log("qr_link", qr_link);

 // fetch("https://api.beaconstac.com/api/2.0/qrcodes/1561020/download/?size=1024&error_correction_level=5&canvas_type=png", requestOptions)
 //   .then(response => response.json())
 //   .then(result => console.log(result))
 //   .catch(error => console.log('error', error));  
 downloadImage(qr_link.png);
}

// async function getQRLink(qr_id){
 
//    displayQRImage(qr_link.png);
//  }

//  function displayQRImage(qrLink){
//     let output = document.getElementById("output");
//     let img = document.createElement("img");
//     //img.src = `https://www.example.com/images/${i}.png`
//     //console.log(img);
//     img.src = qrLink;
//     img.width = 400;
//     img.height = 400;
//     //console.log(img.src);
//     output.appendChild(img);
//     let br = document.createElement("br");
//     output.appendChild(br);
//     //console.log(output);
//  }




//  document.addEventListener('DOMContentLoaded', function() {
//   let products = document.querySelector('.products');
//   async function fetchProducts(url) {
//       try {
//           let data = await fetch(url);
//           let response = await data.json();

//           for (let i = 0; i < response.length; i++) {
//               let description = response[i].description;
//               let title = response[i].title;
//               products.innerHTML += `
//      <div class="product">
//          <img src="${response[i].images[1]}" alt="${
//         response[i].category.name
//       }" class="product-img">
//          <div class="product-content">
//          <h2 class="product-title">${
//            title.length > 18 ? title.substring(0, 18).concat(' ...') : title
//          }</h2>
//          <h4 class="product-category">${response[i].category.name}</h4>
//          <p class="product-description">${
//            description.length > 80
//              ? description.substring(0, 80).concat(' ...more')
//              : description
//          }</p>
//          <div class="product-price-container">
//              <h3 class="product-price">$${response[i].price}</h3>
//              <a href="#!" data-productId="${
//                response[i].id
//              }" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
//          </div>
//          </div>
      
//      </div>
//      `;
//           }
//       } catch (err) {
//           console.log(err);
//       }
//   }
//   fetchProducts('https://api.escuelajs.co/api/v1/products');
// });
