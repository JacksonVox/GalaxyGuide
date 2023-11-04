//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
function getNasa(isRandom) {
  let dateInput = document.querySelector('input').value
  if (isRandom){ dateInput = picRandom()}
  console.log(dateInput)
  fetch(`https://api.nasa.gov/planetary/apod?api_key=GK1aOBP0XxOjo0y3VoMxWtl8WflIVyL199l2KTSF&date=${dateInput}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('h2').innerText = data.title
      document.querySelector('h3').innerText = data.explanation
        if(data.media_type === 'video'){
          getNasa()
        }
        else {
         document.querySelector('img').src = data.hdurl
        }
      })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

document.querySelector('button').addEventListener('click', getNasa)

document.querySelector('button[name="random"]').addEventListener('click', function() { getNasa('isRandom') });

getNasa();


// Random picture function
function picRandom(){
  let start = new Date(1995, 6, 16); // NASA's Picture of the Day API starts at this date
  let end = new Date();
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  let day = date.getDate();
  let month = date.getMonth() + 1; // JavaScript months are 0-based, so we add 1
  let year = date.getFullYear();

  // Ensure the day and month are two digits
  day = (day < 10) ? '0' + day : day;
  month = (month < 10) ? '0' + month : month;

  return `${year}-${month}-${day}`;
}