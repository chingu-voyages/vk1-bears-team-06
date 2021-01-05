document.addEventListener('DOMContentLoaded', () => {
	var menu = document.getElementById('mega-menu');
  var burger = document.getElementById('hamburger-icon');
	burger.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    console.log("working");
	});
});


window.onscroll = function() {myFunction()};

function myFunction() {

  var check = false;

  if(document.location.pathname !== "/listpage.html") {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
      document.getElementById("main-nav-bar").className = "on-scroll-nav-bg";
      document.getElementById("svg-menu").style.fill = "#000";
      document.getElementById("svg-logo").style.fill = "#000";
      document.getElementById("user-icon").style.fill = "#000";
    } else {
      document.getElementById("main-nav-bar").className = "";
      document.getElementById("svg-menu").style.fill = "#fff";
      document.getElementById("svg-logo").style.fill = "#fff";
      document.getElementById("user-icon").style.fill = "#fff";
    }
  } else {
      console.log("eyy");
      document.getElementById("main-nav-bar").className = "on-scroll-nav-bg";
      document.getElementById("svg-menu").style.fill = "#000";
      document.getElementById("svg-logo").style.fill = "#000";
      document.getElementById("user-icon").style.fill = "#000";
  }
}

console.log("working");