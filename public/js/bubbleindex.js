
    var height = 500,
        width = 1000,
        margin = 25,
        _bodyG,
        _colors = d3.scale.category10(),
        _line;

    var sampleData = [];

    for (var i = 0; i<30; i++){
        var x, y, r;
        x = Math.floor(Math.random()*500);
        y = Math.floor(Math.random()*500);
        r = Math.floor(Math.random()*100);
        sampleData.push({ "x": x, "y": y, "r": r});
    }

    var svg = d3.select("body").append("svg")
            .attr("id", "svgVisualize")
            .attr("class", "axis")
            .attr("width", width)
            .attr("height", height);


    function InitChart(){

        var vis = svg
            .append("g")
            .attr("id", "balls");

        // var vis = d3.select("#svgVisualize");
        var xRange = d3.scale.linear()
            .range([2*margin, width - 2*margin])
            .domain([ d3.min(sampleData, function (d) { return (d.x); }),
                d3.max(sampleData, function (d) { return d.x; })]);

        var yRange = d3.scale.linear()
            .range([400, 40])
            .domain([d3.min(sampleData, function (d) {
                            return d.y;
                        }),
                        d3.max(sampleData, function (d) {
                            return d.y;
                        })]);

        var rRange = d3.scale.linear()
            .domain([0, 100])
            .range([2, 50]);

    // var packSizeScale = d3.scale.linear().domain([5, 50]).range([0, 20 ]);

        var circles = vis.selectAll("circle").data(sampleData);

        circles
            .enter()
            .insert("circle")
            .on('mouseover', function(d){
                // this.classList.add("muggles");
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style('fill', '#00D3FF')
                })
            .on('mouseout', function(d){
                // this.classList.remove("muggles")
                d3.select(this)
                    .transition()
                    .duration(500)
                    .style('fill', 'green');

            })
            .classed("multiply", true)
            .attr("cx", function (d) { return xRange (d.x); })
            .attr("cy", function (d) { return yRange (d.y); })
            .attr("r", 1)
            .style("fill", "green");

        circles
            .transition()
            .delay(function(d, i){
                return i*25;
            })
            .ease("bounce")
            .duration(1500)
            .attr("r", function (d) { return rRange(d.r) } )

              //   toolTip.transition()
              //     .style('opacity', 0.9)

              //   toolTip.html(function(){
              //     return "<strong>" + d.name + "</strong> <span style='color:red'>" + d.description + "</span>";
              //   })
              //     .style('left', (d3.event.pageX) + 'px')
              //     .style('top', (d3.event.pageY) + 'px')

              //   d3.select(this)
              //     .style('opacity', 0.5);
              // })
              // .on('mouseout', function(d){
              //   d3.select(this)
              //     .style('opacity', 1.0);
              // })
    }

    function renderAxes(){
        renderYAxis();
        renderXAxis();
    }

    function renderXAxis(){
        var axisLength = width - 2 * margin;

        var scale = d3.scale.linear()
                        .domain([0, 100])
                        .range([0, axisLength]);

        var xAxis = d3.svg.axis()
                .scale(scale)
                .orient("bottom");

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", function(){ // <-A
                return "translate(" + margin + "," + height/2 + ")";
            })
            .call(xAxis);

        // The vertical grid lines
        d3.selectAll("g.x-axis g.tick") // <-B
            .append("line") // <-C
                .classed("grid-line", true)
                .attr("x1", 0) // <-D
                .attr("y1", height/2 - margin )
                .attr("x2", 0)
                .attr("y2", -(height/2 - margin));  // <-E
    }

    function renderYAxis(){
        var axisLength = height - 2 * margin;

        var scale = d3.scale.linear()
                        .domain([100, 0])
                        .range([0, axisLength]);

        var yAxis = d3.svg.axis()
                .scale(scale)
                .orient("left");

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", function(){
                return "translate(" + width/2 + "," + margin + ")";
            })
            .call(yAxis);

        // horizontal gridlines
        d3.selectAll("g.y-axis g.tick")
            .append("line")
                .classed("grid-line", true)
                .attr("x1", -(width/2 - margin))
                .attr("y1", 0)
                .attr("x2", width/2 - margin) // <-F
                .attr("y2", 0);
    }

    renderAxes();
    InitChart();
