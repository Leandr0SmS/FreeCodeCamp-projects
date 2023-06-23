import { colors } from "../resources/colors.js";

export const movieD3 = (data, id, width, height) => {

    //Creating hierarchy and leaves
    const hierarchy = d3.hierarchy(data, node => node.children)
        .sum(node => node['value'])
        .sort((node1, node2) => node2['value'] - node1['value']);

    const treemapLayout = d3.treemap()
        .size([width, height]);

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
    
    const block = svg.selectAll('g')
        .data(tilesData)
        .enter()
        .append('g')
        .attr('transform', d => 'translate (' + d['x0'] + ', ' + d['y0'] +')')

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', d => {
            const index = categoriesNoRepeated.indexOf(d['data']['category']);
            return colors[index];
        })
        .attr('width', d => d['x1'] - d['x0'])
        .attr('height', d => d['y1'] - d['y0'])

    
};