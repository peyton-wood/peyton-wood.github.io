
jQuery('document').ready(function() {
    $('.mobile-nav-links').hide();

    $('#hamburger-menu').click(function() {
        $('.mobile-nav-links').toggle();
    });
});

