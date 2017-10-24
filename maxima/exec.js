const fs = require('fs')
const cp = require('child_process')
const watch = require('watch')
// polyfill
;!Object.entries && require('object.entries').shim();
// options: [<['-X', 'value']...>]

const workdir = '/root/workdir'
const macdir = workdir + '/mac'

if (!fs.existsSync(workdir))
  return;

if (!fs.existsSync(macdir))
  fs.mkdirSync(macdir)

const optionFlat = []
function initOptionFlat () {
  const configBuffer = fs.readFileSync(workdir+'/config.json')
  if (!configBuffer)
    return null
  const config = JSON.parse(configBuffer.toString())
  optionFlat.length = 0
  optionFlat.push(...config)
}

function execFile(file) {
  console.log(`START: ${file}`);
  const result = cp.spawnSync('maxima', [
    '-b', file,
    ...optionFlat
  ])
  result.stdout && console.log(result.stdout.toString());
  result.stderr && console.log(result.stderr.toString());
  console.log(`END: ${file}`);
}

function initFilter (pattern) {
  const exp = new RegExp(pattern)
  return (str) => {
    return exp.test(str)
  }
}

function makePathAbs (name) {
  return Status.pwd + '/' + name
}

const Status = {
  pwd: macdir
}
const Filter = {
  mac: initFilter('\\.(mac|maxima)$'),
  config: initFilter('/config.json$')
}

initOptionFlat()
const queue = fs.readdirSync(Status.pwd).map(makePathAbs)
while (queue.length) {
  const current = queue.shift()
  const stat = fs.lstatSync(current)
  if (stat.isFile()) {
    if (Filter.mac(current))
      execFile(current)
  } else if (stat.isDirectory()) {
    Status.pwd = current
    queue.push(...(fs.readdirSync(current).map(makePathAbs)))
  }
}


fs.watchFile(workdir+'/config.json', function (c, p) {
  if (p === null && c === null)
    return null
  if (c.mtime === p.mtime)
    return null
  initOptionFlat()
  console.log(`Config reloaded: ${optionFlat.join(' ')}`);
})

watch.watchTree(macdir, {
  filter: Filter.mac,
  interval: 3
}, function (f, curr, prev) {
  if (typeof f == "object" && prev === null && curr === null)
    return null
  execFile(f)
})
