export const renderD3 = (data, width, height) => {

    const w = width;
    const h = height;
    const padding = 40;

    const svg = d3.select('#container')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

    const years = data.map(d => {
        return d.Year = new Date(d.Year, 0, 1); 
    });

    const xScale = d3.scaleTime()
                     .domain([
                        new Date(93, 0, 1),
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
                        d3.min(times),
                        d3.max(times)
                     ])
                     .range([
                        (h - padding),
                        padding
                     ])

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);
    yAxis.ticks(13)
        .tickFormat(d => {
            const sec = d.getSeconds();
            let displaySec = sec < 10 ? '0' + sec : sec;
            const min = d.getMinutes();
            return min + ':' + displaySec
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
        .attr('r', '5px')
        .attr('class', 'dot')
        .attr('data-xvalue', (d, i) => {
            const time = times[i]
            const sec = time.getSeconds();
            let displaySec = sec < 10 ? '0' + sec : sec;
            const min = time.getMinutes();
            return min + ':' + displaySec
        })
        .attr('data-yvalue', (d, i) => times[i])

    console.log(Object.keys(data[0]))
    console.log(d3.min(data, d => d['Time']), d3.max(data, d => d['Time']))
    console.log(times)
    console.log(data)
} 
