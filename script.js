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
        if (target.length) {
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

    // Search functionality
    function performSearch() {
        var query = $('#search-input').val().toLowerCase();
        var results = [];

        // Example search data
        var searchData = [
            { title: "Home", url: "index.html", keywords: "home, welcome, start" },
            { title: "About", url: "about.html", keywords: "about, information, details" },
            { title: "ASV", url: "asv.html", keywords: "autonomous surface vehicle, specs, details" },
            { title: "Team", url: "team.html", keywords: "team, members, people" },
            { title: "Sponsors", url: "sponsors.html", keywords: "sponsors, support, funding" },
            { title: "Contact Us", url: "contact.html", keywords: "contact, get in touch, reach out" },
            { title: "Papers", url: "papers.html", keywords: "papers, research, articles" }
        ];

        searchData.forEach(function(item) {
            if (item.title.toLowerCase().includes(query) || item.keywords.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        if (results.length > 0) {
            var resultsHTML = '<ul>';
            results.forEach(function(result) {
                resultsHTML += '<li><a href="' + result.url + '">' + result.title + '</a></li>';
            });
            resultsHTML += '</ul>';
            $('#search-results').html(resultsHTML).show();
        } else {
            $('#search-results').html('<p>No results found.</p>').show();
        }
    }

    // Trigger search on button click or Enter key press
    $('#search-button').on('click', function() {
        performSearch();
    });

    $('#search-input').on('keypress', function(event) {
        if (event.which === 13) { // Enter key
            performSearch();
        }
    });

    // Hide search results when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#search-container').length) {
            $('#search-results').hide();
        }
    });
});
