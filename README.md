# node-red-contrib-dayjs

*Under development*

A simple [Node-RED](https://nodered.org/) node which wrapps the JavaScript library [Day.js](https://day.js.org/en/), an alternative to Moment.js

## Install
To install - either use the manage palette option in the editor, or change to your Node-RED user directory.

        cd ~/.node-red
        npm install node-red-node-{filename}

## Usage

<h3>Input</h3>
Expect a parsable String:
<code>

    '2018-04-04T16:00:00.000Z'
    '2018-04-13 19:18:17.040+02:00'
    '2018-04-13 19:18'
    1318781876406
    1318781876
</code>
If the Input i not parsable, the current time us used
<h3>Manipulate</h3>
<h4>Operations</h4>
<p>Message Property: <code>msg.operation</code></p>
    <ul>
        <li>add</li>
        <li>subtract</li>
        <li>startOf</li>
        <li>endOf</li>
    </ul>
<h4>Units</h4>
<p>Message Property: <code>msg.unit</code></p>
    <ul>
        <li>year</li>
        <li>quarter</li>
        <li>month</li>
        <li>week</li>
        <li>isoWeek</li>
        <li>day</li>
        <li>hour</li>
        <li>minute</li>
        <li>second</li>
    </ul>
<h4>Amount</h4>
    <p>Message Property: <code>msg.amount</code></p>
<h3>Output</h3>
By default, the Output is an ISO String, but i can be changed.<br>

You can also set a Costum Output Format (<a href="https://day.js.org/docs/en/display/format">Format Options</a>)

You can also change the Timezone (e.g. 'utc', 'Europe/Paris')

## Example

## Contributing
 
## Acknowledgments