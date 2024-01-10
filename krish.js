let API = "7bc8b10bddde4902b8ff25476e45d522";

$(document).ready(function () {
     $("#input_container").slideDown()

  $.get(
    `https://newsapi.org/v2/everything?q=latest&from=2023-12-12&apiKey=${API}`,
    function (data, status) {
      showNewsOnFront(data);
      // console.log(data.articles[0]);
      console.log(status);
    }
  ).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(`Error: ${textStatus} - ${errorThrown}`);
  });
});

let message = "no";

var pwdCheck =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

$("#get_otp").click(() => {
  let otpVal = Math.floor(Math.random() * 100000); //giving otp while clicking on get otp button
  $("#login_otp").val(otpVal);
  $("#login_otp").css("letter-spacing", "8px");
});

$("#login_btn").click(() => {
  var userName = $("#login_name").val(); //collecting login form information
  var email = $("#login_email").val();
  var password = $("#login_password").val();
  var otp = $("#login_otp").val();

  if (userName === "" || password === "" || email === "" || otp === "") {
    //  checking if all filds are filled or not
    Swal.fire({
      title: "Error",
      text: "please fill all Information",
      icon: "error",
    });
    return;
  }

  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i; //checking valid email or not
  if (!pattern.test(email)) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please fill correct email",
      icon: "error",
    });
    return;
  }

  // if(!pwdCheck.test(password))          // password validation
  // {
  //     Swal.fire({
  //         title: "Password Error",
  //         text: "Min 8 character and must contain atleast one upper case, lower case, number and symbol (@$!%*?&)",
  //         icon: "error"
  //     });
  //     return;
  // }
  $("#input_container").slideUp();

 $("#user").html(userName) 
});


$("#login_skip").click(() => {
  $("#input_container").slideUp();
});


$("#login_div").click(() => {
  $("#user").html() == "user"
    ? $("#input_container").slideDown()
    : $("#input_container").slideUp();
});

//----------------------------------------------------------------------------------------------------------------------------------------------

function showNewsOnFront(data) {
  //   //console.log(data.articles[0]["author"]);
  //   console.log(data.articles[0]["title"]);
  //   console.log(data.articles[0]["url"]);
  //   console.log(data.articles[0]["urlToImage"]);
  //   console.log(data.articles[0]["publishedAt"]);
  //   console.log(data.articles[0]["content"]);
  count = 0;
  let showNewsOnFront1;
  let showNewsOnFront2;
  for (var i of data.articles) {
    if (
      i["title"] == null ||
      i["urlToImage"] == null ||
      i["author"] == null ||
      i["publishedAt"] == null
    ) {
      continue;
    } else {
      if (count % 2 == 0) {
        // console.log(i['title'])
        let NewsOnFront1 = ` 
                              
                                <div class="news" >
                              <center><h2>${i["title"]}</h2></center>
                                <div class="image">
                                <a href="${i['url']}" target="_blank">
                                <img src="${i["urlToImage"]}" alt="">
                                </a>
                                  </div>
                                <div class="hii">
                                <div id="Author">${i["author"]}</div>
                              <div id="timedate">${i["publishedAt"]}</div>
                               </div>

                               <div class="text">
                                 ${i["content"]}
                             </div>
                           </div>
                          `;

        showNewsOnFront1 += NewsOnFront1;
        count += 1;
      } else {
        //console.log(i['title'])
        let NewsOnFront2 = ` 
                                
                                <div class="news">
                              <center><h2>${i["title"]}</h2></center>
                                <div class="image">
                                <a href="${i['url']}" target="_blank">
                                <img src="${i["urlToImage"]}" alt="">
                                </a>
                                  </div>
                                <div class="hii">
                                <div id="Author">${i["author"]}</div>
                              <div id="timedate">${i["publishedAt"]}</div>
                               </div>

                               <div class="text">
                                 ${i["content"]}
                             </div>
                           </div>
                           `;

        showNewsOnFront2 += NewsOnFront2;
        count += 1;
      }
    }
  }

  $("#mainMidNews").html(showNewsOnFront1);
  $("#mainMidNews2").html(showNewsOnFront2);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------

$("i").click(function () {
  var iconSerch = $(this).html();

  if (iconSerch == "" || iconSerch == "user") {
    console.log("superb");
  } else {
    iconSerch =
      iconSerch == "Top news"
        ? "latest"
        : iconSerch == "Local news"
        ? "local"
        : iconSerch == "Ram mandir"
        ? "sprit"
        : iconSerch == "Cricket"
        ? "cricket"
        : iconSerch == "Bollywood"
        ? "bollywood"
        : iconSerch == "Fake news expose"
        ? "Fake news"
        : iconSerch;

    $.get(
      `https://newsapi.org/v2/everything?q=${iconSerch}&from=2023-12-12&apiKey=${API}`,
      function (data, status) {
        showNewsOnFront(data);
        // console.log(data.articles[0]);
        console.log(status);
      }
    ).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(`Error: ${textStatus} - ${errorThrown}`);
      console.log("nikhil");
    });
  }
});

//-------------------------------------------------------------------------------------------------------------------------------------------------

$("select").change(function () {
  var optionSearch = $("select").val();

  optionSearch =
    optionSearch == "America"
      ? "us"
      : optionSearch == "India"
      ? "in"
      : optionSearch == "Russia"
      ? "rs"
      : optionSearch == "Japan"
      ? "jp"
      : optionSearch == "Australia"
      ? "as"
      : optionSearch == "New Zeland"
      ? "zx"
      : optionSearch == "Hong Kong"
      ? "hk"
      : optionSearch == "South Africa"
      ? "sa"
      : optionSearch;

  $.get(
    `https://newsapi.org/v2/top-headlines?country=${optionSearch}&apiKey=${API}`,
    function (data, status) {
      showNewsOnFront(data);
      // console.log(data.articles[0]);
      console.log(status);
    }
  ).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(`Error: ${textStatus} - ${errorThrown}`);
  });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------

$(".search-icon").click(() => {
  searchBar = $(".search-input").val();

  if (searchBar == "") {
    $(".search-input").val("Enter something");
  } else {
    $.get(
      `https://newsapi.org/v2/everything?q=${searchBar}&from=2023-12-12&apiKey=${API}`
    )
      .done(function (data, status) {
        // Handle successful response
        showNewsOnFront(data);
        console.log(status);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Handle any error (including non-successful status)
        console.log(`Error: ${textStatus} - ${errorThrown}`);
      });
  }
});
