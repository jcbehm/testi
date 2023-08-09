
const tyyppi = {
    nimi: 'Jens Clavidus',
    lempiruoka: 'Lasagne'
}
tyyppi.pokemon_kortit = 28
console.log(tyyppi.pokemon_kortit)
console.log(tyyppi.lempiruoka[0])

/*
const t = [1, -1, 3]

console.log(t.length) // tulostuu 3
console.log(t[1])     // tulostuu -1

const t2 = t.concat(5)             // lisätään taulukkoon luku 5

console.log(t2.length) // tulostuu 4

console.log("koko taulukko:")

t2.forEach(value => {
  console.log(value)  // tulostuu 1, -1, 3, 5 omille riveilleen
})  

console.log("destrukturoitu:")

const [first, second, third, ...rest] = t2

console.log(first, second, third)  // tulostuu 1, 2
console.log(rest[0])          // tulostuu [3, 4 ,5]
*/