function photoSwipe() {
    var items = [];

    $('.mason__item').each(function() {
        var $pic = $(this);
        var $pswp = $('.pswp')[0];
        console.log($pic.data('size2'))

        // Get the details (src, width, height) for each image and save them in an array
        // $pic.each(function() {
            var $href   = $(this).data('href'),
                $size   = $(this).data('dimensions').split('x'),
                $width  = $size[0],
                $height = $size[1];

            var item = {
                src : $href,
                w   : $width,
                h   : $height
            };

            items.push(item);
        // });

        // Add a click handler for each image to initialize the PhotoSwipe gallery
        $pic.on('click', function(event) {
            event.preventDefault();

            var $index = $(this).index();
            var options = {
                index: $index,
                bgOpacity: 0.7,
                showHideOpacity: true
            }

            // Initialize PhotoSwipe
            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    }); 
}

(function($) {
    $(document).ready(function() {
        $(".mason").mason({
            itemSelector: ".mason__item",
            ratio: 1,
            sizes: [
                [1,1],
                [1,2],
                [2,1],
                [2,2]
            ],
            // promoted: [
            //     ['mason__item--promo-v1', 3, 3],
            //     ['mason__item--promo-v2', 1, 3],
            //     ['mason__item--promo-v3', 3, 2]
            // ],
            columns: [
                [0,480,1],
                [480,780,2],
                [780,1080,3],
                [1080,1320,4],
                [1320,1680,5]
            ],
            filler: {
                itemSelector: '.mason__filler',
                filler_class: 'mason__custom-fill'
            },
            layout: 'fluid',
            gutter: 5
        }, function() {
            photoSwipe()
        });
    });
})(jQuery);