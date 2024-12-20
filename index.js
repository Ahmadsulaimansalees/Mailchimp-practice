const express = require("express");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route definitions (separated for better organization)
const handleGetRequest = (req, res) => {
  res.sendFile(__dirname + "/index.html");
};

const handlePostRequest = async (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;
  console.log(`${firstName} ${lastName} - ${emailAddress}`);

  client.setConfig({
    apiKey: "8431e46377479658058c75099df5518",
    server: "us8",
  });

  try {
    await client.lists.addListMember("d933cb5357", {
      email_address: emailAddress,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });
    res.sendFile(__dirname + "/success.html");
  } catch (error) {
    console.error(error);
    if (res.statuCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  }
};

// Route assignments
app.get("/", handleGetRequest);
app.post("/", handlePostRequest);

const port = 3000;
app.listen(port, () => {
  console.log(`Server up and running at port ${port}`);
});

// const express = require("express");
// const https = require("https");
// const client = require("@mailchimp/mailchimp_marketing");

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// // GET request
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // POST request
// app.post("/", (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const emailAddress = req.body.emailAddress;
//   console.log(firstName + lastName + emailAddress);

//   client.setConfig({
//     apiKey: "8431e46377479658058c75099df5518f",
//     server: "us8",
//   });
//   const run = async () => {
//     const response = await client.lists.addListMember("d933cb5357", {
//       email_address: emailAddress,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: firstName,
//         LNAME: lastName,
//       },
//     });
//   };
//   const successResponse = res.statusCode;

//   if (successResponse === 200) {
//     res.sendFile(__dirname + "/success.html");
//   } else {
//     res.sendFile(__dirname + "/failure.html");
//   }

//   console.log(successResponse);
//   run();
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log("server up and running at port 3000");
// });
