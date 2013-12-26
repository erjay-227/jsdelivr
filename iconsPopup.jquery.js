(function($) {

    $.ajaxSetup({
        async: false
    });

    function getFontAwesomeJson(callback) {
        $.getJSON( templateDir + '/library/font-icons/font-awesome/config.json', callback);
    }

    function getEntypoJson(callback) {
        $.getJSON( templateDir + '/library/font-icons/entypo/config.json', callback);
    }

    function getLineconsJson(callback) {
        $.getJSON( templateDir + '/library/font-icons/linecons/config.json', callback);
    }

    var iconsArray = [];

    var fontAwesomeJSON;
    var entypoJSON;
    var lineconsJSON;


    getFontAwesomeJson(function(data) {
        var fontAwesomeIcons = [];
        var fontAwesomeObject = {};

        $.each(data.glyphs, function(key, value) {
            fontAwesomeIcons.push(data.css_prefix_text + value.css);
        });

        fontAwesomeObject.icons = fontAwesomeIcons;
        fontAwesomeObject.name = data.name;

        iconsArray.push(fontAwesomeObject);
    });

    getEntypoJson(function(data) {
        var entypoIcons = [];
        var entypoObject = {};

        $.each(data.glyphs, function(key, value) {
            entypoIcons.push(data.css_prefix_text + value.css);
        });

        entypoObject.icons = entypoIcons;
        entypoObject.name = data.name;

        iconsArray.push(entypoObject);
    });

    getLineconsJson(function(data) {
        var lineconsIcons = [];
        var lineconsObject = {};

        $.each(data.glyphs, function(key, value) {
            lineconsIcons.push(data.css_prefix_text + value.css);
        });

        lineconsObject.icons = lineconsIcons;
        lineconsObject.name = data.name;

        iconsArray.push(lineconsObject);
    });

    var icons = '';
    var filterMarkup = '';

    $.each(iconsArray, function(key, iconsGroup) {
        var thisIcons = iconsGroup.icons.map(function(iconClass) {

                return '<div class="icon-wrapper"><i class="' + iconClass + '"></i></div>';

        });

        thisIcons = thisIcons.join('');

        icons += '<div class="icons-container ' + iconsGroup.name + '-icons-container clearfix">' + thisIcons + '</div>';

        filterMarkup += '<option value="' + iconsGroup.name + '">' + iconsGroup.name + '</option>';
    });

//    var iconsArray = [
//        'li_heart', 'li_cloud', 'li_star', 'li_trash', 'li_user', 'li_key', 'li_search', 'li_settings', 'li_camera',
//        'li_lock', 'li_bulb', 'li_pen', 'li_display', 'li_location', 'li_bubble', 'li_phone', 'li_news', 'li_mail',
//        'li_like', 'li_photo', 'li_note', 'li_data', 'li_music', 'li_calendar', 'li_vallet', 'li_world', 'li_vynil',
//        'icon-eur', 'icon-gbp', 'icon-dollar', 'icon-thumbs-up', 'icon-thumbs-down', 'icon-archive', 'icon-ban-circle',
//        'icon-bell', 'icon-briefcase', 'icon-bug', 'icon-camera', 'icon-camera-retro', 'icon-cogs', 'icon-cloud-download',
//        'icon-crop', 'icon-desktop', 'icon-download', 'icon-envelope', 'icon-film', 'icon-exclamation-sign', 'icon-expand',
//        'icon-laptop', 'icon-magic', 'icon-mail-reply', 'icon-phone', 'icon-shopping-cart', 'icon-tag', 'icon-spinner',
//        'icon-ok', 'icon-umbrella', 'icon-android', 'icon-trophy', 'icon-globe', 'icon-rocket', 'icon-beaker', 'icon-tasks',
//        'icon-tablet', 'icon-calendar-empty', 'icon-youtube', 'icon-dropbox', 'icon-instagram', 'icon-flickr', 'icon-bitbucket',
//        'icon-tumblr', 'icon-apple', 'icon-windows', 'icon-android', 'icon-linux', 'icon-dribble', 'icon-skype',
//        'icon-bug', 'li_paperplane', 'li_study'
//    ];

    $.fn.iconsPopup = function(options) {

        var settings = $.extend({
            beforeOpen: function() {},
            onSubmit: function() {}
        }, options);

        var iconsForm =
            '<div id="icons-form" class="clearfix">' +

                '<select class="icons-filter">' +

                    filterMarkup +

                '</select>' +

                '<div class="iconsform">' +

                    icons +

                '</div>' +

                '<input type="hidden" id="button-icon" name="button_icon" style="height: 500px" value="" /><br />' +

                '<p class="admin-stylish-button">' +
                    '<input type="button" id="icon-submit" value="Use Icon" name="submit" />' +
                '</p>' +
            '</div>';

        jQuery('body').append(iconsForm);

        jQuery('#icons-form').css('display', 'none');

        $(this).on('click', function() {

            handleBeforeOpen(settings);

            jQuery.magnificPopup.open({
                items: {
                    src: '#icons-form',
                    type: 'inline'
                }
            });

            jQuery('#icons-form').css('display', 'block');

            return false;
        });

        handleIconChange();

        handleSubmit(settings);

        handleIconsFilter();
    };

    function handleIconsFilter() {

        $('.icons-container').css('display', 'none');
        $('.iconsform .icons-container:first-child').css('display', 'block');

        $('.icons-filter').change(function() {
            var selectedFilter = $(this).val();

            $('.icons-container').css('display', 'none');

            $('.' + selectedFilter + '-icons-container').css('display', 'block');

        });

    }

    function handleBeforeOpen(settings) {
        settings.beforeOpen.call(this);
    }

    function handleIconChange() {
        jQuery('.icons-container .icon-wrapper').on('click', function() {
            jQuery('.icon-wrapper').removeClass('selected-icon');
            jQuery('.no-icon').removeClass('selected-icon');

            jQuery(this).addClass('selected-icon');

            var icon = jQuery(this).children('i').attr('class');

            jQuery('#button-icon').val(icon);
        });
    }

    function handleSubmit(settings) {

        jQuery('body').find('#icon-submit').click(function(){
            var icon = jQuery('#button-icon').val();

            settings.onSubmit.call(this, icon);

            jQuery.magnificPopup.close();

        });
    }

}(jQuery));
