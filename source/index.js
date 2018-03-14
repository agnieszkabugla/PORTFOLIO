import jQuery from 'jquery'; 

$(document).ready(function(){
    $('.myslider').slick({
        autoplay: true,
        dots: true,
        arrows: false,
        cssEase: 'ease-out',
        speed: 1000,
        autoplaySpeed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
}); 