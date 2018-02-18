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
    for(let i = 0; i < 50; i++) {
      map.push([]);
      for(let j = 0; j < 50; j++)
      {
        if(i === 0 || i === 25 && j !== 31 && j !== 11 || i === 49 || j === 0 || j === 49)
        {
          map[i].push(1)
        }
        else {
          map[i].push(0)
        }
      }
    }

    // Initial player placement


    return {gameMap: map}
}
