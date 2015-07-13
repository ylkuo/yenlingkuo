'use strict';

var WEBSITE_UI;
$(function() {
  WEBSITE_UI = new WebsiteUI();
});

function WebsiteUI() {
  // Call init methods.
  var self = this;
  // Setup page navigation.
  self.setupHandlers();

  $.get( "home.html", function(data) {
    $( "#main" ).html(data);
  });
}

/**
 * Set up handlers for url link clicks.
 */
WebsiteUI.prototype.setupHandlers = function() {
  var self = this;

  $(document).on('click', 'a.go-home', function(e) {
    e.preventDefault();
    $.get("home.html", function(data) {
      self.unsetActiveMenu();
      $(".go-home").parent().addClass("active");
      $("#header").show();
      $("#main").html(data);
      $(".navbar-collapse").collapse('hide');
    });
    $( window ).resize(function() {
      $("#header").show();
    });
  });

  $(document).on('click', 'a.go-about', function(e) {
    e.preventDefault();
    $.get("about.html", function(data) {
      self.unsetActiveMenu();
      $(".go-about").parent().addClass("active");
      self.hideHeader();
      $("#main").html(data);
      $(".navbar-collapse").collapse('hide');
    });
  });

  $(document).on('click', 'a.go-project', function(e) {
    e.preventDefault();
    $.get("project.html", function(data) {
      self.unsetActiveMenu();
      $(".go-project").parent().addClass("active");
      self.hideHeader();
      $("#main").html(data);
      $(".navbar-collapse").collapse('hide');

      self.setupProjectImageLightbox($('#movisee'));
      self.setupProjectImageLightbox($('#cubicfilm'));
      self.setupProjectImageLightbox($('#handpaintfilm'));
      self.setupProjectImageLightbox($('#flora'));
      self.setupProjectImageLightbox($('#panorama'));
      self.setupProjectImageLightbox($('#sdio'));
    });
  });

  $(document).on('click', 'a.go-publication', function(e) {
    e.preventDefault();
    $.get("publication.html", function(data) {
      self.unsetActiveMenu();
      $(".go-publication").parent().addClass("active");
      self.hideHeader();
      $("#main").html(data);
      $(".navbar-collapse").collapse('hide');
    });
  });
};

/**
 * Remove current active menu style.
 */
WebsiteUI.prototype.unsetActiveMenu = function() {
  $(".nav li" ).each(function() {
  	if ($(this).is(".active")) {
  	  $(this).removeClass("active");
  	}
  });
};

/**
 * Hide header if the browser size is smaller than medium and header is on the top.
 */
WebsiteUI.prototype.hideHeader = function() {
  if ($( window ).width() < 980) {
    $("#header").hide();
  }
  $( window ).resize(function() {
    if ($( window ).width() < 980) {
      $("#header").hide();
    } else {
      $("#header").show();
    }
  });
};

WebsiteUI.prototype.setupProjectImageLightbox = function(elem) {
  elem.poptrox({
    caption: function($a) { return $a.find($('img'))[0].getAttribute('alt'); },
    overlayColor: '#2c2c2c',
    overlayOpacity: 0.85,
    popupCloserText: '',
    popupLoaderText: '',
    selector: 'a.image',
    usePopupCaption: true,
    usePopupDefaultStyling: false,
    usePopupEasyClose: false,
    usePopupNav: true
  });
};
