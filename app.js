const express = require('express'),
  bodyParser = require('body-parser'),
  swaggerUi = require('swagger-ui-express'), 
  swaggerJSDoc = require('swagger-jsdoc'); 

let app = express();

const auth = require

let options = { 
  swaggerDefinition: {
    info: {
      title: 'timeCapture', // Title (required)
      version: '2.0.0', // Version (required)
    },
  },
  apis: ['./swagger/swagger.yaml']
};

let swaggerSpec = swaggerJSDoc(options); 

app.get('/api-docs.yaml', (req, res) => { 
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); 
  next();
});
app.get('/',(req,res)=>{
  let s = '';
  for(var name in req.headers){
      s += name + ' : ' + req.headers[name];
      s += '\n';
  } 
  res.send(s);
});

app.listen(8080,()=>{
    console.log('serveer is runnung');
});