export const renderD3 = (data, width, height) => {

    const{ monthlyVariance } = data;

    const w = width;
    const h = height;
    const padding = 40;

    d3.select('#app')
        .append('h1')
        .text('Monthly Global Land-Surface Temperature');

    const container = d3.select('#app')
        .append('div')
        .attr('id', 'container');
    
    container.append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg');

    const monthlyVarianceDates = monthlyVariance.map(d => {
        const { year, month, variance} = d;
        return {
            variance: variance,
            date: new Date(year, month, 1)
        }
    });

    //const xScale = d3.scaleTime()
    //                 .domain([
    //                    d3.min(monthlyVarianceDates.date.getFullYear()),
    //                    d3.max(monthlyVarianceDates.date.getFullYear())
    //                 ])
    //                 .range([
    //                    padding,
    //                    (w - padding)
    //                 ]);
    //
    //const yScale = d3.scaleTime()
    //                 .domain()

    console.log(monthlyVarianceDates)

};