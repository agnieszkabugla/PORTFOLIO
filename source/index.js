/* eslint-disable no-undef */
import jQuery from 'jquery';

var mobile;
var tablet;
var desktop;

function detectFormat() {
  if ($( window ).outerWidth(true) <= 559) {
    mobile = true;
    tablet = false;
    desktop = false;
  } else if($( window ).outerWidth(true) > 559 && $( window ).outerWidth(true) <= 1139) {
    mobile = false;
    tablet = true;
    desktop = false;
  } else {
    mobile = false;
    tablet = false;
    desktop = true;
  }
}

$( window ).resize(function() {
  detectFormat();
});


$(document).ready(function(){
  detectFormat();

  // EMAIL SENDING
  $("button").click(function() {
    if($(".form #name").val() != '' && $(".form #mail").val() != '' && $("textarea").val() != '') {
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
          $(":input").val("");
          $(".success").addClass("visible").delay(5000).queue(function(next){
            $(".visible").fadeOut();
            next();
          });
          $(".failure, .wrong-email, .not-all-fields-filled").removeClass("visible");
        })
        .fail(function(data) {
          $(".failure").addClass("visible");
          $(".success, .wrong-email, .not-all-fields-filled").removeClass("visible");
        })
      } else {
        $(".wrong-email").addClass("visible");
        $(".failure, .not-all-fields-filled").removeClass("visible");
      }
    } else {
      $(".not-all-fields-filled").addClass("visible");
      $(".failure, .wrong-email").removeClass("visible");
    }
  });

  // ANIMATIONS
  // show header and then arrow
  $("div.layer").fadeIn(3000, function() {
    $(".background div").fadeIn(1000);
  });

  // on arrow click, scroll to aboutMe
  $(".background div").on("click", function(e) {
    e.preventDefault();
    var speed = 1500;
    var offset = -84;
    if (mobile === true || tablet === true) {
      speed = 500;
      offset = -64;
    }
    $("html, body").animate({
      scrollTop: $(".aboutMe").offset().top + (offset )
    }, speed);
  });

  //MENU NAVIGATION
  // navigation click, toggle between a cross and three bars
  $(".header div.btn").on("click", function() {
    //e.preventDefault();
    $(this).toggleClass("cross");
    $(".header ul").toggleClass("show-menu");
  });

  // on home click, scroll to top
  $(".home" || ".logo").on("click", function(e) {
    e.preventDefault();
    var speed = 1500;
    var offset = -84;
    if (mobile === true || tablet === true) {
      speed = 500;
      offset = -64;
    }
    $("html, body").animate({
      scrollTop: $(".layer").offset().top + (offset)
    }, speed);
    $(".header ul").removeClass("show-menu");
    $(".header div.btn").removeClass("cross");
  });

  // on about click, scroll to aboutMe
  $(".about").on("click", function(e) {
    e.preventDefault();
    var speed = 1500;
    var offset = -84;
    if (mobile === true || tablet === true) {
      speed = 500;
      offset = -64;
    }
    $("html, body").animate({
      scrollTop: $(".aboutMe").offset().top + (offset)
    }, speed);
    $(".header ul").removeClass("show-menu");
    $(".header div.btn").removeClass("cross");
  });
  // on work click, scroll to recentWork
  $(".work").on("click", function(e) {
    e.preventDefault();
    var speed = 1500;
    var offset = -84;
    if (mobile === true || tablet === true) {
      speed = 500;
      offset = -64;
    }
    $("html, body").animate({
      scrollTop: $(".recent").offset().top + (offset)
    }, speed);
    $(".header ul").removeClass("show-menu");
    $(".header div.btn").removeClass("cross");
  });
  // on contact click, scroll to aboutMe
  $(".cont").on("click", function(e) {
    e.preventDefault();
    var speed = 1500;
    var offset = -84;
    if (mobile === true || tablet === true) {
      speed = 500;
      offset = -64;
    }
    $("html, body").animate({
      scrollTop: $(".contact").offset().top + (offset)
    }, speed);
    $(".header ul").removeClass("show-menu");
    $(".header div.btn").removeClass("cross");
  });
  // end of menu navigation
});
