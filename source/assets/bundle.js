'use strict';

/******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
            /******/return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
                /******/configurable: false,
                /******/enumerable: true,
                /******/get: getter
                /******/ });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
            return module['default'];
        } :
        /******/function getModuleExports() {
            return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 0);
    /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_menu__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_menu__);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_scripts__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_scripts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_scripts__);

    /***/
},
/* 1 */
/***/function (module, exports) {

    // console.log("testing from menu.js")


    /***/},
/* 2 */
/***/function (module, exports) {

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

        var currentScroll = 0;

        function lockscroll() {
            $(window).scrollTop(currentScroll);
        }
        // Modal Click Behavior
        $('.js-open-modal').click(function () {
            $(this).parent().find('.js-target-modal').addClass('js-active');
            currentScroll = $(window).scrollTop();
            $(window).bind('scroll', lockscroll);
            $('#overlay').addClass('js-active');
            $('body').addClass('js-body-modal-active');
        });

        // Prevent default on footer close
        $('footer .js-close-modal').on('click', function (e) {
            e.preventDefault();
        });

        $('body').on("click", '.js-close-modal', function () {
            currentScroll = $(window).scrollTop();
            $(window).unbind('scroll');
            $('.js-target-modal').removeClass('js-active');
            $('#overlay').removeClass('js-active');
            $('body').removeClass('js-body-modal-active');
        });

        // General Click Behavior for Overlay
        $('#overlay').click(function () {
            $('.js-active').removeClass('js-active');
            currentScroll = $(window).scrollTop();
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
            responsive: [{
                breakpoint: 800,
                settings: {
                    draggable: true
                }
            }]
        });

        // Logic for Accordion Component
        var closed = true;

        $('.js-open-accordion').click(function () {

            if (closed) {
                $(this).siblings().removeClass('js-active');
                $(this).addClass('js-active');
                closed = false;
            } else {
                $(this).removeClass('js-active');
                $(this).siblings().removeClass('js-active');
                closed = true;
            }

            console.log(closed);
        });

        // Color Palette Logic

        $(".palette__item h1").each(function () {
            var color = $(this).text();
            $(this).parent().css("background-color", color);
            console.log(color);
        });

        $(".palette__item--rgb h3").each(function () {
            var color = $(this).text();
            $(this).parent().css("background-color", color);
            console.log(color);
        });
    }); // doc.ready


    /***/
}]
/******/);