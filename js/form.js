function validateForm() {

    // alert("Thank you for the message!");

    let form = document.forms[0];

    let name = form.name.value;

    let email = form.email.value;

    let message = form.message.value;

    if(name == "") {
        alert("Name is required");
        form.name.style.border = '1px solid red';
        return false;
    }

    if(email == "") {
        alert("Email is required");
        form.email.style.border = '1px solid red';
        return false;
    }

    if(message == "") {
        alert("Please leave a message");
        form.message.style.border = '1px solid red'
        return false;
    }

    alert("Thank you for the message");
    return true;

}