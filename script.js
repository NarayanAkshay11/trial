$(document).ready(function() {
    // Counter animation
    function animateCounter() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.attr('data-target'));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            },
            {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when the element comes into view
    $(window).scroll(function() {
        var counterTop = $('#counter').offset().top;
        var windowHeight = $(window).height();
        var scroll = $(window).scrollTop();

        if (scroll + windowHeight > counterTop) {
            animateCounter();
            $(window).off('scroll'); // Remove the scroll event listener after animation
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80 // Adjust for fixed header
            }, 1000);
        }
    });

    // Mobile menu toggle
    $('.mobile-menu-toggle').on('click', function() {
        $('nav ul').toggleClass('show');
    });
});
