var helper = require("node-red-node-test-helper");
var day = require("../day.js");

helper.init(require.resolve('node-red'));

describe('day.js Node', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "day.js", name: "day.js" }];
    helper.load(day, flow, function () {
      var n1 = helper.getNode("n1");
      try {
        n1.should.have.property('name', 'day.js');
        done();
      } catch(err) {
        done(err);
      }
    });
  });


  it('parse unix timestamp to ISO 8601', function (done) {
      var flow = [{ id: "n_day", type: "day.js", name: "dayjs test" ,
      outputFormat: "ISOString",
      inputFormat: "",
      costumFormatOutput: "YYYY-MM-DDTHH:mm:ssZ",
      outputTimezone: "utc",
      inputProperty: "payload",
      outputProperty: "payload",
      manipulateOperation: "",
      manipulateUnit: "",
      manipulateAmount: "",
      wires: [["n_helper"]] },
      { id: "n_helper", type: "helper" }];
      helper.load(day, flow, function () {
        var n_helper = helper.getNode("n_helper");
        var n_day = helper.getNode("n_day");   
        n_helper.on("input", function (msg) {
          try {
            msg.should.have.property('payload', '1970-01-01T00:00:00.000Z');
            done();
          } catch(err) {
            done(err);
          }
        });
        n_day.receive({ payload: 0 });
    });
  });


  it('parse costum input format to ISO 8601', function (done) {
    var flow = [{ id: "n_day", type: "day.js", name: "dayjs test" ,
    outputFormat: "ISOString",
    inputFormat: "YYYY/MM/DD",
    costumFormatOutput: "YYYY-MM-DDTHH:mm:ssZ",
    outputTimezone: "utc",
    inputProperty: "payload",
    outputProperty: "payload",
    manipulateOperation: "",
    manipulateUnit: "",
    manipulateAmount: "",
    wires: [["n_helper"]] },
    { id: "n_helper", type: "helper" }];
    helper.load(day, flow, function () {
      var n_helper = helper.getNode("n_helper");
      var n_day = helper.getNode("n_day");   
      n_helper.on("input", function (msg) {
        try {
          msg.should.have.property('payload', '1970-01-01T00:00:00.000Z');
          done();
        } catch(err) {
          done(err);
        }
      });
      n_day.receive({ payload: '1970/01/01' });
  });
});


  it('add one hour to a timestamp', function (done) {
    var flow = [{ id: "n_day", type: "day.js", name: "dayjs test" ,
    outputFormat: "ISOString",
    costumFormatOutput: "YYYY-MM-DDTHH:mm:ssZ",
    outputTimezone: "utc",
    inputProperty: "payload",
    outputProperty: "payload",
    manipulateOperation: "add",
    manipulateUnit: "hour",
    manipulateAmount: "1",
    wires: [["n_helper"]] },
    { id: "n_helper", type: "helper" }];
    helper.load(day, flow, function () {
      var n_helper = helper.getNode("n_helper");
      var n_day = helper.getNode("n_day");   
      n_helper.on("input", function (msg) {
        try {
          msg.should.have.property('payload', '1970-01-01T01:00:00.000Z');
          done();
        } catch(err) {
          done(err);
        }
      });
      n_day.receive({ payload: 0 });
  });
});


it('output costum format', function (done) {
    var flow = [{ id: "n_day", type: "day.js", name: "dayjs test" ,
    outputFormat: "Costum",
    costumFormatOutput: "YYYY-MM",
    outputTimezone: "utc",
    inputProperty: "payload",
    outputProperty: "payload",
    manipulateOperation: "add",
    manipulateUnit: "hour",
    manipulateAmount: "1",
    wires: [["n_helper"]] },
    { id: "n_helper", type: "helper" }];
    helper.load(day, flow, function () {
      var n_helper = helper.getNode("n_helper");
      var n_day = helper.getNode("n_day");   
      n_helper.on("input", function (msg) {
        try {
          msg.should.have.property('payload', '1970-01');
          done();
        } catch(err) {
          done(err);
        }
      });
      n_day.receive({ payload: 0 });
  });
});


it('Can use msg.date as property', function (done) {
    var flow = [{ id: "n_day", type: "day.js", name: "dayjs test" ,
    outputFormat: "ISOString",
    costumFormatOutput: "YYYY-MM-DDTHH:mm:ssZ",
    outputTimezone: "utc",
    inputProperty: "date",
    outputProperty: "date",
    manipulateOperation: "add",
    manipulateUnit: "hour",
    manipulateAmount: "1",
    wires: [["n_helper"]] },
    { id: "n_helper", type: "helper" }];
    helper.load(day, flow, function () {
      var n_helper = helper.getNode("n_helper");
      var n_day = helper.getNode("n_day");   
      n_helper.on("input", function (msg) {
        try {
          msg.should.have.property('date', '1970-01-01T01:00:00.000Z');
          done();
        } catch(err) {
          done(err);
        }
      });
      n_day.receive({ date: 0 });
  });
});



it('parse costum input format with Timezone to ISO 8601', function (done) {
  var flow = [{ id: "n_day", type: "day.js", name: "dayjs test" ,
  outputFormat: "ISOString",
  inputFormat: "YYYY/MM/DD",
  inputTimezone: "America/Toronto",
  costumFormatOutput: "YYYY-MM-DDTHH:mm:ssZ",
  outputTimezone: "Europe/Paris",
  inputProperty: "payload",
  outputProperty: "payload",
  manipulateOperation: "",
  manipulateUnit: "",
  manipulateAmount: "",
  wires: [["n_helper"]] },
  { id: "n_helper", type: "helper" }];
  helper.load(day, flow, function () {
    var n_helper = helper.getNode("n_helper");
    var n_day = helper.getNode("n_day");   
    n_helper.on("input", function (msg) {
      try {
        msg.should.have.property('payload', '1970-01-01T05:00:00.000Z');
        done();
      } catch(err) {
        done(err);
      }
    });
    n_day.receive({ payload: '1970/01/01' });
});
});


});