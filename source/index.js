/* eslint-disable no-undef */
import jQuery from 'jquery';

$(document).ready(function(){

  $("button").click(function() {
    $("input").each(function() {
      if($(this).val() != '' && $("textarea").val() != '') {
        var email = $("#mail").val();
        var name = $("#name").val();
        var message = $("#msg").val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(email) == true) {
          var dataToSend = {
            email: email,
            name: name,
            message: message
          };
          $.ajax({
            type: "POST",
            url: "/sendMail",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            dataType: "json"
          })
          .done(function() {
            alert("success");
          })
          .fail(function(data) {
            alert("error");
          })
          .always(function() {
            alert("completed");
          });
        } else {
          alert("wrong email address");
        }
      } else {
        alert("not all fields are filled")
      }
    });
  });




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
