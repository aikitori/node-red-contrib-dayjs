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
        var customParseFormat = require('dayjs/plugin/customParseFormat')
        var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
        var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
        var isBetween = require('dayjs/plugin/isBetween')
        dayjs.extend(utc)
        dayjs.extend(timezone)
        dayjs.extend(customParseFormat)
        dayjs.extend(toArray)
        dayjs.extend(toObject)
        dayjs.extend(relativeTime)
        dayjs.extend(customParseFormat)
        dayjs.extend(isSameOrBefore)
        dayjs.extend(isSameOrAfter)
        dayjs.extend(isBetween)

        this.outputFormat =  config.outputFormat || 'ISOString';
        this.costumFormatOutput = config.costumFormatOutput || 'YYYY-MM-DDTHH:mm:ssZ';
        this.outputTimezone = config.outputTimezone || 'utc';
        this.inputProperty = config.inputProperty || 'payload'
        this.inputReferenceProperty = config.inputReferenceProperty || 'reference'
        this.outputProperty = config.outputProperty || 'payload'
        this.manipulateOperation = config.manipulateOperation
        this.manipulateUnit = config.manipulateUnit 
        this.manipulateAmount = config.manipulateAmount
        this.inputFormat = config.inputFormat

        var node = this;

        function parsePayload (payload,inputFormat) {

            if (Array.isArray(payload)) {
                for (let index = 0; index < payload.length; index++) {
                    const element = payload[index];
                        if (inputFormat != '') {
                            day = dayjs.utc(payload[index],inputFormat)
                        } else {
                            day = dayjs.utc(payload[index]);
                        }
                        if (!day.isValid()) {
                            payload[index] = dayjs.utc()
                        } else {
                            payload[index] = day
                        }

                    }     
                    return payload               
            } else {
                if (inputFormat != '') {
                    day = dayjs.utc(payload,inputFormat)
                } else {
                    day = dayjs.utc(payload);
                }
    
                if (!day.isValid()) {
                    day = dayjs.utc()
                }
                    return day
            }



        };


        function alterTimezone (input,tz,local_time) {
            return input.tz(tz)

        }

        function formatOutput(input, Format,costumFormatOutput,reference,manipulate_unit) {

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
                case 'isBefore':
                    return input.isBefore(reference[0] || reference,manipulate_unit)
                case 'isSame':
                    return input.isSame(reference[0] || reference,manipulate_unit)
                case 'isAfter':
                    return input.isAfter(reference[0] || reference,manipulate_unit)
                case 'isSameOrBefore':
                    return input.isSameOrBefore(reference[0] || reference,manipulate_unit)
                case 'isSameOrAfter':
                    return input.isSameOrAfter(reference[0] || reference,manipulate_unit)
                case 'isBetween':
                    return input.isBetween(reference[0] || reference,reference[1] || reference,manipulate_unit)
                

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

            let input =  msg.input || msg[node.inputProperty]
            let reference = msg.reference || msg[node.inputReferenceProperty]
            let msg_output_property = 'output' || node.outputProperty

            let manipulate_operation = msg.operation || node.manipulateOperation
            let manipulate_unit = msg.unit || node.manipulateUnit
            let manipulate_Amount = msg.amount || node.manipulateAmount || '0'
        

            let inputFormat = msg.inputFormat || node.inputFormat || ''

 
            let day =  parsePayload(input,inputFormat)
            let day_reference = parsePayload(reference)

           
            let day_tz = alterTimezone(day,node.outputTimezone,false)
            let day_output = dayjs()

            if(manipulate_operation != ""  && manipulate_unit != "")  {
                day_output =  manipulateOutput(day,manipulate_operation,manipulate_Amount,manipulate_unit)
            } else {
                day_output = day_tz
            }
            msg[msg_output_property] = formatOutput(day_output,node.outputFormat,node.costumFormatOutput,day_reference,manipulate_unit)
            node.send(msg);
        });
    }
    RED.nodes.registerType('day.js',DayJsNode);
}



