// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");

    var content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  return time;
}

// Gets the first message
function firstBotMessage() {
  let firstMessage = "Ask any Questions you may have";
  document.getElementById("botStarterMessage").innerHTML =
    '<p class="botText"><span>' + firstMessage + "</span></p>";

  let time = getTime();

  $("#chat-timestamp").append(time);
  document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
async function getHardResponse(userText) {
  // const botResponse = getBotResponse(userText);
  const botResponse = await fetch("/bot?question=how are you doing?").then(
    (res) => {
      console.log(res);
      return res.text();
    }
  );
  console.log(botResponse);
  let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";
  $("#chatbox").append(botHtml);

  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
  let userText = $("#textInput").val();

  if (userText == "") {
    return;
  }

  let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  setTimeout(() => {
    getHardResponse(userText);
  }, 1000);
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
  let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  //Uncomment this if you want the bot to respond to this buttonSendText event
  // setTimeout(() => {
  //     getHardResponse(sampleText);
  // }, 1000)
}

function sendButton() {
  getResponse();
}

function heartButton() {
  buttonSendText("Heart clicked!");
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
  if (e.which == 13) {
    getResponse();
  }
});

// async function getBotResponse(input) {
//   // Simple responses
//   // if (input == "hello") {
//   //     return "Hello there!";
//   // } else if (input == "goodbye") {
//   //     return "Talk to you later!";
//   // } else {
//   //     return "Try asking something else!";
//   // }

//   console.log("Calling GPT3");
//   var url = "https://api.openai.com/v1/chat/completions";
//   var bearer = "Bearer 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";

//   console.log(bearer);

//   await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: bearer,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "Say I am best!" }],
//       temperature: 0.7,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       // console.log(typeof data);
//       // console.log(Object.keys(data));
//       // console.log(data["choices"][0].text);
//     })
//     .catch((error) => {
//       console.log("Something bad happened " + error);
//     });

//   //   return response["choices"][0].text;
// }
