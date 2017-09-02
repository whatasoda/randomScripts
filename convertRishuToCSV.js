;(() => {

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const Days = ['月', '火', '水', '木', '金', '土']
  const properties = [
    '_lBtnClass1_',
    '_lblKogiDetail1_1_',
    '_lblKogiDetail1_2_',
    '_lblKogiDetail1_3_',
  ]

  const output = {}

  for (let n=0; n<4; n++) {
    const quorter = `${n+1}Q`
    if (!document.getElementById(`dtgd${quorter}`))
      continue
    output[quorter] = [
      ['期', '曜日', '時限', '講義名', '講義ID', '講師名', '分類'].join(',')
    ]
    for (let m=0; m<6; m++) {
      for (let i=0; i<8; i++) {
        const prefix = `dtgd${quorter}__ctl${i+2}`
        const suffix = alphabet[n*6 + m]
        console.log(`${prefix}_pnlSelected1_${suffix}`);
        if (!document.getElementById(`${prefix}_pnlSelected1_${suffix}`))
          continue
        const data = [
          quorter,
          `${Days[m]}曜日`,
          `${i+1}限`,
        ]
        for (const property of properties){
          data.push(document.getElementById(`${prefix}${property}${suffix}`).innerHTML.replace(/<.*?>/g, ''))}
        output[quorter].push(data.join(','))
      }
      output[quorter].push('')
    }
    output[quorter] = output[quorter].join('\n')
  }

  console.log(output['3Q']);
  console.log(output['4Q']);
})()
