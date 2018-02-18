export default (state = {gameMap: null,
                          player: {x: 30, y: 10}
                        }, action) => {
  switch(action.type)
  {
    case 'INIT_TEST_MAP'         :     return {...state, gameMap: action.payload.gameMap}
    case 'UPDATE_PLAYER_POSITION':     return {...state, gameMap: action.payload.gameMap, player: {x: action.payload.player.x, y: action.payload.player.y}}
    default:                           return state// something
  }
}
