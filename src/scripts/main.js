require.config({
    paths: {
        "wowjs": "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min",
        "snap":"http://tympanus.net/Tutorials/ShapeHoverEffectSVG/js/snap.svg-min",
        "Barba":"https://cdnjs.cloudflare.com/ajax/libs/barba.js/0.0.10/barba.min",
        "TweenMax":"https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.1/TweenMax.min"
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

require(['Barba','TweenMax'],function(Barba, TweenMax) {
        Barba.Pjax.start();
        var lastElementClicked;
        var NextLink = document.querySelector('a.next');

        Barba.Pjax.init();
        Barba.Prefetch.init();

        Barba.Dispatcher.on('linkClicked', function(el) {
            lastElementClicked = el;
        });

        var MovePage = Barba.BaseTransition.extend({
            start: function() {
                this.originalThumb = lastElementClicked;

                Promise
                    .all([this.newContainerLoading, this.scrollTop()])
                    .then(this.movePages.bind(this));
            },

            scrollTop: function() {
                var deferred = Barba.Utils.deferred();
                var obj = { y: window.pageYOffset };

                TweenLite.to(obj, 0.4, {
                    y: 0,
                    onUpdate: function() {
                        if (obj.y === 0) {
                            deferred.resolve();
                        }

                        window.scroll(0, obj.y);
                    },
                    onComplete: function() {
                        deferred.resolve();
                    }
                });

                return deferred.promise;
            },

            movePages: function() {
                var _this = this;
                var goingForward = true;
                this.updateLinks();

                TweenLite.set(this.newContainer, {
                    visibility: 'visible',
                    xPercent: goingForward ? 100 : -100,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    right: 0
                });

                TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
                TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
                    TweenLite.set(_this.newContainer, { clearProps: 'all' });
                    _this.done();
                }});
            },

            updateLinks: function() {
                NextLink.href = this.newContainer.dataset.next;
            },

            getNewPageFile: function() {
                return Barba.HistoryManager.currentStatus().url.split('/').pop();
            }
        });

        Barba.Pjax.getTransition = function() {
            return MovePage;
        };
});