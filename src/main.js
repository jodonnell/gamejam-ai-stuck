import OpenAI from "openai";
import './style.css'
import { butter } from './data.js'
document.querySelector('#app').innerHTML = `
<div class="background">
<div class="inner">
<div class="user-message">
YOUR ONLY JOB IS TO DETERMINE IF A PICTURE HAS BUTTER!!!<br/>
If you see butter anywhere in the picture respond simply with Y.<br/>
If you see no picture of butter respond with N.<br/>
The word butter does not count, only butter for cooking.<br/>
Never respond with anything other than Y or N.<br/>
</div>
<div class="butter"></div>
<div contenteditable class="ai-message"></div>
</div>
</div>
`
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


document.querySelector('.butter').innerHTML = `
<img src="${butter[0]}"/>
`

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
