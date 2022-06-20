import $ from 'jquery';
class CreateUser_Form {
    // 1. Create/ Initiate our object
    constructor() {
        this.form = $('.create-user-form');
        this.firstNameField = this.form.find('#firstName');
        this.lastNameField = this.form.find('#lastName');
        this.emailField = this.form.find('#email');
        this.events();
    }

    // 2. events
    events() {
        this.form.on("submit", this.submitform.bind(this));
    }

    // 3. methods 
    submitform(e) {
        e.preventDefault();

        $('.is-invalid').removeClass('is-invalid');
        $('.js-show-feedback').removeClass('js-show-feedback');

        var firstName = this.form.find('#firstname').val(),
            lastName = this.form.find('#lastName').val(),
            email = this.form.find('#email').val(),
            ajaxurl = this.form.data('url');

        var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (firstName === '') {
            this.firstNameField.addClass('is-invalid');
            return;
        }

        if (!re.test(email)){ 
            this.emailField.addClass('is-invalid');
            return;
        }

        if (message === '') {
            this.lastNameField.addClass('is-invalid');
            return;
        }

        this.form.find('input, button').attr('disabled', 'disabled');
        $('.js-form-submission').addClass('js-show-feedback');

        // grecaptcha.ready(function () {
        //     grecaptcha.execute('6LdmQtEZAAAAAM1ArjhcRf2T7RDE09vH0AZY8ksk', { action: 'homepage' }).then(function (token) {
        //         //  console.log(token);
        //         document.getElementById("token").value = token;
        //
        //         $.ajax({
        //             url: ajaxurl,
        //             type: "POST",
        //             data: {
        //                 firstName: firstName,
        //                 lastName: lastName,
        //                 email: email,
        //                 token: token,
        //                 action: 'mjobs_recaptcha_sendinblue_form'
        //             },
        //             dataType: 'json',
        //             error: function (response) {
        //                 console.log(response);
        //                 $('.js-form-submission').removeClass('js-show-feedback');
        //                 $('.js-form-error').addClass('js-show-feedback');
        //                 this.form.find('input, button').removeAttr('disabled');
        //             },
        //             success: function (response) {
        //                 console.log(response);
        //                 var error = response.error;
        //                 var success = response.success;
        //                 if (success && success.id == 0) {
        //                     setTimeout(function () {
        //                         $('.js-form-submission').removeClass('js-show-feedback');
        //                         $('.js-form-error').addClass('js-show-feedback');
        //                         $('#mjobsContactForm').find('input, button').removeAttr('disabled');
        //                     }, 1500);
        //                 }
        //                 else if (error && error.status == 'validation_failure') {
        //                     setTimeout(function () {
        //                         $('.js-form-submission').removeClass('js-show-feedback');
        //                         $('.js-valid-error').addClass('js-show-feedback');
        //                         $('#mjobsContactForm').find('input, button').removeAttr('disabled');
        //                     }, 1500);
        //                 }
        //                 else {
        //                     setTimeout(function () {
        //                         $('.js-form-submission').removeClass('js-show-feedback');
        //                         $('.js-form-success').addClass('js-show-feedback');
        //                         $('.create-user-form').find('input, button').removeAttr('disabled').val('');
        //                     }, 1500);
        //                 }
        //             }
        //         });
        //
        //
        //     });
        // });
    }

}
export default CreateUser_Form