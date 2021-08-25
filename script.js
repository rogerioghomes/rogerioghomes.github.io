
document.onreadystatechange = function(e) {
    if (document.readyState == "interactive") {
        var all = document.getElementsByTagName("*");
        for (var i = 0, max = all.length; i < max; i++) {
            set_ele(all[i]);
        }
    }
}

function check_element(ele) {
    var all = document.getElementsByTagName("*");
    var totalele = all.length;
    var per_inc = 100 / all.length;

    if ($(ele).on()) {
        var prog_width = per_inc + Number(document.getElementById("progress_width").value);
        document.getElementById("progress_width").value = prog_width;
        $("#bar1").animate({
            width: prog_width + "%"
        }, 10, function() {
            if (document.getElementById("bar1").style.width == "100%") {
                $(".progress").fadeOut("slow");
            }
        });
    } else {
        set_ele(ele);
    }
}

function set_ele(set_element) {
    check_element(set_element);
}

$( document ).ready(function() {

    jQuery(function($){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        $(window).resize(function() {
            if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
                $('#canvas').empty();
                return;
            }
        });
    });

    $(".azulejos img").bind("contextmenu", function(e) { return false; });


    $(".azulejos img").draggable({
        helper:'clone',
        scroll: false,
        snap: true,
        drag: function(){
            if ($(".instrucoes").is(":visible")) {
                $(".instrucoes").fadeOut(200); 
            }
        }
    });  

    $("#canvas").droppable({
        accept: ".azulejos img",
        drop: function(event,ui){
            var new_signature = $(ui.helper).clone();
            $(this).append(new_signature);
            new_signature.draggable({snap: true, scroll: false});

            $(new_signature).bind("contextmenu", function(e) { return false; });


            $(new_signature).mousedown(function(event) {
                switch (event.which) {
                    case 3:
                        var angle = ($(this).data('angle') + 90) || 90;
                        $(this).css({'transform': 'rotate(' + angle + 'deg)'});
                        $(this).data('angle', angle);
                        break;
                }
            });


            $(new_signature).dblclick(function() {
                $(this).toggleClass( "dobro" ); 
            });

        }
    });


    $("#canvas img"). bind("contextmenu", function(e) { return false; });


    $("#canvas img").mousedown(function(event) {
        switch (event.which) {
            case 3:
                var angle = ($(this).data('angle') + 90) || 90;
                $(this).css({'transform': 'rotate(' + angle + 'deg)'});
                $(this).data('angle', angle);
                break;
        }
    });


    $("#canvas img").dblclick(function() {
        $(this).toggleClass( "dobro" ); 
    });


    $('#limpar').click(function(){
        $('#canvas').empty();
        if ($(".instrucoes").is(":visible")) {
            $(".instrucoes").fadeOut(200); 
        }
    });


    $(".caixa_comando").click(function(){
        $(".instrucoes").fadeOut(400); 
    });

    $("button#info").click(function(){
        if ($(".instrucoes").is(":visible")) {
            $(".instrucoes").effect("shake");
        } else {
            $(".instrucoes").fadeIn(200); 
        }
    });




});
