export const UPDATE_PLAYER_POSITION = 'UPDATE_PLAYER_POSITION'

export default (settings, mapReducer) => {
  return  {
        type: UPDATE_PLAYER_POSITION,
        payload: updatePlayer(settings, mapReducer)
          }
}

/* */
function updatePlayer(settings, mapReducer) {
    let command = settings.command;
    let gameMap = mapReducer.gameMap;
    let X = mapReducer.player.x;
    let Y = mapReducer.player.y;

    if(command === 'update_player_init') {
      X = settings.x;
      Y = settings.y;
      gameMap[Y][X] = 2;
      return {gameMap: gameMap, player: {x: X, y: Y}}
    }

    if(command === 'update_player_up' && Y > 0)
    {
      if(gameMap[Y-1][X] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y-1][X] = 2;
        return {gameMap: gameMap, player: {x: X, y: Y-1}}
      }
      else
        return {gameMap: gameMap, player: {x: X, y: Y}}
    }

    if(command === 'update_player_down' && Y < 50)
    {
      if(gameMap[Y+1][X] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y+1][X] = 2;
        return {gameMap: gameMap, player: {x: X, y: Y+1}}
      }
      else
        return {gameMap: gameMap, player: {x: X, y: Y}}
    }

    if(command === 'update_player_left' && X > 0)
    {
      if(gameMap[Y][X-1] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y][X-1] = 2;
        return {gameMap: gameMap, player: {x: X-1, y: Y}}
      }
      else
        return {gameMap: gameMap, player: {x: X, y: Y}}
    }

    if(command === 'update_player_right' && X < 50)
    {
      if(gameMap[Y][X+1] === 0)
      {
        gameMap[Y][X] = 0;
        gameMap[Y][X+1] = 2;
        return {gameMap: gameMap, player: {x: X+1, y: Y}}
      }
      else
        return {gameMap: gameMap, player: {x: X, y: Y}}
    }
}
