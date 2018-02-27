import {random} from './generateMap.js'
import isPlayerNewLevel from './isPlayerNewLevel.js'

const DMG_COEFFICIENT = 2


export default function attackEnemy(state, payload) {
  let e;
  let arr = state.enemyList;
  let mapLvl = state.level
  let playerLvl = state.player.level;
  let playerAttack = state.player.attack;
  let playerLife = state.player.life;
  let log = state.log;
  let newlog = "";

  for(let i = 0; i < arr.length ; i++)
  {
    if(arr[i].pos.toString() === payload.pos.toString())
      e = i;
  }

  if(e != undefined)
  {
    let dmgEnemy = playerAttack*playerLvl*10
    dmgEnemy = random(dmgEnemy, dmgEnemy*DMG_COEFFICIENT);
    let enemyLife = arr[e].life - dmgEnemy;

    let dmgPlayer = playerLvl*DMG_COEFFICIENT;

    if(arr[e].type === "boss")
        dmgPlayer = dmgPlayer*2;

    dmgPlayer = random(dmgPlayer, dmgPlayer*2)
    playerLife = playerLife - dmgPlayer;

    let Xe = arr[e].pos[0];
    let Ye = arr[e].pos[1];

    arr[e] = {...arr[e], pos: arr[e].pos, life: enemyLife}

    let copyGM = state.gameMap;
    let attack = playerAttack
    newlog += `The enemy loses ${dmgEnemy} HP - You lose ${dmgPlayer} HP`
    log.push(newlog)

    if(enemyLife <= 0) // If Enemy Dead
    {
      copyGM[Ye][Xe] = 0;
      let playerXP = state.player.xp;
      playerXP += mapLvl*3;

      if(isPlayerNewLevel(playerXP, playerLvl))
      {
        playerXP = 0;
        playerLvl++;
        attack += 2*playerLvl;
      }
      let nxt = state.nextLevel;

      if(arr[e].type === "boss") // If Player Killed the Boss
      {
        console.log("Level 2!");
        nxt = true;
        playerXP += 50;
        playerLife += 100;
        mapLvl++;
        newlog += `The boss dies!`
      }
  
      return {...state, level: mapLvl, nextLevel: nxt, gameMap: copyGM, enemyList: arr,
        player: {...state.player, xp: playerXP, level: playerLvl, life: playerLife, attack: attack}};
    }

  }

  return {...state, enemyList: arr, player: {...state.player, log: log, life: playerLife}};
}
