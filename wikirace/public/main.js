//990px
//672px

//sexy navigation 
var targetWidth = 992;
document.addEventListener("DOMContentLoaded", function(){

  el_autohide = document.querySelector('.autohide');
  el_link_nav = document.querySelectorAll('.link-nav-white');
  el_autohide.classList.add("fixed-top");

  if(targetWidth >= window.innerWidth){
    el_autohide.classList.remove("fixed-top");
  }
zxc
  if(el_autohide){
    var last_scroll_top = 0;
    window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
          if(scroll_top == 0){
            el_autohide.classList.remove('bg-opactiy-10');
            el_autohide.classList.remove('bg-light');

            el_link_nav.forEach(element => {
              element.classList.remove('link-nav-black');
              element.classList.add('link-nav-white');
            });

          }
          else if(scroll_top < last_scroll_top) {
              el_autohide.classList.remove('scrolled-down');
              el_autohide.classList.add('scrolled-up');
              el_autohide.classList.add('bg-opactiy-10');
              el_autohide.classList.add('bg-light');
              
              el_link_nav.forEach(element => {
                element.classList.remove('link-nav-white');
                element.classList.add('link-nav-black');
              });
          }
          else {
              el_autohide.classList.remove('scrolled-up');
              el_autohide.classList.add('scrolled-down');
          }
          last_scroll_top = scroll_top;
    }); 
    // window.addEventListener
  }
  // if
}); 
// DOMContentLoaded  end


