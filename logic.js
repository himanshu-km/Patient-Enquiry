async function storeData() {
  let form = document.getElementById("myForm");
  let name = form["name"].value;
  let profession = form["profession"].value;
  let age = form["age"].value;

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    organization: 26724,
    title: "Information Page of " + name,
    markdown_body: "",
    html_body:
      "<title>HTML Forms</title><h1>" +
      name +
      "</h1><p>" +
      profession +
      "</p><p>" +
      String(age) +
      "</p>",
    css_body: "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // let markdown_id;
  // fetch("https://api.beaconstac.com/api/2.0/markdowncards/", requestOptions)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     markdown_id = result.id;
  //   })
  //   .catch((error) => console.log("error", error));

  //   console.log("thisisxxx", markdown_id);

  let response = await fetch(
    "https://api.beaconstac.com/api/2.0/markdowncards/",
    requestOptions
  );
  let parsedResponse = await response.json();
  // console.log(parsedResponse);
  let markdown_id = parsedResponse.id;
  console.log("markdown_id", markdown_id);

  //******************************************************************************** */
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Token afa6b7d257e09642868a47dbdbf3e8b03fbf422c"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: "Markdown Card",
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
  let qr_id = parsedResponse.id;
  console.log("qr_id", parsedResponse.id);

  //************************************************************** */
}
