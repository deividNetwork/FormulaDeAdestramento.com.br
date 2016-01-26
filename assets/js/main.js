(function(){
    var playVideo = function() {
        var player  = $('header .iframe iframe');
        var bgVideo = player.siblings('img');
        var link    = $('header .video a');

        bgVideo.click(function(){
            bgVideo.remove();
            player.attr('src', player.attr('src') + '?autoplay=1');
        });

        link.click(function(){
            bgVideo.remove();
            player.attr('src', player.attr('src') + '?autoplay=1');
        });
    };

    var toSection = function() {
        $('a[to-section]').click(function() {
            var element  = $('.' + $(this).attr('to-section') + '');
            var position = element.position().top;

            $('html, body').animate({scrollTop: position}, 1000);
        });
    };

    var fixedBar = function() {
        $('.top-header').clone().appendTo('.top-header').addClass('fixed');

        var barFixed = $('.top-header.fixed');

        $(window).scroll(function(){
            var positionY = $(this).scrollTop();

            if(positionY >= 150) {
                barFixed.addClass('open');
            }
            else {
                barFixed.removeClass('open');
            }
        });
    };

    playVideo();
    fixedBar();
    toSection();
})();