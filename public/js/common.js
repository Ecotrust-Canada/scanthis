'use strict';

/*period defaults to day*/
var dateManipulation = function(date, period){
    if (period !== 'day' && period !== 'week'){
        period = 'day';
    }
    var dates;
    if (period === 'week'){
        dates = {
        'postgres_date': moment(date).format(),
        'start_date': moment(date).startOf('isoWeek'),
        'end_date': moment(date).endOf('isoWeek')
        };
    }
    else if (period === 'day'){
        dates = {
        'postgres_date': moment(date).format(),
        'start_date': moment(date).startOf('day'),
        'end_date': moment(date).endOf('day')
        };
    }
    return dates;
};

/* for now creates unique id by using stage id and current date and time*/
var createLotNum = function(stage_id, date){
    var datestring = moment(date.valueOf()).format('-DDMMYYYY-HHmmss');
    return String(stage_id) + datestring;
};


var LotQuery = function(params){
    var queryString = '?stage_id=eq.' + params.stage_id;

    queryString = queryString + ['supplier_id','previous_lot_number','product_id','lot_number'].map(function(param){
      if (typeof params[param] !== 'undefined'){
        return '&' + param + '=eq.' + params[param];
      }
      else{
        return '';
      }      
    }).join('');

    if (typeof params.date !== 'undefined'){
      var date = moment(params.date).format();
      queryString = queryString.concat('&start_date=lt.' + date + '&end_date=gt.' + date);
    }
    return queryString;
  };



