module.exports = function(RED) {
    function DayJsNode(config) {
        RED.nodes.createNode(this,config);
        

        const dayjs = require('dayjs')
        var utc = require('dayjs/plugin/utc')
        var timezone = require('dayjs/plugin/timezone')
        var customParseFormat  = require('dayjs/plugin/customParseFormat')
        var toArray = require('dayjs/plugin/toArray')
        var toObject = require('dayjs/plugin/toObject')
        var relativeTime = require('dayjs/plugin/relativeTime')
        dayjs.extend(utc)
        dayjs.extend(timezone)
        dayjs.extend(customParseFormat)
        dayjs.extend(toArray)
        dayjs.extend(toObject)
        dayjs.extend(relativeTime)

        this.outputFormat =  config.outputFormat || 'ISOString';
        this.costumFormatOutput = config.costumFormatOutput || 'YYYY-MM-DDTHH:mm:ssZ';
        this.outputTimezone = config.outputTimezone || 'utc';
        this.inputProperty = config.inputProperty || 'payload'
        this.outputProperty = config.outputProperty || 'payload'
        this.manipulateOperation = config.manipulateOperation
        this.manipulateUnit = config.manipulateUnit 
        this.manipulateAmount = config.manipulateAmount

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

                case 'unix_millis':
                    return input.valueOf()

                case 'unix':
                    return input.unix()

                case 'fromNow':
                    return input.fromNow()

                case 'toNow':
                    return input.toNow()

                case 'daysInMonth':
                    return input.daysInMonth()

                case 'Costum':
                    return input.format(costumFormatOutput)

                default:
                    return input.toISOString()
            }
        };


        function manipulateOutput(input,operation,amount,unit) {
            switch (operation) {
                case 'add':
                    return input.add(parseInt(amount),unit)
                case 'subtract':
                    return input.subtract(parseInt(amount),unit)
                case 'startOf':
                    return input.startOf(unit)
                case 'endOf':
                    return input.endOf(unit)

            }
            
        }

        node.on('input', function(msg) {

            let msg_input_property = msg.input || node.inputProperty
            let msg_output_property = msg.output || node.outputProperty

            let manipulate_operation = msg.operation || node.manipulateOperation
            let manipulate_unit = msg.unit || node.manipulateUnit
            let manipulate_Amount = msg.amount || node.manipulateAmount || '0'
            
            

            let day =  parsePayload(msg_input_property)
            let day_tz = alterTimezone(day,node.outputTimezone,false)
            let day_output = dayjs()

            if(manipulate_operation != ""  && manipulate_unit != "")  {
                day_output =  manipulateOutput(day,manipulate_operation,manipulate_Amount,manipulate_unit)
            } else {
                day_output = day_tz
            }
            
            msg[msg_output_property] = formatOutput(day_output,node.outputFormat,node.costumFormatOutput)
            node.send(msg);
        });
    }
    RED.nodes.registerType('day.js',DayJsNode);
}



