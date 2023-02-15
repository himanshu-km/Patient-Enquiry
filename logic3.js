async function createLanding() {
    let form = document.getElementById("myForm");
    // let myname = form["name"].value;
    // let profession = form["profession"].value;
    // let age = form["age"].value;
    let myname = "john"
  
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
      html_body:
        "<title>HTML Forms</title><h1>Test3</h1>",
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
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
    );
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      myname: "Markdown Card",
      organization: 26724,
      qr_type: 2,
      campaign: {
        content_type: 2,
        markdown_card: markdown_id,
      },
      location_enabled: false,
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
  
    downloadQR(qr_id, myname);
  }
  
  
  
  
  
  
  async function downloadQR(qr_id, myname){
     console.log("from downloadQR", qr_id, myname)
      var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      // redirect: 'follow'
    };
    
    // console.log("https://api.beaconstac.com/api/2.0/qrcodes/"+ qr_id +"/download/?size=1024&error_correction_level=5&canvas_type=png");
    let response3 = await fetch(
      "https://api.beaconstac.com/api/2.0/qrcodes/"+qr_id+"/download/?size=1024&error_correction_level=5&canvas_type=pdf",
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
    downloadImage(qr_link.png, myname);
  }
  
  async function downloadImage(imageSrc, myname) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = String(myname)+ "'s " + "QR";
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  
  // async function deleteAll()
  // {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
  //   );
  //   myHeaders.append("Content-Type", "application/json");

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
  //   let data;
  //   do {

  //     let final=await fetch(
  //       "https://api.beaconstac.com/api/2.0/markdowncards/",
  //       requestOptions
  //       )
  //       data= await final.json();
  //       let results=data.results;
  //       console.log(results);
  //       for(let i=0;i<results.length;i++)
  //       {
  //         fetch("https://appserver.beaconstac.com/api/2.0/markdowncards/"+String(results[i].id)+"/?organization=26724&force_delete=true",{method:"DELETE",headers:myHeaders})
  //         .then(console.log("Deleted index"+String(i)));
  //       }
  //     }while(data.next);

  //   }