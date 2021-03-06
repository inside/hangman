let readline = require('readline')
let rl = readline.createInterface(process.stdin, process.stdout)
let wordChosen = false
let word
let letter
let letters = []
let guess = []
let tries = 6
const placeholder = '-'

rl.setPrompt('Choose a word: ')
rl.prompt()

rl.on('line', (line) => {
  if (wordChosen === false) {
    if (line.match(/^[a-z]+$/) !== null) {
      word = line
      wordChosen = true
      guess = initGuess(guess)
      rl.setPrompt('')
      rl.write(null, {ctrl: true, name: 'l'})
      console.log(`Guess is ${guess.join('')}.`)
      rl.setPrompt('Choose a letter: ')
    } else {
        console.log('Bad word, choose another.')
    }
  } else {
    if (line.match(/^[a-z]{1}$/) !== null) {
      rl.setPrompt('Choose a letter: ')
      letter = line
      letters.push(letter)

      if (word.indexOf(letter) >= 0) {
        guess = populateGuess(guess, letter, word)

        if (guess.indexOf(placeholder) === -1) {
          console.log(`You win!!! Word was ${word}.`)
          rl.close()
        }
      } else {
        tries--
        console.log(`${letter} can't be found.`,
                    `You have ${tries} ${tries > 1 ? 'tries' : 'try'} left.`)
      }

      console.log(`Guessed letters are ${letters.join(', ')}.`)
      console.log(`Guess is ${guess.join('')}.`)
      console.log(drawHangman(tries))

      if (tries <= 0) {
        console.log(`You lost. Word was ${word}.`)
        rl.close()
      }
    } else {
      console.log('Bad letter, choose another.')
    }
  }

  rl.prompt()
}).on('close', () => {
  process.exit(0)
})

function initGuess(guess) {
  for (let i = 0; i < word.length;  i++) {
    guess[i] = placeholder
  }

  return guess
}

function populateGuess(guess, letter, word) {
  for (let i = 0; i < word.length;  i++) {
    if (word[i] === letter) {
      guess[i] = letter
    }
  }

  return guess
}

function drawHangman(tries) {
  let ret = []

  ret.push('     _______')
  ret.push('    |/      |')

  if (tries === 6) {
    ret.push('    |')
    ret.push('    |')
    ret.push('    |')
    ret.push('    |')
  } else if (tries === 5) {
    ret.push('    |      (_)')
    ret.push('    |        ')
    ret.push('    |        ')
    ret.push('    |')
  } else if (tries === 4) {
    ret.push('    |      (_)')
    ret.push('    |       |')
    ret.push('    |       |')
    ret.push('    |')
  } else if (tries === 3) {
    ret.push('    |      (_)')
    ret.push('    |      /|')
    ret.push('    |       |')
    ret.push('    |')
  } else if (tries === 2) {
    ret.push('    |      (_)')
    ret.push('    |      /|\\')
    ret.push('    |       |')
    ret.push('    |')
  } else if (tries === 1) {
    ret.push('    |      (_)')
    ret.push('    |      /|\\')
    ret.push('    |       |')
    ret.push('    |      /')
  } else if (tries === 0) {
    ret.push('    |      (_)')
    ret.push('    |      /|\\')
    ret.push('    |       |')
    ret.push('    |      / \\')
  }

  ret.push('    |')
  ret.push('____|____')
  ret.push('')

  return ret.join('\n')
}
