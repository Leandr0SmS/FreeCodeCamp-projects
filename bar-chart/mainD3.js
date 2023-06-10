export const d3Code = (data, width, height) => { 

    const w = width;
    const h = height;
    const padding = 40;

    const xScale = d3.scaleLinear()
                     .domain(
                        [
                            0,
                            data.length
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

    const svg = d3.select('#app')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg')

    console.log(d3.min(data, (d) => d[1])) // y
    console.log(d3.max(data, (d) => d[1])) // y
    console.log(d3.min(data, (d) => d[0]).split('-')[0]) // x
    console.log(d3.max(data, (d) => d[0]).split('-')[0]) // x

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', (d, i) => yScale(d[1]))
        .attr('width', d => (w / data.length) / 2)
        .attr('height', (d, i) => (h - yScale(d[1])) - padding)
        .attr('id', d => `${d[1]}`)
        .attr('class', 'bar')
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])

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
