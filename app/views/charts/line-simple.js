var View = require('views/base/chart-view'),
  template = require('./templates/line-simple');

module.exports = View.extend({
  containerMethod: 'html',
  className: "pd-chart line-simple",
  autoRender: true,
  template: template,

  xScale: function xScale() {
    return d3.scaleTime().range([0, this.width]);
  },

  yScale: function yScale() {
    return d3.scaleLinear().range([this.height, 0]);
  },

  plotData: function plotData() {
    var metaData = this.metaData,
      data = this.data,
      xName = metaData.x.name,
      yName = metaData.y.name,
      scalesXY = this.scales;

    var valueline = d3.line()
      .x(function(d) {
        return scalesXY.x(d[xName]);
      })
      .y(function(d) {
        return scalesXY.y(d[yName]);
      });

    this.svg.append("path")
      .data([this.data])
      .attr("class", "line")
      .attr("d", valueline);
  }

});
