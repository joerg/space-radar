//
// Breadcrumbs
//

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  if (!node) return []
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }



  if (realroot.name == '/') {
    path.unshift(realroot);
  } else {
    path = realroot.name.split(PATH_DELIMITER).slice(1).map(d => {
      return {
        name: d,
        depth: -1,
        root: true
      }
    }).concat(path)
  }

  return path;
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3
    .select("#sequence")
    .select('div')
      .selectAll("a")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter()
    .append('a')
    .attr('href', '#')
      .style("background", function(d) {
        var h = hue(key(d));
        return h;
        // var c = d3.lab(hue(p.name));
        // c.l = luminance(d.sum);
        // return colors[d.name];
      })
    .on('click', d => {
      if (d.root)
        zoom(realroot, realroot)
      else
        zoom(d, d)
    })

  entering.text(function(d) { return d.name; })

  // Remove exiting nodes.
  g.exit().remove();

}