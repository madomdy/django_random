$('.boxes').click(function() {
    $(this).find('input:radio')[0].checked = true;

    $("#Int_box").css('background-color', "#FFF3F3");
    $("#String_box").css('background-color', "#FFF3F3");
    $("#Real_box").css('background-color', "#FFF3F3");
    $("#Bool_box").css('background-color', "#FFF3F3");
    $(this).css('background-color', "#FF4D4D");
});




$('#generation_time').datetimepicker();
$('#generation_time').val(get_time(10));

function change_time_mode(isToEnable) {
    if (isToEnable)  {
        $('#generation_time').removeAttr('disabled');
    } else {
        $('#generation_time').attr('disabled', '');
    }
};

function get_time(deltaMin) {
    var curTime = new Date();
    curTime.setMinutes(curTime.getMinutes() + deltaMin);
    return date_formatting(curTime);
}



function show_validation_error(errorText) {
    noty({
        text: errorText,
        layout: 'topRight', 
        theme: 'relax',
        type: 'error',
        //textAlign: 'center',
        timeout: '5000'
    });
}



function set_utc_time_toSend() {
    var now = new Date();
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    $('#creation_time_utc').val(date_formatting(now_utc));

    var gen_time = new Date($('#generation_time').val());
    var gen_utc = new Date(gen_time.getUTCFullYear(), gen_time.getUTCMonth(), gen_time.getUTCDate(),  
        gen_time.getUTCHours(), gen_time.getUTCMinutes(), gen_time.getUTCSeconds());
    $('#generation_time_utc').val(date_formatting(gen_utc));
}

$("#random_form").submit(function() {
    if (!validation()) {
        return false;
    }
    set_utc_time_toSend();
});

function int_validation() {
    if ($('#integer_from_number').val().toString().length == 0) {
        show_validation_error("'from' shouldn't be empty");
        return false;
    }
    if ($('#integer_to_number').val().toString().length == 0) {
        show_validation_error("'to' shouldn't be empty");
        return false;
    }
    if ($('#integer_from_number').val().toString().length >= 20) {
        show_validation_error("'from' length shouldn't be greater than 20");
        return false;
    }
    if ($('#integer_to_number').val().toString().length >= 20) {
        show_validation_error("'to' length shouldn't be greater than 20");
        return false;
    }
    if ($('#integer_from_number').val() > $('#integer_to_number').val()) {
        show_validation_error("'from' shouldn't be greater than 'to'");
        return false;
    }
    return true;
}

function stringfrom_validation() {
    if ($('#string_form').val().length == 0) {
        show_validation_error("sting form shouldn't be empty");
        return false;
    }
    return true;
}

function real_validation() {
    if ($('#real_from_number').val().toString().length == 0) {
        show_validation_error("'from' shouldn't be empty");
        return false;
    }
    if ($('#real_to_number').val().toString().length == 0) {
        show_validation_error("'to' shouldn't be empty");
        return false;
    }
    if ($('#real_accur').val().toString().length == 0) {
        show_validation_error("'to' shouldn't be empty");
        return false;
    }
    if ($('#real_from_number').val().toString().length >= 20) {
        show_validation_error("'from' length shouldn't be greater than 20");
        return false;
    }
    if ($('#real_to_number').val().toString().length >= 20) {
        show_validation_error("'to' length shouldn't be greater than 20");
        return false;
    }
    if ($('#real_accur').val().toString().length >= 10) {
        show_validation_error("'accurance' length shouldn't be greater than 10");
        return false;
    }
    if ($('#real_from_number').val() > $('#real_to_number').val()) {
        show_validation_error("'from' shouldn't be greater than 'to'");
        return false;
    }
    return true;
}

function time_validation() {
    if ($('#generation_time').val().toString().length == 0) {
        show_validation_error("'later' shouldn't be empty");
        return false;
    }
    return true;
}

function validation() {
    if ($('#radio_choice_int').is(':checked')) {
        if (!int_validation()) {
            return false;
        }
    }
    else if ($('#radio_choice_string').is(':checked')) { 
        if (!stringfrom_validation()) {
            return false;
        }
    }
    else if ($('#radio_choice_real').is(':checked')) { 
        if (!real_validation()) {
            return false;
        }
    }
    if ($('#radio_later').is(':checked')) {
        if (!time_validation()) {
            return false;
        }
    }
    return true;
};