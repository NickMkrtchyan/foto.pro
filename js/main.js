
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
        timeTo: new Date(new Date('Jul 01 2023 14:00:00 GMT+0300')),
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
