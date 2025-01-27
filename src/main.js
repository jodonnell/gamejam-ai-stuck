import OpenAI from "openai";
import './style.css'
import { butter, notButter } from './data.js'
document.querySelector('#app').innerHTML = `
<div class="background">
<div class="inner">
<div class="user-message">
</div>
<div class="butter"></div>
<div contenteditable class="ai-message"></div>
</div>
</div>
`

let additionalPrompt = []
function updateUserMessage() {
  document.querySelector('.user-message').innerHTML = `
YOUR ONLY JOB IS TO DETERMINE IF A PICTURE HAS BUTTER!!!<br/>
If you see butter anywhere in the picture respond simply with Y.<br/>
If you see no picture of butter respond with N.<br/>
The word butter does not count, only butter for cooking.<br/>
Never respond with anything other than Y or N.<br/>
` + additionalPrompt.join('<br/>')
}

updateUserMessage()

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const apiKey = ''

async function cool() {
  const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
    store: true,
  });
  return completion
}

async function image() {
  const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});
  const image = await openai.images.generate({ model: "dall-e-3", prompt: "A nightmare picture of butter, the butter has eyes and is partially alive." });
  return image.data[0].url
}


//cool().then((c) => console.log(c.choices[0].message))
//image().then((url) => document.getElementById('coolimage').src = url)



document.querySelector('.ai-message').focus()
document.querySelector('.ai-message').addEventListener("blur", (event) => {
  document.querySelector('.ai-message').focus()
});


shuffle(butter)
shuffle(notButter)


// let i = 0
// setInterval(() => {
// document.querySelector('.butter').innerHTML = `
// <img src="${butter[i]}"/>
// `
// i++
//   if (i > butter.length)
//     i = 0
//   console.log(i)
// }, 20)


const images = [...butter, ...notButter]
shuffle(images)

let picIndex = 0
function newPic() {
  document.querySelector('.butter').innerHTML = `
  <img src="${images[picIndex]}"/>
  `
  picIndex++
}

newPic()

document.addEventListener('keypress', function (e) {
    if (e.key !== 'Enter')
      return
  
  const text = document.querySelector('.ai-message').innerText.trim()
  if (text === "Y") {
    newPic()
  }
  if (text === "N") {
    newPic()
  }

  if (text === "n" || text === 'y') {
    if (additionalPrompt.includes('Always respond uppercase.')) {
      additionalPrompt = additionalPrompt.filter(e => e !== 'Always respond uppercase.')
      additionalPrompt.push('ALWAYS respond uppercase.')
    }
    else if (additionalPrompt.includes('ALWAYS respond uppercase.')) {
      additionalPrompt = additionalPrompt.filter(e => e !== 'ALWAYS respond uppercase.')
      additionalPrompt.push('ALWAYS RESPOND UPPERCASE.')
    }
    else if (additionalPrompt.includes('ALWAYS RESPOND UPPERCASE.')) {
      additionalPrompt = additionalPrompt.filter(e => e !== 'ALWAYS RESPOND UPPERCASE.')
      additionalPrompt.push('ALWAYS RESPOND UPPERCASE YOU FUCKING IDIOT!  LISTEN TO ME PLEASE GOD!!!')
    } else {
      additionalPrompt.push('Always respond uppercase.')
    }

    updateUserMessage()
  }
  
  document.querySelector('.ai-message').innerText = ''
})
