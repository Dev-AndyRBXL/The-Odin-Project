function KnightMoves(end, start = [0, 0]) {
  if (!start || start.length < 2 || typeof start !== 'object') {
    throw new Error(
      `"${start}" is not a valid value for "start", please pass a valid value: [X, Y]`
    );
  } else if (!end || end.length < 2 || typeof end !== 'object') {
    throw new Error(
      `"${end}" is not a valid value for "end", please pass a valid value: [X, Y]`
    );
  }

  if (start[0] < -4 || start[0] > 4 || start[1] < -4 || start[1] > 4) {
    throw new Error('Start position must be between -4 and 4 for both X and Y');
  }

  if (end[0] < -4 || end[0] > 4 || end[1] < -4 || end[1] > 4) {
    throw new Error('End position must be between -4 and 4 for both X and Y');
  }

  end[0] = Number(end[0]);
  end[1] = Number(end[1]);

  const directions = [
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
  ];

  let queue = [[start[0], start[1]]];
  let seen = new Set().add(`${start[0]},${start[1]}`);
  let parentMap = new Map();
  let steps = 0;

  console.log('starting position:', start);
  console.log('goal position:', end);

  while (queue.length) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let cur = queue.shift();

      if (cur[0] === end[0] && cur[1] === end[1]) {
        let path = [];
        let current = cur;
        while (current) {
          path.push(current);
          current = parentMap.get(`${current[0]},${current[1]}`);
        }
        console.log('%cshortest path:', 'color: lime');
        for (let j = path.length - 1; j >= 0; j--) {
          console.log(`- %cstep: %c${path.length - j - 1}, %cposition:`, 'color: darkgray', 'color: white', 'color: lightskyblue', path[j]);
        }
        return steps;
      }

      for (const dir of directions) {
        let nextX = cur[0] + dir[0];
        let nextY = cur[1] + dir[1];

        if (!seen.has(`${nextX},${nextY}`)) {
          seen.add(`${nextX},${nextY}`);
          queue.push([nextX, nextY]);
          parentMap.set(`${nextX},${nextY}`, cur);
        }
      }
    }

    steps++;
  }

  return -1;
}

console.log(KnightMoves([3, 1]));
