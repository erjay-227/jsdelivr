/**
 * Created with JetBrains PhpStorm.
 * User: adrian
 * Date: 7/24/13
 * Time: 7:51 AM
 * To change this template use File | Settings | File Templates.
 */

(function($) {
    $(document).ready(function() {
        $('.service-dialog-close').click(
            function() {
                $('.new-service-form-container').dialog('close');
                $('.new-service-form-container').clearForm();
            }
        );

        $('.edit-service-dialog-close').click(
            function() {
                var serviceNumber = $(this).attr('data-service-number');

                $('#edit-service-form-' + serviceNumber).dialog('close');
            }
        );

        $('.upload-service-icon-button').click(
            function()
            {
                tb_show('Upload Media', 'media-upload.php?type=image&amp;TB_iframe=true');
                return false;
            }
        );

        // overrides the send_to_editor() function in media-upload script.
        window.send_to_editor = function(html) {
            imgurl = jQuery('img',html).attr('src');
            jQuery('#service-icon-preview-container').append('<img src="' + imgurl + '" width="50" />');
            tb_remove();
        }

        $('#open-service-form').click(
            function() {
                $('.new-service-form-container').dialog({
                    modal: true,
                    title: 'Create new Service',
                    width: 500,
                    zIndex: 100
                });
            }
        );

        $('#services-container').on('click', '.service .delete-service .edit-service-button', function() {
                var serviceNumber = $(this).attr('data-service-number');
                $('#edit-service-form-' + serviceNumber).dialog({
                    modal: true,
                    title: 'Create new Service',
                    width: 500,
                    zIndex: 100
                });
        }) ;

        $('.service-delete-button').click(function() {
            var service_number = $(this).attr('data-service-number');
            var post_id = $('#create-service-button').attr('data-post-id');

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: myAjax.ajaxurl,
                data: {
                    action: 'delete_service',
                    post_id: post_id,
                    service_number: service_number
                },
                success: function(response) {
                    $('#' + response.service_number).remove();
                    $('#popup-service-messages-container').alertMessage('Service Successfully deleted!');
                },
                error: function() {
                    alert('errror');
                }
            });
        });

        var post_id = $('#create-service-button').attr('data-post-id');

        $('#services-container').sortable({
            update: function() {
                var result = $(this).sortable('toArray');
                console.log(result);

                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: myAjax.ajaxurl,
                    data: {action: 'reposition_services', post_id: post_id, positions: result},
                    success: function(response) {
                        $('#popup-service-messages-container').alertMessage('Service Successfully reordered!');
                    },
                    error: function() {
                    }
                });
            }
        });

        console.log('services.js is loaded');
        var serviceIndex = 1;

        $('#create-service-button').click(function() {
            var post_id = $(this).attr('data-post-id');
            var service_title = $('#service-title').val();
            var service_content = $('#service-content').val();
            var service_external_url = $('#service-external-url').val();
            var service_background = $('#service-background').val();

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: myAjax.ajaxurl,
                data: {
                    action: 'save_service',
                    post_id: post_id,
                    service_index: serviceIndex,
                    service_title: service_title,
                    service_content: service_content,
                    service_external_url: service_external_url,
                    service_background: service_background
                },
                success: function(response) {
                    var serviceTemplate =
                        '<div class="service postbox" id="' + response.service_number + '">' +
                            '<h3 class="hndle"><span>' + response.service_title + '</span></h3>' +
                            '<div class="inside">' +
                                '<p>Title: ' + response.service_title + '</p>' +
                                '<p>Content: ' + response.service_content +'</p>' +
                                '<p>Background: ' + response.service_background + '</p>' +
                                '<p>External: ' + response.service_external_url + '</p>' +

                                '<div class="delete-service">' +
                                    '<input type="button" class="service-delete-button button" value="Delete" data-service-number="' + response.service_number + '" />' +
                                    '<input type="button" class="edit-service-button button" value="Edit" data-service-number="' + response.service_number + '" />' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    var serviceFormTemplate =
                        '<div id="edit-service-form-' + response.service_number + '" class="service-form" style="display: none">' +
                            '<table>' +
                                '<tr>' +
                                    '<td><label for="service-title">Title:</label></td>' +
                                    '<td><input type="text" id="service-title" name="title" value="' + response.service_title + '" /></td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td><label for="service-content">Content</label></td>' +
                                    '<td><input type="text" id="service-content" name="content" value="' + response.service_content + '" /></td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td><label for="service-external-url">External URL:</label></td>' +
                                    '<td><input type="text" id="service-external-url" name="service-external_url" value="' + response.service_external_url + '" /></td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td><label>Upload Icon:</label></td>' +
                                    '<td><input type="button" id="upload-service-icon-button" value="Upload service icon" class="button" /></td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td></td>' +
                                    '<td><div id="service-icon-preview-container"></div></td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td><label for="service-background">Background:</label></td>' +
                                    '<td><input type="text" id="service-background" name="services_background" value="' + response.service_background +'" class="background-input" /></td>' +
                                '</tr>' +

                                '<tr>' +
                                    '<td><input type="button" class="update-service-button button form-service-button" value="Update service" data-post-id="' + post_id +'" /></td>' +
                                    '<td><a href="javascript:;" class="edit-service-dialog-close" data-service-number="' + response.service_number + '">Cancel</a></td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>';

                    $('#services-container').append(serviceTemplate);
                    $('#services-container').append(serviceFormTemplate);
                    $('.background-input').wpColorPicker();
                    $('#popup-service-messages-container').alertMessage('Service Successfully created!');
                    serviceIndex++;
                    $('.new-service-form-container').dialog('close');
                },
                error: function() {
                }
            });
        });

        $('.update-service-button').click(function() {
            var serviceNumber = $(this).attr('data-service-number');
            var post_id = $(this).attr('data-post-id');

            var service_title = $('#service-title-' + serviceNumber).val();
            var service_content = $('#service-content-' + serviceNumber).val();
            var service_external_url = $('#service-external-url-' + serviceNumber).val();
            var service_background = $('#service-background-' + serviceNumber).val();

            $.ajax({
                type: 'post',
                dataType: 'json',
                url: myAjax.ajaxurl,
                data: {
                    action: 'update_service',
                    post_id: post_id,
                    service_title: service_title,
                    service_content: service_content,
                    service_external_url: service_external_url,
                    service_background: service_background,
                    service_number: serviceNumber
                },
                success: function(response) {
                    $('#edit-service-form-' + serviceNumber).dialog('close');
                    $('#popup-service-messages-container').alertMessage('Service Successfully updated!');
                },
                error: function() {
                    alert('error');
                }
            });
        });
    });


}) (jQuery);
