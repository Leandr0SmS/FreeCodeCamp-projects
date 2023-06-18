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
        .attr('class', 'county')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => educationData.find(obj => obj.fips === d.id).bachelorsOrHigher);

    const tooltip = d3.select('#tooltip')
        .style('visibility', 'hidden');

    county
        .on('mouseenter', (e, d) => {
            const [x, y] = d3.pointer(e);
            const showData = educationData.find(obj => obj.fips === d.id);
            tooltip
                .style('visibility', 'visible')
                .style('left', (x + 20) + 'px')
                .style('top', (y + 10) + 'px')
                .html(`
                    <h3>${showData.state}</h3>
                    <p>${showData.area_name}</p>
                    <p>${showData.bachelorsOrHigher}%</p>
                `)
            d3.select(e.target).style('fill', 'red');
        })
        .on('mouseleave', (e, d) => {
            d3.select(e.target).style('fill', 'black');
            tooltip.style('visibility', 'hidden');
        })

    console.log(educationData)
    console.log(geoJsonCountyData.features)

};