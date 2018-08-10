class TariffCalculator {
    constructor(startValue, min, max) {
        this.startValue = startValue;
        this.min = min;
        this.max = max;
        const $activeTariff = $('.tariffs .active');
        this.tariff = 1 + parseInt($activeTariff.attr('data-percent')) / 100;
        $('.result .after span').text($activeTariff.attr('data-duration'));
        const $class = this;
        this.$slider = $('#price-slider').slider({
            min: this.min,
            max: this.max,
            value: this.startValue,
            create(event, ui) {
                $class.sliderCreate(event.target);
            },
            slide(event, ui) {
                const value = ui.value;
                $class.onChange(event.target, value);
            }
        });
        this.controller();
    }

    updateResult(value) {
        $('.calculator .calculated').text(`${parseInt(value * this.tariff)} рублей`);
    }

    sliderCreate(el) {
        $(el).find('span').attr('data-value', this.startValue);
        this.updateResult(this.startValue);
    }

    onChange(el, value) {
        $(el).find('span').attr('data-value', value);
        this.updateResult(value);
    }

    controller() {
        $('.tariffs a').click(e => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            this.tariff = 1 + parseInt($this.attr('data-percent')) / 100;
            this.updateResult(this.$slider.slider("value"));
            $('.result .after span').text($this.attr('data-duration'));
            $('.tariffs a').removeClass('active');
            $this.addClass('active');
        });
    }
}

function touchSwipe() {
    $(".slide").swipe({

        swipe: function swipe(event, direction, distance, duration, fingerCount, fingerData) {

            if (direction == 'left') jQuery(this).carousel('next');
            if (direction == 'right') jQuery(this).carousel('prev');
        },
        allowPageScroll: "vertical"

    });
}

function counter() {
    $('.counter').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({countNum: $this.text()}).animate({
                countNum: countTo
            },

            {

                duration: 8000,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                }

            });


    });
}

function scroll() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(function () {
            window.scrollTo(0, 0);
            setTimeout(() => {
                let top = $(hash).offset().top;
                $('body,html').animate({scrollTop: top}, Math.abs(top - $(document).scrollTop()) / 1.5);
            }, 100);
        }, 1);
    }
    $('.header-menu a , .footer .menu a[href*="#"]').click(function (event) {
        event.preventDefault();
        let target = $(this).attr('href'),
            top = $(target).offset().top;
        $('body,html').animate({scrollTop: top}, Math.abs(top - $(document).scrollTop()) / 1.5);
    });
}

function particles() {
    /* particlesJS.load('particles-js', 'js/particles.json', function () {

         console.log('callback - particles.js config loaded');
     });
    particlesJS.load('particles-js-footer', 'js/particles.json', function () {

         console.log('callback - particles.js config loaded');
     });*/
}

function header() {
    $('.header .toggle-btn').click(() => {
        $('.header .menu-nav').slideToggle();
        $('.header .toggle-btn').toggleClass('active');
    });
    $('.sidebar .toggle-btn').click(() => {
        $('.sidebar .sidebar-nav').slideToggle();
        $('.sidebar .toggle-btn').toggleClass('active');
    });
}

function fixedHeader() {
    if (window.innerWidth > 991) {
        $(window).scroll(() => {
            let $header = $('.header-wrapper');
            if (window.pageYOffset > 45 && !$header.hasClass('fixed-top')) {
                $header.addClass('fixed-top');
                $('.main').css('padding-top', $header.height() + 70)
            } else if (window.pageYOffset < 45 && $header.hasClass('fixed-top')) {
                $header.removeClass('fixed-top');
                $('.main').css('padding-top', 0)
            }
        });
    }
}

$(function () {
    if ($('body').hasClass('home')) {
        touchSwipe();
        scroll();
        particles();
    }
    header();
    fixedHeader();
    new TariffCalculator(1300, 100, 3000);
    $('.kpi').waypoint(() => {
        counter();
    });
    $('.user-nav .sign-up').click(e => $('.modal a[href="#register"]').tab('show'));
    $('.user-nav a:not(.sign-up)').click(e => $('.modal a[href="#login"]').tab('show'));
});