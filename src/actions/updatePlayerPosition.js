export const UPDATE_PLAYER_POSITION = 'UPDATE_PLAYER_POSITION'

export default (settings, mapReducer) => {
  return  {
        type: UPDATE_PLAYER_POSITION,
        payload: {settings, mapReducer}
          }
}
