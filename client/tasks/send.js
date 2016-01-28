var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(err, conn) {
	
  conn.createChannel(function(err, ch) {
	  
    var q = 'tasks';	
	var msg = process.argv.slice(2).join(' ') || "Do a task please...";

    ch.assertQueue(q, {durable: true});
	
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
	
    console.log(" [x] Sent '" + msg + "'");
	
  });
  
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
  
});