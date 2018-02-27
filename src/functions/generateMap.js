const bonusMax = 3;
const enemyMax = 5;
const blocks = 60

export default function generateMap(w,h,lvl = 1) {

  let gameMap  = Array(blocks).fill().map(()=> Array(blocks).fill(1));
  let areas = [];
  let rooms = [];

  // Global states to change at every level ?

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
  let mapWithEnemies = createEntities(rooms, gameMap, lvl);


  return {gameMap: mapWithEnemies.gameMap, enemyList: mapWithEnemies.enemyList};

}

function constructAreas(gameMap) {
  // areas : area[0] : {[0,0], [19,0], [19,19], [0,19]}
  // {topleft, topright, bottomright, bottomleft}
  let sizeY = gameMap.length;
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

     roomStartX = random(xMin+1, xMin+random(3,7));
     roomEndX = random(xMax-random(2,7), xMax-1);

     roomStartY = random(yMin+1,yMin+random(3,7));
     roomEndY = random(yMax-random(2,7), yMax-1);

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
    if(k !== 0)
      gameMap = drawCorridors(randompoints[(k*3)+r], randompoints[(k-1)*3+r], gameMap)
  }


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
    { gameMap[yA][i] = 0 }
  }
  else
  {
  for(let i = xB; i <= xA; i++)
    { gameMap[yA][i] = 0 }
  }

  if(yA < yB)
  {
  for(let j = yA; j <= yB; j++)
    { gameMap[j][xB] = 0 }
  }
  else {
  for(let j = yB; j <= yA; j++)
    { gameMap[j][xB] = 0 }
  }

  return gameMap;
};

function createEntities(rooms, gameMap, lvl) {
  // rooms = array of {roomStartX, roomEndX, roomStartY, roomEndY}
  let enemies = [];
  let bonuses = [];
  let boss = [];
  let xE, yE, xB, yB, xBoss, yBoss;
  for(let i = 0; i < rooms.length; i++)
  {
    do{
    xE = random(rooms[i].roomStartX+1, rooms[i].roomEndX-1);
    yE = random(rooms[i].roomStartY+1, rooms[i].roomEndY-1);

    xB = random(rooms[i].roomStartX+1, rooms[i].roomEndX-1);
    yB = random(rooms[i].roomStartY+1, rooms[i].roomEndY-1);

    xBoss = random(rooms[i].roomStartX+1, rooms[i].roomEndX-1);
    yBoss = random(rooms[i].roomStartY+1, rooms[i].roomEndY-1);

  } while((xE === xB) || (yE === yB) || (xE === xBoss) || (yE === yBoss) || (yB === yBoss) || (xB === xBoss) )
    enemies.push([xE, yE]);
    bonuses.push([xB, yB]);
    boss.push([xBoss, yBoss])
  };

  let enemyCount = 0;
  let bonusCount = 0;
  let enemyList = [];
  let infiniteLoopDebug = 0;


  while((bonusCount < 2 || enemyCount < 2) && infiniteLoopDebug < 500)
  {
    for(let j = 0; j < rooms.length; j++) {
      if((random(0,1) === 0) && enemyCount < enemyMax)
      {
        enemyList.push({key: j, pos: [enemies[j][0],enemies[j][1]], life: 100, type: "enemy"});
        gameMap[enemies[j][1]][enemies[j][0]] = 3;
        enemyCount++;
      }
      if((random(0,3) === 1) && bonusCount < bonusMax)
      {
        gameMap[bonuses[j][1]][bonuses[j][0]] = 4;
        bonusCount++;
      }
    }
  infiniteLoopDebug++
  }
  if(infiniteLoopDebug >= 500)
    {
      throw new Error("Infinie Loop in While Loop")
    }

  let rB = random(0,8);
  gameMap[boss[rB][1]][boss[rB][0]] = 5;
  enemyList.push({key: rB+"_boss", pos: [boss[rB][0],boss[rB][1]], life: 100*lvl, type: "boss"});

  return {gameMap, enemyList};
};

export function random(min, max, even) {
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
