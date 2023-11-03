const header = document.querySelector('header');

window.addEventListener("scroll",function(){
  header.classList.toggle("sticky",window.scrollY > 60);
});

let menu = document.querySelecter('#menu-icon');
let navlist = document.querySelecter('.navlist'); 

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navlist.classList.remove('active');
};