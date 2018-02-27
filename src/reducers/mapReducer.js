import generateMap from '../functions/generateMap.js'
import updatePlayer from '../functions/updatePlayer.js'
import attackEnemy from '../functions/attackEnemy.js'


const initialState = {
  gameMap: null,
  level: 1,
  nextLevel: false,
  player: {
    life: 100,
    attack: 1,
    level: 1,
    xp: 0,
    x: 30,
    y: 10
  },
  enemyList : [],
  log: ["Boss!", "The", "Beat"]
};

export default (state = initialState,action) => {
  switch(action.type)
  {
    case 'BONUS':
    { let newHealth = state.player.life + 10*state.level
      return {...state, player: {...state.player, life: newHealth}}
    }
    case 'ATTACK_ENEMY'          : return attackEnemy(state, action.payload);
    case 'ENEMY_DEAD_ZERO'       : return {...state, enemyDead: false}
    case 'GENERATE_MAP'          :
    {
      let gen = generateMap(action.payload.w, action.payload.h);
      return {...state,
      nextLevel: false,
      gameMap: gen.gameMap,
      enemyList: gen.enemyList,
      }
    }
    case 'UPDATE_PLAYER_POSITION' : {
      let newPlayerPos = updatePlayer(action.payload.settings, state).player;
      let newX = newPlayerPos.x;
      let newY = newPlayerPos.y;
      return {...state,
      player: {...state.player, x: newX, y: newY}}
    }
    default:     return state// something
  }
}
