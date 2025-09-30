import { colors } from "../resources/colors.js";

export const renderD3 = (data, id, width, height) => {

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
        .attr('transform', d => 'translate (' + d['x0'] + ', ' + d['y0'] +')');
    
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
            const {pageX, pageY} = e;
            tooltip
                .style('visibility', 'visible')
                .style('left', pageX + 30 + 'px')
                .style('top', pageY - 120 + 'px')
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
    
    const legendPadding = 20;
    const legendWidth = width * 0.666;
    const legendRectPadding = 23;
    const legentXOffset = 20;
    const legentYOffset = 13;
    
    block
        .append('text')
        .attr('class', 'tile-text')
        .selectAll('tspan')
        .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .join('tspan')
        .attr('x', 4)
        .attr('y', (d, i) => 13 + i * 10)
        .text(d => d);
    
    const ledendContainer = container.append('svg')
        .attr('id', 'legend')
        .attr('width', legendWidth)
        .attr('height', Math.ceil((categoriesNoRepeated.length + 1) / 2) * legendRectPadding);
    
    const legendGroup = ledendContainer.selectAll('g')
        .data(categoriesNoRepeated)
        .join('g')
        .attr('id', (d, i) => `legend-${i + 1}`);
    
    legendGroup.append('rect')
        .attr('class', 'legend-item')
        .attr('fill', (d, i) => colors[i])
        .attr('x', (d, i) => i <= (categoriesNoRepeated.length / 2) ? legendPadding : (legendWidth / 2))
        .attr('y', (d, i) => i <= (categoriesNoRepeated.length / 2) ? i * legendRectPadding : (categoriesNoRepeated.length - i - 1) * legendRectPadding)
        .attr('width', '1rem')
        .attr('height', '1rem')
    
        legendGroup.append('text')
        .attr('class', 'legend-text')
        .text((d, i) => d)
        .attr('x', (d, i) => i <= (categoriesNoRepeated.length / 2) ? legendPadding + legentXOffset : (legendWidth / 2) + legentXOffset)
        .attr('y', (d, i) => i <= (categoriesNoRepeated.length / 2) ? i * legendRectPadding + legentYOffset : (categoriesNoRepeated.length - i - 1) * legendRectPadding + legentYOffset)
    
}