jQuery(document).ready(function($) {
    // Инициализация первого слайдера (Отзывы)
    $('.slider-reviews').slick({
        dots: false, // Отключаем точки навигации
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true, // Включаем стрелки
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 400,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    // Инициализация второго слайдера (Изображения)
    $('.slider-way').slick({
        dots: false, // Отключаем точки навигации
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true, // Включаем стрелки
        centerMode: true, // Активная точка будет центральной
        variableWidth: true, // Включает изменение ширины слайдов
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true
            }
        },
        {
            breakpoint: 400,
            settings: {
                arrows: true, // Включаем стрелки на малых экранах
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true
            }
        }]
    });
});

document.addEventListener("DOMContentLoaded", function() {

    lightGallery(document.querySelector('.collage-container'), {
        selector: 'a',
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        download: true,
        thumbnail: false,
        animateThumb: false
    });
    lightGallery(document.getElementById('lightgallery'), {
        selector: 'a',
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        download: true,
        thumbnail: false,
        animateThumb: false
    });
});