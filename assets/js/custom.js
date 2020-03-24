/*
 *
 *		CUSTOM.JS
 *
 */
 
(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 750,

        show: function(e, element) {

            // Disable right click
            if (e.waves === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 15)+')';

            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.4;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-waves-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .waves element.
     * returns null when .waves element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('waves')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .waves elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function(element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/waves
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);

(function($){
	
	// DETECT TOUCH DEVICE //
	function is_touch_device() {
		return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
	}
	
	
	// MENU SLIDE //
	function menu_slide() {
		
		$(".menu-slide-container").prepend('<a class="close-menu" href="#">&times</a>');
		
		$(".menu-button").on("click", function(e) {
			
			e.preventDefault();
			$(".menu-slide-container").toggleClass("menu-open");
			$("#header, #header-sticky").toggleClass("header-hidden");
			
		});
		
		$(".close-menu").on("click", function(e) {
			
			e.preventDefault();
			$(".menu-slide-container").removeClass("menu-open");
			$("#header, #header-sticky").removeClass("header-hidden");
			
		});
		
		$(".menu-slide li").each(function() {
			
			if ($(this).hasClass('dropdown') || $(this).hasClass('megamenu')) {
				$(this).append('<span class="arrow"></span>');
			}
		   
		});
		
		$(".menu-slide li.dropdown > span").on("click", function(e) {
		
			e.preventDefault();
			$(this).toggleClass("open").prev("ul").slideToggle(300);
		
		});
		
		$(".menu-slide li.megamenu > span").on("click", function(e) {
		
			e.preventDefault();
			$(this).toggleClass("open").prev("div").slideToggle(300);
		
		});
		
	}
	
	
	// SHOW/HIDE MOBILE MENU //
	function show_hide_mobile_menu() {
		
		$("#mobile-menu-button").on("click", function(e) {
            
			e.preventDefault();
			
			$("#mobile-menu").slideToggle(300);
			
        });	
		
	}
	
	
	// MOBILE MENU //
	function mobile_menu() {
       
        if ($(window).width() < 992) {
			
			if ($("#menu").length < 1) {
			
				$("#header").append('<ul id="menu" class="menu-2">');

				$("#menu-left").clone().children().appendTo($("#menu"));
				$("#menu-right").clone().children().appendTo($("#menu"));
			
			}
           
            if ($("#menu").length > 0) {
           
                if ($("#mobile-menu").length < 1) {
                   
                    $("#menu").clone().attr({
                        id: "mobile-menu",
                        class: ""
                    }).insertAfter("#header");
					
					$("#mobile-menu > li > a").addClass("waves");
                   
                    $("#mobile-menu li").each(function() {
               
                        if ($(this).hasClass('dropdown') || $(this).hasClass('megamenu')) {
                            $(this).append('<span class="arrow"></span>');
                        }
                       
                    });
                   
                    $("#mobile-menu .megamenu .arrow").on("click", function(e) {
                       
                        e.preventDefault();
                       
                        $(this).toggleClass("open").prev("div").slideToggle(300);
                       
                    });
                   
                    $("#mobile-menu .dropdown .arrow").on("click", function(e) {
                       
                        e.preventDefault();
                       
                        $(this).toggleClass("open").prev("ul").slideToggle(300);
                       
                    });
               
                }
               
            }
               
        } else {
           
            $("#mobile-menu").hide();
			$(".menu-2").hide();
           
        }
       
    }
	
	
	// STICKY //
	function sticky() {
		
		var sticky_point = 155;
		
		$("#header").clone().attr({
			id: "header-sticky",
			class: ""
		}).insertAfter("header");
		
		$(window).on("scroll", function(){
			
			if ($(window).scrollTop() > sticky_point) {  
				$("#header-sticky").slideDown(300).addClass("header-sticky");
				//$("#header .menu ul, #header .menu .megamenu-container").css({"visibility": "hidden"});
			} else {
				$("#header-sticky").slideUp(100).removeClass("header-sticky");
				$("#header .menu ul, #header .menu .megamenu-container").css({"visibility": "visible"});
			}
			
		});
		
	}
	
 
	// PROGRESS BARS // 
	function progress_bars() {
		
		$(".progress .progress-bar:in-viewport").each(function() {
			
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				$(this).animate({
					width: $(this).attr("data-width") + "%"
				}, 2000);
			}
			
		});
		
	}
	
	
	// COMPARISON BARS // 
	function comparison_bars() {
		
		$(".comparison-bars .progress .progress-bar:in-viewport").each(function() {
			
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated").animate({
					width: $(this).attr("data-width")/2 + "%"
				}, 2000);
			}
			
			if ($(this).attr("data-direction") == "left") {
				$(this).css({
					"right": 50 + "%",
					"text-align": "right"
				});
			} else {
				$(this).css({
					"left": 50 + "%",
					"text-align": "left"
				});
			}
			
		});
		
	}


	// CHARTS //
	function pie_chart() {
		
		if (typeof $.fn.easyPieChart !== 'undefined') {
		
			$(".pie-chart:in-viewport").each(function() {
				
				$(this).easyPieChart({
					animate: 1500,
					lineCap: "square",
					lineWidth: $(this).attr("data-line-width"),
					size: $(this).attr("data-size"),
					barColor: $(this).attr("data-bar-color"),
					trackColor: $(this).attr("data-track-color"),
					scaleColor: "transparent",
					onStep: function(from, to, percent) {
						$(this.el).find(".pie-chart-percent .value").text(Math.round(percent));
					}
				});
				
			});
			
		}
		
	}
	
	// COUNTER //
	function counter() {
		
		if (typeof $.fn.jQuerySimpleCounter !== 'undefined') {
		
			$(".counter .counter-value:in-viewport").each(function() {
				
				if (!$(this).hasClass("animated")) {
					$(this).addClass("animated");
					$(this).jQuerySimpleCounter({
						start: 0,
						end: $(this).attr("data-value"),
						duration: 2000
					});	
				}
			
			});
			
		}
	}
	
	
	// ODOMETER //
	function odometer() {
		
		if (typeof Odometer !== 'undefined') {
			
			$(".odometer:in-viewport").each(function(index) {											
				
				var new_id = 'odometer-' + index;
				
				this.id = new_id;
				
				var value = $(this).attr("data-value");
				
				if (!$(this).hasClass("animated")) {
					
					$(this).addClass("animated");
					
					setTimeout(function() {
						document.getElementById(new_id).innerHTML = value;
					});
					
				}
				
			});
		
		}
		
	}
	
	
	// LOAD MORE PROJECTS //
	function load_more_projects() {
	
		var number_clicks = 0;
		
		$(".load-more").on("click", function(e) {
			
			e.preventDefault();
			
			if (number_clicks == 0) {
				$.ajax({
					type: "POST",
					url: $(".load-more").attr("href"),
					dataType: "html",
					cache: false,
					msg : '',
					success: function(msg) {
						$(".isotope").append(msg);	
						$(".isotope").imagesLoaded(function() {
							$(".isotope").isotope("reloadItems").isotope();
							$(".fancybox").fancybox({
								prevEffect: 'none',
								nextEffect: 'none',
								padding: 0
							});
						});
						number_clicks++;
						$(".load-more").html("Nothing to load");
					}
				});
			}
			
		});
		
	}
	
	
	// SHOW/HIDE SCROLL UP //
	function show_hide_scroll_top() {
		
		if ($(window).scrollTop() > $(window).height()/2) {
			$("#scroll-up").fadeIn(300);
		} else {
			$("#scroll-up").fadeOut(300);
		}
		
	}
	
	
	// SCROLL UP //
	function scroll_up() {				
		
		$("#scroll-up").on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
	}
	
	
	// INSTAGRAM FEED //
	function instagram_feed() {

		if ((typeof Instafeed !== 'undefined') & ($("#instafeed").length > 0)) {

			var nr = $("#instafeed").data('number');
			var userid = $("#instafeed").data('user');
			var accesstoken = $("#instafeed").data('accesstoken');
			
			var feed = new Instafeed({
				target: 'instafeed',
				get: 'user',
				userId: userid,
				accessToken: accesstoken,
				limit: nr,
				resolution: 'thumbnail',
				sortBy: 'most-recent'
			});
			
			feed.run();
		
		}
		
	}
	
	
	// ANIMATIONS //
	function animations() {
		
		if (typeof WOW !== 'undefined') {
		
			animations = new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 100,
				mobile: false,
				live: true
			});
			
			animations.init();
		
		}
		
	}
	
	
	// IMAGE BOX //
	function image_box() {
		
		if ($(window).width() > 767 ) {
		
			$(".image-box").each(function() {
				
				var x = $(this).innerHeight();
				
				$(this).find(".image-box-thumbnail").css("height", x + "px");
				
			});
			
		} else {
			$(".image-box-thumbnail").css("height", 550);
		}

	}
	
	
	// LOCATION DETAILS //
	function location_details() {
		
		$(".location-details").prepend('<a class="close-details" href="#">&times</a>');
		
		$(".close-details").on("click", function(e) {
			
			e.preventDefault();
			$(".location-details").slideUp(200);
			
		});
		
	}
	
	
	// EQUAL HEIGHT //
	function equal_height() {

		$(".text-boxes-list").each(function() {
			
			var x = 0;
			
			$(this).find("li").each(function() {
				
				if ($(this).height() > x) {
					x = $(this).height();
				}
				
			});
			
			$(this).find(".text-box").css("height", x + "px");

		});

	}
	
	
	// MULTILAYER PARALLAX //
	function multilayer_parallax() {
		
		$(".multilayer-parallax .parallax-layer").each(function(){
			
			var x = parseInt($(this).attr("data-x"), 10),
				y = parseInt($(this).attr("data-y"), 10);
			
			$(this).css({
				"left": x + "%", 
				"top": y + "%"
			});
			
			if ($(this).attr("data-x") === "center") {
				$(this).addClass("x-center");
			}
			
		});

	}
	
	
	// STATISTICS //
	function statistics() {
		
		if (typeof Chart !== 'undefined') {
		
			$(".statistics-container .animate-chart:in-viewport").each(function() {
				
				if(!$(this).hasClass("animated")) {
					
					$(this).addClass("animated");
					
					// AREA CHART //
					var data1 = {
						labels : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
						datasets : [
							{
								fill: "true",
								label: "Revenue",
								backgroundColor: "#cbcbcb",
								borderWidth: 1,
								borderColor: "#cbcbcb",
								pointBorderColor: "#cbcbcb",
								pointBackgroundColor: "#fff",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "#cbcbcb",
								pointBorderWidth: 1,
								pointHoverBorderWidth: 1,
								tension: 0.4,
								stacked: false,
								data : [35, 30, 60, 65, 100, 65, 40, 90, 70, 60, 65, 70, 120, 85, 55, 70, 120, 180, 100, 70, 60, 70, 100, 60, 75]
							}
						]
					}
					
					if ($("#area-chart").length > 0) {
						
						var area_chart = new Chart(document.getElementById("area-chart").getContext("2d"), {
							type: 'line',
							data: data1,
							options: {
								responsive: true,
								legend: {
									display: true,
									labels: {
										boxWidth: 12,
										fontColor: "#838383",
										fontFamily: "Roboto",
										fontSize: 12,
										padding: 20
									}
								},
								tooltips: {
									enabled: false
								},
								scales: {
									xAxes: [{
										display: true,
										gridLines: {
											color: "rgba(0, 0, 0, 0.05)",
											zeroLineColor:"rgba(0, 0, 0, 0.05)"
										},
									}],
									yAxes: [{
										display: true,
										gridLines: {
											color: "rgba(0, 0, 0, 0)",
											zeroLineColor:"rgba(0, 0, 0, 0.05)"
										},
										ticks: {
											suggestedMin: 0,
											suggestedMax: 200,
										}
									}]
								}
							}
						});

					}
					
					
					// LINE CHART //
					var data2 = {
						labels : ["Jan 2015", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Dec 2016"],
						datasets : [
							{
								fill: "true",
								label: "2016 Financial Stats",
								backgroundColor: "transparent",
								borderWidth: 2,
								borderColor: "#fff",
								pointBorderColor: "#fff",
								pointBackgroundColor: "#fff",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "#fff",
								pointBorderWidth: 1,
								pointHoverBorderWidth: 1,
								tension: 0.1,
								stacked: false,
								data : [35, 30, 60, 65, 100, 65, 40, 90, 70, 60, 65, 70, 120, 85, 55, 70, 120, 180, 100, 70, 60, 70, 100, 60, 75]
							}
						]
					}
					
					if ($("#line-chart").length > 0) {
						
						var area_chart = new Chart(document.getElementById("line-chart").getContext("2d"), {
							type: 'line',
							data: data2,
							options: {
								responsive: true,
								legend: {
									display: true,
									labels: {
										boxWidth: 0,
										fontColor: "#fff",
										fontFamily: "Montserrat",
										fontSize: 16,
										padding: 20
									}
								},
								tooltips: {
									enabled: false
								},
								scales: {
									fontColor: "#f00",
									xAxes: [{
										display: true,
										gridLines: {
											color: "rgba(0, 0, 0, 0)",
											zeroLineColor:"rgba(0, 0, 0, 0)"
										},
										ticks: {
											fontColor: "#fff",
											fontSize: 13,
											fontFamily: "Montserrat",
											maxRotation: 0
										}
									}],
									yAxes: [{
										display: false,
										ticks: {
											suggestedMin: 0,
											suggestedMax: 200,
										}
									}]
								}
							}
						});

					}
					
					// BAR CHART //
					var data3 = {
						labels : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
						datasets : [
							{
								label: "Revenue",
								backgroundColor: "#cbcbcb",
								borderColor: "#fff",
								borderWidth: 3,
								hoverBorderWidth: 3,
								hoverBackgroundColor: "#cbcbcb",
								hoverBorderColor: "#fff",
								data : [35, 30, 60, 65, 100, 65, 40, 90, 70, 60, 65, 70, 120, 85, 55, 70, 120, 180, 100, 70, 60, 70, 100, 60, 75]
							}
						]
					}
					
					if ($("#bar-chart").length > 0) {
						
						var bar_chart = new Chart(document.getElementById("bar-chart").getContext("2d"), {
							type: 'bar',
							data: data3,
							options: {
								responsive: true,
								legend: {
									display: true,
									labels: {
										boxWidth: 12,
										fontColor: "#838383",
										fontFamily: "Roboto",
										fontSize: 12,
										padding: 20
									}
								},
								tooltips: {
									enabled: true,
									xPadding: 15
								},
								scales: {
									xAxes: [{
										display: true
									}],
									yAxes: [{
										display: true,
										ticks: {
											suggestedMin: 0,
											suggestedMax: 200,
										}
									}]
								}
							}
						});

					}
					
					
					// DOUGHNUT CHART //
					var data4 = {
						labels: [
							"Credibility",
							"Sustenability",
							"Economy"
						],
						datasets: [
						{
							data: [20, 10, 70],
							borderWidth: 0,
							backgroundColor: [
								"#cbcbcb",
								"#aeaeae",
								"#d7d7d7"
							],
							hoverBackgroundColor: [
								"#cbcbcb",
								"#aeaeae",
								"#d7d7d7"
							]
						}]
					};
					
					if ($("#doughnut-chart").length > 0) {
						
						var doughnut_chart = new Chart(document.getElementById("doughnut-chart").getContext("2d"), {
							type: 'doughnut',
							data: data4,
							options: {
								cutoutPercentage: 80,
								responsive: true,
								legend: {
									display: true,
									position: "bottom",
									labels: {
										boxWidth: 12,
										fontFamily: "Roboto",
										fontSize: 12,
										padding: 20
									}
								},
								tooltips: {
									enabled: false
								},
								scales: {
									xAxes: [{
										display: false
									}],
									yAxes: [{
										display: false,
									}]
								}
							}
						});

					}
					
					
					// PIE CHART //
					var data5 = {
						labels: [
							"Credibility",
							"Sustenability",
							"Economy"
						],
						datasets: [
						{
							data: [20, 10, 70],
							borderWidth: 0,
							backgroundColor: [
								"#cbcbcb",
								"#aeaeae",
								"#d7d7d7"
							],
							hoverBackgroundColor: [
								"#cbcbcb",
								"#aeaeae",
								"#d7d7d7"
							]
						}]
					};
					
					if ($("#pie-chart").length > 0) {
						
						var pie_chart = new Chart(document.getElementById("pie-chart").getContext("2d"), {
							type: 'pie',
							data: data5,
							options: {
								responsive: true,
								legend: {
									display: true,
									position: "bottom",
									labels: {
										boxWidth: 12,
										fontColor: "#838383",
										fontFamily: "Roboto",
										fontSize: 12,
										padding: 20
									}
								},
								tooltips: {
									enabled: false
								},
								scales: {
									xAxes: [{
										display: false
									}],
									yAxes: [{
										display: false,
									}]
								}
							}
						});

					}
					
				}
				
			});
			
		}
		
	}
	
	
	// FULL SCREEN //
	function full_screen() {

		if ($(window).width() > 767) {
			$(".full-screen").css("height", $(window).height() + "px");
		} else {
			$(".full-screen").css("height", "auto");
		}

	}
	
	
	// DOCUMENT READY //
	$(document).ready(function(){
		
		// STICKY //
		if ($("body").hasClass("sticky-header")) {
			sticky();
		}
		
		
		// MENU //
		if (typeof $.fn.superfish !== 'undefined') {
			
			$(".menu").superfish({
				delay: 500,
				animation: {
					opacity: 'show',
					height: 'show'
				},
				speed: 'fast',
				autoArrows: true
			});
			
		}
		
		
		// MENU SLIDE //
		menu_slide();
		
		
		// SHOW/HIDE MOBILE MENU //
		show_hide_mobile_menu();
		
		
		// MOBILE MENU //
		mobile_menu();
		
		
		// FANCYBOX //
		if (typeof $.fn.fancybox !== 'undefined') {
		
			$(".fancybox").fancybox({
				prevEffect: 'none',
				nextEffect: 'none',
				padding: 0
			});
			
			$(".login a").fancybox({
				maxWidth: 450,
				maxHeight: 450,
				fitToView: false,
				width: '90%',
				height: '90%',
				padding: 0,
				autoSize: false,
				closeClick: false,
				openMethod: 'dropIn',
				openSpeed: 150,
				closeMethod: 'dropOut',
				closeSpeed: 150,
				beforeShow: function () {
					$("#main-container").addClass("bluring");
					console.log('login works')

				},
				afterClose: function () {
					$("#main-container").removeClass("bluring");
					console.log('login works')

				}
				
			});

			$(".probootstrap-footer-widget .create-account-footer").fancybox({
				maxWidth: 450,
				maxHeight: 450,
				fitToView: false,
				width: '90%',
				height: '90%',
				padding: 0,
				autoSize: false,
				closeClick: false,
				openMethod: 'dropIn',
				openSpeed: 150,
				closeMethod: 'dropOut',
				closeSpeed: 150,
				beforeShow: function () {
					$("#main-container").addClass("bluring");
					console.log('footer works')

				},
				afterClose: function () {
					$("#main-container").removeClass("bluring");
					console.log('footer works')

				}
			});
			
			$(".search a").fancybox({
				maxWidth: 1140,
				maxHeight: 100,
				fitToView: false,
				width: '90%',
				height: '100%',
				padding: 0,
				autoSize: false,
				closeClick: false,
				openMethod: 'dropIn',
				openSpeed: 150,
				closeMethod: 'dropOut',
				closeSpeed: 150,
				beforeShow: function () {
					$("#main-container").addClass("bluring");
				},
				afterClose: function () {
					$("#main-container").removeClass("bluring");
				}
			});
			
				$(".modall a").fancybox({
				maxWidth: 800,
				maxHeight: 800,
				fitToView: false,
				width: '90%',
				height: '100%',
				padding: 0,
				autoSize: false,
				closeClick: false,
				openMethod: 'dropIn',
				openSpeed: 150,
				closeMethod: 'dropOut',
				closeSpeed: 150
				
			});
				$(".modalll a").fancybox({
				maxWidth: 800,
				maxHeight: 800,
				fitToView: false,
				width: '90%',
				height: '100%',
				padding: 0,
				autoSize: false,
				closeClick: false,
				openMethod: 'dropIn',
				openSpeed: 150,
				closeMethod: 'dropOut',
				closeSpeed: 150
				
			});
		
		}
		
		// REVOLUTION SLIDER //
		if (typeof $.fn.revolution !== 'undefined') {
			
			$(".rev_slider").revolution({
				sliderType: "standard",
				sliderLayout: "auto",
				delay: 9000,
				spinner: 'none',
				navigation: {
					arrows:{
						style: "custom",
						enable: true,
						hide_onmobile: true,
						hide_onleave: false,
						hide_delay: 200,
						hide_delay_mobile: 1200,
						hide_under: 0,
						hide_over: 9999,
						tmp: '',
						left: {
							h_align: "left",
							v_align: "center",
							h_offset: 20,
							v_offset: 0
						 },
						 right: {
							h_align: "right",
							v_align: "center",
							h_offset: 20,
							v_offset: 0
						 }
					},
					bullets:{
						style: "custom",
						enable: true,
						hide_onmobile: false,
						hide_onleave: false,
						hide_delay: 200,
						hide_delay_mobile: 1200,
						hide_under: 0,
						hide_over: 9999,
						tmp: '', 
						direction: "horizontal",
						space: 10,       
						h_align: "center",
						v_align: "bottom",
						h_offset: 0,
						v_offset: 40
					},
					touch:{
						touchenabled: "on",
						swipe_treshold: 75,
						swipe_min_touches: 1,
						drag_block_vertical: false,
						swipe_direction: "horizontal"
					}
				},			
				gridwidth: 1170,
				gridheight: 800		
			});
			
		}
	
	
		// OWL Carousel //
		if (typeof $.fn.owlCarousel !== 'undefined') {
			
			// IMAGES SLIDER //
			$(".owl-carousel.images-slider").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				smartSpeed: 1200,
				loop: true,
				nav: false,
				navText: false,
				dots: true,
				mouseDrag: true,
				touchDrag: true,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut'
			});
			
			
			// TESTIMONIALS SLIDER //
			$(".owl-carousel.testimonials-slider").owlCarousel({
				items: 1,
				autoplay: true,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				smartSpeed: 300,
				loop: true,
				nav: false,
				navText: false,
				dots: true,
				mouseDrag: true,
				touchDrag: true
			});
			
			
			// LOGOS SLIDER //
			$(".owl-carousel.logos-slider").owlCarousel({
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				smartSpeed: 1200,
				loop: true,
				nav: true,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				responsive: {
					0:{
						items: 1
					},
					480:{
						items: 2
					},
					768:{
						items: 3
					},
					992:{
						items: 4
					},
					1200:{
						items: 5
					}
				}
			});
			
			
			// HORIZONTAL TIMELINE //
			$(".owl-carousel.horizontal-timeline").owlCarousel({
				autoplay: false,
				smartSpeed: 1200,
				loop: false,
				nav: true,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				margin: 25,
				responsive: {
					0:{
						items: 1
					},
					768:{
						items: 2
					},
					991:{
						items: 3
					}
				}
			});
			
			
			// PROCESS SLIDER //
			$(".owl-carousel.process-slider").owlCarousel({
				autoplay: false,
				smartSpeed: 1200,
				loop: false,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				responsive: {
					0:{
						items: 1
					},
					768:{
						items: 2
					},
					991:{
						items: 3
					}
				}
			});
			
			
			// ROUNDED IMAGES SLIDER //
			$(".owl-carousel.rounded-images-carousel").owlCarousel({
				autoplay: false,
				smartSpeed: 700,
				loop: true,
				nav: true,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				center: true,
				margin: 25,
				responsive: {
					0:{
						items: 1
					},
					768:{
						items: 2
					},
					991:{
						items: 3
					}
				}
			});
			
			
			// PORTFOLIO SLIDER //
			$(".owl-carousel.portfolio-slider").owlCarousel({
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				smartSpeed: 1200,
				loop: true,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				responsive: {
					0:{
						items: 2
					},
					480:{
						items: 3
					},
					768:{
						items: 4
					},
					992:{
						items: 5
					},
					1200:{
						items: 6
					}
				}
			});
			
			
			// TEAM SLIDER //
			$(".owl-carousel.team-slider").owlCarousel({
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				smartSpeed: 1200,
				loop: true,
				nav: false,
				navText: false,
				dots: false,
				mouseDrag: true,
				touchDrag: true,
				responsive: {
					0:{
						items: 1
					},
					480:{
						items: 2
					},
					768:{
						items: 3
					},
					992:{
						items: 4
					},
					1200:{
						items: 5
					},
					1400:{
						items: 6
					}
				}
			});
		
		}
		
		
		// GOOGLE MAPS //
		if (typeof $.fn.gmap3 !== 'undefined') {
		
			$(".map").each(function() {
				
				var data_zoom = 15,
					data_height,
					data_popup = false;
				
				if ($(this).attr("data-zoom") !== undefined) {
					data_zoom = parseInt($(this).attr("data-zoom"),10);
				}	
				
				if ($(this).attr("data-height") !== undefined) {
					data_height = parseInt($(this).attr("data-height"),10);
				}
				
				if ($(this).attr("data-address-details") !== undefined) {
					
					data_popup = true;
					
					var infowindow = new google.maps.InfoWindow({
						content: $(this).attr("data-address-details")
					});
					
				}
				
				
				$(this)
				.gmap3({
					address: $(this).attr("data-address"),
					zoom: data_zoom,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					scrollwheel: false
				})
				.marker([
					{address: $(this).attr("data-address")}
				])
				.on({
					click: function(marker, event){
						if (data_popup) {
							infowindow.open(marker.get('map'), marker);
						}
					}
				});
				  
				$(this).css("height", data_height + "px");
				
			});
			
		}
		
		
		// ISOTOPE //
		if ((typeof $.fn.imagesLoaded !== 'undefined') && (typeof $.fn.isotope !== 'undefined')) {
		
			$(".isotope").imagesLoaded( function() {
				
				var container = $(".isotope"),
					container_masonry = $(".isotope.masonry"),
					x = 0;
					
				if (($(window).width() > 1200) && ($(window).width() < 1367)) {
					x = 3;
				} else {
					x = 0;
				}
				
				container.isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					transitionDuration: '0.4s'
				});
				
				container_masonry.isotope({
					itemSelector: '.isotope-item',
					layoutMode: 'masonry',
					masonry: {
						columnWidth: 1,
						gutter: x
					},
					transitionDuration: '0.4s'
				});
				
				$(".filter li a").on("click", function() {
					$(".filter li a").removeClass("active");
					$(this).addClass("active");
		
					var selector = $(this).attr("data-filter");
					
					container.isotope({
						filter: selector
					});
					
					container_masonry.isotope({
						filter: selector
					});
		
					return false;
				});
		
				$(window).resize(function() {
					
					container.isotope();
					container_masonry.isotope();
					
				});
				
			});
			
		}
		
		
		// LOAD MORE PORTFOLIO ITEMS //
		load_more_projects();
		
		
		// PLACEHOLDER //
		if (typeof $.fn.placeholder !== 'undefined') {
			
			$("input, textarea").placeholder();
			
		}
		
		
		// CONTACT FORM VALIDATE & SUBMIT //
		// VALIDATE //
		if (typeof $.fn.validate !== 'undefined') {
		
			$("#contact-form").validate({
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					subject: {
						required: true
					},
					message: {
						required: true,
						minlength: 3
					}
				},
				messages: {
					name: {
						required: "Please enter your name!"
					},
					email: {
						required: "Please enter your email!",
						email: "Please enter a valid email address"
					},
					subject: {
						required: "Please enter the subject!"
					},
					message: {
						required: "Please enter your message!"
					}
				},
					
				// SUBMIT //
				submitHandler: function(form) {
					var result;
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "assets/php/send.php",
						success: function(msg) {
							
							if (msg == 'OK') {
								result = '<div class="alert alert-success">Your message was successfully sent!</div>';
								$("#contact-form").clearForm();
							} else {
								result = msg;
							}
							
							$("#alert-area").html(result);
		
						},
						error: function() {
		
							result = '<div class="alert alert-danger">There was an error sending the message!</div>';
							$("#alert-area").html(result);
		
						}
					});
				}
			});
			
		}
		
		
		// PARALLAX //
		if (typeof $.fn.stellar !== 'undefined') {
			
			// MULTILAYER PARALLAX //
			multilayer_parallax();
		
			if (!is_touch_device()) {
				
				$(window).stellar({
					horizontalScrolling: false,
					verticalScrolling: true,
					responsive: true
				});
				
			} else {
				
				$(".parallax").addClass("parallax-disable");
				
			}
		
		}
		
		
		// SHOW/HIDE SCROLL UP
		show_hide_scroll_top();
		
		
		// SCROLL UP //
		scroll_up();
		
		
		// COMPARISON BARS // 
		comparison_bars();
		
		
		// PROGRESS BARS //
		progress_bars();
		
		
		// PIE CHARTS //
		pie_chart();
		
		
		// COUNTER //
		counter();
		
		
		// ODOMETER //
		odometer();
		
		
		// YOUTUBE PLAYER //
		if (typeof $.fn.mb_YTPlayer !== 'undefined') {
			
			$(".youtube-player").mb_YTPlayer();
		
		}
		
		
		// INSTAGRAM FEED //
		instagram_feed();
		
		
		// TWITTER //
		if(typeof twitterFetcher !== 'undefined' && ($('.widget-twitter').length > 0)) {
			
			$('.widget-twitter').each(function(index){
			
				var account_id = $('.tweets-list', this).attr('data-account-id'),
					items = $('.tweets-list', this).attr('data-items'),
					newID = 'tweets-list-' + index;
				
				$('.tweets-list', this).attr('id', newID);
				
				var config = {
				  "id": account_id,
				  "domId": newID,
				  "maxTweets": items,
				  "showRetweet": false,
				  "showTime": false,
				  "showUser": false,
				  "showInteraction": false
				};
				
				twitterFetcher.fetch(config);
			});
			
		}
		
		
		// COUNTDOWN //
		if (typeof $.fn.countdown !== 'undefined') {
			
			$(".countdown").countdown('2017/12/31 00:00', function(event) {
				$(this).html(event.strftime(
					'<div><div class="count">%-D</div> <span>Days</span></div>' +
					'<div><div class="count">%-H</div> <span>Hours</span></div>' +
					'<div><div class="count">%-M</div> <span>Minutes</span></div>' +
					'<div><div class="count">%S</div> <span>Seconds</span></div>'
				));
			});
		
		}
		
		
		// ANIMATIONS //
		animations();
		
		
		// IMAGE BOX //
		image_box();
		
		
		// LOCATION DETAILS //
		location_details();
		
		
		// EQUAL HEIGHT //
		equal_height();
		
		
		// STATISTICS //
		statistics();
		
		
		// FULL SCREEN //
		full_screen();
		
		
		// FULLPAGE //
		if (typeof $.fn.fullpage !== 'undefined') {
			
			$('.fullpage').fullpage({
				scrollBar: true,
				fitToSection: false,
				scrollOverflow: true,
				keyboardScrolling: false
			});
		
		}
		
	});

	
	// WINDOW SCROLL //
	$(window).on("scroll", function() {
		
		comparison_bars();
		progress_bars();
		pie_chart();
		counter();
		odometer();
		show_hide_scroll_top();
		statistics();
		
	});
	
	
	// WINDOW RESIZE //
	$(window).resize(function() {

		mobile_menu();
		image_box();
		equal_height();
		full_screen();
		
	});
	
})(window.jQuery);

(function ($, F) {
    
    // Opening animation - fly from the top
    F.transitions.dropIn = function() {
        var endPos = F._getPosition(true);

        endPos.top = (parseInt(endPos.top, 10) - 200) + 'px';
        endPos.opacity = 0;
        
        F.wrap.css(endPos).show().animate({
            top: '+=200px',
            opacity: 1
        }, {
            duration: F.current.openSpeed,
            complete: F._afterZoomIn
        });
    };

    // Closing animation - fly to the top
    F.transitions.dropOut = function() {
        F.wrap.removeClass('fancybox-opened').animate({
            top: '-=200px',
            opacity: 0
        }, {
            duration: F.current.closeSpeed,
            complete: F._afterZoomOut
        });
    };
	


}(jQuery, jQuery.fancybox));
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
