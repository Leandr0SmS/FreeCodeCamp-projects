import { educationColors } from "./resources/colors.js";

export const renderD3 = (data, width, height) => {

    const [educationData, countyData] = data;

    const w = width;
    const h = height;

    const container = d3.select('#container');
    
    const svg = container.append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'svg');

    const geoJsonCountyData = topojson.feature(countyData, countyData.objects.counties);

    const geoGenerator = d3.geoPath();

    const counties = svg
        .append('g')
        .attr('class', 'counties');
    
    const county = counties
        .selectAll('path')
        .data(geoJsonCountyData.features)
        .join('path')
        .attr('d', geoGenerator)
        .attr('class', 'county')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => educationData.find(obj => obj.fips === d.id).bachelorsOrHigher);

    const legendPadding = width * 0.3;

    const xScaleLegendAxis = d3.scaleLinear()
        .domain([
            d3.min(educationData, d => d.bachelorsOrHigher),
            d3.max(educationData, d => d.bachelorsOrHigher)
        ])
        .range([
            legendPadding,
            (w - legendPadding)
        ]);

    const scaleEducationColor = d3.scaleLinear()
        .domain([
            d3.min(educationData, d => d.bachelorsOrHigher),
            d3.max(educationData, d => d.bachelorsOrHigher)
        ])
        .range([
            0,
            educationColors.length - 1
        ]);

    const scaleColorEducation = d3.scaleLinear()
        .domain([
            0,
            educationColors.length - 1
        ])
        .range([
            d3.min(educationData, d => d.bachelorsOrHigher),
            d3.max(educationData, d => d.bachelorsOrHigher)
        ]);

    const ticksValuesArray = [];
        for (let i = 0; i < educationColors.length; i ++) {
            ticksValuesArray.push(scaleColorEducation(i))
        };

    const xAxisLegend = d3.axisBottom(xScaleLegendAxis)
        .tickValues(ticksValuesArray)
        .tickFormat(d => `${parseFloat(d).toFixed(1)}%`);
        
    const legend = svg.append('svg')
        .attr('id', 'legend');  

    legend.append("g")
        .attr('id', 'x-axis')
        .attr('id', 'legend')
        .attr('transform', 'translate(0, 3)')
        .call(xAxisLegend);

    const tooltip = d3.select('#tooltip')
        .style('visibility', 'hidden');

    county
        .attr('fill', d => {
            const eduData = educationData.find(obj => obj.fips === d.id);
            const index = Math.round(scaleEducationColor(eduData.bachelorsOrHigher));
            return educationColors[index];
        })
        .on('mouseenter', (e, d) => {
            const [x, y] = d3.pointer(e);
            const showData = educationData.find(obj => obj.fips === d.id);
            tooltip
                .style('visibility', 'visible')
                .style('left', (x + 20) + 'px')
                .style('top', (y + 10) + 'px')
                .attr('data-education', showData.bachelorsOrHigher)
                .html(`
                    <h3>${showData.state}</h3>
                    <p>${showData.area_name}</p>
                    <p>${showData.bachelorsOrHigher}%</p>
                `)
            d3.select(e.target).style('fill', '#8A2BE2');
        })
        .on('mouseleave', (e, d) => {
            const showData = educationData.find(obj => obj.fips === d.id);
            const index = Math.round(scaleEducationColor(showData.bachelorsOrHigher));
            d3.select(e.target)
                .style('fill', `${educationColors[index]}`);
            tooltip.style('visibility', 'hidden');
        })
        .on('touchstart', (e, d) => {
            e.preventDefault();
            const [x, y] = d3.pointer(e);
            const showData = educationData.find(obj => obj.fips === d.id);
            tooltip
                .style('visibility', 'visible')
                .style('left', (x + 20) + 'px')
                .style('top', (y + 10) + 'px')
                .attr('data-education', showData.bachelorsOrHigher)
                .html(`
                    <h3>${showData.state}</h3>
                    <p>${showData.area_name}</p>
                    <p>${showData.bachelorsOrHigher}%</p>
                `)
            d3.select(e.target).style('fill', '#8A2BE2');
        })
        .on('touchend', (e, d) => {
            e.preventDefault();
            const showData = educationData.find(obj => obj.fips === d.id);
            const index = Math.round(scaleEducationColor(showData.bachelorsOrHigher));
            d3.select(e.target)
                .style('fill', `${educationColors[index]}`);
            tooltip.style('visibility', 'hidden');
        });

    const colorWidth = xScaleLegendAxis(scaleColorEducation(1)) - xScaleLegendAxis(scaleColorEducation(0));

    legend
        .selectAll('rect')
        .data(educationColors)
        .join('rect')
        .attr('x', (d, i) => xScaleLegendAxis(scaleColorEducation(i)))
        .attr('y', '-1px')
        .attr('width', colorWidth)
        .attr('height', '7px')
        .attr('class', 'color')
        .attr('fill', (d, i) => d);

};