window.$ = window.jQuery = require('jquery');
$(document).keyup(function(e) 
{
    if (e.keyCode === 27)
    {
        $('.div_voltar')[0].click();
    }
});