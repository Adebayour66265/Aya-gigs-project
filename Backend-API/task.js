// Complete the method/function so that it converts dash/underscore delimited words into camel casing.
//     The first word within the output should be capitalized only if the original word was capitalized
//     (known as Upper Camel Case, also often referred to as Pascal case).
//     EXAMPLES:
//     A) "the-stealth-warrior" gets converted to "theStealthWarrior"
//     B) "The_Stealth_Warrior" gets converted to "TheStealthWarrior"

const convert = (word) => {
  let newWord = []

  let wordArr = word.split('-')
  console.log(wordArr, '')
  for (let i = 0; i < wordArr.length; i++) {

   
    wordArr[i][0] = wordArr[i][0].toUpperCase() 
    newWord.push(wordArr)
    // console.log(newWord)
    

    
  }
  return wordArr.join('')
}

console.log(convert('the-stealth-warrior'))
