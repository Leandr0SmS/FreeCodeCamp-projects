import { generateNewColor } from "./functions/random-color.js";

export const renderD3 = (data, width, height) => {

    const w = width;
    const h = height;
    const padding = 40;

    const svg = d3.select('#container')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg');

    const tooltip = d3.select('#container')
        .append('div')
        .attr('id', 'tooltip');

    const countries =  [...new Set(data.map(d => d.Nationality))];

    let colorsMap = new Map();
    countries.forEach(c => {
        colorsMap.set(c, generateNewColor());
    })

    svg.selectAll("text")
        .data(countries)
        .enter()
        .append('text')
        .attr('x', w / 5 * 4)
        .attr('y', (d, i) => padding + (i * 25))
        .text(d =>`${d}`)
        .attr('class','legend')

    svg.selectAll('rect')
        .data(countries)
        .enter()
        .append('rect')
        .attr('x', (w / 5 * 4) - 20)
        .attr('y', (d, i) => (padding + (i * 25)) - 13)
        .attr('width', '1rem')
        .attr('height', '1rem')
        .text(d =>`${d}`)
        .attr('class', 'legend-color')
        .style('fill', (d, i) => {
            if (colorsMap.has(d)) {
                return colorsMap.get(d)
            }
        })

    svg.append('text')
        .attr('x', (w / 5 * 4) - 20)
        .attr('y', padding - 20)
        .text('LEGENDS:')
        .attr('id', 'legend')

    const years = data.map(d => {
        return d.Year = new Date(d.Year, 0, 1); 
    });

    const xScale = d3.scaleTime()
                     .domain([
                        d3.min(years),
                        d3.max(years)
                     ])
                     .range([
                        padding,
                        (w - padding)
                     ])
                     .nice();

    const times = data.map(d => {
        const [minutes, seconds] = d.Time.split(":");
        return new Date(0, 0, 0, 0, minutes, seconds)
    });

    const yScale = d3.scaleTime()
                     .domain([
                        d3.max(times),
                        d3.min(times)
                     ])
                     .range([
                        (h - padding),
                        padding
                     ])

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);
    yAxis.ticks()
        .tickFormat(d => {
            const timeString = d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return timeString.substr(3);
        });
    
    svg.append("g")
        .attr('id', 'x-axis')
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr('id', 'y-axis')
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(years[i]))
        .attr('cy', (d, i) => yScale(times[i]))
        .attr('r', '7px')
        .attr('class', 'dot')
        .attr('data-xvalue', (d, i) => years[i].getFullYear())
        .attr('data-yvalue', (d, i) => {
            times[i].setFullYear(1990)
            return times[i]
        })
        .attr('fill', (d) => colorsMap.get(d.Nationality))
        .on('mouseover', (event, i) => {
            tooltip
                .attr('data-year', years[i].getFullYear())
                .transition()
                .duration(20)
                .style('opacity', 0.9);
            tooltip
                .html(
                  data[i].Name +
                    ': ' +
                    data[i].Nationality +
                    '<br/>' +
                    'Year: ' +
                    data[i].Year +
                    (data[i].Doping ? '<br/><br/>' + data[i].Doping : '')
                )
                .attr('data-date', data[i][0])
        })
        .on('mouseout', () => {
            tooltip
                .transition()
                .duration(200)
                .style('opacity', 0);
        });

        console.log(colorsMap)
        console.log(data)
    
} 
