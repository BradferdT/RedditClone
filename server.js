var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

var data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
function write(){
  fs.writeFileSync('./db.json', JSON.stringify(data));
}
function refreshId(id){
  var last = data[data.length - 1];
  if(last != null){
    console.log('Multiple indexes');
    return last.id + 1;
  }else{
    console.log('not multiple indexes');
    return 1;
  }

}

  app.get('/posts', function(req, res){
    res.send(data);
  })

  app.post('/newpost', function(req, res){
    var newObj = req.body;
    var newId = refreshId();
    newObj.id = newId;
    data.push(newObj);
    write();
    res.send('Action Complete');
  })



app.listen(port, function(){
  console.log('Listening on port:', port)
})
