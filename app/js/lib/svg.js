module.exports.getPath = function (markup) {
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
