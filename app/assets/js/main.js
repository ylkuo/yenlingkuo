'use strict';

(function($) {
  $.fn.goTo = function() {
    $('html, body').animate({
      scrollTop: ($(this).offset().top - $(".navbar").height()) + 'px'
    }, 'fast');
    return this;
  }
})(jQuery);

var WEBSITE_UI;
$(function() {
  WEBSITE_UI = new WebsiteUI();
});

function WebsiteUI() {
  // Call init methods.
  var self = this;
  // Setup page navigation.
  self.setupHandlers();
  // Setup History listener.
  window.History.Adapter.bind(window, 'statechange', function() {
    self.pageController(window.History.getState().hash, false);
  });
  self.pageController(window.History.getState().hash, false);
}

/**
 * Set up handlers for url link clicks.
 */
WebsiteUI.prototype.setupHandlers = function() {
  var self = this;

  $(document).on('click', 'a.go-home', function(e) {
    e.preventDefault();
    self.go('/');
  });

  $(document).on('click', 'a.go-about', function(e) {
    e.preventDefault();
    self.go('/?about');
  });

  $(document).on('click', 'a.go-project', function(e) {
    e.preventDefault();
    self.go('/?project')
  });

  $(document).on('click', 'a.go-publication', function(e) {
    e.preventDefault();
    self.go('/?publication')
  });
};

WebsiteUI.prototype.go = function(url) {
  window.History.pushState(null, null, url);
};

WebsiteUI.prototype.goTop = function() {
  $('html, body').animate({ scrollTop: 0 }, 'fast');
};

/**
 * Set up handlers for url input.
 */
WebsiteUI.prototype.pageController = function(url) {
  var self = this;

  // Remove trailing slash from url so that we can parse it correctly.
  if (url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1);
  }
  // Extract sub page from URL, if any.
  var idx = url.indexOf('?');
  var hash = (idx > 0) ? url.slice(idx + 1) : '';
  var value = hash.split('=');

  switch (value[0]) {
    case 'about':
      self.renderAbout();
      self.goTop();
      break;
    case 'project':
      if (value.length == 2) {
        self.renderProject(value[1]);
      } else {
        self.renderProject('');
        self.goTop();
      }
      break;
    case 'publication':
      self.renderPublication();
      self.goTop();
      break;
    default:
      self.renderHome();
      self.goTop();
      break;
  }
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

WebsiteUI.prototype.renderHome = function() {
  var self = this;
  $.get("home.html", function(data) {
    self.unsetActiveMenu();
    $(".go-home").parent().addClass("active");
    $("#header").show();
    $("#main").html(data);
    $(".navbar-collapse").collapse('hide');
  });
  $(window).resize(function() {
    $("#header").show();
  });
};

WebsiteUI.prototype.renderAbout = function() {
  var self = this;
  $.get("about.html", function(data) {
    self.unsetActiveMenu();
    $(".go-about").parent().addClass("active");
    self.hideHeader();
    $("#main").html(data);
    $(".navbar-collapse").collapse('hide');
  });
};

WebsiteUI.prototype.renderProject = function(bookmark) {
  var self = this;
  $.get("project.html", function(data) {
    self.unsetActiveMenu();
    $(".go-project").parent().addClass("active");
    self.hideHeader();
    $("#main").html(data);
    $(".navbar-collapse").collapse('hide');

    self.setupProjectImageLightbox($('#cs-integration'));
    self.setupProjectImageLightbox($('#language-explorer'));
    self.setupProjectImageLightbox($('#analogyspace'));
    self.setupProjectImageLightbox($('#virtualpets'));
    self.setupProjectImageLightbox($('#movisee'));
    self.setupProjectImageLightbox($('#cubicfilm'));
    self.setupProjectImageLightbox($('#handpaintfilm'));
    self.setupProjectImageLightbox($('#taiwanuxd'));
    self.setupProjectImageLightbox($('#flora'));
    self.setupProjectImageLightbox($('#panorama'));
    self.setupProjectImageLightbox($('#sdio'));

    $(document).on('click', 'a.go-movisee', function(e) { $('#movisee').goTo(); });
    $(document).on('click', 'a.go-taiwanuxd', function(e) { $('#taiwanuxd').goTo(); });

    if (bookmark == 'movisee') { $('#movisee').goTo(); }
    else if (bookmark == 'taiwanuxd') { $('#taiwanuxd').goTo(); }
  });
};

WebsiteUI.prototype.renderPublication = function() {
  var self = this;
  $.get("publication.html", function(data) {
    self.unsetActiveMenu();
    $(".go-publication").parent().addClass("active");
    self.hideHeader();
    $("#main").html(data);
    $(".navbar-collapse").collapse('hide');
  });
};