(function ($) {
  'use strict' // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this)
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo')
    event.preventDefault()
  })

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
  })

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click()
  })

  // Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 100
    }
  })

  // Initialize and Configure Scroll Reveal Animation
  window.sr = ScrollReveal()
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200)
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  })
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300)

  // Get the form.
  var form = $('#ajax-contact')

  // function validate email regex
  function validateEmail (email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    return re.test(email)
  }

  // Set up an event listener for the contact form.
  $(form).submit(function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault()
    if (
      $('#contactname').val() === '' ||
      $('#contactemail').val() === '' ||
      $('#contactmessage').val() === '') {
      swal({
        title: 'Error!',
        text: 'Please fill in the required * fields.',
        imageUrl: 'sweetalert/swal2-error.png',
        timer: 5000,
        confirmButtonColor: 'rgb(221, 75, 57)'
      })
    } else if (!validateEmail($('#contactemail').val())) {
      swal({
        title: 'Error!',
        text: 'Please provide a valid email address.',
        imageUrl: 'sweetalert/swal2-error.png',
        timer: 5000,
        confirmButtonColor: 'rgb(221, 75, 57)'
      })
    } else {
      // Combine the form data into a single object.
      var formData = {
        name: $('#contactname').val(),
        email: $('#contactemail').val(),
        phone: $('#contactphone').val(),
        message: $('#contactmessage').val()
      }
      $.ajax({
        url: 'https://formspree.io/support@talentdevelopment.zendesk.com',
        method: 'POST',
        data: formData,
        dataType: 'json'
      }).done(function (response) {
        swal({
          title: 'Success',
          text: 'We will get back to you within 2 business days.',
          imageUrl: 'sweetalert/swal2-success.png',
          confirmButtonColor: 'rgb(38, 166, 91)'
        })
        // reset form
        $('#contactname').val('')
        $('#contactemail').val('')
        $('#contactphone').val('')
        $('#contactmessage').val('')
      }).fail(function (response) {
        swal({
          title: 'Error!',
          text: 'Please refresh the page and try again. If the error persists, please contact us directly. Sorry for any inconvenience caused.',
          imageUrl: 'sweetalert/swal2-error.png',
          timer: 5000,
          confirmButtonColor: 'rgb(221, 75, 57)'
        })
      })
    }
  })
})(jQuery) // End of use strict
