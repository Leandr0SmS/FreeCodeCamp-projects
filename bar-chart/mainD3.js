export const d3Code = () => { 

    const w = 500;
    const h = 500;

    const svg = d3.select('#app')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

    //svg.selectAll('rect')
    //.data(data)
    //.enter()
    //.append('rect')
    //.attr('x', (d, i) => i * 3)
    //.attr('y', (d, i) => h - 3 * d)
    //.attr('width', 25)
    //.attr('height', (d, i) => 3 * d)
    //.fill('fill', 'navy')

}
