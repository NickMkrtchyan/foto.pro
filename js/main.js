
$(document).ready(() => {
	const getUrlParam = function (param) {
		if (!param) return;

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const paramValue = urlParams.get(param);

		return paramValue;
	};
	
	const utm_arr = [
		'utm_source',
		'utm_medium',
		'utm_campaign',
		'utm_content',
		'utm_term',
		'utm_group'
	];
	let variables = {};

	for (let i = 0; i < utm_arr.length; i++) {
		let key = utm_arr[i];
		let param = getUrlParam(key);
		if (param) {
			variables[key] = param;
		}
	}
	
	
    $('a[href^="#"]').click(function () {
        let target = $(this).attr("href");
		if (target !== '#') {
			$("#mobile__menu").removeClass("active");
			$("body, html").removeClass("my-body-noscroll-class");
			let targetPosition = $(target).offset().top;
			$("html, body").animate({ scrollTop: targetPosition }, 500);
		}
        return false;
    });

    $('.timer__value').timeTo({
        timeTo: new Date(new Date('Aug 20 2024 00:00:00 GMT+0400')),
        displayDays: 2,
    });
	
	
	/* Form Button Handlers */
	$('.send-ajax').click(function (e) {
		e.preventDefault();
		let button = $(this);
		button.prop('disabled', true);
		button.addClass('disabled');

		let form = button.closest('form');

		if (form[0].checkValidity()) {
			$.post({
				dataType: 'json',
				url: form.attr('action'), 
				data: form.serialize() + '&' + $.param(variables)
			}).done(function(response){
				if (!response.success) {
					form.addClass('was-validated');
					button.prop('disabled', false);
					button.removeClass('disabled');
					alert(response.message || 'Произошла ошибка отправки данных');
				}
				else {
					if (response.google !== undefined && response.google.trim() != '') {
						var gDataFIelds = {
							'entry.1078573704': form.find('input[name=name]').val(),
							'entry.1354918717': form.find('input[name=phone]').val(),
							'entry.204485693': form.find('input[name=email]').val(),
							'entry.1267062137': variables['utm_source'],
							'entry.960464347': variables['utm_medium'],
							'entry.2126612657': variables['utm_campaign'],
							'entry.1884970426': variables['utm_content'],
							'entry.1974555428': variables['utm_term'],
							'entry.976056762': variables['utm_group'],
						};

						$.ajax({
							url: response.google,
							type: 'post',
							dataType: 'xml',
							data: gDataFIelds,
							statusCode: {
								0: function () {
									form.removeClass('was-validated');
									button.prop('disabled', false);
									button.removeClass('disabled');
								}
							},
							error: function () {}
						})
						.always(function() {
							if (response.thanks) {
								window.location.href = response.thanks;
							}
						});
					}
					else {
						window.location.href = response.thanks;
					}
				}
			}).fail(function(xhr, status, error) {
				console.log(error);
				form.addClass('was-validated');
				button.prop('disabled', false);
				button.removeClass('disabled');
				alert('Произошла неизвестная ошибка отправки данных. Попробуйте перезагрузить страницу и попробовать еще раз');
			});
		} else {
			form.addClass('was-validated');
			button.prop('disabled', false);
			button.removeClass('disabled');
		}
		return false;
	});

});

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
