# node-red-contrib-dayjs

*Under development*

A simple [Node-RED](https://nodered.org/) node that integrates the versatile JavaScript library [Day.js](https://day.js.org/en/), offering an alternative to Moment.js.

## Install
You can install this node via the manage palette option in the Node-RED editor or by navigating to your Node-RED user directory and running:

```bash
cd ~/.node-red
npm install node-red-contrib-dayjs
```

## Usage

### Input
This node expects a parsable string in the following formats:

```
'2018-04-04T16:00:00.000Z'
'2018-04-13 19:18:17.040+02:00'
'2018-04-13 19:18'
1318781876406
1318781876
```
If the input is not parsable, the current time is used.

### Manipulate

#### Operations
The operation to perform is specified via the `msg.operation` property, which supports the following options:
- add
- subtract
- startOf
- endOf

#### Units
Specify the unit of time using the `msg.unit` property, which can take the values:
- year
- quarter
- month
- week
- isoWeek
- day
- hour
- minute
- second

#### Amount
The amount of time to manipulate is provided via the msg.amount property.

### Output
By default, the output is provided as an ISO String, but it can be customized. You can also specify a custom output format using the ([Format Options](https://day.js.org/docs/en/display/format)).

Additionally, you can adjust the timezone (e.g., 'utc', 'Europe/Paris')).

## Example

## Contributing
 
## Acknowledgments
