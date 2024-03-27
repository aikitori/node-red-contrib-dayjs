module.exports = function(RED) {
    function DayJsNode(config) {
        RED.nodes.createNode(this,config);
        

        const dayjs = require('dayjs')
        var utc = require('dayjs/plugin/utc')
        var timezone = require('dayjs/plugin/timezone')
        var customParseFormat  = require('dayjs/plugin/customParseFormat')
        var toArray = require('dayjs/plugin/toArray')
        var toObject = require('dayjs/plugin/toObject')
        dayjs.extend(utc)
        dayjs.extend(timezone)
        dayjs.extend(customParseFormat)
        dayjs.extend(toArray)
        dayjs.extend(toObject)

        this.outputFormat =  config.outputFormat || 'ISOString';
        this.costumFormatOutput = config.costumFormatOutput || 'YYYY-MM-DDTHH:mm:ssZ';
        this.outputTimezone = config.outputTimezone || 'utc';
        this.inputProperty = config.inputProperty || 'payload'
        this.outputProperty = config.outputProperty || 'payload'

        var node = this;
        function parsePayload (payload) {
                day = dayjs.utc(payload);
                if (!day.isValid()) {
                    day = dayjs.utc()
                }
                return day
        };


        function alterTimezone (input,tz,local_time) {
            return input.tz(tz)

        }

        function formatOutput(input, Format,costumFormatOutput) {

            switch (Format) {
                case 'ISOString':
                    return input.toISOString()

                case 'Date':
                    return input.toDate()

                case 'Array':
                    return input.toArray()

                case 'Object':
                    return input.toObject()

                case 'Costum':
                    return input.format(costumFormatOutput)

                default:
                    return input.toISOString()
            }
        };


        node.on('input', function(msg) {

            let day =  parsePayload(msg[node.inputProperty]) || ''
            let day_tz = alterTimezone(day,node.outputTimezone,false)
            msg[node.outputProperty] = formatOutput(day_tz,node.outputFormat,node.costumFormatOutput)
            node.send(msg);
        });
    }
    RED.nodes.registerType('day.js',DayJsNode);
}



