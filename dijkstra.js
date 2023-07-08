// Dijkstra's Algorithm implementation

function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const unvisited = new Set(Object.keys(graph));

  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
  }

  while (unvisited.size > 0) {
    let currentNode = null;

    // Find the node with the shortest distance
    for (const node of unvisited) {
      if (currentNode === null || distances[node] < distances[currentNode]) {
        currentNode = node;
      }
    }

    if (currentNode === endNode) {
      break;
    }

    unvisited.delete(currentNode);
    visited.add(currentNode);

    const neighbors = graph[currentNode];
    for (const neighbor in neighbors) {
      const distance = distances[currentNode] + neighbors[neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentNode;
      }
    }
  }

  const path = [];
  let current = endNode;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    path,
    weight: distances[endNode]
  };
}
