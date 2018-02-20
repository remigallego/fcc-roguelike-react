export const INIT_TEST_MAP = 'INIT_TEST_MAP'

export default () => {
  return  {
        type: INIT_TEST_MAP,
        payload: populateMap()
          }
}

function populateMap() {
    console.log("Initiating test map");
    let map = [];
    for(let i = 0; i < 60; i++) {
      map.push([]);
      for(let j = 0; j < 60; j++)
      {
        if(i === 0 || i === 30 && j !== 35 && j !== 11 || i === 59 || j === 0 || j === 59)
        {
          map[i].push(1)
        }
        else {
          map[i].push(0)
        }
      }
    }
    return {gameMap: map}
}
