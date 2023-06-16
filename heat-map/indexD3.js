import { monthsSwitch } from "./resources/months.js";
import { temperatureColors } from "./resources/colors.js";

export const renderD3 = (data, width, height) => {

    const{ monthlyVariance } = data;

    const w = width;
    const h = height;
    const padding = 60;
    const cellHeight = (h - padding) / 12;

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
        .tickFormat(d => d);
        
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

    const cells = svg.selectAll('.cell')
        .data(monthlyVarianceDates)
        .enter()
        .append('rect')
        .attr('data-month', d => d.date.getMonth())
        .attr('data-year', d => d.date.getFullYear())
        .attr('data-temp', d => data.baseTemperature + d.variance)
        .attr('x', d => xScale(d.date.getFullYear()))
        .attr('y',(d, i) => yScale(d.date.getMonth()) - cellHeight)
        .attr('width', cellWidth)
        .attr('height', (d, i) => cellHeight)
        .attr('class', 'cell');

    const legendPadding = padding * 4;

    const variancesMin = d3.min(monthlyVarianceDates, d => d.variance);
    
    const variancesMax = d3.max(monthlyVarianceDates, d => d.variance);

    const xScaleLegend = d3.scaleLinear()
        .domain([
           variancesMin,
           variancesMax
        ])
        .range([
            legendPadding,
           (w - legendPadding)
        ]);

    const scaleColors = d3.scaleLinear()
        .domain([
            0,
            temperatureColors.length
        ])
        .range([
            variancesMin,
            variancesMax
        ]);

    const setColors = d3.scaleLinear()
        .domain([
            variancesMin,
            variancesMax
        ])
        .range([
            0,
            temperatureColors.length
        ]);

    const ticksValuesArray = [];
    for (let i = 0; i < temperatureColors.length; i ++) {
        ticksValuesArray.push(scaleColors(i))
    }
    
    const xAxisLegend = d3.axisBottom(xScaleLegend);
    xAxisLegend
        .tickValues(ticksValuesArray)
        .tickFormat(d => parseFloat(d).toFixed(1));

    const legend = svg.append('svg')
        .attr('id', 'legend')

    legend.append("g")
        .attr('id', 'x-axis')
        .attr('id', 'legend')
        .call(xAxisLegend);

    legend.selectAll('.color')
        .data(temperatureColors)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScaleLegend(scaleColors(i)))
        .attr('y', '0px')
        .attr('width', (w - 2 * legendPadding) / temperatureColors.length)
        .attr('height', '7px')
        .attr('class', 'color')
        .attr('fill', (d, i) => temperatureColors[i]);

    cells.attr('fill', (d, i) => {
        const index = Math.round(setColors(d.variance));
        return temperatureColors[index];
    })

};