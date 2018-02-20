export const GENERATE_MAP = 'GENERATE_MAP'

export default (w, h) => {
  return  {
        type: GENERATE_MAP,
        payload: generate(w, h)
          }
}

// Main Generate
function generate(w,h) {
  let cols = w; // x
  let rows = h; // y
  let numRooms = w/20; //

  let gameMap  = Array(60).fill().map(()=> Array(60).fill(1));
  let areas = [];
  let rooms = [];

  // Define the 9 grid areas
  areas = constructAreas(gameMap)

  // Generate the rooms within the areas
  rooms = constructRooms(gameMap, areas, w/3)

  // Calculate and print the corridors
  gameMap = connectRooms(rooms, gameMap)


  // Print the rooms
  rooms.map((gen) => {
    for(let y = gen.roomStartY; y < gen.roomEndY; y++)
    {
      for(let x = gen.roomStartX; x < gen.roomEndX; x++)
      {
        gameMap[y][x] = 0;
      }
    }
  })
  // Calculate and print the entities
  gameMap = createEntities(rooms, gameMap)

  return {gameMap: gameMap};

}

function constructAreas(gameMap) {
  // areas : area[0] : {[0,0], [19,0], [19,19], [0,19]}
  // {topleft, topright, bottomright, bottomleft}
  let sizeY = gameMap.length;
  let sizeX = gameMap[0].length;
  let sizeArea = sizeY/3;
  let areas = [];
  for(let row = 0; row < 3; row++)
  {
    for(let col = 0; col < 3; col++)
    {
      areas.push({
        start:  [col*sizeArea, row*sizeArea],
        topright: [(col+1)*(sizeArea)-1, row*sizeArea],
        bottomright: [(col+1)*(sizeArea)-1, (row+1)*(sizeArea)-1],
        bottomleft: [col*sizeArea, (row+1)*(sizeArea)-1]
      })
    }
  }
  return areas;
}

function constructRooms(gameMap, areas, sizeArea) {
  let roomStartX
  let roomEndX
  let roomStartY
  let roomEndY
  let rooms = []

  for(let i = 0; i < areas.length ; i++)
  {
    let xMin = areas[i].start[0];
    let yMin = areas[i].start[1];
    let xMax = areas[i].bottomright[0];
    let yMax = areas[i].bottomright[1];

     roomStartX = random(xMin+1, xMin+random(2,9));
     roomEndX = random(xMax-random(2,9), xMax-1);

     roomStartY = random(yMin+1,yMin+random(2,9));
     roomEndY = random(yMax-random(2,9), yMax-1);


     rooms.push({roomStartX, roomEndX, roomStartY, roomEndY});
  }
  return rooms;
}


function connectRooms(rooms, gameMap) {
  let randompoints = []
  // Find a random spot in each room
  for(let i = 0; i < rooms.length; i++)
  {
    let x = random(rooms[i].roomStartX+1, rooms[i].roomEndX-1, true);
    let y = random(rooms[i].roomStartY+1, rooms[i].roomEndY-1, true);
    randompoints.push([x, y]);
  };


  for(let k = 0; k < 3; k++)
  {
    for(let j = 1 + (k*3); j <= (2 + (k*3)) ; j++)
    {

      gameMap = drawCorridors(randompoints[j], randompoints[j-1], gameMap)
    }
    let r = random(0,2);
    console.log("Randomz: " + r);
    if(k != 0)
      gameMap = drawCorridors(randompoints[(k*3)+r], randompoints[(k-1)*3+r], gameMap)
  }
  console.log(randompoints);


  return gameMap;
}

function drawCorridors(pointA, pointB, gameMap) {
  let xA = pointA[0]
  let yA = pointA[1]
  let xB = pointB[0]
  let yB = pointB[1]


  if(xA < xB)
  {
  for(let i = xA; i <= xB; i++)
    {
      gameMap[yA][i] = 0
    }
  }
  else
  {
  for(let i = xB; i <= xA; i++)
    {
      gameMap[yA][i] = 0
    }
  }

  if(yA < yB)
  {
  for(let j = yA; j <= yB; j++)
    {
        gameMap[j][xB] = 0
    }
  }
  else {
  for(let j = yB; j <= yA; j++)
    {
        gameMap[j][xB] = 0
    }
  }

  return gameMap;
};

function createEntities(rooms, gameMap) {
  // rooms = array of {roomStartX, roomEndX, roomStartY, roomEndY}
  let randompoints = []
  for(let i = 0; i < rooms.length; i++)
  {
    let x = random(rooms[i].roomStartX+1, rooms[i].roomEndX-1);
    let y = random(rooms[i].roomStartY+1, rooms[i].roomEndY-1);
    randompoints.push([x, y]);
  };

  for(let j = 0; j < rooms.length; j++) {
    // Decide if print enemy
    if(random(0,1) === 0)
    gameMap[randompoints[j][1]][randompoints[j][0]] = 3;
  }

  return gameMap;

};

function generateMapDebug(w,h) {
  generate(w,h);
}







function random(min, max, even) {
    if(even === undefined)
    return Math.floor(Math.random() * (max+1-min)) + min;
    else {
      let n ;
      do
      {
        n = Math.floor(Math.random() * (max+1-min)) + min;
      } while(n % 2 !== 0)
    return n;

    }
}
