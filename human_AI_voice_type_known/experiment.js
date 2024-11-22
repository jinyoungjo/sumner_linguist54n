        
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
            stimulus: '<p><font size="3">Welcome! Today you will be participating in a research study on the differences between AI and human talkers.<br><br>In this study, you will hear a series of statements spoken by multiple AI and human talkers. <br>For each statement, it is your job to determine whether the statement is true or false. <br>Please answer as quickly and accurately as possible. <br><br>If you think the statement is true, press D key, If you think the statement is false, press K key. <br>We suggest placing your left index finger on the D key and right index finger on the K key to improve consistency. <br><br>Thank you for participating!  </font></p>',
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
                    type: jsPsychAudioKeyboardResponse,
                    choices: ['d', 'k'],
                    stimulus: jsPsych.timelineVariable('filename'),
                    response_allowed_while_playing: true,
                    //trial_duration: 4000,
                    prompt: `<div class=\"option_container\"><div class=\"option\">TRUE<br><br><b>D</b></div><div class=\"option\">FALSE<br><br><b>K</b></div></div>`,
                    data: {
                        truth: jsPsych.timelineVariable("truth"),
                        gender: jsPsych.timelineVariable("gender"),
                        voice: jsPsych.timelineVariable("voice"),
                        statement: jsPsych.timelineVariable("statement"),
                        statement_number: jsPsych.timelineVariable("statement_number")
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
