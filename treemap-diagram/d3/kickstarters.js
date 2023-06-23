import { colors } from "../resources/colors.js";

export const kickstarterD3 = (data, id, width, height) => {

    //Creating hierarchy and leaves
    const hierarchy = d3.hierarchy(data, node => node.children)
        .sum(node => node['value'])
        .sort((node1, node2) => node2['value'] - node1['value']);

    const treemapLayout = d3.treemap()
        .size([width, height])
        .paddingInner(2);

    treemapLayout(hierarchy);

    const tilesData = hierarchy.leaves();


    //define categories to select propr color
    const allCategories = tilesData.map(d => d['data']['category']);

    const categoriesNoRepeated = [...new Set(allCategories)];


    //Creating visualization
    const container = d3.select(`#${id}`);

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'svg ');

    const tooltip = d3.select('#tooltip')
        .style('visibility', 'hidden');
    
    const block = svg.selectAll('g')
        .data(tilesData)
        .join('g')
        .attr('transform', d => 'translate (' + d['x0'] + ', ' + d['y0'] +')')

    const tile = block.append('rect')
        .attr('class', 'tile')
        .attr('fill', d => {
            const index = categoriesNoRepeated.indexOf(d['data']['category']);
            return colors[index];
        })
        .attr('width', d => d['x1'] - d['x0'])
        .attr('height', d => d['y1'] - d['y0'])
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .on('mousemove', (e, d) => {
            console.log(d)
            tooltip
                .style('visibility', 'visible')
                .style('left', e.pageX + 30 + 'px')
                .style('top', e.pageY - 120 + 'px')
                .attr('data-value', d.value)
                .html(`
                    <h3>${d.data.name}</h3>
                    <p>${d.data.category}</p>
                    <p>${d.value}%</p>
                `)
            d3.select(e.target).style('opacity', 0.7);
        })
        .on('mouseleave', (e, d) => {
            d3.select(e.target).style('opacity', 1);
            tooltip.style('visibility', 'hidden');
        });

    block
        .append('text')
        .attr('class', 'tile-text')
        .selectAll('tspan')
        .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .join('tspan')
        .attr('x', 4)
        .attr('y', (d, i) => 13 + i * 10)
        .text(d => d);
};