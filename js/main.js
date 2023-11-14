       //--------------------------------------------------------------------------------------------------------------------------------
       //This is JS file that contains principal fuctions of main */
       // -------------------------------------------------------------------------------------------------------------------------------
       

setTimeout(function(){ 
$(document).ready(function ($) {


           'use strict';

           ////=================================== Twitter Feed  ===============================//

           //$("#twitter").tweet({
           //    modpath: 'js/twitter/index.php',
           //    username: "envato", // Change for Your Username
           //    count: 5,
           //    loading_text: "Loading tweets..."
           //});

           ////=================================== Flikr Feed  ========================================//

           //$('#flickr').jflickrfeed({
           //    limit: 8, //Number of images to be displayed
           //    qstrings: {
           //        id: '31238496@N04'//Change this to any Flickr Set ID as you prefer in http://idgettr.com/
           //    },
           //    itemTemplate: '<li><a href="{{image_b}}" class="fancybox"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
           //});

           //=================================== Google Map  ==============================//

           /*
             Map Settings
             Find the Latitude and Longitude of your address:  
             - http://universimmedia.pagesperso-orange.fr/geo/loc.htm  
             - http://www.findlatitudeandlongitude.com/find-address-from-latitude-and-longitude/
           */

           // Map Markers
           var mapMarkers = [{
               image: "img/locations/centennial.jpg",
               address: "12400 West McMillan Road, Boise, ID 83713",
               title: "Centennial High School",
               descr: "Home to those teams who do not have field of their own.  The majority of ICFL games will be played at this location",
               latitude: "43.648596",
               longitude: "-116.336963",
               html: "",
               icon: {
                   image: "img/img-theme/pin.png",
                   iconsize: [26, 46],
                   iconanchor: [12, 46]
               }
           }, {
               image: "img/locations/middleton.jpg",
               address: "200 S 4th Ave W, Middleton, ID 83644",
               title: "Middleton Middle School",
               descr: "Home of the Lancers",
               latitude: "43.705587",
               longitude: "-116.629185",
               html: "",
               icon: {
                   image: "img/img-theme/pin.png",
                   iconsize: [26, 46],
                   iconanchor: [12, 46]
               }
           }, {
               image: "img/locations/nampachristian.png",
               address: "11920 West Flamingo Avenue, Nampa, ID 83651",
               title: "Nampa Christian High School",
               descr: "Home of the Rough Riders",
               latitude: "43.598843",
               longitude: "-116.631808",
               html: "",
               icon: {
                   image: "img/img-theme/pin.png",
                   iconsize: [26, 46],
                   iconanchor: [12, 46]
               }
           }, {
               image: "img/locations/emmett.png",
               address: "West 12th Street, Emmett, ID 83617",
               title: "Emmett High School",
               descr: "Home of the Canyon Phoenix",
               latitude: "43.864521",
               longitude: "-116.508735",
               html: "",
               icon: {
                   image: "img/img-theme/pin.png",
                   iconsize: [26, 46],
                   iconanchor: [12, 46]
               }
           }];

           for (var i = 0; i < mapMarkers.length; i++) {
               mapMarkers[i].html = "<strong>" + mapMarkers[i].title + "</strong><br><a href='#' onclick='$(\"#map\").gMap(\"centerAt\", {latitude: " + mapMarkers[i].latitude + ", longitude: " + mapMarkers[i].longitude + ", zoom: 16})'>" + mapMarkers[i].address + "</a>";
           }

           // Map Initial Location
           var initLatitude = 43.613280;
           var initLongitude = -116.357188;

           // Map Extended Settings
           var mapSettings = {
               controls: {
                   panControl: true,
                   zoomControl: true,
                   mapTypeControl: true,
                   scaleControl: true,
                   streetViewControl: true,
                   overviewMapControl: true
               },
               scrollwheel: false,
               markers: mapMarkers,
               latitude: initLatitude,
               longitude: initLongitude,
               zoom: 9
           };

           $("#map").gMap(mapSettings);
    

           //=================================== Counter  ==============================//

           $('#event-one').countdown('2016/03/26', function (event) {
               var $this = $(this).html(event.strftime(''
               + '<span>%D <br> <small>days</small></span>  '
               + '<span>%H <br> <small>hr</small> </span>  '
               + '<span>%M <br> <small>min</small> </span>  '
               + '<span>%S <br> <small>sec</small></span> '));
           });
           $('#event-two').countdown('2016/06/04', function (event) {
               var $this = $(this).html(event.strftime(''
               + '<span>%D <br> <small>days</small></span>  '
               + '<span>%H <br> <small>hr</small> </span>  '
               + '<span>%M <br> <small>min</small> </span>  '
               + '<span>%S <br> <small>sec</small></span> '));
           });
           $('#event-three').countdown('2016/06/18', function (event) {
               var $this = $(this).html(event.strftime(''
               + '<span>%D <br> <small>days</small></span>  '
               + '<span>%H <br> <small>hr</small> </span>  '
               + '<span>%M <br> <small>min</small> </span>  '
               + '<span>%S <br> <small>sec</small></span> '));
           });

           //=================================== Slide Services  ==============================//

           $(".single-carousel").owlCarousel({
               items: 1,
               autoPlay: false,
               navigation: true,
               autoHeight: true,
               slideSpeed: 400,
               singleItem: true,
               pagination: false
           });

           //=================================== Slide Services  ==============================//

           $(".games-carousel").owlCarousel({
               items: 4,
               autoPlay: false,
               navigation: true,
               autoHeight: true,
               slideSpeed: 400,
               singleItem: true,
               pagination: false
           });

           //=================================== Carousel Blog  ==================================//

           $("#events-carousel").owlCarousel({
               autoPlay: 3200,
               items: 3,
               navigation: false,
               itemsDesktop: [1199, 3],
               itemsDesktopSmall: [1024, 3],
               itemsTablet: [1000, 2],
               itemsMobile: [480, 1],
               pagination: true
           });

           //=================================== Carousel Players  ==================================//

           $("#players-carousel").owlCarousel({
               autoPlay: 3200,
               items: 4,
               navigation: false,
               itemsDesktopSmall: [1024, 3],
               itemsTablet: [768, 3],
               itemsMobile: [600, 2],
               pagination: true
           });

           $(".players-carousel").owlCarousel({
               autoPlay: 3200,
               items: 4,
               navigation: false,
               itemsDesktopSmall: [1024, 3],
               itemsTablet: [768, 3],
               itemsMobile: [600, 2],
               pagination: true
           });

           //=================================== Carousel Clubs  ==================================//

           $("#clubs-carousel").owlCarousel({
               autoPlay: 3200,
               items: 1,
               navigation: false,
               singleItem: true,
               pagination: true
           });

           //=================================== Carousel Sponsor  ==================================//

           //$("#sponsors").owlCarousel({
           //    autoPlay: 3200,
           //    items: 6,
           //    navigation: false,
           //    itemsDesktop: [1199, 5],
           //    itemsDesktopSmall: [1024, 4],
           //    itemsTablet: [768, 3],
           //    itemsMobile: [500, 2],
           //    pagination: true
           //});

           //=================================== Carousel Testimonials  ============================//

           //$("#testimonials").owlCarousel({
           //    autoPlay: 3200,
           //    items: 3,
           //    navigation: false,
           //    itemsDesktop: [1199, 3],
           //    itemsDesktopSmall: [1024, 3],
           //    itemsTablet: [1000, 2],
           //    itemsMobile: [600, 1],
           //    pagination: true
           //});

           //=================================== Carousel Twitter  ===============================//

           //$(".tweet_list").owlCarousel({
           //    items: 1,
           //    autoPlay: 3200,
           //    navigation: false,
           //    autoHeight: true,
           //    slideSpeed: 400,
           //    singleItem: true,
           //    pagination: true
           //});

           //=================================== Subtmit Form  ===================================//

           $('.form-theme').submit(function (event) {
               event.preventDefault();
               var url = $(this).attr('action');
               var datos = $(this).serialize();
               $.get(url, datos, function (resultado) {
                   $('.result').html(resultado);
               });
           });

           //=================================== Form Newslleter  =================================//

           $('#newsletterForm').submit(function (event) {
               event.preventDefault();
               var url = $(this).attr('action');
               var datos = $(this).serialize();
               $.get(url, datos, function (resultado) {
                   $('#result-newsletter').html(resultado);
               });
           });

           //=================================== Ligbox  ===========================================//	

           $(".fancybox").fancybox({
               openEffect: 'elastic',
               closeEffect: 'elastic',

               helpers: {
                   title: {
                       type: 'inside'
                   }
               }
           });

           //=============================  tooltip demo ===========================================//

           $('.tooltip-hover').tooltip({
               selector: "[data-toggle=tooltip]",
               container: "body"
           });

           //=================================== Totop  ============================================//

           $().UItoTop({
               scrollSpeed: 500,
               easingType: 'linear'
           });

           //=================================== Portfolio Filters  ==============================//

           $(window).load(function () {
               var $container = $('.portfolioContainer');
               $container.isotope({
                   filter: '*',
                   animationOptions: {
                       duration: 750,
                       easing: 'linear',
                       queue: false
                   }
               });

               $('.portfolioFilter a').click(function () {
                   $('.portfolioFilter .current').removeClass('current');
                   $(this).addClass('current');
                   var selector = $(this).attr('data-filter');
                   $container.isotope({
                       filter: selector,
                       animationOptions: {
                           duration: 750,
                           easing: 'linear',
                           queue: false
                       }
                   });
                   return false;
               });
           });

});
}, 500);

       //=================================== Slide Home =====================================//

       $('#slide').camera({
           height: 'auto'
       });
