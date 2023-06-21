export const videoD3 = (data, id, width, height) => {
    const container = d3.select(`#${id}`);
    container
        .append('h1')
        .text('Hey iam video')
};