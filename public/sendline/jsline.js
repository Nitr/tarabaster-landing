/*
form class - formline
form attr - formname
input class - inputline
input attr - linename
input attr - linereq=1 (Required)
buttun class - linebutton
modal class - linemodal

!!!add to index file!!!
<script src="sendline/bootbox.min.js"></script>
<script src="sendline/jsline.js"></script>
<link rel="stylesheet" href="sendline/sendline.css">
*/

var grun = function () {}


window.jQuery || alert('jQuery dont exist');
window.bootbox || alert('Bootbox dont exist');

var textlabels = {
    "ok": "Спасибо! Мы скоро позвоним.",
    "notjson": "Ваша заявка <b>НЕ</b> отправленна.<br /> Скрипт отправки вернул неожиданной ответ. Свяжитесь с администрацией сайта",
    "error": "Ваша заявка <b>НЕ</b> отправленна.<br /> Скрипт отправки не доступен. Свяжитесь с администрацией сайта",
}

var showdialog = (function (message, st, allline){
    bootbox.dialog({
        title: (st === 0) ? 'Отправлено' :'Ошибка',
        message: message,
        buttons: {
            success: {
                label: "Закрыть",
                className: "btn-primary",
                callback: function () {
                    $.each(allline, function( k, v ) {
                      $(v).val('');
                    });
                    $('.linemodal').modal('hide');
                }
            }
        }
    });
});


$( document ).ready(function() {

    $('.inputline').click(function(){
        $(this).removeClass("notextline");
    });

    $('.linebutton').click(function(){
        var lineobj = {};
        var errorlines = 0;
        var allline = [];

        lineobj['name'] = $(this).closest('.formline').attr('formname');
        lineobj['lines'] = [];
        lineobj['clientmail'] = '';

        //console.log($(this).attr('valid'));
        // $(this).attr('valid', '1');
        //console.log($(this).attr('valid'));

        $(this).closest('.formline').find('.inputline').each(function(i){

            $(this).removeClass("notextline");
            if ($(this).attr('linereq') == '1' && $(this).val() == '') {
                errorlines = 1;
                $(this).addClass("notextline");
            }

            if ($(this).attr('linename') == 'E-mail') {
                lineobj['clientmail'] = $(this).val();
            }

            allline[i] = this;
            lineobj['lines'][i] = {
                'name': $(this).attr('linename'),
                'value': $(this).val(),
            };

        });

        if (errorlines == 0) {
            $.post( "/order", lineobj, function(data) {
                try {
                    var response=jQuery.parseJSON(data);
                    //console.log (response);
                    if (response['result'] == 'ok') {

                        showdialog(textlabels['ok'], 0, allline);
                        grun();
                        grun = function(){}

                    } else if (response['result'] == 'error') {
                        showdialog(response['message'], 1);
                    } else {
                        showdialog(textlabels['notjson'], 1);
                    }
                } catch(err) {
                    showdialog(textlabels['notjson'], 1);
                }
            }).fail(function() {
                showdialog(textlabels['error'], 1);
            });
        }
    });
});
