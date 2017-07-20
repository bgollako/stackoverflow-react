var express = require('express');
var favicon = require('serve-favicon');
var axios = require('axios');
var path = require('path')
var bodyParser = require('body-parser');
var APP_URL = 'http://35.188.30.200';
var app = express();
app.use(express.static('web'));
app.use(favicon(path.join(__dirname, 'web','images', 'favicon.ico')));
app.use(bodyParser.json({type:req => true}));
app.all('/api/*',function(req,res){
  // making call to Anupam's server
  var url = APP_URL+req.originalUrl;
  var authorization = req.get('Authorization');
  var header = undefined;
  if(authorization){
    header = { headers: { 'Authorization': authorization} }
  }
  switch (req.method) {
    case 'GET':
      if(header){
        axios.get(url,header).then(response=>{
          res.status(response.status).end(JSON.stringify(response.data));
        }).catch(error=>{
          res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        });
      }else{
        axios.get(url).then(response=>{
          res.status(response.status).end(JSON.stringify(response.data));
        }).catch(error=>{
          res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        });
      }
      break;
    case 'POST':
      if(header){
        console.log(url);
        console.log(req.body);
        console.log(header);
        axios.post(url,req.body,header).then(response=>{
          var authValue = response.headers.authorization;
          if(authValue)
            res.set('authorization',authValue).status(response.status).end(JSON.stringify(response.data));
          else
            res.status(response.status).end(JSON.stringify(response.data));
        }).catch(error=>{
          res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        });
      }else{
        console.log(url);
        console.log(req.body);
        console.log(header);
        axios.post(url,req.body).then(response=>{
          var authValue = response.headers.authorization;
          if(authValue)
            res.set('authorization',authValue).status(response.status).end(JSON.stringify(response.data));
          else
            res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        }).catch(error=>{
          console.log(error);
          res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        });
      }
      break;
      case 'PUT':
      if(header){
        axios.put(url,req.body,header).then(response=>{
          var authValue = response.headers.authorization;
          if(authValue)
            res.set('authorization',authValue).status(response.status).end(JSON.stringify(response.data));
          else
            res.status(response.status).end(JSON.stringify(response.data));
        }).catch(error=>{
          res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        });
      }else{
        axios.put(url,req.body).then(response=>{
          var authValue = response.headers.authorization;
          if(authValue)
            res.set('authorization',authValue).status(response.status).end(JSON.stringify(response.data));
          else
            res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        }).catch(error=>{
          res.status(error.response.status).end(JSON.stringify(error.response.statusText));
        });
      }
      break;
    default:
      break;
  }
});
app.listen(8080, function () {
  console.log('Express server is up on port 8080');
});
