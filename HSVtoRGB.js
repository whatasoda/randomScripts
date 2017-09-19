
  const HSVtoRGB = (out, hsv) => {
    const [H,S,V] = hsv
    const H6 = H*6
    const i = parseInt((H6 + 1) % 3)    // index of Max
    const o = H6 % 2 ? -1 : 1             // order : RGB[1] or BGR[-1]
    const max = V
    const min = V * (1-S)
    out[i]      = max
    out[i+o]    = (o>0 ? H6%1 : 1 - H6%1) * (max - min) + min
    out[i+2*o]  = min
    return out
  }
