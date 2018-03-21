$(document).ready(function() {
  // Smooth Scrolling Function
  $('a[href*=#]:not([href=#])').click(function() {
    var $targ = $(this.hash),
      host1 = this.hostname,
      host2 = location.hostname,
      path1 = this.pathname.replace(/^\//, ''),
      path2 = location.pathname.replace(/^\//, '');

    if (!$targ.length) {
      $targ = $('[name=' + this.hash.slice(1) + ']');
    }

    if ($targ.length && (host1 === host2 || path1 === path2)) {
      $('html, body').animate({ scrollTop: $targ.offset().top }, 1000);

      return false;
    }

    return true;
  });

  var currentScroll = 0;

  function lockscroll() {
    $(window).scrollTop(currentScroll);
  }
  // Modal Click Behavior
  $('.js-open-modal').click(function() {
    $(this)
      .parent()
      .find('.js-target-modal')
      .addClass('js-active');
    currentScroll = $(window).scrollTop();
    $(window).bind('scroll', lockscroll);
    $('#overlay').addClass('js-active');
    $('body').addClass('js-body-modal-active');
  });

  // Prevent default on footer close
  $('footer .js-close-modal').on('click', function(e) {
    e.preventDefault();
  });

  $('body').on('click', '.js-close-modal', function() {
    currentScroll = $(window).scrollTop();
    $(window).unbind('scroll');
    $('.js-target-modal').removeClass('js-active');
    $('#overlay').removeClass('js-active');
    $('body').removeClass('js-body-modal-active');
  });

  // General Click Behavior for Overlay
  $('#overlay').click(function() {
    $('.js-active').removeClass('js-active');
    currentScroll = $(window).scrollTop();
    $(window).unbind('scroll');
    $('.js-active-menu').removeClass('js-active-menu');
    $('body').removeClass('js-body-modal-active');
  });

  // Sticky Click Behavior
  $('.js-close-sticky').click(function() {
    $('.js-target-sticky').removeClass('js-active');
  });

  // Search Click Behavior
  $('.js-trigger-search').click(function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .addClass('js-active');
    $('#overlay').addClass('js-active');
  });

  // Main Menu Click Behavior
  $('.js-trigger-menu').click(function(e) {
    $(this)
      .next()
      .addClass('js-active-menu');
    $('#overlay').addClass('js-active');
  });

  // General Click Behavior for Overlay
  $('#overlay').click(function() {
    $('.js-active').removeClass('js-active');
    $('.js-active-menu').removeClass('js-active-menu');
  });

  // Slider
  $('.slider').slick({
    arrows: true,
    draggable: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          draggable: true
        }
      }
    ]
  });
}); // doc.ready
