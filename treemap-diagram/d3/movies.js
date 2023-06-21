export const movieD3 = (data, id, width, height) => {
    const container = d3.select(`#${id}`);
    container
    .append('h1')
    .text('Hey iam movie')
    console.log('Hey iam movie')
};