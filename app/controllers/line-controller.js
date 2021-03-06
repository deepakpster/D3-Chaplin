var Controller = require('controllers/base/controller');
var SimpleLineChart = require('views/charts/line-simple');

module.exports = Controller.extend({
  // beforeAction: function() {
  //   this.constructor.__super__.beforeAction.apply(this, arguments);
  // },

  index: function() {
    this.view = new SimpleLineChart({
      container: "#page-container",
      data: [{
        "x": "1-May-12",
        "y": 58.13
      }, {
        "x": "30-Apr-12",
        "y": 53.98
      }, {
        "x": "27-Apr-12",
        "y": 67.00
      }, {
        "x": "26-Apr-12",
        "y": 89.70
      }, {
        "x": "25-Apr-12",
        "y": 99.00
      }, {
        "x": "24-Apr-12",
        "y": 130.28
      }, {
        "x": "23-Apr-12",
        "y": 166.70
      }, {
        "x": "20-Apr-12",
        "y": 234.98
      }, {
        "x": "19-Apr-12",
        "y": 345.44
      }, {
        "x": "18-Apr-12",
        "y": 443.34
      }, {
        "x": "17-Apr-12",
        "y": 543.70
      }, {
        "x": "16-Apr-12",
        "y": 580.13
      }, {
        "x": "13-Apr-12",
        "y": 605.23
      }, {
        "x": "12-Apr-12",
        "y": 622.77
      }, {
        "x": "11-Apr-12",
        "y": 626.20
      }, {
        "x": "10-Apr-12",
        "y": 628.44
      }, {
        "x": "9-Apr-12",
        "y": 636.23
      }, {
        "x": "5-Apr-12",
        "y": 633.68
      }, {
        "x": "4-Apr-12",
        "y": 624.31
      }, {
        "x": "3-Apr-12",
        "y": 629.32
      }, {
        "x": "2-Apr-12",
        "y": 618.63
      }, {
        "x": "30-Mar-12",
        "y": 599.55
      }, {
        "x": "29-Mar-12",
        "y": 609.86
      }, {
        "x": "28-Mar-12",
        "y": 617.62
      }, {
        "x": "27-Mar-12",
        "y": 614.48
      }, {
        "x": "26-Mar-12",
        "y": 606.98
      }]
    });
  }
});
