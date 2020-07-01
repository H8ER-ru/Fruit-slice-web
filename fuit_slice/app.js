let playing = false;
let score, trialsLeft, step, action;
let fruit = ['apple', 'carrot', 'Orange', 'peper', 'tomat', 'Pine']

$(function () {
    $("#startReset").click(
        function () {
            if (playing == true){
                location.reload();
            }else{
                playing = true;
                score = 0 ;
                trialsLeft = 3 ;

                $("#scoreValue").html(score);
                $("#trialsLeft").show();

                addHearts();
                $("#game_over").hide();

                $("#startReset").html("Перезапуск")

                startActions();

            }
        }
    );

    $("#fruit1").mouseover(function () {
        score++;
        $("#scoreValue").html(score);
        $("#slicesound")[0].play();

        clearInterval(action);
        $('#fruit1').hide("explode", 500);

        setTimeout(startActions, 500)
    })


    function addHearts() {
        $("#trialsLeft").empty();
        for (i= 0; i < trialsLeft; i++){
            $("#trialsLeft").append("<img class='life' src='images/health.png'>");
        }
    }
    function startActions() {

        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({"left" : Math.round(450*Math.random()), "top" : -50});

        //generate step
        step = 1 + Math.round(5*Math.random());
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top +step);

            if($("#fruit1").position().top > $("#fruitContainer").height()){
                if (trialsLeft > 1){
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({"left" : Math.round(450*Math.random()), "top" : -50});

                    //generate step
                    step = 1 + Math.round(6*Math.random());

                    trialsLeft --;
                    addHearts();
                }else{//game over
                    playing = false;
                    $("#startReset").html("Начать игру");
                    $("#game_over").show();
                    $("#game_over").html('<p>Игра закончена</p>' +
                        '<p>ваш счет - ' + score +'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }

        }, 10)
    }

    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruit[Math.round(5*Math.random())] + '.png')
    }
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
})





