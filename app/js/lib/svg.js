module.exports.getPointsFromPath = function (markup) {
    var holder = document.createElement('div');
    holder.innerHTML = markup;
    var paths = Array.prototype.slice.call(
                    holder.querySelectorAll('path')
                );
    return paths.map((path) => {
        var points = [];
        for (var i = 0, ii = path.getTotalLength(); i < ii; i++) {
            var svgPoint = path.getPointAtLength(i)
            points.push({
                x: svgPoint.x,
                y: svgPoint.y
            })
        }
        holder.innerHTML = '';
        return points;
    })
}
module.exports.getPath = function (markup) {
    var holder = document.createElement('div');
    holder.innerHTML = markup;
    var paths = Array.prototype.slice.call(
                    holder.querySelectorAll('path')
                );
    return paths.map((path) => {
        var points = [];
        var instructions = path.getAttribute('d');
        var coords = instructions.split(' ').map((coord) => {
            coord = coord.replace(/M|L/g, '')
            var xy = coord.split(',');
            return {
                x: xy[0],
                y: xy[1]
            }
        })
        .filter((item) => {
            return !isNaN(item.x)
        });
        console.log(coords);
        return coords;
    })
}
