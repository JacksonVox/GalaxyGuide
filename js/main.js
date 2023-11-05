//NASA API
function getNasa(isRandom) {
  if (isRandom){ dateInput.value = picRandom()}
  fetch(`https://api.nasa.gov/planetary/apod?api_key=GK1aOBP0XxOjo0y3VoMxWtl8WflIVyL199l2KTSF&date=${dateInput.value}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      document.querySelector('h2').innerText = data.title
      document.querySelector('h3').innerText = data.explanation
      // videos were getting CORS errors, bypass all video responses
        if(data.media_type === 'video'){
          getNasa()
        }
        else {
         document.querySelector('img').src = data.hdurl
        }
      })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


// Random picture function
function picRandom(){
  let start = new Date(1995, 6, 16) // NASA's Picture of the Day API starts at this date
  let end = new Date()
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

  let day = date.getDate()
  let month = date.getMonth() + 1 // JavaScript months are 0-based, so we add 1
  let year = date.getFullYear()

  // Ensure the day and month are two digits
  day = (day < 10) ? '0' + day : day
  month = (month < 10) ? '0' + month : month

  return `${year}-${month}-${day}`
}

//Increment Date Buttons

function changeDay(delta, dateInput) {
  return function() {
      if (Date.parse(dateInput.value)) {
          let date = new Date(dateInput.value);
          date.setDate(date.getDate() + delta);
          dateInput.value = date.toISOString().substring(0, 10);
          console.log(dateInput);
          getNasa();
      } else {
          console.error('Invalid date');
      }
  }
}

// Button declaration and Event Listeners

let dateInput = document.querySelector('input[type="date"]')
let prevDayButton = document.querySelector('#prev-day')
let nextDayButton = document.querySelector('#next-day')
let getButton = document.querySelector('button[name="get"]')
let randomButton = document.querySelector('button[name="random"]')

dateInput.addEventListener('change', getNasa);
prevDayButton.addEventListener('click', changeDay(-1, dateInput))
nextDayButton.addEventListener('click', changeDay(1, dateInput))
randomButton.addEventListener('click', function() { getNasa('isRandom') })


//Set Current Date
window.onload = function() {
  let today = new Date()
  let day = String(today.getDate()).padStart(2, '0')
  let month = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  let year = today.getFullYear()

  let todayFormatted = `${year}-${month}-${day}`

  dateInput.value = todayFormatted;
}

//Initial Page Load
getNasa()