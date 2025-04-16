jQuery(document).ready(function() {
    jQuery(function() {
        jQuery.fn.size = function() {
            return this.length;
        }
    });

    var $ = jQuery;
    var $textsDiv = $('<div></div>').addClass('q_logo_text');
    if (!$('body').hasClass('uniwa_hide_department_title')) {
        //$textsDiv.append('<h3><a href="' + $('.q_logo > a').attr('href') + '">' + uniwa_site_title_primary + '</a></h3>');
        if (typeof uniwa_site_title_secondary != 'undefined') {
            $textsDiv.find('h3').addClass('bottom-border');
            $textsDiv.append('<div class="uniwa-th1"><a href="' + $('.q_logo > a').attr('href') + '">' + uniwa_site_title_secondary + '</a></div>');
        }
        $('.header_inner_left').append($textsDiv);
    }

    $(".mobile_menu h3").each(function() {
        // Replace with h1 but also keep the event listeners
        var newhEl = document.createElement("div");
        newhEl.className = "mobile_menu_title";
        newhEl.innerHTML = this.innerHTML;
        this.parentNode.replaceChild(newhEl, this);

        // Copy click listener from h3 to new h1
        var events = $._data(this, 'events');
        if (events) {
            var clickListeners = events.click;
            if (clickListeners) {
                for (var i = 0; i < clickListeners.length; i++) {
                    $(newhEl).click(clickListeners[i].handler);
                }
            }
        }
    });

    $('.q_logo > a').attr('href', uniwa_logo_url);
    if ($('html[lang="el"]').size() <= 0) {
        if ($('.q_logo > a').attr('href').indexOf('en/') == -1) {
            $('.q_logo > a').attr('href', $('.q_logo > a').attr('href') + 'en/');
        }
        $('.q_logo img').each(function() {
            $(this).attr('src', $(this).attr('src').replace('.png', '-en.png'))
        });
    }

    // For each q_logo image add an alt attribute based on the class
    $('.q_logo img').each(function() {
        var altText = $(this).attr('class').replace('qode_', '').replace('q_logo_', '').replace(/_/g, ' ');
        $(this).attr('alt', $(this).attr('alt') + " " + altText);
    });

    if ($('body > .category_description').size() > 0) {
        var $categoryDescription = $('body > .category_description').remove();
        $('.content .content_inner > .container .container_inner').prepend($categoryDescription);
        $categoryDescription.show();
    }

    $('.home .search_slides_from_header_bottom ').click(function(e) {
        var scrollAmount = getScrollAmountForStickyHeader();
        if ($(window).scrollTop() < scrollAmount) {
            $([document.documentElement, document.body]).animate({
                scrollTop: scrollAmount + 10
            }, 2000);
        }
        e.preventDefault();
        return false;
    });

    // Remove title tag from main images
    $('.vc_single_image-img:first-of-type').removeAttr('title');

    // Search form
    var searchForm = $('.qode_search_form_2').remove();
    if (searchForm.attr('action')) {
        searchForm.attr('action', searchForm.attr('action').replace('/en/homepage/', '/en/').replace('/en/home-page/', '/en/').replace('/en/home/', '/en/'));
        $('.header_top_bottom_holder .header_top .right').append(searchForm);
    }

    // Replace .qode_search_submit element with a submit button
    var $qodeSearchSubmitEl = $('.qode_search_submit');
    var $qodeSearchSubmit = $('<button type="submit" class="qode_search_submit" aria-label="Search Submit"></button>');
    $qodeSearchSubmit.append($qodeSearchSubmitEl.html());
    $qodeSearchSubmitEl.replaceWith($qodeSearchSubmit);

    if ($('.lang-item-en').size() > 0) { // Greek version
        $('.qode_search_field').attr('placeholder', 'Αναζήτηση');
        $('.qode_search_field').attr('aria-label', 'Search');
        $('.qode_search_submit').attr('aria-label', 'Search Button');
        $('.header_breadcrumbs .breadcrumbs a:first-of-type').html('Αρχική');
    } else if($('.lang-item-el').size() > 0) { // English version
        // $('.page_header .main_menu.drop_down > ul > li:first-of-type').css({'margin-left': '170px'});
    }
    // End search form

    // Breadcrumbs home scroll to main-content instead of top
    $('.header_breadcrumbs .breadcrumbs a:first-of-type').attr('href', $('.header_breadcrumbs .breadcrumbs a:first-of-type').attr('href') + '#main-content');
    // Disable breadcrumbs for inactive menu items
    $('.header_breadcrumbs .breadcrumbs a').each(function() {
        var link = $(this).attr('href');
        if ($('.main_menu ul li a[href="' + link + '"].no_link').size() > 0) {
            $(this).addClass('no_link');
            $(this).css({'cursor': 'default'});
            $(this).click(function(e) {
                e.preventDefault();
                return false;
            });
        }
    });
    var headerLinks = $('.header_top li:not(.search_slides_from_header_bottom) a[href="#"]');
    headerLinks.addClass('no_link');
    headerLinks.css({'cursor': 'default'});
    headerLinks.click(function(e) {
        e.preventDefault();
        return false;
    });
    // End breadcrumb adjustments

    jQuery('.mobile_menu').append(jQuery('.header-right-widget ul').clone().removeAttr('id').addClass('mobile_menu_secondary')); // Add header-top-right to mobile menu

    // For elements with class .menu-item find duplicate ids and add a number to the end
    var menuItems = $('.menu-item');
    var menuItemsIds = [];
    menuItems.each(function() {
        var id = $(this).attr('id');
        if (menuItemsIds.indexOf(id) > -1) {
            var count = 1;
            while (menuItemsIds.indexOf(id + '-' + count) > -1) {
                count++;
            }
            $(this).attr('id', id + '-' + count);
        }
        menuItemsIds.push($(this).attr('id'));
    });

    var $homeParallax = $('#home-parallax').detach();
    $('.content_inner').prepend($homeParallax);
    var homeParallaxArrowText = $('.lang-item-el').size() > 0 ? 'Explore UNIWA' : 'Γνωρίστε το ΠΑΔΑ';
    $homeParallax.append($('<div class="parallax-scroller"><a href="#main-content" onclick="jQuery(\'html, body\').animate({ scrollTop: jQuery(\'#main-content\').offset().top-117 }, 1000); return false;">' + homeParallaxArrowText + ' &nbsp; <span class="parallax-arrow-down">&#65088;</span></a></div>'));

    if ($('#back_to_top').size() > 0) {
        $('#back_to_top').attr('href', $('#back_to_top').attr('href') + 'main-content');
        $('#back_to_top').attr('aria-label', 'Back to top');
    }
    if ($('body.home').size() > 0 && $('#back_to_top').size() > 0) {
        $('#back_to_top').click(function(e) {
            jQuery('html, body').animate({ scrollTop: jQuery('#main-content').offset().top-117 }, 1000);
            e.preventDefault();
            return false;
        });
    }

    // Fix content area for non-bakery pages
    if (jQuery('.page:not(.home) .content_inner > .container > .container_inner > .wpb-content-wrapper > .vc_row').size() <= 0) {
        jQuery('.page:not(.home) .content_inner > .container > .container_inner').addClass('no-js-composer').addClass('content-section').addClass('curved-bottom-right');
    }
    if (jQuery('.single-profile .content_inner > .container > .container_inner').size() > 0) {
        jQuery('.single-profile .content_inner > .container > .container_inner').addClass('no-js-composer').addClass('content-section');
    }
    if (jQuery('.single-course .content_inner > .container > .container_inner').size() > 0) {
        jQuery('.single-course .content_inner > .container > .container_inner').addClass('no-js-composer').addClass('content-section').addClass('curved-bottom-right');
    }
    if (jQuery('.tax-course_category .content_inner > .container > .container_inner').size() > 0) {
        jQuery('.tax-course_category .content_inner > .container > .container_inner').addClass('no-js-composer').addClass('content-section');
    }

    // Fix title area
    if (jQuery('.content_inner > .container > .container_inner').hasClass('no-js-composer') ||
        jQuery('.blog_holder.blog_large_image_with_dividers').size() > 0 ||
        jQuery('body').hasClass('archive')
    ) {
        jQuery('.container_inner').css({'position': 'relative'});
        if (jQuery('.page-thumbnail-img img').size() > 0 && jQuery('.page-thumbnail-img img').attr('src') != '') {
            var announcementsImg = jQuery('<img src="' + jQuery('.page-thumbnail-img img').attr('src') + '" alt="Category" data-categoyimagetype="category1" />');
        } else if (jQuery('.category-sps-2019').size() > 0 || jQuery('.category-sps-2020').size() > 0 || jQuery('.category-ss-2019').size() > 0 || jQuery('.category-ss-2020').size() > 0) {
            var announcementsImg = jQuery('<img src="/wp-content/uploads/2020/02/media-share-0-02-05-8ea0963568add11a380b304e2f0504d4f8ae7099c31788ed75314bef2f7d9507-39df62e7-3704-4410-ac79-7dc245b39ce0.jpg" alt="Category"  data-categoyimagetype="category2" />');
        } else if (jQuery('.category-financials-2018').size() > 0 || jQuery('.category-financials-2019').size() > 0 || jQuery('.category-oikonomiko-etos-2018').size() > 0 || jQuery('.category-oikonomiko-etos-2019').size() > 0) {
            var announcementsImg = jQuery('<img src="/wp-content/uploads/2020/02/media-share-0-02-0a-df8b0a85417808e74feccb8cde3e85bfc3789b1e6d300d72e68e3105265cda0d-530c2823-cfa2-4d03-b655-3adb3b863cc7.jpg" alt="Category"  data-categoyimagetype="category3" />');
        } else {
            var announcementsImg = jQuery('<img src="' + uniwa_page_default_image_url +'" alt="Category"  data-categoyimagetype="category4" />');
        }
        jQuery('.title_subtitle_holder').addClass('page-title-overlap').css({'position': 'absolute', 'bottom': '-8px'});
        announcementsImg.insertBefore(jQuery('.title_subtitle_holder'));
    }

    // Fix blog layouts
    if (jQuery('.blog_holder.blog_large_image_with_dividers').size() > 0) {
        var announcementsPagination = jQuery('.blog_holder.blog_large_image_with_dividers .pagination').remove();
        jQuery('.content .column1 .column_inner').append(announcementsPagination);

        jQuery('.blog_holder.blog_large_image_with_dividers article').each(function() {
            if (jQuery(this).find('.latest_post_sticky').size() > 0) {
                var announcementSticky = $(this).find('.latest_post_sticky').remove();
                jQuery(this).find('.entry_title').prepend(announcementSticky);
            }

            var mainTitleLink = jQuery(this).find('.entry_title a:last-of-type');
            mainTitleLink.attr('data-orig-href', mainTitleLink.attr('href'));
            if (jQuery(this).hasClass('format-link')) {
                var announcementLink = jQuery(this).find('.blog_column1 a').remove();
                announcementLink.addClass('format-link-link');
                announcementLink.attr('target', '_blank');
                announcementLink.removeAttr('title');
                jQuery(this).find('.entry_title').prepend(announcementLink);

                mainTitleLink.attr('href', jQuery(this).find('a.format-link-link').attr('href'));
                mainTitleLink.removeAttr('title');
            }
        });

        jQuery('.blog_holder.blog_large_image_with_dividers .entry_title a:last-of-type').click(function(e) {
            if (jQuery(this).parent().parent().parent().find('.post_excerpt').html() === '') {
                $(this).attr('target', '_blank');
                return;
            }
            jQuery(this).parent().parent().parent().find('.post_excerpt').slideToggle();
            e.preventDefault();
            return false;
        });

        jQuery('.blog_holder.blog_large_image_with_dividers article').each(function() {
            var mainTitleLinkHref = jQuery(this).find('.entry_title a[data-orig-href]').attr('data-orig-href');
            var squareLinkIcon = jQuery('<span class="blog-article-link"><i class="fa fa-share-square-o" /></span>');
            squareLinkIcon.click(function(e) {
                window.open(mainTitleLinkHref, '_blank');
                e.preventDefault();
                return false;
            });
            jQuery(this).find('.entry_title > a').last().append(squareLinkIcon);
        });
    }

    $('.news-announcements .latest_post').each(function() {
        var monthyear = $(this).find('.date_month_year').html().split(', ');
        $(this).find('.date_month_year').html(monthyear[0]);
    });

    // .title_subtitle_holder h1 should be replaced with h2 for accessibility
    if (jQuery('.title_subtitle_holder h1').size() > 0) {
        var titleText = jQuery('.title_subtitle_holder h1').html();
        jQuery('.title_subtitle_holder h1').remove();
        jQuery('.title_subtitle_holder').prepend('<h1 class="uniwa-th2">' + titleText + '</h1>');
    }

    // Fix missing alt text for betterdocs
    jQuery('.betterdocs-ia-launcher img').attr('alt', 'Ask a question');

    if (jQuery('.blog_holder.blog_single').size() > 0) {
        var articleDate = jQuery('.blog_holder.blog_single article .post_info .date').html();
        var articleTime = jQuery('.blog_holder.blog_single article .post_info .time').html();
        var articleTitle = jQuery('.title_subtitle_holder .uniwa-th2').html();
        var articleDots = jQuery('.blog_holder.blog_single article .post_info .dots').html() ?? '';
        var articleShare = jQuery('.blog_holder.blog_single article .post_info .blog_share.qode_share').html() ?? '';
        jQuery('.blog_holder.blog_single article .post_text_inner .post_info').remove();
        //var articleContent = jQuery('.blog_holder.blog_single article *').remove();

        var leftSide = '<div class="date">' + articleDate + '</div>';
        var rightSide = '<div class="post_info"><h1 class="uniwa-th2 entry_title">' + articleTitle + '</h1><div><div class="time">' + articleTime + '</div>' + '<div class="dots">' + articleDots + '</div>' + articleShare + '</div></div>';
        jQuery('.blog_holder.blog_single article').prepend('<div class="column1"></div>');
        jQuery('.blog_holder.blog_single article .post_content_holder').addClass('column2');
        jQuery('.blog_holder.blog_single article .post_content_holder').css({'padding-top': 0, 'padding-bottom': 0});
        jQuery('.blog_holder.blog_single article .column1').prepend(leftSide);
        jQuery('.blog_holder.blog_single article .column2').prepend(rightSide);
    }

    // Accessibility improvements (adding aria to icons, removing broken icons etc)
    $j(".qode_icon_font_awesome").attr('aria-hidden', 'true');
    $j('[itemprop="url"]').each((i, el) => {
        $j(el).attr('aria-label', $j(el).text());
        // If title and content is the same remove title
        if ($j(el).attr('title') === $j(el).text()) {
            $j(el).removeAttr('title');
        }
    })
    $j("li.next a").attr('aria-label', 'next');
    $j("h5.icon_title").remove();

    $j("#xtvcvisit img").remove();
    $j("#xtvcviews img").remove();

    $j('.qode_search_field').attr('aria-label', 'Search Input');
    $j('.qode_search_submit ').attr('aria-label', 'Search Submit');
    $j('#jp_poster_0').attr('alt', 'Read page aloud');

    // Remove h2 with display none
    $j('h2').each((i, el) => {
        if ($j(el).css('display') === 'none') {
            $j(el).remove();
        }
    })
});

// Fix qode advanced tabs not opening the relevant tag based on hash automatically
// e.g. https://www.uniwa.gr/e-learning/#tab-sychnes-erotiseis-kai-apantiseis-faq-gia-technika-themata-211
jQuery(window).load(function() {
    if (window.location.hash.length <= 5) {
        return;
    }
    var url = window.location.hash.split('-');
    if (url[0] !== '#tab') {
        return;
    }
    url.pop();
    url = url.join('-');
    jQuery(".qode-advanced-tabs-nav a[href*='" + url +"']").click();
});

jQuery(window).scroll(function() {
    var $ = jQuery;

    $scroll = $(window).scrollTop();
    sticky_amount = getScrollAmountForStickyHeader() + 285;

    if ($scroll > sticky_amount && !$('#home-parallax').hasClass('sticky')) {
        $('#home-parallax').addClass('sticky');
    } else if ($scroll <= sticky_amount && $('#home-parallax').hasClass('sticky')) {
        $('#home-parallax').removeClass('sticky');
    }
});

function getScrollAmountForStickyHeader(){
    var pageHeaderHeight = 140;
    if (typeof jQuery('#home-parallax').height() === 'undefined') {
        return - pageHeaderHeight;
    }
    return jQuery('#home-parallax').height() - pageHeaderHeight;
}

var offsetAnchor = function() {
    if(location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 100);
    }
};
window.addEventListener("hashchange", offsetAnchor);
window.setTimeout(offsetAnchor, 1);
