/*
Author: Kevin Ishak
Last Modification: 2023-11-27
*/

$(document).ready(function() {
    $("#contact-form").validate({
        // Define validation rules for your fields
        rules: {
            name: "required",
            email: {
                required: true,
                email: true // Ensure the input follows the email format
            },
            message: "required"
        },
        // Define messages for each field if validation fails
        messages: {
            name: "Please fill out this field",
            email: "Please fill out this field",
            message: "Please fill out this field"
        },
        // Handle form submission when the validation passes
        submitHandler: function(form) {
            // Reset the form
            $('#contact-form')[0].reset();
            // Do not submit the form
            return false;
        }
    });
});
