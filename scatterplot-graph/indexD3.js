export const renderD3 = (data, width, height) => {

    const w = width;
    const h = height;
    const padding = 40;

    const svg = d3.select('#container')
    .append('svg')
    .attr('width', w)
    .attr('hieght', h)

    const xScale = d3.scaleTime()
                     .domain([
                        d3.min(data, d => d['Year']),
                        d3.max(data, d => d['Year'])
                     ])
                     .range([
                        padding,
                        (w - padding)
                     ]);

    const yScale = d3.scaleLinear()
                     .domain([
                        d3.min(data, d => d['Time']),
                        d3.max(data, d => d['Time'])
                     ])
                     .range([
                        (h - padding),
                        padding
                     ])

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

    console.log(Object.keys(data[0]))
    console.log(d3.max(data, d => d['Time']))
    console.log(d3.min(data, d => d['Time']))
} 