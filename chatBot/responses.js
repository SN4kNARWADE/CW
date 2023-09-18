responses = {
  hello: "hi",
  "how are you?": "good",
  hi: "hello",
};

JaroWrinker = function (s1, s2) {
  var m = 0;

  // Exit early if either are empty.
  if (s1.length === 0 || s2.length === 0) {
    return 0;
  }

  // Exit early if they're an exact match.
  if (s1 === s2) {
    return 1;
  }

  var range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1,
    s1Matches = new Array(s1.length),
    s2Matches = new Array(s2.length);

  for (i = 0; i < s1.length; i++) {
    var low = i >= range ? i - range : 0,
      high = i + range <= s2.length ? i + range : s2.length - 1;

    for (j = low; j <= high; j++) {
      if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
        ++m;
        s1Matches[i] = s2Matches[j] = true;
        break;
      }
    }
  }

  // Exit early if no matches were found.
  if (m === 0) {
    return 0;
  }

  // Count the transpositions.
  var k = (n_trans = 0);

  for (i = 0; i < s1.length; i++) {
    if (s1Matches[i] === true) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j] === true) {
          k = j + 1;
          break;
        }
      }

      if (s1[i] !== s2[j]) {
        ++n_trans;
      }
    }
  }

  var weight = (m / s1.length + m / s2.length + (m - n_trans / 2) / m) / 3,
    l = 0,
    p = 0.1;

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l;
    }

    weight = weight + l * p * (1 - weight);
  }

  return weight;
};

LevenshteinDistance = function (a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

function getBotResponse(input) {
  //   Simple responses
  //   console.log("getting response");

  if (responses[input]) {
    return responses[input];
  } else {
    let weights = [];

    Object.keys(responses).forEach((key) => {
      weights.push(JaroWrinker(input, responses[key]));
    });

    // console.log(weights);

    let maxWeight = Math.max(...weights);

    // console.log(maxWeight);

    let indexOfMax = weights.indexOf(maxWeight);

    // console.log(indexOfMax);

    return responses[Object.keys(responses)[indexOfMax]];
  }
}
//   console.log("Calling GPT3");
//   var url = "https://api.openai.com/v1/chat/completions";
//   var bearer =
//     "Bearer " + "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";

//   // const model = fetch("https://api.openai.com/v1/models", {
//   //   headers: {
//   //     Authorization:
//   //       "Bearer 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",
//   //     "Openai-Organization": "RockStar",
//   //   },
//   // }).then((res) => res.json());

//   // console.log(model);

//   await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: bearer,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "Say this is a test!" }],
//       temperature: 0.7,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(typeof data);
//       console.log(Object.keys(data));
//       console.log(data["choices"][0].text);
//     })
//     .catch((error) => {
//       console.log("Something bad happened " + error);
//     });

//   //   return response["choices"][0].text;
// }
