

function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.filename = json_object[i].filename;
        obj.gender = json_object[i].gender;
        obj.emotionality = json_object[i].emotionality;
        obj.statement_number = json_object[i].statement_number;
        obj.statement_version = json_object[i].statement_version;
        tv_array.push(obj)
    }
    return tv_array;
};

function getBalancedStimuli(stimuli) {
  const conditions = [
    { emotionality: "yes", gender: "m" },
    { emotionality: "yes", gender: "f" },
    { emotionality: "no", gender: "m" },
    { emotionality: "no", gender: "f" },
  ];

  const selectedStimuli = [];
  const usedStatementNumbers = new Set(); // Track statement numbers already selected

  conditions.forEach(condition => {
    // Filter stimuli matching the condition and not already used
    const matchingStimuli = stimuli.filter(
      s =>
        s.emotionality === condition.emotionality &&
        s.gender === condition.gender &&
        !usedStatementNumbers.has(s.statement_number)
    );

    // Randomly select 2 stimuli for this condition
    const sampledStimuli = jsPsych.randomization.sampleWithoutReplacement(matchingStimuli, 2);

    // Add the statement numbers of the selected stimuli to the used set
    sampledStimuli.forEach(s => usedStatementNumbers.add(s.statement_number));

    // Add the selected stimuli to the result
    selectedStimuli.push(...sampledStimuli);
  });

  return selectedStimuli;
}
