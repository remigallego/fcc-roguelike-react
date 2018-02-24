
const initialState = {
  life: 100,
  attack: 1,
  level: 1
}

export default (state = initialState, action)  => {
  switch(action.type)
    {
      case 'BONUS':  {
        let newAtt = state.attack + 1
        return {...state, attack: newAtt}
      }
      case 'ATTACK_ENEMY': {
        let mapLevel = action.payload.level;
        return {
          ...state,
          life: attackEnemy(state, mapLevel)
        }
      }
      default:       return state   // something
    }
}

function attackEnemy(state, mapLevel) {
    let life = state.life;
    life = life - mapLevel*5;

    return life;
}
