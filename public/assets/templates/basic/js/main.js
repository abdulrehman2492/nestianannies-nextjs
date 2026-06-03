'use strict';
(function ($) {
    // ==========================================
    //      Start Document Ready function
    // ==========================================
    $(document).ready(function () {

        //============================ Scroll To Top Icon Js Start =========
        (function () {
            $(window).on('scroll', function () {
                if ($(window).scrollTop() >= 80) {
                    $('.header').addClass('fixed-header');
                } else {
                    $('.header').removeClass('fixed-header');
                }
            });

        })();

        //============================ Scroll To Top Icon Js Start =========
        var btn = $('.scroll-top');

        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                btn.addClass('show');
            } else {
                btn.removeClass('show');
            }
        });

        btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, '300');
        });
        //========================= Scroll To Top Icon Js End ======================

        /*============= animated tab js start here =============*/
        function animatedTab() {
            if ($.fn.animatedTab22) {
                $(".animated-thing-3").animatedTab22();
            }
            const content = $(".choose-section__content");
            if (content.length) {
                const featureImgHeight = content.outerHeight();
                $(".features-section__inner").css(
                    "--img-height",
                    featureImgHeight + "px"
                );
            }
        }
        $(document).ready(function () {
            animatedTab();
        });
        /*============= animated tab js end here =============*/

        //========== caregiver category js start here =============
        $('.caregiver-category__filter__button').on('click', function () {
            $('.left-sidebar').addClass('show-sidebar');
            $('.body-overlay').addClass('show');
        })

        $('.body-overlay, .close-sidebar').on('click', function () {
            $('.left-sidebar').removeClass('show-sidebar');
            $('.body-overlay').removeClass('show');
        })
        //========== caregiver category js end here =============

        // ========================== Small Device Header Menu On Click Dropdown menu collapse Stop Js Start =====================
        $('.dropdown-item').on('click', function () {
            $(this).closest('.dropdown-menu').addClass('d-block');
        });
        // ========================== Small Device Header Menu On Click Dropdown menu collapse Stop Js End =====================

        // ========================== Add Attribute For Bg Image Js Start =====================
        $('.bg-img').css('background-image', function () {
            return `url(${$(this).data('background-image')})`;
        });
        // ========================== Add Attribute For Bg Image Js End =====================

        // ========================== add active class to ul>li top Active current page Js Start =====================
        function dynamicActiveMenuClass(selector) {
            if (!($(selector).length)) return;

            let fileName = window.location.pathname.split('/').reverse()[0];
            selector.find('li').each(function () {
                let anchor = $(this).find('a');
                if ($(anchor).attr('href') == fileName) {
                    $(this).addClass('active');
                }
            });
            // if any li has active element add class
            selector.children('li').each(function () {
                if ($(this).find('.active').length) {
                    $(this).addClass('active');
                }
            });
            // if no file name return
            if ('' == fileName) {
                selector.find('li').eq(0).addClass('active');
            }
        }
        dynamicActiveMenuClass($('ul.sidebar-menu-list'));

        // ========================== add active class to ul>li top Active current page Js End =====================


        // ========================= Client Slider Js End ===================

        // ================== Password Show Hide Js Start ==========
        $('.toggle-password').on('click', function () {
            $(this).toggleClass('fa-eye');
            var input = $($(this).attr('id'));
            if (input.attr('type') == 'password') {
                input.attr('type', 'text');
            } else {
                input.attr('type', 'password');
            }
        });
        // =============== Password Show Hide Js End =================

        // ================== Sidebar Menu Js Start ===============
        // Sidebar Dropdown Menu Start
        $('.has-dropdown > a').click(function () {
            $('.sidebar-submenu').slideUp(200);
            if ($(this).parent().hasClass('active')) {
                $('.has-dropdown').removeClass('active');
                $(this).parent().removeClass('active');
            } else {
                $('.has-dropdown').removeClass('active');
                $(this).next('.sidebar-submenu').slideDown(200);
                $(this).parent().addClass('active');
            }
        });

        $('.has-dropdown.active').find('.sidebar-submenu').slideDown(200);

        // Sidebar Dropdown Menu End
        // Sidebar Icon & Overlay js
        $('.dashboard-body__bar-icon').on('click', function () {
            $('.sidebar-menu').addClass('show-sidebar');
            $('.sidebar-overlay').addClass('show');
        });
        $('.sidebar-menu__close, .sidebar-overlay').on('click', function () {
            $('.sidebar-menu').removeClass('show-sidebar');
            $('.sidebar-overlay').removeClass('show');
        });
        // Sidebar Icon & Overlay js
        // ===================== Sidebar Menu Js End =================

        // ==================== Dashboard User Profile Dropdown Start ==================
        $('.user-info__button').on('click', function () {
            $('.user-info-dropdown').toggleClass('show');
        });
        $('.user-info__button').attr('tabindex', -1).focus();

        $('.user-info__button').on('focusout', function () {
            $('.user-info-dropdown').removeClass('show');
        });
        // ==================== Dashboard User Profile Dropdown End ==================

        //Plugin Customization Start
        // ========================= Select2 Js Start ==============
        (function () {
            $('.select2').each((index, select) => {
                if (typeof $.fn.select2 !== 'function') return;
                $(select).wrap('<div class="select2-wrapper"></div>').select2({
                    dropdownParent: $(select).closest('.select2-wrapper')
                });
            });

            // ========================= Select2 Js End ==============
            //flatficker start
            if (typeof $.fn.flatpickr === 'function') {
                $(".flat-date").flatpickr({
                    mode: "range",
                    minDate: "today",
                    dateFormat: "Y-m-d",
                });
            } else if (typeof window.flatpickr === 'function') {
                window.flatpickr(".flat-date", {
                    mode: "range",
                    minDate: "today",
                    dateFormat: "Y-m-d",
                });
            }
            //flatficker end

            //data-label of table-dynamic//
            // Array.from(document.querySelectorAll("table")).forEach((table) => {
            //     let heading = table.querySelectorAll("thead tr th");
            //     Array.from(table.querySelectorAll("tbody tr")).forEach((row) => {
            //     Array.from(row.querySelectorAll("td")).forEach((column, i) => { column.colSpan == 100 ||
            //         column.setAttribute("data-label", heading[i].innerText);
            //     });
            //     });
            // });

            Array.from(document.querySelectorAll('table')).forEach(table => {
                let heading = table.querySelectorAll('thead tr th');
                Array.from(table.querySelectorAll('tbody tr')).forEach((row) => {
                    Array.from(row.querySelectorAll('td')).forEach((colum, i) => {
                        colum.setAttribute('data-label', heading[i].innerText)
                    });
                });
            });

            $(".showFilterBtn").on("click", function () {
                $(".responsive-filter-card").slideToggle();
            });

            let disableSubmission = false;
            $(".disableSubmission").on("submit", function (e) {
                if (disableSubmission) {
                    e.preventDefault();
                } else {
                    disableSubmission = true;
                }
            });

            //table responsive dropdown

            $(".table-responsive").on("click", '[data-bs-toggle="dropdown"]', function (e) {
                const { top, left } = $(this)
                    .next(".dropdown-menu")[0]
                    .getBoundingClientRect();
                $(this)
                    .next(".dropdown-menu")
                    .css({
                        position: "fixed",
                        inset: "unset",
                        transform: "unset",
                        top: top + "px",
                        left: left + "px",
                    });
            });

            if ($(".table-responsive").length) {
                $(window).on("scroll", function (e) {
                    $(".table-responsive .dropdown-menu").removeClass("show");
                    $('.table-responsive [data-bs-toggle="dropdown"]').removeClass("show");
                });
            }



            //required
            $.each($("input, select, textarea"), function (i, element) {
                if (element.hasAttribute("required")) {
                    $(element)
                        .closest(".form-group")
                        .find("label")
                        .first()
                        .addClass("required");
                }
            });
        })();

    });

    // ==========================================
    //      End Document Ready function
    // ==========================================

    // ========================= Preloader Js Start =====================
    $(window).on('load', function () {
        $('.preloader').fadeOut();
    });
    // ========================= Preloader Js End=====================

    $(".form-label").addClass("form--label");
    $("#confirmationModal").addClass('custom--modal');
    $("#confirmationModal .btn--dark").addClass("btn--md");
    $("#confirmationModal .btn--primary").addClass("btn--base btn--md").removeClass("btn--primary");
    $("input[name='captcha']").removeClass("form-control");

    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]:not(.disabled)')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
})(jQuery);
