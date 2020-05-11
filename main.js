const odds = [
  (ly) => 0,
  (ly) => 1,
  (ly) => 1 + Math.min(9, ((ly/500) - 1)),
  (ly) => 1 + 2 * Math.min(9, ((ly/500) - 1)),
  (ly) => 4 * Math.min(9, ((ly/500) - 1))
]

const max = [0, 1, 10, 19, 36]

const encounters = {
  white: [{
    img: 'https://www.serebii.net/pokedex-sm/icon/793.png',
    name: 'Nihilego'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/794.png',
    name: 'Buzzwole'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/795.png',
    name: 'Pheromosa'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/796.png',
    name: 'Xurkitree'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/797.png',
    name: 'Celesteela'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/798.png',
    name: 'Kartana'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/799.png',
    name: 'Guzzlord'
  }],
  blue: [{
    img: 'https://www.serebii.net/pokedex-sm/icon/195.png',
    name: 'Quagsire'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/271.png',
    name: 'Lombre'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/419.png',
    name: 'Floatzel'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/618.png',
    name: 'Stunfisk'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/689.png',
    name: 'Barbaracle'
  }],
  green: [{
    img: 'https://www.serebii.net/pokedex-sm/icon/274.png',
    name: 'Nuzleaf'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/326.png',
    name: 'Grumpig'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/452.png',
    name: 'Drapion'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/531.png',
    name: 'Audino'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/695.png',
    name: 'Heliolisk'
  }],
  red: [{
    img: 'https://www.serebii.net/pokedex-sm/icon/277.png',
    name: 'Swellow'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/334.png',
    name: 'Altaria'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/469.png',
    name: 'Yanmega'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/561.png',
    name: 'Sigilyph'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/581.png',
    name: 'Swanna'
  }],
  yellow: [{
    img: 'https://www.serebii.net/pokedex-sm/icon/219.png',
    name: 'Magcargo'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/308.png',
    name: 'Medicham'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/450.png',
    name: 'Hippowdon'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/460.png',
    name: 'Abomasnow'
  }, {
    img: 'https://www.serebii.net/pokedex-sm/icon/558.png',
    name: 'Crustle'
  }]
}

window.onload = () => {
  const lightYears = document.getElementById('lightYears')
  lightYears.oninput = recompute
  const shinyOdds = document.getElementById('odds')
  const list = document.getElementById('encounters')

  const wormholeType1 = document.getElementById('type1')
  wormholeType1.onclick = recompute
  const wormholeType2 = document.getElementById('type2')
  wormholeType2.onclick = recompute
  const wormholeType3 = document.getElementById('type3')
  wormholeType3.onclick = recompute
  const wormholeType4 = document.getElementById('type4')
  wormholeType4.onclick = recompute

  const white = document.getElementById('white')
  white.onclick = recompute
  const blue = document.getElementById('blue')
  blue.onclick = recompute
  const green = document.getElementById('green')
  green.onclick = recompute
  const red = document.getElementById('red')
  red.onclick = recompute
  const yellow = document.getElementById('yellow')
  yellow.onclick = recompute

  function recompute() {
    const ly = lightYears.value || 1
    const wormholeType = (() => {
      if (wormholeType1.checked) return 1
      if (wormholeType2.checked) return 2
      if (wormholeType3.checked) return 3
      if (wormholeType4.checked) return 4
      return 0
    })()
    const p = Math.max(Math.min(odds[wormholeType](ly), max[wormholeType]), 0)
    shinyOdds.innerText = `${p.toFixed(3)}%`

    const color = (() => {
      if (white.checked) return 'white'
      if (blue.checked) return 'blue'
      if (green.checked) return 'green'
      if (red.checked) return 'red'
      if (yellow.checked) return 'yellow'
    })()
    const enc = encounters[color]
    const html = enc.map(enc => `<li><img src="${enc.img}" /> ${enc.name}</li>`).join('')
    list.innerHTML = html
  }
  recompute()
}