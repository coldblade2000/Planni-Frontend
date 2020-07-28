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
export const getRandomColor =()=> colors[Math.floor(Math.random()*colors.length)]