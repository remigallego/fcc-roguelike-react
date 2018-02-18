export const UPDATE_PLAYER_POSITION = 'UPDATE_PLAYER_POSITION'

export default (dir, mapReducer) => {
  return  {
        type: UPDATE_PLAYER_POSITION,
        payload: updatePlayer(dir, mapReducer)
          }
}

function updatePlayer(dir, mapReducer) {
    let gameMap = mapReducer.gameMap;
    let X = mapReducer.player.x;
    let Y = mapReducer.player.y;

    if(dir === 'INIT') {
      gameMap[Y][X] = 2;
      return {gameMap: gameMap, player: {x: X, y: Y}}
    }



    if(dir === 'UP' && Y > 0)
    {
      if(gameMap[Y-1][X] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y-1][X] = 2;
        return {gameMap: gameMap, player: {x: X, y: Y-1}}
      }
      else {
        return {gameMap: gameMap, player: {x: X, y: Y}}
      }
    }

    if(dir === 'DOWN' && Y < 50)
    {
      if(gameMap[Y+1][X] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y+1][X] = 2;
        return {gameMap: gameMap, player: {x: X, y: Y+1}}
      }
      else {
        return {gameMap: gameMap, player: {x: X, y: Y}}
      }
    }

    if(dir === 'LEFT' && X > 0)
    {
      if(gameMap[Y][X-1] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y][X-1] = 2;
        return {gameMap: gameMap, player: {x: X-1, y: Y}}
      }
      else {
        return {gameMap: gameMap, player: {x: X, y: Y}}
      }
    }

    if(dir === 'RIGHT' && X < 50)
    {
      if(gameMap[Y][X+1] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y][X+1] = 2;
        return {gameMap: gameMap, player: {x: X+1, y: Y}}
      }
      else {
        return {gameMap: gameMap, player: {x: X, y: Y}}
      }
    }



}
