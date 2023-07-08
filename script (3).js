function calculateShortestPath() {
  const graphInput = document.getElementById('graphInput');
  const startNodeInput = document.getElementById('startNode');
  const endNodeInput = document.getElementById('endNode');
  const resultPath = document.getElementById('path');
  const resultWeight = document.getElementById('weight');

  // Parse the input graph and weights
  const inputLines = graphInput.value.trim().split('\n');
  const graph = {};

  for (const line of inputLines) {
    const [startNode, endNode, weight] = line.split(' ');
    if (!graph[startNode]) {
      graph[startNode] = {};
    }
    graph[startNode][endNode] = parseInt(weight);
    if (!graph[endNode]) {
      graph[endNode] = {};
    }
    graph[endNode][startNode] = parseInt(weight);
  }

  // Get the start and end nodes from the input fields
  const startNode = startNodeInput.value.trim();
  const endNode = endNodeInput.value.trim();

  // Calculate the shortest path
  const shortestPath = dijkstra(graph, startNode, endNode);

  // Display the result with animation
  animateResult(shortestPath.path, shortestPath.weight);
}

function animateResult(path, weight) {
  const resultPath = document.getElementById('path');
  const resultWeight = document.getElementById('weight');

  resultPath.textContent = '';
  resultWeight.textContent = '';

  // Animate the path
  for (let i = 0; i < path.length; i++) {
    const node = path[i];
    const span = document.createElement('span');
    span.textContent = node;
    span.style.animation = `path-fade-in ${(i + 1) * 0.5}s ease-in-out`;
    resultPath.appendChild(span);
    if (i < path.length - 1) {
      const arrow = document.createElement('span');
      arrow.textContent = ' -> ';
      resultPath.appendChild(arrow);
    }
  }

  // Display the weight
  resultWeight.textContent = `Total Weight: ${weight}`;
}

