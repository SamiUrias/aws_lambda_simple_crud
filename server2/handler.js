"use strict";
//kenri@userlab.co
const router = require("aws-lambda-router");
// module.exports.hello = // handler for an api gateway event
let books = [
  {
    title: "Titulo 1",
    content: "Content1"
  },
  {
    title: "Titulo 2",
    content: "Content2"
  }
];
module.exports.hello = router.handler({
    // for handling an http-call from an AWS API Gateway proxyIntegration we provide the following config:
    proxyIntegration: {
        routes: [
            {
                // request-path-pattern with a path variable:
                path: '/article/:id',
                method: 'GET',
                // we can use the path param 'id' in the action call:
                action: (request, context) => {
                    return "You called me with: " + request.paths.id;
                }
            },
            {
              // request-path-pattern with a path variable:
              path: "/",
              method: "GET",
              // we can use the path param 'id' in the action call:
              action: (request, context) => {
                return "You called me with: "
              }
            },
            {
              // request-path-pattern with a path variable:
              path: "/books",
              method: "GET",
              // we can use the path param 'id' in the action call:
              action: (request, context) => {
                return books
              }
            },
            {
              // request-path-pattern with a path variable:
              path: "/books/:id",
              method: "GET",
              // we can use the path param 'id' in the action call:
              action: (request, context) => {
                return books[request.paths.id]
              }
            },

            // Post methods
            {
              // request-path-pattern with a path variable:
              path: "/books",
              method: "POST",
              // we can use the path param 'id' in the action call:
              action: (request, context) => {
                let objectToInsert = {}
                console.log(request)
                if(request.body.title && request.body.content) {
                  objectToInsert =  {
                    title: request.body.title,
                    content:request.body.content
                  }

                  books.push(
                   objectToInsert
                  )
                }
                return objectToInsert
              }
            },
        ]
    }
})
// module.exports.hello = async (event, context) => {

//   console.log(event.httpMethod);
//   console.log(event.path);

//   proxyIntegration: {
//     routes: [
//       {
//         // request-path-pattern with a path variable:
//         path: "/article/:id",
//         method: "GET",
//         // we can use the path param 'id' in the action call:
//         action: (request, context) => {
//           return "You called me with: " + request.paths.id;
//         }
//       },
//       {
//         // request-path-pattern with a path variable:
//         path: "/",
//         method: "GET",
//         // we can use the path param 'id' in the action call:
//         action: (request, context) => {
//           return "You called me with: "
//         }
//       }
//     ];
//   }
//   // Simualte a router
//   let route = {
//     method: event.httpMethod,
//     path: event.path
//   };

//   const router = route => {};
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Go Serverless v1.0! Your function executed successfully!",
//         input: event
//       },
//       null,
//       2
//     )
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
