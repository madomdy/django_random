var parse_date_to_client = function(year, month, day, hour, minute) {
  d = new Date(Date.UTC(year, --month, day, hour, minute));
  return d;
}

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

    var now = new Date(); 
    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    $('#creation_time_utc').val(date_formatting(now_utc));
    
    var gen_time = new Date($('#generation_time').val());
    var gen_utc = new Date(gen_time.getUTCFullYear(), gen_time.getUTCMonth(), gen_time.getUTCDate(),  
        gen_time.getUTCHours(), gen_time.getUTCMinutes(), gen_time.getUTCSeconds());
    $('#generation_time_utc').val(date_formatting(gen_utc));
    return true;
};