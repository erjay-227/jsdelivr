/**
 * Created with JetBrains PhpStorm.
 * User: adrian
 * Date: 7/22/13
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */

jQuery(document).ready(function() {
    jQuery('#blurb-meta, #standard-meta, #extended-meta, #services-meta, #testimonials-meta').css('display', 'none');

    var savedFormatType = jQuery('#format-type').val();
    jQuery('#' + savedFormatType + '-meta').css('display', 'block');

    jQuery('#format-type').on('change', function() {
        var formatType = jQuery(this).val();

        jQuery('#blurb-meta, #standard-meta, #extended-meta, #services-meta, #testimonials-meta').css('display', 'none');
        jQuery('#' + formatType + '-meta').css('display', 'block');
    });

});
