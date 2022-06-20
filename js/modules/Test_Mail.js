import $ from 'jquery';
class Test_Mail {
    // 1. Create/ Initiate our object
    constructor() {
        this.form = $('#test-mail');
        this.events();
    }

    // 2. events
    events() {
        this.form.on("submit", this.submitform.bind(this));
    }

    // 3. methods 
    submitform(e) {

        e.preventDefault();
        // alert("hello from test");

        var ajaxurl = this.form.data('url');

        $.ajax({

            url: ajaxurl,
            type: "POST",
            data: {
                email: "gargashish83@gmail.com",
                action: 'test_email_form'
            },
            error: function (response) {
                console.log("Error\n");
                console.log(response);
            },
            success: function (response) {
                console.log("Success\n");
                console.log(response);        
            }
        });

    }

}
export default Test_Mail