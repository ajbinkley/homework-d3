// @TODO: YOUR CODE HERE!
d3.csv('../data/data.csv')
  .then(function(data) {
    
    console.log(data);

    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        console.log(d.poverty);
        console.log(d.healthcare);
    });
  

    // Variables
    var body = d3.select('body')
      var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      var h = 500 - margin.top - margin.bottom
      var w = 500 - margin.left - margin.right
      // var formatPercent = d3.format('.2%')
      // Scales
    // var colorScale = d3.scaleOrdinal(d3.schemeCategory20)
    var xScale = d3.scaleLinear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.poverty })]),
          d3.max([0,d3.max(data,function (d) { return d.poverty })])
          ])
      .range([0,w])
    var yScale = d3.scaleLinear()
      .domain([
          d3.min([0,d3.min(data,function (d) { return d.healthcare })]),
          d3.max([0,d3.max(data,function (d) { return d.healthcare })])
          ])
      .range([h,0])
      // SVG
      var svg = body.append('svg')
          .attr('height',h + margin.top + margin.bottom)
          .attr('width',w + margin.left + margin.right)
        .append('g')
          .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
      // X-axis
      var xAxis = d3.axisBottom(xScale)
        // .tickFormat(formatPercent)
        .ticks(5)
    // Y-axis
      var yAxis = d3.axisLeft(yScale)
        // .tickFormat(formatPercent)
        .ticks(5)
    // Circles
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
      .append('circle')
        .attr('cx',function (d) { return xScale(d.poverty) })
        .attr('cy',function (d) { return yScale(d.healthcare) })
        .attr('r','14')
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill',function (d,i) { return '#8abbd4' })
        .attr('class','dot')
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',20)
            .attr('stroke-width',3)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(500)
            .attr('r',14)
            .attr('stroke-width',1)
        })
      .append('title') // Tooltip
        .text(function (d) { return d.state +
                             '\nReturn: ' + d.healthcare +
                             '\nStd. Dev.: ' + d.poverty })

    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(function(d) {
        return d.abbr;
        })
        .attr('x', function(d) {
          return xScale(d.poverty);
          })
        .attr('y', function(d) {
          return yScale(d.healthcare);
          })
        .attr('dx', '-6px')
        .attr('dy', '3px')
        .attr('font-size','10px')

    // X-axis
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
      .append('text') // X-axis Label
        .attr('class','label')
        .attr('y',-10)
        .attr('x',w)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Annualized Standard Deviation')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
      .append('text') // y-axis Label
        .attr('class','label')
        .attr('transform','rotate(-90)')
        .attr('x',0)
        .attr('y',5)
        .attr('dy','.71em')
        .style('text-anchor','end')
        .text('Annualized Return')
});