// @formatter:off

// List the module dependencies here
var $ = require('jquery');
var Slice = require('lodash/slice');
var Chunk = require('lodash/chunk');
// okvar Jobs = require('./jobs');
require('slick-carousel');

// Slider config
var config = {
  work: {
    useCSS: true,
    useTransform: true,
    arrows: false,
    mobileFirst: true,
    infinite: false,
    draggable: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  },
  jobs: {
    initialSlide: 1,
    useCSS: true,
    useTransform: true,
    arrows: false,
    mobileFirst: true,
    infinite: false,
    draggable: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          initialSlide: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          initialSlide: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1,
        settings: {
          initialSlide: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
};

// @formatter:on

function Slider (element) {

  var _$element = $(element);
  var _$window = $(window);
  var _$body = $('body');

  if (_$element.length) {
    var settings = {};

    if (_$element.hasClass('slider--jobs')) {
      settings = config.jobs;

      // Set correct initial slide based on how make slides there are, before the slider is dynamically filled with
      // slides based on jobs
      settings.initialSlide = _$element.find('.job__content').index();
      settings.responsive[0].settings.initialSlide = _$element.find('.job__content').index();
      settings.responsive[1].settings.initialSlide = _$element.find('.job__content').index();
      settings.responsive[2].settings.initialSlide = _$element.find('.job__content').index();
      
    } else {
      settings = config.work;
    }

    initSlider();
  }

  function initSlider () {
    _$element.slick(settings);

    // Bind controls
    _$body.on('click', '.js-prev', function() {
      var slider = $(this).attr('data-slider-controls');
      $('[data-slider="' + slider + '"]').slick('slickPrev');
    });

    _$body.on('click', '.js-next', function() {
      var slider = $(this).attr('data-slider-controls');
      $('[data-slider="' + slider + '"]').slick('slickNext');
    });

    _$element.on('afterChange', function(event, slick, currentSlide) {
      var slider = 'slider--work';

      if($(slick.$list.context).hasClass('slider--jobs')) {
        slider = 'slider--jobs';
      }

      $('.js-prev[data-slider-controls="' + slider + '"]')
        .toggleClass('slider__controls__button--is-hidden', !currentSlide);

      $('.js-next[data-slider-controls="' + slider + '"]')
        .toggleClass('slider__controls__button--is-hidden', currentSlide === slick.$slides.length - 1)
        .find('.slider__controls__more')
        .toggleClass('is-hidden', currentSlide !== 0);
    });

    // Work slider specific features
    if (_$element.hasClass('slider--work')) {

      _$element.on('click', '.slick-slide', function(e) {
        var _$slide = $(this);

        if(!_$slide.hasClass('slick-active')) {
          e.preventDefault();
          _$element.slick('slickGoTo', _$slide.index());
        }
      });

      var _$ctaLink = $('.work__cta__link');
      var _$ctaLinkText = $('.work__cta__link__text');

      _$element.on('afterChange', function(event, slick, currentSlide) {
        var text = $(slick.$slides[currentSlide]).find('.work').attr('data-link-text');
        var link = $(slick.$slides[currentSlide]).find('.work').attr('data-link');

        _$ctaLink.attr('href', link);
        _$ctaLinkText.text(text);
      });
    }

    // Jobs slider specific features
    if (_$element.hasClass('slider--jobs')) {
      // var getJobs = Jobs.getJobs();
      // var jobs;

      function handleRoles() {
        var _$roleWrappers = $('.jobs__role-wrapper');

        _$roleWrappers.each(function(index, element) {
          var _$wrapper = $(element);
          var _$role = _$wrapper.find('.jobs__role');

          _$wrapper.toggleClass('is-overflowed', _$role.height() > _$wrapper.height());
        });
      }

      _$window.on('resize', handleRoles);



      // Fetch the jobs
      // getJobs.done(function(data) {
      //   jobs = data.jobs;

      //   for (i = 0; i < jobs.length; i++) {
      //     for (x = 0; x < jobs.length; x++) {
      //       if(data.jobs[i].metadata[x] && data.jobs[i].metadata[x].name === 'AgencyJobURL') {
      //         if(typeof data.jobs[i].metadata[x].value !== undefined) {
      //           data.jobs[i].url = data.jobs[i].metadata[x].value || data.jobs[i].absolute_url;
      //         }
      //       }

      //       if(data.jobs[i].metadata[x] && data.jobs[i].metadata[x].name === 'Department') {
      //         if(typeof data.jobs[i].metadata[x].value !== undefined) {
      //           data.jobs[i].department = data.jobs[i].metadata[x].value || '';
      //         }
      //       }
      //     }
      //   }

      //   createJobsSlides();
      // });

      // function createJobsSlides () {
      //   var numJobs = 8;

      //   // Create batches of jobs, to create the slides with
      //   var otherSlides = Chunk(jobs, numJobs);

      //   var slidesHtml = '';

      //   // Create slides
      //   for (i = 0; i < otherSlides.length; i++) {
      //     var html = '<div class="jobs__slide">';
      //     html += '<ul class="jobs__list">';

      //     for (x = 0; x < otherSlides[i].length; x++) {
      //       html += '<li class="jobs__item">';
      //       html += '<a href="' + otherSlides[i][x].url + '" target="_blank" class="jobs__link">';
      //       html += '<span class="jobs__role-wrapper"><span class="jobs__role">' + otherSlides[i][x].title + '</span></span> <small class="jobs__office">' + otherSlides[i][x].location.name + '</small>';
      //       html += '</a>';
      //       html += '</li>';
      //     }

      //     html += '</ul>';
      //     html += '</div>';

      //     slidesHtml += html;
      //   }

      //   // Add the new slides
      //   _$element.slick('slickAdd', slidesHtml);

      //   handleRoles();
      // }
    }
  }
}

module.exports = Slider;
