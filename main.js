const loader = document.getElementById('loader')
const body = document.getElementById('body')
const hamburger = document.querySelector(".hamburger");
const menu = document.getElementById('menu')
const typed = document.getElementById('typed')
const typedCursor = document.getElementById('typed-cursor')
const header = document.getElementById('header')
const socialMedia = document.getElementById('social-media')
const navSocialFooter = document.getElementById('social-footer')
const form = document.querySelector(".contact-form"),
    loaderForm = document.querySelector(".contact-form-loader"),
    response = document.querySelector(".contact-dorm-response");   
const buttons = document.querySelectorAll("[data-carousel-button]")

/* loader */
body.classList.add('overflow-hidden')
setTimeout(() => {
  loader.classList.add('close')
  body.classList.remove('overflow-hidden')
  body.classList.add('overflow-auto')
}, 6000);


/* header responsive */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle("is-active");
  menu.classList.toggle('is-active')
})

document.addEventListener("click", e => {
  if(!e.target.matches('.menu a')) return false
  console.log(e.target)
  hamburger.classList.remove("is-active");
  menu.classList.remove('is-active')
})



/* typed home */
typedCursor.classList.remove('typed-cursor')
const phrases = ['Welcome to my website!', 'I am FullStack Developer.']
let i = 0;
let j = 0;
let = currentPhrase = []
let isDeleting = false 
let isEnd = false

function loop () {
  isEnd = false
  typed.innerHTML = currentPhrase.join('')
  if(i < phrases.length) {
    if(!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j])
      j++
      typed.innerHTML = currentPhrase.join('')
    }
    if(isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j])
      j--
      typed.innerHTML = currentPhrase.join('')
    }
    if(j === phrases[i].length) {
      isEnd = true
      isDeleting = true
      typedCursor.classList.add('typed-cursor')
    }

    if(isDeleting && j === 0) {
      currentPhrase = []
      isDeleting = false
      i++
      if(i === phrases.length) {
        i = 0
      }
    }
  }
  const spedUp = Math.random() * (100 - 80) + 80
  const normalSpeed = Math.random() * (500 -300) + 300
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()

// HEADER
window.addEventListener('scroll', () => {
  header.classList.toggle('third-color', scrollY > 0)
  menu.classList.toggle('third-color', scrollY > 0)
})


/* no funciona movimiento de letras del titulo*/

// let letters = document.querySelectorAll('.letter')

// const rubLetters = (letters) => {
//   letters.forEach(letter => {
//     letter.addEventListener('mouseenter', () => {
//       // letter.classList.toggle('letter-color')
//       letter.classList.toggle('rubberBand')
//       setTimeout(function() {
//         // letter.classList.toggle('letter-color')
//         letter.classList.toggle('rubberBand')
//       }, 1000);
//     })
//   })
// }



// social media

const displaySocial = (socialMedia, navSocialFooter) => {
  console.log(innerWidth)
  if(innerWidth > 1024 ) {
    socialMedia.classList.toggle('none')
  } else {
    navSocialFooter.classList.toggle('none')
  }


  addEventListener('resize', () => {
    socialMedia.classList.toggle('none', innerWidth < 1024 )
    navSocialFooter.classList.toggle('none', innerWidth > 1024)
  });
}


displaySocial(socialMedia, navSocialFooter)



/* form */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    loaderForm.classList.remove("none");
    fetch("https://formsubmit.co/ajax/lucianooieni21@gmail.com", {
        method: "POST",
        body: new FormData(e.target)
    }).then(res => (res.ok ? res.json(): Promise.reject(res)))
    .then(json => {
        console.log(json);
        location.hash = "#gracias";
        form.reset();
    })
    .catch(err => {
      console.log(err);
      let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente"
      response.querySelector("h3").innerHTML = `Error ${err.statusText}: ${message}`;
    }).finally(() => {
      loaderForm.classList.add("none");
      setTimeout(() => {
        location.hash = "#close"
      }, 3000);
    })
})


/* carousel */

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    console.log('activeSlide: ', activeSlide)
    console.log('slides.children.length:', slides.children.length)
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    console.log(newIndex)
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})


// Initialize Swiper

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});