import {random} from './generateMap.js'
import isPlayerNewLevel from './isPlayerNewLevel.js'

const DMG_COEFFICIENT = 2

export default function attackEnemy(state, payload) {
  let e;
  let copyGM = state.gameMap;
  let arr = state.enemyList;
  let mapLvl = state.level
  let playerLvl = state.player.level;
  let playerAttack = state.player.attack;
  let playerLife = state.player.life;
  let playerXP = state.player.xp;
  let playerNxt = state.nextLevel;
  let log = state.log;
  let newlog = "";

  for(let i = 0; i < arr.length ; i++)
  {
    if(arr[i].pos.toString() === payload.pos.toString())
      e = i;
  }

  if(e != undefined)
  {
    let dmgEnemy = playerAttack*5
    dmgEnemy = random(dmgEnemy, dmgEnemy*2);
    let enemyLife = arr[e].life - dmgEnemy;

    let dmgPlayer = mapLvl*3;

    if(arr[e].type === "boss")
        dmgPlayer = dmgPlayer*2;

    dmgPlayer = random(dmgPlayer, dmgPlayer*2)
    playerLife = playerLife - dmgPlayer;

    let Xe = arr[e].pos[0];
    let Ye = arr[e].pos[1];

    arr[e] = {...arr[e], pos: arr[e].pos, life: enemyLife}

    newlog = `The enemy loses ${dmgEnemy} HP - You lose ${dmgPlayer} HP`
    if(arr[e].type === "boss") // If Player Killed the Boss
    {
      newlog = `The boss loses ${dmgEnemy} HP - You lose ${dmgPlayer} HP`
    }

    if(enemyLife <= 0) // If Enemy Dead
    {
      copyGM[Ye][Xe] = 0;
      let XP = random(mapLvl*5,mapLvl*5+mapLvl)
      playerXP += XP;

      newlog = `The enemy dies! - You lose ${dmgPlayer} HP and earn ${playerXP} XP`


      let bossdead = false

      if(arr[e].type === "boss") // If Player Killed the Boss
      {
        console.log("Level 2!");
        playerNxt = true;
        playerXP += 50;
        playerLife += 100;
        mapLvl++;
        bossdead = true;
        newlog = `The boss dies! - Go to Stage ${mapLvl}`
      }

      if(isPlayerNewLevel(playerXP, playerLvl))
      {
        let tempXP = playerXP
        playerXP = 0;
        playerLvl++;
        playerAttack += 1;
        newlog = `The enemy dies! - You lose ${dmgPlayer} HP and earn ${tempXP} XP - You are now Level ${playerLvl}`
        if(bossdead)
          newlog = `The boss dies! - You are now Level ${playerLvl}`
      }
    }

  }

  log.shift(); // Delete first element of the array
  log.push(newlog);

  return {...state, level: mapLvl, nextLevel: playerNxt, gameMap: copyGM, enemyList: arr,
    player: {...state.player, xp: playerXP, level: playerLvl, life: playerLife, attack: playerAttack, log: log}};

  //return {...state, enemyList: arr, player: {...state.player, log: log, life: playerLife}};
}
