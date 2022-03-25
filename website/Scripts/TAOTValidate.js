jQuery(document).ready(function ($) {

  $(".form-contact").submit(function () {

    var error = "";
    var emailerror = "";
    var phoneerror = "";
    $("input.required, select.required").each(function () {
      if ($(this).val() === "") error = "Please fill in required fields. ";
    });
    if (validatePhone($("#phoneInput").val()) === false) {
      phoneerror = "Make sure that your phone number is valid. ";
    }
    if (validateEmail($("#email").val()) === false) {
      emailerror = "Make sure that your email is valid. ";
    }
    if (error || emailerror || phoneerror) {
      alert(error + emailerror + phoneerror);
      return false;
    }
  });
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePhone(phone) {
  var rp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return rp.test(phone);
}
