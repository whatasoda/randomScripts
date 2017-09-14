;(() => {
  const paragraph = document.getElementsByTagName('p')
  let frame = 0
  const range = 75
  const speed = 2
  let c
  const rc = new Float32Array(30)
  const animate = () => {
    c = 0
    for (let n=0; n<rc.length-1; n++)
      rc[n] = rc[n+1]
    rc[rc.length - 1] = Math.random() * 0xf000000
    for (let n=0; n<rc.length; n++){
      c += rc[n] * Math.sin(n / rc.length / 2 * Math.PI)}
    c /= rc.length
    c = ('00000' + Math.floor(c).toString(16)).slice(-6)
    for (const p of paragraph) {
      p.style.background = `#${c}`
    }
    frame = requestAnimationFrame(animate)
  }
  animate()

})()
