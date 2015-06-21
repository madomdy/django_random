var parse_result_date = function(year, month, day, hour, minute) {
  year_month_day = year + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
  hour_minutes_second = (hour<10 ? '0' : '') + hour + ':' +
    (minute<10 ? '0' : '') + minute + ':00';
  return new Date(year_month_day + "T" + hour_minutes_second);
}

var coundown_timer = setInterval(function() {
    if (targetDate >= new Date()) {
      clock.innerHTML = countdown(targetDate).toString();
    } else {
      clock.innerHTML = "random is generated";
      document.getElementById("generated_random").innerHTML = generated_random;
      clearInterval(coundown_timer);
    }
  }, 1000);