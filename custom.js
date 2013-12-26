function get_posts(container) {

    var THUMB_PORTFOLIO_TWO_COLUMNS = 'portfolio-2columns';
    var THUMB_PORTFOLIO_FOUR_COLUMNS = 'portfolio-4columns';
    var THUMB_PORTFOLIO_MASONRY = 'portfolio-masonry';
    var THUMB_BLOG = 'post-thumbnail';
    var TEMPLATE_GRID_FULLWIDTH = 'grid-fullwidth';
    var TEMPLATE_GRID_SIDEBAR = 'grid-sidebar';
    var TEMPLATE_STANDARD = 'blog-standard';
    var TEMPLATE_PORTFOLIO_TWO_COLUMNS = 'portfolio-2columns';
    var TEMPLATE_PORTFOLIO_FOUR_COLUMNS = 'portfolio-4columns';
    var TEMPLATE_PORTFOLIO_MASONRY = 'portfolio-masonry';

    console.log('ajaxurl:', ajaxurl);

    var page = jQuery('.load-more-button').attr('data-page');
    var postType = jQuery('.load-more-button').attr('data-post');
    var thumbSize = jQuery('.load-more-button').attr('data-thumb');
    var template = jQuery('.load-more-button').attr('data-template');

    var filter = jQuery('.load-more-button').attr('data-filter');
    var filterName = jQuery('.load-more-button').attr('data-filter-name');
    var filterValue = jQuery('.load-more-button').attr('data-filter-value');
    var postsCount = jQuery('.load-more-button').attr('data-posts-count');

    jQuery.ajax({
        url: ajaxurl,
        dataType: "json",
        type: 'POST',
        data: {
            action: 'load_more',
            page: page,
            post: postType,
            thumb: thumbSize,
            filter: filter,
            filter_name: filterName,
            filter_value: filterValue,
            posts_count: postsCount
        },
        success: function(elements) {

            jQuery('.load-more-button').attr('data-page', ++page);

            var elementsMarkup = '';

            var maxPostsCount = '';
            var totalPostsCount = '';

            jQuery.each(elements, function(key, value) {
                maxPostsCount = value.max_posts_count;
                totalPostsCount = value.total_posts_count;

                switch ( template ) {
                    case THUMB_PORTFOLIO_FOUR_COLUMNS :
                        elementsMarkup += '' +
                            '<div class="isotope-item portfolio-image span3 ' + value.sort_categories + '">' +
                            '<div class="thumbnail"><img src="' + value.image[0] + '" /></div>' +

                            '<div class="portfolio-hover">' +
                            '<a href="' + value.link + '">' +
                            '<div class="portfolio-hover-text">' +
                            '<h3>' + value.title + '</h3>' +
                            '<p><i class="icon-folder-open"></i>' + value.categories + '</p>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                        break;
                    case THUMB_PORTFOLIO_TWO_COLUMNS :
                        elementsMarkup += '' +
                            '<div class="isotope-item portfolio-image span6 ' + value.sort_categories + '">' +
                            '<div class="thumbnail"><img src="' +
                            value.image[0] +
                            '" /></div>' +

                            '<div class="portfolio-hover">' +
                            '<a href="' + value.link + '">' +
                            '<div class="portfolio-hover-text">' +
                            '<h3>' + value.title + '</h3>' +
                            '<p><i class="icon-folder-open"></i>' + value.categories + '</p>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                        break;
                    case THUMB_PORTFOLIO_MASONRY :
                        elementsMarkup += '' +
                            '<div class="isotope-item masonry-portfolio-image ' + value.featured + ' ' + value.sort_categories + '">' +
                            '<div class="thumbnail">' +
                            '<img src="' + value.image[0] + '" alt="portfolio image" />' +
                            '</div>' +

                            '<div class="portfolio-hover">' +
                            '<a href="' + value.link + '">' +
                            '<div class="portfolio-hover-text">' +
                            '<h3>' + value.title + '</h3>' +
                            '<p><i class="icon-folder-open"></i>' + value.categories + '</p>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                        break;
                    case TEMPLATE_STANDARD :
                        elementsMarkup += '' +
                            '<div class="isotope-item post">' +
                            '<div class="row">' +
                            '<div class="span3">'
                                    + value.media +
                            '</div>' +

                            '<div class="span6">' +
                            '<div class="post-content">' +
                            '<div class="post-title">' +
                            '<h3>' + value.title + '</h3>' +
                            '</div>' +

                            '<div class="post-info clearfix">' +
                            '<div class="post-date"><i class="icon-calendar"></i> <p>' + value.date + '</p></div>' +
                            '<div class="post-author-name"><i class="icon-user"></i> <a href="' + value.author_id + '">' + value.author_name + '</a></div>' +
                            '<div class="post-category"><i class="icon-pencil"></i> <a href="' + value.category_id + '">' + value.category_name + '</a></div>' +
                            '<div class="post-comments"><i class="icon-comments"></i> <a href="' + value.permalink + '#comments">(' + value.comments_count.approved + ')</a></div>' +
                            '</div>' +

                            '<div style="clear: both"></div>' +

                            '<div class="post-excerpt">' +
                            '<p>' +
                            value.excerpt +
                            '</p>' +
                            '</div>' +

                            '<div class="stylish-button"><a href="' + value.permalink + '">read more</a></div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        break;
                    case TEMPLATE_GRID_FULLWIDTH :
                        elementsMarkup += '' +
                            '<div class="isotope-item post span6">' +
                            '<div class="row">' +
                            '<div class="span3">'
                                + value.media +
                            '</div>' +

                            '<div class="span3">' +
                            '<div class="post-content">' +
                            '<div class="post-title">' +
                            '<h3>' + value.title + '</h3>' +
                            '</div>' +

                            '<div class="post-info clearfix">' +
                            '<div class="post-date"><i class="icon-calendar"></i> <p>' + value.date + '</p></div>' +
                            '<div class="post-category"><i class="icon-pencil"></i> <a href="' + value.category_id + '">' + value.category_name + '</a></div>' +
                            '<div class="post-comments"><i class="icon-comments"></i> <a href="' + value.permalink + '#comments">(' + value.comments_count.approved + ')</a></div>' +
                            '</div>' +

                            '<div style="clear: both"></div>' +

                            '<div class="post-excerpt">' +
                            '<p>' +
                            value.excerpt +
                            '</p>' +
                            '</div>' +

                            '<div class="stylish-button"><a href' + value.permalink + '">read more</a></div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        break;
                    case TEMPLATE_GRID_SIDEBAR :
                        elementsMarkup += '' +
                            '<div class="isotope-item post span3">'
                                + value.media +

                            '<div class="post-content">' +
                            '<div class="post-title">' +
                            '<h3>' + value.title + '</h3>' +
                            '</div>' +

                            '<div class="post-info clearfix">' +
                            '<div class="post-date"><i class="icon-calendar"></i> <p>' + value.date + '</p></div>' +
                            '<div class="post-category"><i class="icon-pencil"></i> <a href="' + value.category_id + '">' + value.category_name + '</a></div>' +
                            '<div class="post-comments"><i class="icon-comments"></i> <a href="' + value.permalink + '#comments">(' + value.comments_count.approved + ')</a></div>' +
                            '</div>' +

                            '<div style="clear: both"></div>' +

                            '<div class="post-excerpt">' +
                            '<p>' +
                            value.excerpt +
                            '</p>' +
                            '</div>' +

                            '<div class="stylish-button"><a href="' + value.permalink + '">read more</a></div>' +
                            '</div>' +
                            '</div>';
                        break;
                }

            });

            var jQueryElements = jQuery(elementsMarkup);

            jQueryElements.css({
                display: 'none'
            });

            container.append(jQueryElements);

            container.imagesLoaded(function(){
                container.isotope('insert', jQueryElements);
            });

            jQueryElements.fadeIn(400);

            jQuery('.thumbnail-hover a').magnificPopup({type:'image'});

            jQuery('.load-more-pre-loader').css({
                display: 'none'
            });

//            jQuery('.load-more a').html(page * maxPostsCount + '/' + totalPostsCount);

            if ( elements.length == 0 || (page * maxPostsCount) >= totalPostsCount ) {
                jQuery('.load-more').html('<p>No more data</p>');
            }

        },
        error: function () {
            console.log('error');
        }
    });
}


