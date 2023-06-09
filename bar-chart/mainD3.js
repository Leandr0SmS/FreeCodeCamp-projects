export const d3Code = (data) => { 

    const w = 80;
    const h = 80;

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
                            h,
                            0
                        ]
                     );

    const svg = d3.select('#app')
    .append('svg')
    .attr('width', `${w}vw`)
    .attr('height', `${w}vh`)

    console.log(d3.min(data, (d) => d[1])) // y
    console.log(d3.max(data, (d) => d[1])) // y
    console.log(d3.min(data, (d) => d[0])) // x
    console.log(d3.max(data, (d) => d[0]).split('-')[0]) // x

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 3)
    .attr('y', (d, i) => yScale(h - d[1]))
    .attr('width', d => w / data.length)
    .attr('height', (d, i) => yScale(d[1]))
    .style('fill', 'navy')
    .style('margin', '2px')

}
