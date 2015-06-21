$('#generation_time').datetimepicker({
//  format:'DD.MM.YYYY h:mm a',
    // formatTime:'h:m',
    // defaultTime:'05:00',
    // defaultScreen = false,
    //formatDate:'DD.MM.YYYY'
});

$('#generation_time').val(get_time(10));

function get_time(deltaMin) {
    var curTime = new Date();
    curTime.setMinutes(curTime.getMinutes() + deltaMin);
    return date_formatting(curTime);
}

function date_formatting(d) {
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var year_month_day = year + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var hours_minutes = (hours<10 ? '0' : '') + 
    hours + ':' + (minutes<10 ? '0' : '') +
    minutes

    var output = year_month_day + ' ' + hours_minutes;
    return output;
}

function show_error(errorText) {
    noty({
        text: errorText,
        layout: 'topRight', 
        theme: 'relax',
        type: 'error',
        //textAlign: 'center',
        timeout: '5000'
    });
}

change_time_mode = function(isToEnable) {
    if (isToEnable)  {
        $('#generation_time').removeAttr('disabled');
    } else {
        $('#generation_time').attr('disabled', '');
    }
    //removeAttr("disabled")
};

function input_validation() {
    if ($('#radio_choice_int').is(':checked')) {
        if ($('#integer_from_number').val().toString().length == 0) {
            show_error("'from' shouldn't be empty");
            return false;
        }
        if ($('#integer_to_number').val().toString().length == 0) {
            show_error("'to' shouldn't be empty");
            return false;
        }
        if ($('#integer_from_number').val().toString().length >= 20) {
            show_error("'from' length shouldn't be greater than 20");
            return false;
        }
        if ($('#integer_to_number').val().toString().length >= 20) {
            show_error("'to' length shouldn't be greater than 20");
            return false;
        }
        if ($('#integer_from_number').val() > $('#integer_to_number').val()) {
            show_error("'from' shouldn't be greater than 'to'");
            return false;
        }
    }
    else if ($('#radio_choice_string').is(':checked')) { 
        if ($('#string_form').val().length == 0) {
            show_error("sting form shouldn't be empty");
            return false;
        }
    }
    else if ($('#radio_choice_real').is(':checked')) { 
        if ($('#real_from_number').val().toString().length == 0) {
            show_error("'from' shouldn't be empty");
            return false;
        }
        if ($('#real_to_number').val().toString().length == 0) {
            show_error("'to' shouldn't be empty");
            return false;
        }
        if ($('#real_accur').val().toString().length == 0) {
            show_error("'to' shouldn't be empty");
            return false;
        }
        if ($('#real_from_number').val().toString().length >= 20) {
            show_error("'from' length shouldn't be greater than 20");
            return false;
        }
        if ($('#real_to_number').val().toString().length >= 20) {
            show_error("'to' length shouldn't be greater than 20");
            return false;
        }
        if ($('#real_accur').val().toString().length >= 10) {
            show_error("'accurance' length shouldn't be greater than 10");
            return false;
        }
        if ($('#real_from_number').val() > $('#real_to_number').val()) {
            show_error("'from' shouldn't be greater than 'to'");
            return false;
        }
    }
    if ($('#radio_later').is(':checked')) {
        if ($('#generation_time').val().toString().length == 0) {
            show_error("'later' shouldn't be empty");
            return false;
        }
    }

    $('#creation_time').val(get_time(0));
    return true;
};

/*
var disable_all = function() {
    $('#string_textarea').removeAttr('required');
    $('#integer_from_number').removeAttr('required');
    $('#integer_to_number').removeAttr('required');
    $('#real_from_number').removeAttr('required');
    $('#real_to_number').removeAttr('required');
    $('#accur').removeAttr('required');
};

$('#radio_choice_string').change( function() {
    disable_all();
    $('#string_textarea').attr('required', '');
});

$('#radio_choice_int').change( function() {
    disable_all();
    $('#integer_from_number').attr('required', '');
    $('#integer_to_number').attr('required', '');
});

$('#radio_choice_real').change( function() {
    disable_all();
    $('#real_from_number').attr('required', '');
    $('#real_to_number').attr('required', '');
    $('#real_accur').attr('required', '');
});

$('#radio_choice_bool').change( function() {
    disable_all();
});
*/