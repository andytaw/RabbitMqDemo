var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(err, conn) {
	
  conn.createChannel(function(err, ch) {
	  
	var maxTasks = 100;
	var minWait = 1000;
	var maxWait = 5000;
	var minWork = 5;
	var maxWork = 10;
	var readyToSend = true;	
    var queueName = 'tasks';
    var tasks = [];
	
	var send = function(msg){
		ch.sendToQueue(queueName, new Buffer(msg), {persistent: true});	
		console.log("Sent '" + msg + "'");
	};

	var sendOnTimeout = function(msg, timeout, callback, callbackArg){
		setTimeout(function(){
			send(msg);
			callback(callbackArg);
		}, timeout);
	};

	var createTasks = function(){
		for (var taskNum = 1; taskNum <= maxTasks; taskNum++){

			var wait = Math.floor(Math.random() * (maxWait - minWait) + minWait);
			var work = Math.floor(Math.random() * (maxWork - minWork) + minWork);
			var msg = 'Task #' + taskNum + Array(work+1).join('.');

			tasks.push({wait: wait, work: work, msg: msg});
			
		}
	};

	var sendTasks = function(i){
		i = i || 0;
		sendOnTimeout(tasks[i].msg, tasks[i].wait, sendTasks, i+1);
	};

    ch.assertQueue(queueName, {durable: true});	
	createTasks();
	sendTasks();
	
  });
  
});