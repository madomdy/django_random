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

function parse_date_to_client(year, month, day, hour, minute) {
    d = new Date(Date.UTC(year, --month, day, hour, minute));
    return d;
}