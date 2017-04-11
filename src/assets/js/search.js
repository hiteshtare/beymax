(function ($) {

  //URL for Beymax Site
  var url = '';

  $(document).ready(function () {
    window.index = lunr(function () {
      this.field('title', { boost: 10 });
      this.field('body');
      this.ref('href');
    });
    window.index.pipeline.reset();

    ////////////////////////////////////////////DEPLOYEMENT CHANGES////////////////////////////////////////
    window.index.add({
      href: url + 'changepassword',
      title: 'Change Password',
      body: 'SETTINGS : Enables user to Change Password.'
    });

    window.index.add({
      href: url + 'dashboard',
      title: 'Dashboard',
      body: 'Displays Recent Activity for all devices.'
    });

    window.index.add({
      href: url + 'faq',
      title: 'FAQ',
      body: 'ABOUT & HELP : Frequently asked questions about the app.'
    });

    window.index.add({
      href: url + 'feedback',
      title: 'Feedback',
      body: 'ABOUT & HELP : Enables user to submit feedback including Logs for Beymax App.'
    });

    window.index.add({
      href: url + 'charts/1m',
      title: 'Last Month',
      body: 'CHARTS : Displays Temperature and Humidity chart for Last Month.'
    });

    window.index.add({
      href: url + 'charts/1w',
      title: 'Last Week',
      body: 'CHARTS : Displays Temperature and Humidity chart for Last Week.'
    });

    window.index.add({
      href: url + 'charts/2d',
      title: 'Last 2 Days',
      body: 'CHARTS : Displays Temperature and Humidity chart for Last 2 Days.'
    });

    window.index.add({
      href: url + 'charts/24h',
      title: 'Last 24 Hours',
      body: 'CHARTS : Displays Temperature and Humidity chart for Last 24 Hours.'
    });

    window.index.add({
      href: url + 'charts/6h',
      title: 'Last 6 Hours',
      body: 'CHARTS : Displays Temperature and Humidity chart for Last 6 Hours.'
    });


    window.index.add({
      href: url + 'revokeaccess',
      title: 'Revoke Access',
      body: 'SETTINGS : Enables user to revoke access for all devices.'
    });

    window.index.add({
      href: url + 'room1',
      title: 'Hall',
      body: 'ROOMS : Enable user to control devices in Hall. Devices : Light1 Light2 Dim Fan1 AirConditioner1'
    });

    window.index.add({
      href: url + 'room2',
      title: 'Bedroom',
      body: 'ROOMS : Enables user to control devices in Bedroom. Devices : Light1 Light2'
    });

    window.index.add({
      href: url + 'schedular',
      title: 'Schedular',
      body: 'Enables user to add, update and remove jobs configured for all devices.'
    });

    // window.index.add({
    //   href: url + 'security.html',
    //   title: 'Security',
    //   body: 'Enables user to control CAM installed and also able to see any Motion changes.'
    // });

    // window.index.add({
    //   href: url + 'sensors.html',
    //   title: 'Sensors',
    //   body: 'SETTINGS : Enables user to control Sensors installed.'
    // });

    window.index.add({
      href: url + 'servicestatus',
      title: 'Service Status',
      body: 'ABOUT & HELP : Displays status of the Service.'
    });

    window.index.add({
      href: url + 'version',
      title: 'Version',
      body: 'ABOUT & HELP : Displays current Software Version.'
    });
    ////////////////////////////////////////////DEPLOYEMENT CHANGES////////////////////////////////////////

    // icon click
    $('ul#slide-out div.search .search-wrapper i.material-icons').click(function () {
      if ($('.search-results .focused').length) {
        $('.search-results .focused').first()[0].click();
      } else if ($('.search-results').children().length) {
        $('.search-results').children().first()[0].click();
      }
    });

    var renderResults = function (results) {
      var resultsContainer = $('.search-results');
      resultsContainer.empty();
      Array.prototype.forEach.call(results, function (result) {
        var resultDiv = $('<a class="a-search" href=' + result[1] + '>' + result[0] + '</a>');
        resultsContainer.append(resultDiv);
      });
    };

    var debounce = function (fn) {
      var timeout;
      return function () {
        var args = Array.prototype.slice.call(arguments),
          ctx = this;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
          fn.apply(ctx, args);
        }, 100);
      };
    };

    $('input#search').focus(function () { $(this).parent().addClass('focused'); });
    $('input#search').blur(function () {
      if (!$(this).val()) {
        $(this).parent().removeClass('focused');
      }
    });

    $('input#search').bind('keyup', debounce(function (e) {
      if ($(this).val() < 2) {
        renderResults([]);
        return;
      }

      if (e.which === 38 || e.which === 40 || e.keyCode === 13) return;

      var query = $(this).val();
      var results = window.index.search(query).slice(0, 6).map(function (result) {

        var href = result.ref;
        var title = '';
        ////////////////////////////////////////////DEPLOYEMENT CHANGES////////////////////////////////////////
        if (href == "changepassword")
          title = "Change Password";
        else if (href == "dashboard")
          title = "Dashboard";
        else if (href == "feedback")
          title = "Feedback";
        else if (href == "faq")
          title = "FAQ";
        else if (href == "charts/6h")
          title = "Last 6 hours";
        else if (href == "charts/24h")
          title = "Last 24 hours";
        else if (href == "charts/2d")
          title = "Last 2 Days";
        else if (href == "charts/1w")
          title = "Last Week";
        else if (href == "charts/1m")
          title = "Last Month";
        else if (href == "room1")
          title = "Hall";
        else if (href == "room2")
          title = "Bedroom";
        else if (href == "revokeaccess")
          title = "Revoke Access";
        else if (href == "servicestatus")
          title = "Service Status";
        else if (href == "schedular")
          title = "Schedular";
        else if (href == "version")
          title = "Version";

        href = '/#/' + href; //'/beymax/#/' + href;
        ////////////////////////////////////////////DEPLOYEMENT CHANGES////////////////////////////////////////
        return [title.charAt(0).toUpperCase() + title.slice(1), href];
      });
      renderResults(results);
    }));


    $('input#search').bind('keydown', debounce(function (e) {
      // Escape.
      if (e.keyCode === 27) {
        $(this).val('');
        $(this).blur();
        renderResults([]);
        return;
      } else if (e.keyCode === 13) {
        // enter
        if ($('.search-results .focused').length) {
          $('.search-results .focused').first()[0].click();
        } else if ($('.search-results').children().length) {
          $('.search-results').children().first()[0].click();
        }
        return;
      }

      // Arrow keys.
      var focused;
      switch (e.which) {
        case 38: // up
          if ($('.search-results .focused').length) {
            focused = $('.search-results .focused');
            focused.removeClass('focused');
            focused.prev().addClass('focused');
          }
          break;

        case 40: // down
          if (!$('.search-results .focused').length) {
            focused = $('.search-results').children().first();
            focused.addClass('focused');
          } else {
            focused = $('.search-results .focused');
            if (focused.next().length) {
              focused.removeClass('focused');
              focused.next().addClass('focused');
            }
          }
          break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault();
    }));



  });
} (jQuery));