var View = require('views/base/view'),
  template = require('./templates/page');

module.exports = View.extend({
  containerMethod: 'html',
  className: "pd-chart",
  autoRender: true,
  template: template,

  initialize: function initialize(options) {
    if (!_.isObject(options)) {
      throw new Error("Options should be in JSON format. But passed in data was " + options);
    } else {
      var defaultOpts = $.extend(true, {
        color: d3.scaleOrdinal(d3.schemeCategory20),
        metaData: {
          width: "100%",
          height: 500,
          margin: {
            top: 20,
            right: 20,
            bottom: 50,
            left: 40
          },
          x: {
            name: "x",
            scale: "time",
            parser: d3.timeParse("%d-%b-%y")
          },
          y: {
            name: "y",
            scale: "linear"
          },
          tooltip: null,
          isResizeable: true
        },
        data: [],
        tooltip: {}
      }, options || {});
      _.extend(this, defaultOpts);
      this.rawCollection = $.extend(true, {}, defaultOpts);
    }

    _.bindAll(this, 'render', '_render', 'afterRender', 'beforeRender');
    /*
      Wrap render method with before and after render methods to have control over
      metadata manupulation before rendering and event bindings after chart render.
    */
    this.render = _.wrap(this.render, function(render) {
      var continueRender = this.beforeRender();
      if (continueRender === false) return false;
      render();
      this._render();
      this.afterRender();
    });
    /*
      Resize Handler - Called only once after risizing is complete. Chart is re-rendered.
    */
    window.addEventListener("resize", _.bind(function() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(_.bind(this.render, this), 250);
    }, this));
  },

  getTemplateData: function getTemplateData() {
    return this.metaData;
  },

  beforeRender: function beforeRender() {
    var metaData = this.metaData,
      chartData = this.data;

    if (this.svg) {
      this.svg.empty();
    }
  },

  _getSVG: function _getSVG() {
    var metaData = this.metaData;
    var margin = metaData.margin;
    this.width = this.$el.width() - margin.left - margin.right;
    this.height = this.$el.height() - margin.top - margin.bottom;

    this.svg = this.svg || d3.select(this.$el[0])
      .append("svg:svg")
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .attr("class", "svg-container")
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    return this.svg;
  },

  parseData: function() {
    var data = this.data,
      metaData = this.metaData,
      xName = metaData.x.name,
      yName = metaData.y.name;

    return data.map(function(d) {
      d[xName] = metaData.x.parser ? metaData.x.parser(d[xName]) : d[xName];
      d[yName] = metaData.y.parser ? metaData.x.parser(d[yName]) : d[yName];
      return d;
    });

  },

  getDomains: function getDomains(x, y, data) {
    var metaData = this.metaData,
      xName = metaData.x.name,
      yName = metaData.y.name;
    x.domain(d3.extent(data, function(d) {
      return d[xName];
    }));
    y.domain([0, d3.max(data, function(d) {
      return d[yName];
    })]);

    return {
      x: x,
      y: y
    }
  },

  xScale: function xScale() {
  },

  yScale: function yScale() {
  },

  getScales: function getScales() {
    var xScale = this.xScale(),
      yScale = this.yScale(),
      scalesXY = this.getDomains(xScale, yScale, this.data);
    return scalesXY;
  },

  xAxis: function xAxis() {
    return d3.axisBottom(this.scales.x);
  },
  yAxis: function yAxis() {
    return d3.axisLeft(this.scales.y);
  },

  getAxes: function getAxes() {
    return {
      x: this.xAxis(),
      y: this.yAxis()
    }
  },

  drawAxes: function drawAxes() {
    var axes = this.getAxes();
    var svg = this.svg;
    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(axes.x);

    // Add the Y Axis
    svg.append("g")
      .call(axes.y);
  },

  plotData: function plotData() {
    console.log("plot data");
  },


  _render: function render() {
    var metaData = this.metaData,
      chartData = this.data;

    var svg = this._getSVG();

    this.data = this.parseData();
    this.scales = this.getScales();
    this.drawAxes();
    this.plotData();

    console.log("Render");
  },

  afterRender: function afterRender() {
    console.log("After Render");
  }

});
