export const renderD3 = (data, width, height) => {

    const [educationData, countyData] = data;

    const w = width;
    const h = height;

    const container = d3.select('#container');
    
    const svg = container.append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg');

    const geoJsonCountyData = topojson.feature(countyData, countyData.objects.counties);

    const counties = svg
        .append('g')
        .attr('class', 'counties');
    
    const county = counties
        .selectAll('path')
        .data(geoJsonCountyData.features)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county');

    county
        .on('mouseenter', (e, d) => {
            d3.select(e.target).style('fill', 'red');
        })
        .on('mouseleave', (e, d) => {
            d3.select(e.target).style('fill', 'black');
        })

};