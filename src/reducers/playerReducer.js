const initialState = {
  x: 20,
  y: 20,
  life: 100,
  strength: 1
}

export default (state = initialState, action)  => {
  switch(action.type)
    {
      case 'MOVE_X': return state   // something
      case 'MOVE_Y': return state   // something
      default:       return state   // something
    }
}
