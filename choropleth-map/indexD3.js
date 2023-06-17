export const renderD3 = (data, width, height) => {

    const [educationData, countyData] = data;

    const w = width;
    const h = height;
    const padding = 60;

    const container = d3.select('#container');
    
    const svg = container.append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg');

    console.log(educationData)
    console.log(countyData)

};