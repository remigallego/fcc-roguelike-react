export const GENERATE_MAP = 'GENERATE_MAP'

export default (w, h) => {
  return  {
        type: GENERATE_MAP,
        payload: {w: w, h: h}
          }
}

// Main Generate
