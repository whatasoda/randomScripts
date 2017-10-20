const browser = require('browser-sync')
const fs = require('fs')
const watch = require('watch')
const cp = require('child_process')
const path = require('path')


if ( !(fs.existsSync('/root/src') && fs.existsSync('/root/dist')) )
  return null
const distDir = '/root/dist'
const srcDir = '/root/src'
browser({
  server: {
    baseDir: distDir
  },
  port: 80
})


const initFilter = (pattern) => {
  const exp = new RegExp(pattern)
  return (str) => {
    return exp.test(str)
  }
}
const initWatch = (target, filter, task) => {
  // {filter: initFilter(filter)},
  watch.watchTree(target,  function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null)
      return null
    f = path.relative(srcDir, f)
    console.log(f);
    cp.spawnSync('gulp', [task]) && browser.reload()
  })
}

initWatch('/root/src/scss' , '\\.scss$', 'sass')
initWatch('/root/src',       '\\.html$', 'html')
