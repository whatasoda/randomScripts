// run This code on console
;(() => {
  const contents = document.getElementsByClassName('content')
  const out = []
  for (const content of contents) {
    out.push(content.innerHTML.match(/#[0-9a-fA-F]{6}/g).map((c) => {
      return [parseInt(c.slice(1,3), 16) / 0x100, parseInt(c.slice(3,5), 16) / 0x100, parseInt(c.slice(5,7), 16) / 0x100]
    }))
  }
  console.log(JSON.stringify(out));
  console.log(out.length);
})()
