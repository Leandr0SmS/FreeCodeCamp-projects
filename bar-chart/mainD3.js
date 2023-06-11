export const d3Code = (data, width, height) => { 

    const w = width;
    const h = height;
    const barWidth = width / 275;
    const padding = 40;

    const dataQ = data.map(elem => {
        if (elem[0].split('-')[1] === "01") {
            return [elem[0].split('-')[0], 'Q1', elem[1]]
        }
        if (elem[0].split('-')[1] === "04") {
            return [elem[0].split('-')[0], 'Q2', elem[1]]
        }
        if (elem[0].split('-')[1] === "07") {
            return [elem[0].split('-')[0], 'Q3', elem[1]]
        }
        if (elem[0].split('-')[1] === "10") {
            return [elem[0].split('-')[0], 'Q4', elem[1]]
        }
    });

    const yearsDate = data.map(function (item) {
        return new Date(item[0]);
    });

    const xMax = new Date(d3.max(yearsDate));
    xMax.setMonth(xMax.getMonth() + 3);

    var xScale = d3.scaleTime()
                     .domain(
                        [
                            d3.min(yearsDate), 
                            xMax
                        ]
                     )
                     .range(
                        [
                            padding, (w - padding)
                        ]
                     );

    const yScale = d3.scaleLinear()
                     .domain(
                        [
                            0,
                            d3.max(data, (d) => d[1])
                        ]
                     )
                     .range(
                        [
                            (h - padding),
                            padding
                        ]
                     );

    const svg = d3.select('#container')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg')

    const tooltip = d3.select('#container')
                      .append('div')
                      .attr('id', 'tooltip')

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(yearsDate[i]))
        .attr('y', (d, i) => yScale(d[1]))
        .attr('width', d => barWidth)
        .attr('height', (d, i) => (h - yScale(d[1])) - padding)
        .attr('id', d => `${d[1]}`)
        .attr('class', 'bar')
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .on('mouseover', function (event, d) {

          const i = data.indexOf(event);

          tooltip
            .transition()
            .duration(200)
            .style('opacity', 0.9);
          tooltip
            .html(
                dataQ[i][0] + ' ' +dataQ[i][1] +
                '<br>' + '$' + dataQ[i][2] +' Billion'
            )
            .attr('data-date', data[i][0])
        })
        .on('mouseout', function () {
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0);
        });
        

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr('id', 'x-axis')
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr('id', 'y-axis')
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);


}
