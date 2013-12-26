
(function($) {

$(document).ready(function () {

    var fixedHeader = $('.navbar-fixed-top');
    var normalHeader = $('.navbar-normal-top');
    var offset = fixedHeader.offset();
    var scrollUpButton = $('#scroll-up-button');
    var windowHeight = $(window).height();

    var logo = $('#logo a img');
    var logoWidth = logo.width();
    var logoHeight = logo.height();

    init();
    handlePhoneMenu();
    handleAccordionIcons();
    handleScrollToTopAnimation();
    handleHeaderOnScroll();
    handleScrollToTopButton();
    handleLatestPostsAnimations();
    handleSkillBars();
    handleSearchBoxSlide();

    // Init function
    function init() {

        // Header adjustment init

        if (fixedHeader.length) {
            if (offset.top > 5) {
                $(fixedHeader).addClass('header-small');
            }
            else {
                $(fixedHeader).removeClass('header-small');
            }

            $(fixedHeader).css('display', 'block');

            // scroll-up button init position
            if (offset.top > windowHeight / 2) {
                scrollUpButton.removeClass('gone');
                scrollUpButton.addClass('visible');
            }
            else {
                scrollUpButton.removeClass('visible');
                scrollUpButton.addClass('gone');
            }
        }
        else {
            $(normalHeader).css('display', 'block');
        }

        // Prepare the animations for the inview elements
        /*---------  Inview Plugin + Animate.css  -------*/

        var fadeLeft = jQuery('.fadeLeft');
        var fadeRight = jQuery('.fadeRight');
        var fadeDown = jQuery('.fadeDown');
        var fadeIn = jQuery('.FadeIn');
        var fadeOut = jQuery('.FadeOut');

//        fadeLeft.css({visibility: 'hidden'});
//        fadeRight.css({visibility: 'hidden'});
//        fadeDown.css({visibility: 'hidden'});
//        fadeIn.css({visibility: 'hidden'});
//        fadeOut.css({visibility: 'hidden'});

        var browser = false;
        p = navigator.platform;

        if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
            browser = true;
        }

        // Control Dynamic Content Sliding

        if (browser === false) {

            fadeLeft.css({visibility: 'hidden'});
            fadeRight.css({visibility: 'hidden'});
            fadeDown.css({visibility: 'hidden'});
            fadeIn.css({visibility: 'hidden'});
            fadeOut.css({visibility: 'hidden'});

            jQuery('.Fade').one('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('animated fadeIn');
                    jQuery(this).css({visibility: 'visible'});
                }

            });

            jQuery('.FadeIn').one('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('animated fadeInUp');
                    jQuery(this).css({visibility: 'visible'});
                }

            });

            jQuery('.fadeDown').on('inview', function(event, visible) {
                if (visible) {
                    jQuery(this).addClass('animated fadeInDown');
                    jQuery(this).css({visibility: 'visible'});
                }
            });

            fadeLeft.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).addClass('animated fadeInLeft');
                    jQuery(this).css({visibility: 'visible'});
                }
            });
            fadeLeft.unbind('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).removeClass('animated fadeInLeft');
                }
            });
            fadeRight.on('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).css({visibility: 'visible'});
                    jQuery(this).addClass('animated fadeInRight');
                }
            });
            fadeRight.unbind('inview', function (event, visible) {
                if (visible) {
                    jQuery(this).removeClass('animated fadeInRight');
                }
            });
        }

        // handle sub-menu colors
//        var mainMenu = $('ul.nav-pills');
//        var parentBackgroundColor = '';
//
//        var li = $('li[role="menuitem"]');
//
//        li.hover(function() {
//            parentBackgroundColor = $(this).parent().parent().css('background-color');
//            $(this).css('backgroundColor', parentBackgroundColor);
//        }, function() {
//
//        });
//        var liFirstElement = $('.nav .dropdown > ul > li:first-child');
//        liFirstElement.css({
//            borderTop: '2px solid inherit'
//        });
    }


    // Phone Menu Handler
    function handlePhoneMenu() {
        var phoneMenuWrapper = $('.phone-menu-wrapper');
        var phoneSubmenuWrapper = $('.phone-submenu-wrapper');

        phoneMenuWrapper.css({
            display: 'none'
        });

        phoneSubmenuWrapper.css({
            display: 'none'
        });

        $('.phone-menu-toggle').click(function() {

            phoneMenuWrapper.slideToggle(300);

            return false;
        });

        $('.menu-toggle').click(function() {

            $(this).parents('li').children('.phone-submenu-wrapper').slideToggle(300);

            return false;
        });

        $('.submenu-toggle').click(function() {
            $(this).closest('li').children('.phone-submenu-wrapper').slideToggle(300);

            return false;
        })
    }


    // Handler for the accordion icons when the state is changed
    function handleAccordionIcons() {
        $('.accordion h5.ui-state-active i').removeClass('icon-plus-sign').addClass('icon-minus-sign');

        $('.accordion h5').click(function() {
            jQuery('.accordion').children('h5').each(function(i) {
                if (jQuery(this).hasClass('ui-state-active')) {
                    jQuery(this).children('i').removeClass('icon-plus-sign');
                    jQuery(this).children('i').addClass('icon-minus-sign');
                }
                else {
                    jQuery(this).children('i').removeClass('icon-minus-sign');
                    jQuery(this).children('i').addClass('icon-plus-sign');
                }
            });
        });
    }


    // scroll to top handler
    function handleScrollToTopAnimation() {
        $('#scroll-up-button').click(function(){
            $('html, body').animate({scrollTop:0}, 'slow');
            return false;
        });
    }


    // handles the header pinning when the user scrolls down
    function handleHeaderOnScroll() {
        $(document).scroll(function() {

            var header = $('#header-container');

            var offset = header.offset();

            if (offset.top > 5) {
                $(header).addClass('header-small');
                logo.css({
                    height: '70px',
                    width: (70 / logoHeight * logoWidth) + 'px'
                })
            }
            else {
                $(header).removeClass('header-small');
                logo.css({
                    height: logoHeight,
                    width: logoWidth
                })
            }
        });
    }


    // handles scroll-to-top button visibility
    function handleScrollToTopButton() {
        $(document).scroll(function() {
            if (fixedHeader.length) {
                var offset = fixedHeader.offset();
                if (offset.top > windowHeight / 2) {
                    scrollUpButton.removeClass('gone');
                    scrollUpButton.addClass('visible');
                }
                else {
                    scrollUpButton.removeClass('visible');
                    scrollUpButton.addClass('gone');
                }
            }
        });
    }

    // handles latest post hover animations
    function handleLatestPostsAnimations() {
        var postWidth = 0;
        var pixelsToMove = 0;
        var postHeight = 0;

        var firstPostLeftPosition = 270;
        var lastPostLeftPosition = 570;

        var isHovered = false;

        var firstLatestPost = jQuery('.latest-post');
        var lastLatestPost = jQuery('.latest-post:last-child');

        jQuery('.latest-posts .posts div div:first-child .post .post-media').hover(function() {

                firstLatestPost.css({
                    left: parseInt(firstPostLeftPosition) + 300 + 'px'
                });

                lastLatestPost.css({
                    left: parseInt(lastPostLeftPosition) + 300 + 'px'
                });

        });

        firstLatestPost.hover(function() {
            firstLatestPost.css({
                left: '270px'
            });

            lastLatestPost.css({
                left: parseInt(lastPostLeftPosition) + 300 + 'px'
            });
        });

        lastLatestPost.hover(function() {
            firstLatestPost.css({
                left: '270px'
            });

            lastLatestPost.css({
                left: '570px'
            })
        });
    }

    // handles skill bars animation
    function handleSkillBars() {
        $('.skill-bars-wrapper').on('inview', function(event, visible) {
            if (visible) {
                var skillBarWidth = 0;

                $(this).find('.skill-bar-fill').each(function(i) {
                    skillBarWidth = $(this).attr('data-width');

                    $(this).css('width', skillBarWidth + '%');
                });
            }
        });
    }

    // handles corporate header search button
    function handleSearchBoxSlide() {
        $('.search-icon').on('click', function () {
            var searchBox = $('#search');
            if (searchBox.hasClass('search-box-shown')) {
                searchBox.removeClass('search-box-shown');
                searchBox.addClass('search-box-hidden');
            }
            else {
                searchBox.removeClass('search-box-hidden');
                searchBox.addClass('search-box-shown');
            }
        })
    }

});

})(jQuery);
