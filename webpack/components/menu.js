console.log("menu file")

const menuLeft = document.getElementById('cbp-spmenu-s1'),
  showLeftPush = document.getElementById('showLeftPush'),
  overlay = document.getElementById('overlay'),
  main = document.querySelector('main'),
  close = document.getElementById('close-btn'),
  body = document.body;

showLeftPush.onclick = function() {
  this.classList.toggle('active');
  body.classList.toggle('cbp-spmenu-push-toright');
  menuLeft.classList.toggle('cbp-spmenu-open' );
  this.style.display = "none";
};

overlay.onclick = function() {
  showLeftPush.classList.remove('active');
  menuLeft.classList.remove('cbp-spmenu-open');
  body.classList.remove('cbp-spmenu-push-toright');
  showLeftPush.style.display = "block";
};

// Fixes index overlay issue
main.onclick = function() {
  showLeftPush.classList.remove('active');
  menuLeft.classList.remove('cbp-spmenu-open');
  body.classList.remove('cbp-spmenu-push-toright');
  showLeftPush.style.display = "block";
};

// Menu close button
close.onclick = function() {
  showLeftPush.classList.remove('active');
  menuLeft.classList.remove('cbp-spmenu-open');
  body.classList.remove('cbp-spmenu-push-toright');
  showLeftPush.style.display = "block";
};

// SVG circles on hover
const pageId = $('main').attr('id');
const navigation = $('.cbp-spmenu a');

for (let index in navigation) {
  let item = navigation[index];
  if (item.id === pageId) {
    let svg = item.querySelector('svg');
    if (item.id !== "index") {
      document.getElementById('about-circle').classList.add("active");
      svg.getElementById("circle").classList.add("active");
    } else {
      svg.getElementById("circle").classList.add("active");
    }
  }
}

// Keep about circle unless on index
$(".about-link").hover(
  function() {
    document.getElementById('about-circle').classList.add("active");
  },
  function() {
    if (pageId === 'index') {
      document.getElementById('about-circle').classList.remove("active")
    }
  }
)
