export const d3Code = (data, width, height) => { 

    console.log([width, height])

    const w = (width / 100) * 80;
    const h = (height / 100) * 80;

    const xScale = d3.scaleLinear()
                     .domain(
                        [
                            d3.min(data, (d) => d[0]).split('-')[0],
                            d3.max(data, (d) => d[0]).split('-')[0]
                        ]
                     )
                     .range(
                        [
                            0, w
                        ]
                     );

    const yScale = d3.scaleLinear()
                     .domain(
                        [
                            d3.min(data, (d) => d[1]),
                            d3.max(data, (d) => d[1])
                        ]
                     )
                     .range(
                        [
                            0,
                            h
                        ]
                     );

    const svg = d3.select('#app')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

    console.log(d3.min(data, (d) => d[1])) // y
    console.log(d3.max(data, (d) => d[1])) // y
    console.log(d3.min(data, (d) => d[0]).split('-')[0]) // x
    console.log(d3.max(data, (d) => d[0]).split('-')[0]) // x

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(d[0].split('-')[0]))
    .attr('y', (d, i) => h - yScale(d[1]))
    .attr('width', d => w / data.length)
    .attr('height', (d, i) => yScale(d[1]))
    .attr('id', d => `${d[1]}`)
    .style('fill', 'navy')

}
