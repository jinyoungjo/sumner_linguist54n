        
        const jsPsych = initJsPsych({
            on_finish: function(data) {
            //jsPsych.data.displayData('csv');
            proliferate.submit({"trials": data.values()});
            window.location.href = 'finish.html';
            }
        });
        
        
        let timeline = [];
        const general_instruction = {
            // Which plugin to use
            type: jsPsychHtmlButtonResponse,
            // What should be displayed on the screen
            stimulus: '<p><font size="3">We invite you to participate in a research study on language comprehension. <br><br>On each page, you will listen to a witness and rate how credible their statement sounds. <br><br>Use the slider to provide your rating, where 1 means "least credible" and 5 means "most credible."</font></p>',
            // What should the button(s) say
            choices: ['Continue']
        };
        // push to the timeline
        timeline.push(general_instruction)      

        const balancedStimuli = getBalancedStimuli(test_stimuli);
        
        //console.log(balancedStimuli)

        let tv_array = create_tv_array(balancedStimuli);
        

        const block1 = {
            timeline: [
                {
                    type: jsPsychAudioSliderResponse,
                    stimulus: jsPsych.timelineVariable('filename'),
                    labels: ['1 (least credible)', '2', '3', '4', '5 (most credible)'],
                    min: 1,
                    max: 5,
                    step: 1,
                    slider_start: 3,
                    prompt: '<p>On a scale of 1 to 5, with one being the least credible and five being the most credible, how credible do you find this witness?</p>',
                    response_allowed_while_playing: false,
                    require_movement: true,
                    data: {
                        gender: jsPsych.timelineVariable("gender"),
                        emotionality: jsPsych.timelineVariable("emotionality"),
                        statement_number: jsPsych.timelineVariable("statement_number"),
                        statement_version: jsPsych.timelineVariable("statement_version")
                      },
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    choices: [""],
                    stimulus: "",
                    response_ends_trial: false,
                    trial_duration: 1000
                }
            ],
            timeline_variables: tv_array,
            randomize_order: true
        }
        timeline.push(block1);


        jsPsych.run(timeline)