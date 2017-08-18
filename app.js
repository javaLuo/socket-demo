var express = require('express');
var path = require('path');
var WebSocketServer = require('ws').Server;
var app = express();

wss = new WebSocketServer({ port: 8889 });

var timer;

wss.on('connection', function(ws) {
	console.log('client connected');
	ws.on('message', function(message){
		console.log('来自前端的消息：', message);
		if (message === 'start') {
			timer = setInterval(function(){
				ws.send(new Date().getTime());
			}, 1000);
		} else if (message === 'stop') {
			clearInterval(timer);
		} else if (message === 'ok') {
			clearInterval(timer);
			ws.send('已成功连接，发送start开始，发送stop停止');
		} else {
			clearInterval(timer);
			ws.send('不是有效的命令，start:开始，stop:停止');
		}
	});
	ws.on('close', function(e){
		console.log('连接断开');
	});
	ws.on('error', function(e){
		console.log('发生错误', e);
	});
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/htmls/index.html');
});

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});