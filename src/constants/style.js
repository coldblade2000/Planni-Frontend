export const HOUR_HEIGHT = 66 //pixels, 4rem+2border px

export const colors = [
    '#99FFCC ',
    '#CCCC99 ',
    '#CCCCCC ',
    '#CCCCFF ',
    '#CCFF99 ',
    '#CCFFCC ',
    '#CCFFFF ',
    '#FFCC99 ',
    '#FFCCCC ',
    '#FFCCFF ',
    '#FFFF99 ',
    '#FFFFCC ',
]

//export const getRandomColor =()=> colors[Math.floor(Math.random()*colors.length)]
export const getRandomColor =()=> materialColorGenerator;


//This contains the material design colour palette.
//This palette was extracted from https://www.materialpalette.com and https://material.io/design/color/the-color-system.html#color-usage-and-palettes
export const materialColors = [
    //CYAN
    '#00BCD4',
    //TEAL
    '#009688',
    //PINK
    '#FF4081',
    //RED
    '#F44336',
    //LIME
    '#CDDC39',
    //AMBER
    '#FFC107',
    //INDIGO
    '#536DFE',
    //DEEP PURPLE
    '#673AB7',
    //ORANGE
    '#FF9800',
    //PURPLE
    '#673AB7',
    //DEEP ORANGE
    '#FF7247',
    //BLUE
    '#448AFF',
    //GREEN
    '#4CAF50',
]


//TODO: Make sure it selects different colors for every instance. And that the color selected for a class doesnt suddenly change up every time the mouse moves or something like that


function materialColorGenerator(step, crn) {
    //Selecting random color 
    //var randomColor = materialColors[Math.floor(Math.random()*colors.length)];
    return materialColors[step % materialColors.length];
}



//Gets colors in a random fashion
/*
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    // eslint-disable-next-line default-case
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}
*/

//export const getManyRandomColors = rainbow
export const getManyRandomColors = materialColorGenerator