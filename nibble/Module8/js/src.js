// ===========mailValidator==========

function emailValidation(value) {

  let txt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return txt.test(value);
}

function checkEmail() {

  let email = document.querySelector('.mailsend').value;
  if (emailValidation(email)) {
    window.alert("Сообщение отправлено");
  } else {
    window.alert("Email введен не корректно");
  }
}

document.querySelector('.sub').addEventListener('click', checkEmail);

// =============chatMenuVision=============

let vision = document.querySelector('.chat-menu__vision');
let visionMenu = document.querySelectorAll('.chat-menu__list');

vision.addEventListener('click', () => {

  for (let i = 0; i < visionMenu.length; i++) {
    if (screen.width >= '860') {
      if (visionMenu[i].style.display == 'flex') {
        visionMenu[i].style.display = 'none';
        vision.classList.add('point');
      } else {
        visionMenu[i].style.display = 'flex';
        vision.classList.remove('point');
      }
    } else {
      if (visionMenu[i].style.opacity == '0') {
        visionMenu[i].style.opacity = '1';
      } else {
        visionMenu[i].style.opacity = '0';
      }
    }

  }
})

