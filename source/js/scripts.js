$(document).ready(function () {
    // Smooth Scrolling Function
    $('a[href*=#]:not([href=#])').click(function () {
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

    // Modal Click Behavior
    // $('.js-open-modal').click(function () {
    //     $('.js-target-modal').addClass('js-active');
    //     $('#overlay').addClass('js-active');
    //     $('body').addClass('js-body-modal-active');
    // });
    //
    // $('.js-close-modal').click(function () {
    //     $('.js-target-modal').removeClass('js-active');
    //     $('#overlay').removeClass('js-active');
    //     $('body').removeClass('js-body-modal-active');
    // });

    var currentScroll = 0;

    function lockscroll(){
      $(window).scrollTop(currentScroll);
    }
    // Modal Click Behavior
    $('.js-open-modal').click(function () {
        $(this).parent().find('.js-target-modal').addClass('js-active');
        currentScroll=$(window).scrollTop();
        $(window).bind('scroll',lockscroll);
        $('#overlay').addClass('js-active');
        $('body').addClass('js-body-modal-active');
    });

    // Prevent default on footer close
    $('footer .js-close-modal').on('click', function(e) {
      e.preventDefault();
    });

    $('body').on("click", '.js-close-modal', function () {
        currentScroll=$(window).scrollTop();
        $(window).unbind('scroll');
        $('.js-target-modal').removeClass('js-active');
        $('#overlay').removeClass('js-active');
        $('body').removeClass('js-body-modal-active');
    });

    // General Click Behavior for Overlay
    $('#overlay').click(function () {
        $('.js-active').removeClass('js-active');
        currentScroll=$(window).scrollTop();
        $(window).unbind('scroll');
        $('.js-active-menu').removeClass('js-active-menu');
        $('body').removeClass('js-body-modal-active');

    });


    // Sticky Click Behavior
    $('.js-close-sticky').click(function () {
        $('.js-target-sticky').removeClass('js-active');
    });

    // Search Click Behavior
    $('.js-trigger-search').click(function (e) {
        e.preventDefault();
        $(this).parent().addClass('js-active');
        $('#overlay').addClass('js-active');
    });

    // Main Menu Click Behavior
    $('.js-trigger-menu').click(function (e) {
        $(this).next().addClass('js-active-menu');
        $('#overlay').addClass('js-active');
    });

    // General Click Behavior for Overlay
    $('#overlay').click(function () {
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

    // TABLE SORTABLE
    // Table Search with List.js Implementation
    $('.js-open-table-search').click(function (e) {
        e.preventDefault();
        $(this).parent().siblings('.table-sortable__search').toggleClass('table-sortable__search--active');
    });
    // Table Search Controls: X out form
    var searchButtons = $('.table-sortable__search').find("button[type='submit']");
    searchButtons.on("click", function(e) {
        e.preventDefault();
        if ($(this).parent().hasClass("table-sortable__search--active")) {
            $(this).parent().removeClass("table-sortable__search--active");
        }
        searchReset();
    });

    // Table Search Controls: Sort buttons
    var sortClickButtons = $(".table-sortable__control > i:contains('keyboard_arrow_down')");
    sortClickButtons.on("click", function() {
        $(this).text() == "keyboard_arrow_down" ? $(this).text("keyboard_arrow_up") : $(this).text("keyboard_arrow_down");
    });
    // Table Search Controls: ESC to exit form and clear search
    $("body").keyup(function(event) {
        if ( event.keyCode == "27" ) {
            $(this).parent().find('.table-sortable__search').removeClass("table-sortable__search--active");
            searchReset();
        }
    });
    // List.js Implementation with Fuzzy Search
    var fuzzyOptions = {
      searchClass: "fuzzy-search",
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true
    };
    var options = {
        valueNames: [ {name:'item__name', attr:'data-target'}, 'item__category', 'item__date', 'item__location' ]
    };
    var itemList = new List('items', options);

    // Target input text field when search bar is active
    $(".js-open-table-search").on("click", function(e) {
        $(this).addClass("table-sortable__search--active");
       $($(this).attr('data-target')).focus();

    });
    // Fuzzy search by specific columns
    $(".fuzzy-search").keyup(function() {
        var searchString = $(this).val();
            itemList.fuzzySearch(searchString, ["item__name"]);
    });
    // List.js search reset functions
    function searchReset() {
        $(".fuzzy-search").val("");
        clearTextSearch();
        itemList.search();
    }
    function clearTextSearch() {
        $('.table-sortable__search--active').each(function(){
            $(this).removeClass('table-sortable__search--active');
        });
    }
    // END TABLE SORTABLE

    // Logic for Accordion Component

    var closed = true;

    $('.js-open-accordion').click(function() {

        if (closed) {
            $(this).siblings().removeClass('js-active');
            $(this).addClass('js-active');
            closed = false;
        }

        else {
            $(this).removeClass('js-active');
            $(this).siblings().removeClass('js-active');
            closed = true;
        }

        console.log(closed)

    });

    // Color Palette Logic

    $(".palette__item h1").each(function() {
      var color = $(this).text();
      $(this).parent().css("background-color", color);
      console.log(color);
    });

    $(".palette__item--rgb h3").each(function() {
      var color = $(this).text();
      $(this).parent().css("background-color", color);
      console.log(color);
    });

}); // doc.ready
