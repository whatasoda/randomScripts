;Object.entries || require('object.entries').shim();

const _SplitStr = (str) => { return str.split('') }
const _SortChar = (a,b) => {
  return  a[0] === 'EOC' ? -1 :
          b[0] === 'EOC' ?  1 : b[2] - a[2]
}

class ORMatchOptimiser {
  constructor(src) {
    if (typeof src === 'string')
      this.src = src.split('|')
    else if (Array.isArray(src))
      this.src = src
    else
      return null

    this.items = this.src.map(_SplitStr)
    this.tree = {}
    for (const item of this.items)
      this.assign(item)
    this.rearrangeTree()
    console.log(this.tree);
    this.result = this.stringifyCharTree(this.tree)
  }

  assign (item) {
    let current = this.tree
    while (item.length) {
      const char = item.shift()
      if (current[char])
        current = current[char]
      else
        current = (current[char] = {})
    }
    current['EOC'] = {}
  }

  rearrangeTree () {
    const state = {
      cc: [] // currentCharacter
    }
    const charList = []
    this.tree = ['', this.tree]
    const stack = [this.tree]
    state.cc = stack[0]
    while (stack.length) {
      charList.push(state.cc)
      state.cc[1] = Object.entries(state.cc[1])
      state.cc[2] = state.cc[1].length
      while (state.cc[1].length) {
        const char = state.cc[1].pop()
        char[3] = state.cc
        stack.push(char)
      }
      state.cc = stack.pop() // Last one is first one. When cc is first one, loop is ending.
    }
    for (const char of charList) {
      if (char[3]) {
        char[3][1].push(char)
        char[3][1].sort(_SortChar)
      }
    }
    return this.tree
  }

  stringifyCharTree(char) {
    if (char[2] === 0)
      return char[0] === 'EOC' ? '' : char[0]
    else if (char[2] === 1)
      return char[0] + this.stringifyCharTree(char[1][0])
    else {
      const resultArray = []
      for (const child of char[1]) {
        resultArray.push(this.stringifyCharTree(child))
      }
      return `${char[0]}(${resultArray.join('|')})`
    }
  }

}
