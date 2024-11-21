

function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.filename = json_object[i].filename;
        obj.truth = json_object[i].truth;
        obj.voice = json_object[i].voice;
        obj.gender = json_object[i].gender;
        obj.statement = json_object[i].statement;
        obj.statement_number = json_object[i].statement_number;
        tv_array.push(obj)
    }
    return tv_array;
};

function getBalancedStimuli(stimuli) {
  const conditions = [
    { truth: "TRUE", voice: "ai", gender: "male" },
    { truth: "TRUE", voice: "ai", gender: "female" },
    { truth: "TRUE", voice: "human", gender: "male" },
    { truth: "TRUE", voice: "human", gender: "female" },
    { truth: "FALSE", voice: "ai", gender: "male" },
    { truth: "FALSE", voice: "ai", gender: "female" },
    { truth: "FALSE", voice: "human", gender: "male" },
    { truth: "FALSE", voice: "human", gender: "female" },
  ];

  const selectedStimuli = [];
  const usedStatementNumbers = new Set(); // Track statement numbers already selected

  conditions.forEach(condition => {
    // Filter stimuli matching the condition and not already used
    const matchingStimuli = stimuli.filter(
      s =>
        s.truth === condition.truth &&
        s.voice === condition.voice &&
        s.gender === condition.gender &&
        !usedStatementNumbers.has(s.statement_number)
    );

    // Randomly select 2 stimuli for this condition
    const sampledStimuli = jsPsych.randomization.sampleWithoutReplacement(matchingStimuli, 6);

    // Add the statement numbers of the selected stimuli to the used set
    sampledStimuli.forEach(s => usedStatementNumbers.add(s.statement_number));

    // Add the selected stimuli to the result
    selectedStimuli.push(...sampledStimuli);
  });

  return selectedStimuli;
}
