$(function () {
    window.disqus_shortname = 'hubeiwei'; // required: replace example with your forum shortname
    $('#disqus_container .comment').on('click', function () {
        $(this).html('加载中...');
        var that = this;
        $.getScript('http://' + disqus_shortname + '.disqus.com/embed.js', function () {
            $(that).remove()
        });
    });

    $('.entry a').each(function (index, element) {
        var href = $(this).attr('href');
        if (href) {
            if (href.indexOf('#') == 0) {
            } else if (href.indexOf('/') == 0 || href.toLowerCase().indexOf('laohu321.cc') > -1) {
            } else if ($(element).has('img').length) {
            } else {
                $(this).attr('target', '_blank');
                $(this).addClass('external');
            }
        }
    });

    if (/\#comment/.test(location.hash)) {
        $('#disqus_container .comment').trigger('click');
    }
});
