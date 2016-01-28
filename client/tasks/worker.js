var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	
  conn.createChannel(function(err, ch) {
	  
    var q = 'tasks';

    ch.assertQueue(q, {durable: true});
	ch.prefetch(1); // ensure a worker only receives one task at a time
	
    console.log("Waiting for messages in %s. To exit press CTRL+C", q);
	
	// callback when a task is received
    ch.consume(q, function(msg) {
		console.log("Received %s", msg.content.toString());
		var secs = msg.content.toString().split('.').length - 1;
		setTimeout(function(){
			console.log("Completed %s", msg.content.toString());
			ch.ack(msg);
		}, secs * 1000);
    }, {noAck: false});
	
  });
  
});