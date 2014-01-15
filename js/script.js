(function (document, $) {
    "use strict";
 
    var flickrPhotoStream = function ($el, options) {
        var url = [
            'http://api.flickr.com/services/feeds/photoset.gne?nsid=',
            options.id,
            '&set=',
            options.setId,
            '&format=json&jsoncallback=?'
        ].join('');
 
        return $.getJSON(url).done(function (data) {
            $.each(data.items, function (index, item) {
                var link = item.media.m.replace('_m', '_z');
 
                $("<img />")
                    .attr("src", item.media.m)
                    .appendTo($el)
                    .wrap(options.container || '')
                    .wrap([
                        '<a href="',
                        link,
                        options.cssClass ? '" class="' + options.cssClass : '',
                        '" title="',
                        item.title,
                        '"></a>'
                    ].join(''));
            });
        });
    };
 
    $.fn.flickrPhotoStream = function (options) {
        return flickrPhotoStream($(this).get(), options || {});
    };
})(document, jQuery);

$(document).ready(function() {
    $('.photos').flickrPhotoStream({
        id: '47301775@N06', //change id to change flickr account
        setId: '72157624704304071', //change setId to change photoset
        container: '<div class="photo_item"></div>',
        cssClass: 'photo_link'
    }).done(function() {
        setTimeout(function() {
            var msnry = new Masonry(document.querySelector('#masonryContainer'), {
                columnWidth: 50,
                itemSelector:'.photo_item',
                gutter: 15
            });
        }, 250);
    });
});