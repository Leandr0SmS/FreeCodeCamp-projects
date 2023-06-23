import { movieD3 } from "./movies.js";
import { videoD3 } from "./videos.js";
import { kickstarterD3 } from "./kickstarters.js";

export const renderD3 = (data, id, width, height) => {

    const dataId = data.name.split(' ')[0].toLowerCase();

    switch (dataId) {
        case 'video':
            videoD3(data, id, width, height)
            break;
        case 'movies':
            movieD3(data, id, width, height)
            break;     
        case 'kickstarter':
            kickstarterD3(data, id, width, height)
            break;    
        default:
            console.log('Error: Not a valid Id')
            break;
    }

}