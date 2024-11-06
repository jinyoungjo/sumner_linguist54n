function evaluate_response(data) {
    if (data.response == 'd' & data.correct == 'NEW') {
        data.result = "correct_rejection"
    } else if (data.response == 'k' & data.correct == 'NEW') {
        data.result = "false_alarm"
    } else if (data.response == 'd' & data.correct == 'OLD') {
        data.result = "miss"
    } else  {
        data.result = "hit"
    }
}


function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.stimulus = json_object[i].stimulus;
        obj.data = {};
        obj.data.correct = json_object[i].correct;
        tv_array.push(obj)
    }
    return tv_array;
}