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
                      <a href="#" onclick = "some_function()" data-productId="ID" class="add-to-cart"><ion-icon name="trash-outline"></ion-icon></a>
                      <a href="#" onclick = "some_function()" data-productId="ID" class="add-to-cart"><ion-icon name="download-outline"></ion-icon></a>
                      <a href="#" onclick = "some_function()" data-productId="ID" class="add-to-cart"><ion-icon name="arrow-redo-circle-outline"></ion-icon>></a>
                  </div>
                  </div>
                  
              </div>
              `;
      }

}

function some_function(){
  console.log("inside some_function");
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
