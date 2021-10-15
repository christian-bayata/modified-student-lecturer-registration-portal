const connectionStr = require('../config/setup/rabbitmq-setup');
const open = require('amqplib').connect(connectionStr);

class RabbitMqProcess {

    /* 
        @params: queue
        @params: data
    */

    //RabbitMQ Publisher method
    static publisher(queue, data) {
        open.then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
            //eslint-disable-next-line
            return ch.assertQueue(queue).then(function (ok) {
                return ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
            });
        }).catch(console.warn);
    }
}

module.exports = RabbitMqProcess;
