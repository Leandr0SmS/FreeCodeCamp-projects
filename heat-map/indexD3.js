import { monthsSwitch } from "./functions/months.js";

export const renderD3 = (data, width, height) => {

    const{ monthlyVariance } = data;

    const w = width;
    const h = height;
    const padding = 60;

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

    const xScale = d3.scaleTime()
                     .domain([
                        d3.min(monthlyVarianceDates, d => d.date),
                        d3.max(monthlyVarianceDates, d => d.date)
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
    
    const xAxis = d3.axisBottom(xScale)
        .ticks(27)
        .tickFormat(d => d.getFullYear());

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

    console.log(d3.min(monthlyVarianceDates, d => d.date.getFullYear()))
    console.log(d3.max(monthlyVarianceDates, d => d.date.getFullYear()))

};