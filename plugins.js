(function($) {
$(document).ready(function () {

    // jQuery UI accordion init
    $('.accordion').accordion({
        heightStyle: 'content',
        collapsible: true
    });


    // jQuery UI tabs init
    $('.tabs').tabs();


    // Quote Rotator init
    if (jQuery().quoteRotator) {
        if (jQuery('#testimonial-content').length > 0) {
            jQuery('#testimonial-content').quoteRotator({
                container: '#hidden-quotes',
                // the optional ease in array, set it to null if you want to use all the available animation
                easeInTypeArr: ['fadeIn', 'fadeInDown', 'fadeInUp', 'fadeInLeft', 'fadeInRight'],
                // the optional ease out array, set it to null if you want to use all the available animation
                easeOutTypeArr: ['fadeOutLeft', 'fadeOutRight', 'fadeOutUp', 'fadeOutDown'],
                // navigate to next quote or not when user click the quote
                clickToNext: false
				
            });
        }
    }

    // Revolution slider init
    if (jQuery().revolution) {
        var tpj=jQuery;
        tpj.noConflict();

        if (tpj.fn.cssOriginal!=undefined)
            tpj.fn.css = tpj.fn.cssOriginal;

        tpj('.rev-slider-wrapper').css({visibility : 'visible'});

        tpj('.rev-slider').revolution({
            delay:9000,
            startHeight: 700,
            startWidth: 1170,

            onHoverStop: "on",

            navigationType: '',

            soloArrowLeftHalign:"left",
            soloArrowLeftValign:"center",
            soloArrowLeftHOffset:20,
            soloArrowLeftVOffset:50,

            soloArrowRightHalign:"right",
            soloArrowRightValign:"center",
            soloArrowRightHOffset:20,
            soloArrowRightVOffset:50,

            touchenabled:"on",

            stopAtSlide:-1,
            stopAfterLoops:-1,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            hideSliderAtLimit:0,

            fullWidth:"on",
            fullScreen:"off",

            shadow:0
        });
    }

    //////////////////////
    // Magnific Popup init
    //////////////////////
    if (jQuery().magnificPopup) {
        jQuery('.thumbnail-hover a').magnificPopup({type:'image'});
        jQuery('.stylish-image-gallery').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    /////////////////
    // Isotope Plugin
    /////////////////
    var container = jQuery('.isotope');
    var button = jQuery('.load-more-button');

    if (jQuery().imagesLoaded && jQuery().isotope) {

        // init the plugin
        container.imagesLoaded(function() {

            jQuery('.pre-loader').css({
                display: 'none'
            });

            container.fadeIn(1000).isotope({
//                masonry: {
//                    columnWidth: 190
//                },
                itemSelector : '.isotope-item'
            });

        });

        // reLayout the isotope plugin if the windows is resized
        $(window).smartresize(function(){
            container.isotope( 'reLayout');
        });

        // handle the addition of new data to the isotope container
        jQuery(button).on('click', function() {
            jQuery('.load-more-pre-loader').css({
                display: 'block'
            });
//            var elements = createMasonryElement();

//            container.imagesLoaded(function(){
//                container.append(elements).isotope('insert', elements);
//            });

            get_posts(container);
        });

        // handle the isotope filter
        jQuery('.isotope-filter ul li').click(function(){
            var selector = jQuery(this).attr('data-filter');
            container.isotope({ filter: selector });
            return false;
        });
    }

    //////////////////////////////////////////////////
    // CarouFredSel Plugin - carousel with description
    //////////////////////////////////////////////////
    var carouselWithDescription,
        carouselWithDescriptionItemHeight,
        carouselWithDescriptionItemWidth,
        carouselWithDescriptionItemMargin;

    carouselWithDescription = jQuery('.carousel-with-description .carousel-images');

    carouselWithDescriptionItemHeight = carouselWithDescription.children(':first').height();
    carouselWithDescriptionItemMargin = parseInt(carouselWithDescription.children(':first').css('marginLeft'));
    carouselWithDescriptionItemWidth = (carouselWithDescription.children(':first').width()) + carouselWithDescriptionItemMargin;

    carouselWithDescription.imagesLoaded(function() {
        carouselWithDescription.caroufredsel({
            auto: false,
            items: {
                width: carouselWithDescriptionItemWidth,
//                height: carouselWithDescriptionItemHeight,
                visible: 3
            },
            scroll: {
                items: 3,
                easing: "easeInOutCubic",
                duration: 700,
                pauseOnHover: true
            },
            prev : ".carousel-with-description .prev",
            next : ".carousel-with-description .next"
        }).parent().css('margin', 'auto');
    });


    ///////////////////////////////////////
    // CarouFredSel Plugin - basic carousel
    ///////////////////////////////////////
    var basicCarousel,
        basicCarouselItemHeight,
        basicCarouselItemMargin,
        basicCarouselItemWidth;

    basicCarousel = jQuery('.basic-carousel .carousel-images');

    basicCarouselItemHeight = basicCarousel.children(':first').height();
    basicCarouselItemMargin = parseInt(basicCarousel.children(':first').css('marginLeft'));
    basicCarouselItemWidth = (basicCarousel.children(':first').width()) + basicCarouselItemMargin;

    basicCarousel.imagesLoaded(function() {
        basicCarousel.caroufredsel({
            items: {
                width: carouselWithDescriptionItemWidth,
//                height: carouselWithDescriptionItemHeight,
                visible: 4
            },
            scroll: {
                items: 4,
                easing: "easeInOutCubic",
                duration: 700,
                pauseOnHover: true
            },
            prev : ".basic-carousel .prev",
            next : ".basic-carousel .next"
        }).parent().css('margin', 'auto');
    });


    // Carousels init
    var windowWidth = $('#main').innerWidth();

    if (jQuery(window).width() > 753) {
        carouselWithDescription.trigger('configuration', ['items.height', carouselWithDescriptionItemHeight]);
        carouselWithDescription.trigger('configuration', ['items.width', carouselWithDescriptionItemWidth]);
    }

    if (jQuery(window).width() > 753 && jQuery(window).width() < 963) {
        carouselWithDescription.trigger('configuration', ['items.visible', 2]);
        carouselWithDescription.trigger('configuration', ['scroll.items', 2]);
    }

    if (jQuery(window).width() < 753) {
        carouselWithDescription.parent().css({
            width: '100%'
        });

        carouselWithDescription.css({
            width: '100%'
        });

        carouselWithDescription.trigger('configuration', ['items.visible', 1]);
        carouselWithDescription.trigger('configuration', ['scroll.items', 1]);
        carouselWithDescription.trigger('configuration', ['direction', 'up']);
        carouselWithDescription.trigger('configuration', ['width', '100%']);
        carouselWithDescription.trigger('configuration', ['items.width', '100%']);
        carouselWithDescription.trigger('configuration', ['items.height', carouselWithDescriptionItemHeight]);
    }

    if (jQuery(window).width() > 753) {
        basicCarousel.trigger('configuration', ['items.height', basicCarouselItemHeight]);
        basicCarousel.trigger('configuration', ['items.width', basicCarouselItemWidth]);
    }

    if (jQuery(window).width() < 753) {
        basicCarousel.parent().css({
            width: '100%'
        });

        basicCarousel.css({
            width: '100%'
        });

        basicCarousel.trigger('configuration', ['items.visible', 1]);
        basicCarousel.trigger('configuration', ['scroll.items', 1]);
        basicCarousel.trigger('configuration', ['direction', 'up']);
        basicCarousel.trigger('configuration', ['width', '100%']);
        basicCarousel.trigger('configuration', ['items.width', '100%']);
        basicCarousel.trigger('configuration', ['items.height', basicCarouselItemHeight]);
    }


    ///////////////////////////////////////
    // CarouFredSel Plugin - on resize handler
    ///////////////////////////////////////
    jQuery(window).resize(function() {

        // on resize carouselWithDescription handler
        carouselWithDescriptionItemHeight = carouselWithDescription.children(':first').height();
        carouselWithDescriptionItemMargin = parseInt(carouselWithDescription.children(':first').css('marginLeft'));
        carouselWithDescriptionItemWidth = (carouselWithDescription.children(':first').width()) + carouselWithDescriptionItemMargin;

        if (jQuery(window).width() > 753) {
            carouselWithDescription.trigger('configuration', ['items.height', carouselWithDescriptionItemHeight]);
            carouselWithDescription.trigger('configuration', ['items.width', carouselWithDescriptionItemWidth]);
            carouselWithDescription.trigger('configuration', ['items.visible', 3]);
            carouselWithDescription.trigger('configuration', ['scroll.items', 3]);
            carouselWithDescription.trigger('configuration', ['direction', 'left']);
        }

        if (jQuery(window).width() > 753 && jQuery(window).width() < 963) {
            carouselWithDescription.trigger('configuration', ['items.visible', 2]);
            carouselWithDescription.trigger('configuration', ['scroll.items', 2]);
            carouselWithDescription.trigger('configuration', ['direction', 'left']);
        }

        if (jQuery(window).width() < 753) {
            carouselWithDescription.parent().css({
                width: '100%'
            });

            carouselWithDescription.css({
                width: '100%'
            });

            carouselWithDescription.trigger('configuration', ['items.visible', 1]);
            carouselWithDescription.trigger('configuration', ['scroll.items', 1]);
            carouselWithDescription.trigger('configuration', ['direction', 'up']);
            carouselWithDescription.trigger('configuration', ['items.width', '100%']);
            carouselWithDescription.trigger('configuration', ['items.height', carouselWithDescriptionItemHeight]);
        }

        // on resize basicCarousel handler
        basicCarouselItemHeight = basicCarousel.children(':first').height();
        basicCarouselItemMargin = parseInt(basicCarousel.children(':first').css('marginLeft'));
        basicCarouselItemWidth = (basicCarousel.children(':first').width()) + basicCarouselItemMargin;

        if (jQuery(window).width() > 753) {
            basicCarousel.trigger('configuration', ['items.height', basicCarouselItemHeight]);
            basicCarousel.trigger('configuration', ['items.width', basicCarouselItemWidth]);
            basicCarousel.trigger('configuration', ['direction', 'left']);
            basicCarousel.trigger('configuration', ['items.visible', 4]);
            basicCarousel.trigger('configuration', ['scroll.items', 4]);
        }

        if (jQuery(window).width() < 753) {
            basicCarousel.parent().css({
                width: '100%'
            });

            basicCarousel.css({
                width: '100%'
            });

            basicCarousel.trigger('configuration', ['items.visible', 1]);
            basicCarousel.trigger('configuration', ['scroll.items', 1]);
            basicCarousel.trigger('configuration', ['direction', 'up']);
            basicCarousel.trigger('configuration', ['width', '100%']);
            basicCarousel.trigger('configuration', ['items.width', '100%']);
            basicCarousel.trigger('configuration', ['items.height', basicCarouselItemHeight]);
        }
    });

});
})(jQuery);
