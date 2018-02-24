export const ATTACK_ENEMY = 'ATTACK_ENEMY'

export default (mapLevel, pos, enemyList) => {
  return  {
        type: ATTACK_ENEMY,
        payload: {level: mapLevel, pos: pos, enemyList: enemyList}
          }
}
