import generateMap from '../functions/generateMap.js'
import updatePlayer from '../functions/updatePlayer.js'

  export default (state =
    {
      gameMap: null,
      level: 1,
      player: {x: 30, y: 10},
      enemyList : []
    }, action) => {
  switch(action.type)
  {
    case 'INIT_TEST_MAP'         :     return {...state, gameMap: action.payload.gameMap}
    case 'ATTACK_ENEMY'          :
    {

      return attackEnemy(state, action.payload);
    }
    case 'GENERATE_MAP'          :
    {
      let gen = generateMap(action.payload.w, action.payload.h);
      return {...state,
      gameMap: gen.gameMap,
      enemyList: gen.enemyList
      }
    }
    case 'UPDATE_PLAYER_POSITION' :    return {...state,
      player: updatePlayer(action.payload.settings, state).player
    }
    default:                           return state// something
  }
}

function attackEnemy(state, payload) {
  let e;
  let arr = state.enemyList;
  let lvl = state.level

  for(let i = 0; i < arr.length ; i++)
  {
    if(arr[i].pos.toString() === payload.pos.toString())
      {e = i;}
  }

  if(e != undefined)
  {
    let newLife = arr[e].life - 50;
    let Xe = arr[e].pos[0];
    let Ye = arr[e].pos[1];

    arr[e] = { pos: arr[e].pos, life: newLife }

    let copyGM = state.gameMap;

    if(newLife <= 0)
    {
      copyGM[Ye][Xe] = 0;
      return {...state, gameMap: copyGM, enemyList: arr};
    }
  }
  return {...state, enemyList: arr};
}
