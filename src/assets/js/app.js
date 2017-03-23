$(document).foundation();
$(document).ready(function(){

    var clickStopScroll = false,
        nav = $('.menu'),
        stickyNavTop = nav.offset().top,
        navHeight = nav.outerHeight(),
        windowHeight = $(window).height(),
        docHeight = $(document).height();

    $('.menu-item').click(scrollToSection);
    
    $(window).scroll(function() {
        if(!clickStopScroll) {
            addActive();
        }
    });
    
    addActive();
    
    $(window).one('animateSkills', progressFun);

    $('.ex-item .switcher').on('click', switchTabs);

    $('.portfolio .filter').on('click', applyPortfolioFilter);

    function scrollToSection() {
        var anchor = $(this).find('a').get(0),
            target = $(anchor.hash);

        clickStopScroll = true;

        $('.off-canvas').foundation('close');

        if (location.hostname == anchor.hostname && target.length !== 0) {
            nav.find('.menu-item').removeClass('active');
            $(this).addClass('active');
            $('html, body').animate(
                { scrollTop: target.offset().top - $('.site-header').height() },
                1000,
                function () {
                    setTimeout(function(){
                        if (target.attr('id') === 'section_4') {
                            $(window).trigger('animateSkills');
                        }

                        clickStopScroll = false;
                    }, 100);
                }
            );
            return false;
        }
    }

    function addActive() {
        var scrollPos = $(window).scrollTop();

        $('.section').each(function() {
            var top = $(this).offset().top - nav.outerHeight(),
            bottom = top + $(this).outerHeight();
            if (scrollPos >= top && scrollPos <= bottom) {
                nav.find('.menu-item').removeClass('active');
                nav.find('a[href="#'+ $(this).attr('id') + '"]').parent('.menu-item').addClass('active');
                if ($(this).attr('id') === 'section_4') {
                    $(window).trigger('animateSkills');
                }
            } else if (scrollPos + windowHeight == docHeight) {
                if (!$('.menu-item:last').hasClass('active')) {
                    nav.find('.menu-item').removeClass('active');
                    nav.find('.menu-item:last').addClass('active');
                }
            }   
        });
    };

    function progressFun() {
        $('.skill-progress').each(function() {
            $(this).circleProgress({value: parseFloat($(this).attr('data-progress'))}).on('circle-animation-progress', function(event, progress, stepValue) {
                $(this).find('span').html(parseInt(100 * stepValue) + '%');
            });
        })
    };

    function switchTabs(e) {
        var section = $(this).parents('.ex-item:first');
        e.preventDefault();
        section.find('.switchable').hide();

        section.find('.switchable.' + $(this).attr('data-active')).show();

        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
    };

    function applyPortfolioFilter (e){
        var portfolio = $(this).parents('.portfolio');
        e.preventDefault();
        portfolio.find('.filtered').hide();
        portfolio.find('.filtered.' + $(this).attr('data-filter')).show();

        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
    }

});
