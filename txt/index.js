// const fs = require('fs');
// const http = require('http');
// const url = require('url');

// fs.readFileSync('input.txt', 'utf-8', (err, Response) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(Response);
// });
// console.log('Hello');

// fs.readFile('start.txt', 'utf-8', (err, Response) => {
//   console.log(Response);
// });

// const tempOverview = fs.readFileSync('../txt/overview.html', 'utf-8');
// const Template = fs.readFileSync(
//   '../templates/TEMPLATE.html',
//   'utf-8'
// );
// const TempProduct = fs.readFileSync(
//   '../templates/product.html',
//   'utf-8'
// );

// const Server = http.createServer((Req, Res) => {
//   //OverView Page
//   if (Req.url === '/' || Req.url === '/New') {
//     Res.writeHead(200, {
//       'Content-type': 'text/html',
//     });
//     Res.end(TempProduct);
//     //ProductPage
//   } else if (Req.url === '/product') {
//     Res.end('Hello This is Gunasheelan');

//     //Api Page
//   } else if (Req.url === '/Api') {
//     Res.writeHead(200, {
//       'Content-type': 'application/json',
//     });
//     Res.end(Data);

//     //Not Found
//   } else {
//     Res.writeHead('404', {
//       'Content-type': 'text/html',
//       'my-own-header': 'Hello This is Vegito',
//     });
//     Res.end('<h1>PAGE NOT FOUND</h1>');
//   }
// });

// Server.listen(8080, () => {
//   console.log('Server Is Running');
// });

// const http = require('http');
// const fs = require('fs');
// const { json } = require('stream/consumers');

// let Server = http.createServer((Req, Res) => {
//   fs.readFile('../dev-data/data.json', 'utf-8', (err, res) => {
//     Res.writeHead(200, {
//       'Content-type': 'application/json',
//     });
//     Res.end(res);
//   });
// });
// Server.listen(3000);

const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);

  if (!product) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
};
const OverView = fs.readFileSync('../txt/overview.html', 'utf-8');
const ProductView = fs.readFileSync(
  '../templates/product.html',
  'utf-8'
);
const tempCart = fs.readFileSync(
  '../templates/TEMPLATE.html',
  'utf-8'
);
//Json Data for Project
const SavedData = fs.readFileSync('../dev-data/data.json');
const Data = JSON.parse(SavedData);

const Server = http.createServer((req, Res) => {
  let { query, pathname } = url.parse(req.url, true);
  if (pathname === '/') {
    const NewArray = Data.map((el) => {
      return replaceTemplate(tempCart, el);
    }).join('');
    const output = OverView.replace('{%PRODUCT_CARDS%}', NewArray);
    Res.end(output);
  } else if (pathname === '/product') {
    Res.writeHead(200, {
      'content-type': 'text/html',
    });
    const product = Data[query.id];
    const output = replaceTemplate(ProductView, product);
    Res.end(output);
  }
});

Server.listen(3000, (Result) => {
  console.log(`http://localhost:3000`);
});
