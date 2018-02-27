export const ATTACK_ENEMY = 'ATTACK_ENEMY'

export default (pos) => {
  return  {
        type: ATTACK_ENEMY,
        payload: {pos: pos}
          }
}
