import { monthsSwitch } from "./functions/months.js";

export const renderD3 = (data, width, height) => {

    const{ monthlyVariance } = data;

    const w = width;
    const h = height;
    const padding = 60;
    const cellHeight = (h - padding) / 12;

    d3.select('#app')
        .append('h1')
        .text('Monthly Global Land-Surface Temperature')
        .attr('id', 'title');

    const container = d3.select('#app')
        .append('div')
        .attr('id', 'container');
    
    const svg = container.append('svg')
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
    let yearsMax = d3.max(monthlyVarianceDates, d => d.date.getFullYear());
    let yearsMin = d3.min(monthlyVarianceDates, d => d.date.getFullYear());

    const xScale = d3.scaleLinear()
                     .domain([
                        yearsMin,
                        yearsMax
                     ])
                     .range([
                        padding,
                        (w - padding)
                     ]);
    
    const yScale = d3.scaleLinear()
                     .domain([
                        d3.min(monthlyVarianceDates, d => d.date.getMonth()),
                        d3.max(monthlyVarianceDates, d => d.date.getMonth())
                     ])
                     .range([
                        (h - padding),
                        padding
                     ]);
    
    const xAxis = d3.axisBottom(xScale);
    xAxis
        .ticks(26)
        .tickFormat(d => d)
        
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d => monthsSwitch(d));

    svg.append("g")
        .attr('id', 'x-axis')
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr('id', 'y-axis')
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);

    const cellWidth = (w - padding) / (yearsMax - yearsMin);

    svg.selectAll('rect')
        .data(monthlyVarianceDates)
        .enter()
        .append('rect')
        .attr('data-month', d => d.month)
        .attr('data-year', d => d.year)
        .attr('data-temp', d => data.baseTemperature + d.variance)
        .attr('x', d => xScale(d.date.getFullYear()))
        .attr('y',(d, i) => yScale(d.date.getMonth()) - cellHeight)
        .attr('width', cellWidth)
        .attr('height', (d, i) => cellHeight)
        .attr('class', 'cell')

    svg.append('rect')
    .attr('width', '2px')
    .attr('height', (h - padding) / 12)
    .attr('x', 60)
    .attr('y', (h - padding) - cellHeight)
    .style('fill', 'red')


        console.log(xScale(monthlyVarianceDates[0].date.getFullYear()))
        console.log(yScale(monthlyVarianceDates[0].date.getMonth()))

        console.log(cellWidth)
};