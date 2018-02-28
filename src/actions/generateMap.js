export const GENERATE_MAP = 'GENERATE_MAP'

export default (w, h, lvl) => {
  return  {
        type: GENERATE_MAP,
        payload: {w: w, h: h, lvl: lvl}
          }
}

// Main Generate
