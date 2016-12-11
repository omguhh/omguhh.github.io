require.config({
    paths: {
        "wowjs": "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min",
        "snap":"http://tympanus.net/Tutorials/ShapeHoverEffectSVG/js/snap.svg-min"
    }
});

require(['wowjs', 'snap'], function() {
    (function() {
        function init() {
            var speed = 330,
                easing = mina.backout;
            [].slice.call ( document.querySelectorAll( '#grid > a' ) ).forEach( function( el ) {
                var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
                    pathConfig = {
                        from : path.attr( 'd' ),
                        to : el.getAttribute( 'data-path-hover' )
                    };
                el.addEventListener( 'mouseenter', function() {
                    path.animate( { 'path' : pathConfig.to }, speed, easing );
                } );
                el.addEventListener( 'mouseleave', function() {
                    path.animate( { 'path' : pathConfig.from }, speed, easing );
                } );
            } );
        }
        init();
    })();

    var wow = new WOW(
        {
            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 50,          // distance to the element when triggering the animation (default is 0)
            mobile: true,       // trigger animations on mobile devices (default is true)
            live: true,       // act on asynchronously loaded content (default is true)
            callback: function (box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();
});