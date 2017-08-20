;(function($, Utils) {
  function formatString() {
      // The string containing the format items (e.g. "{0}")
      // will and always has to be the first argument.
      var theString = arguments[0];      
      // start with the second argument (i = 1)
      for (var i = 1; i < arguments.length; i++) {
          // "gm" = RegEx options for Global search (more than one instance)
          // and for Multiline search
          var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
          theString = theString.replace(regEx, arguments[i]);
      }      
      return theString;
  };

  function urlParameter(key){
      return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  };

  Utils = $.extend(Utils, {
      formatString : formatString,
      urlParameter : urlParameter,
  });

})($, (window.Utils = window.Utils || {}));

function getMobileNav() {
  var mainNav = $('ul.main-navigation, ul[role=main-navigation]').before('<fieldset class="mobile-nav">')
  var mobileNav = $('fieldset.mobile-nav').append('<select class=tinynav>');
  mobileNav.find('select').append('<option value="">Navigate</option>');
  var addOption = function(i, option) {
    mobileNav.find('select').append('<option value="' + this.href + '">&raquo; ' + $(this).text() + '</option>');
  }
  mainNav.find('a[role="mobile-navigation"]').each(addOption);
  $('ul.subscription a[role="mobile-navigation"]').each(addOption);
  mobileNav.find('select').bind('change', function(event) {
    if (event.target.value) { window.location.href = event.target.value; }
  });
}

function addSidebarToggler() {
  if(!$('body').hasClass('sidebar-footer')) {
    $('#content').append('<span class="toggle-sidebar"></span>');
    $('.toggle-sidebar').bind('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('collapse-sidebar');
    });
  }
  var sections = $('aside.sidebar > section');
  if (sections.length > 1) {
    sections.each(function(index, section){
      if ((sections.length >= 3) && index % 3 === 0) {
        $(section).addClass("first");
      }
      var count = ((index +1) % 2) ? "odd" : "even";
      $(section).addClass(count);
    });
  }
  if (sections.length >= 3){ $('aside.sidebar').addClass('thirds'); }
}

function addCodeLineNumbers() {
  if (navigator.appName === 'Microsoft Internet Explorer') { return; }
  $('div.gist-highlight').each(function(code) {
    var tableStart = '<table><tbody><tr><td class="gutter">',
        lineNumbers = '<pre class="line-numbers">',
        tableMiddle = '</pre></td><td class="code">',
        tableEnd = '</td></tr></tbody></table>',
        count = $('.line', code).length;
    for (var i=1;i<=count; i++) {
      lineNumbers += '<span class="line-number">'+i+'</span>\n';
    }
    var table = tableStart + lineNumbers + tableMiddle + '<pre>'+$('pre', code).html()+'</pre>' + tableEnd;
    $(code).html(table);
  });
}

function wrapFlashVideos() {
  $('object').each(function(i, object) {
    if( $(object).find('param[name=movie]').length ){
      $(object).wrap('<div class="flash-video">')
    }
  });
  $('iframe[src*=vimeo],iframe[src*=youtube]').wrap('<div class="flash-video">')
}

function renderDeliciousLinks(items) {
  var output = "<ul>";
  for (var i=0,l=items.length; i<l; i++) {
    output += '<li><a href="' + items[i].u + '" title="Tags: ' + (items[i].t == "" ? "" : items[i].t.join(', ')) + '">' + items[i].d + '</a></li>';
  }
  output += "</ul>";
  $('#delicious').html(output);
}

function getRecentPost(){
  var same_post = $('#recent_posts a[href="'+window.location.pathname+'"]');
  same_post.length > 0 ? same_post.parent('.post').remove():undefined;
}

$(document).ready(function() {
  wrapFlashVideos();
  addCodeLineNumbers();
  addSidebarToggler();
  getRecentPost();  
  getMobileNav();
});

// iOS scaling bug fix
// Rewritten version
// By @mathias, @cheeaun and @jdalton
// Source url: https://gist.github.com/901295
(function(doc) {
  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }
  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [0.25, 1.6];
    doc[addEvent](type, fix, true);
  }
}(document));


var initFacebookShare = function(){
	$('#js-container').on('click','.mm_facebook_share, .bg_facebook',function () {
	var sharePostTitle = $(this).attr('data-post-title');
	var sharePostPermalink = $(this).attr('data-post-permalink');
	var width = 575,
		height = 400,
		left = ($(window).width()  - width)  / 2,
		top = ($(window).height() - height) / 2,
		text = sharePostTitle,
		url = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(sharePostPermalink),
		opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
	window.open(url, 'fb', opts);
	return false;
	});

}()

var initTwitterTweet = function(){
	$('#js-container').on('click','.mm_twitter_tweet, .bg_twitter',function () {
		var sharePostTitle = $(this).attr('data-post-title');
		var sharePostPermalink = $(this).attr('data-post-permalink');
		var width = 575,
			height = 400,
			left = ($(window).width()  - width)  / 2,
			top = ($(window).height() - height) / 2,
			text = sharePostTitle,
			url = 'http://twitter.com/share?url='+sharePostPermalink+'&text='+sharePostTitle+' via @JunkJamIndia',
			opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
		window.open(url, 'twitter', opts);
		return false;
	});
}()

function callbackGooglePlusShare(authResult)
{
	$('.g-interactivepost:first').click();
}

var initGooglePlusShare = function(){
	$('#js-container').on('click','.mm_google_plus_share, .bg_googleplus',function () {
		var sharePostTitle = $(this).attr('data-post-title');
		var sharePostPermalink = $(this).attr('data-post-permalink');
		var width = 575,
			height = 400,
			left = ($(window).width()  - width)  / 2,
			top = ($(window).height() - height) / 2,
			text = sharePostTitle,
			url = 'https://plus.google.com/share?url='+sharePostPermalink+'&text='+sharePostTitle+' via @JunkJam',
			opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
		window.open(url, 'twitter', opts);
		return false;
	});
}()

var initPinterestPin = function(){
  var e = document.createElement('script');
  e.setAttribute('type','text/javascript');
  e.setAttribute('charset','UTF-8');
  e.setAttribute('src','https://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);
  document.body.appendChild(e);
}

/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/* ScrollToFixed - Copyright (c) 2011 Joseph Cava-Lynch MIT license */
!function(o){o.isScrollToFixed=function(i){return!!o(i).data("ScrollToFixed")},o.ScrollToFixed=function(i,e){function t(){U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed"),C=-1,y=U.offset().top,z=U.offset().left,T.options.offsets&&(z+=U.offset().left-U.position().left),-1==A&&(A=z),S=U.css("position"),v=!0,-1!=T.options.bottom&&(U.trigger("preFixed.ScrollToFixed"),c(),U.trigger("fixed.ScrollToFixed"))}function n(o){var i=T.options.startpos;return-1!=i?"function"==typeof i?i.apply(U):i:o}function s(){var o=T.options.limit;return o?"function"==typeof o?o.apply(U):o:0}function r(){return"fixed"===S}function l(){return"absolute"===S}function d(){return!(r()||l())}function c(){if(!r()){var o=U[0].getBoundingClientRect();O.css({display:U.css("display"),width:o.width,height:o.height,float:U.css("float")}),cssOptions={"z-index":T.options.zIndex,position:"fixed",top:-1==T.options.bottom?u():"",bottom:-1==T.options.bottom?"":T.options.bottom,"margin-left":"0px"},T.options.dontSetWidth||(cssOptions.width=U.css("width")),U.css(cssOptions),U.addClass(T.options.baseClassName),T.options.className&&U.addClass(T.options.className),S="fixed"}}function p(){var o=s(),i=z;T.options.removeOffsets&&(i="",o-=y),cssOptions={position:"absolute",top:o,left:i,"margin-left":"0px",bottom:""},T.options.dontSetWidth||(cssOptions.width=U.css("width")),U.css(cssOptions),S="absolute"}function x(){d()||(C=-1,O.css("display","none"),U.css({"z-index":h,width:"",position:b,left:"",top:w,"margin-left":""}),U.removeClass("scroll-to-fixed-fixed"),T.options.className&&U.removeClass(T.options.className),S=null)}function f(o){o!=C&&(U.css("left",z-o),C=o)}function u(){var o=T.options.marginTop;return o?"function"==typeof o?o.apply(U):o:0}function a(){if(o.isScrollToFixed(U)&&!U.is(":hidden")){var i=v,e=d();v?d()&&(y=U.offset().top,z=U.offset().left):t();var a=o(window).scrollLeft(),S=o(window).scrollTop(),m=s();T.options.minWidth&&o(window).width()<T.options.minWidth?d()&&i||(g(),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed")):T.options.maxWidth&&o(window).width()>T.options.maxWidth?d()&&i||(g(),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed")):-1==T.options.bottom?m>0&&S>=m-u()?e||l()&&i||(g(),U.trigger("preAbsolute.ScrollToFixed"),p(),U.trigger("unfixed.ScrollToFixed")):S>=n(y)-u()?(r()&&i||(g(),U.trigger("preFixed.ScrollToFixed"),c(),C=-1,U.trigger("fixed.ScrollToFixed")),f(a)):d()&&i||(g(),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed")):m>0?S+o(window).height()-U.outerHeight(!0)>=m-(u()||-F())?r()&&(g(),U.trigger("preUnfixed.ScrollToFixed"),"absolute"===b?p():x(),U.trigger("unfixed.ScrollToFixed")):(r()||(g(),U.trigger("preFixed.ScrollToFixed"),c()),f(a),U.trigger("fixed.ScrollToFixed")):f(a)}}function F(){return T.options.bottom?T.options.bottom:0}function g(){var o=U.css("position");"absolute"==o?U.trigger("postAbsolute.ScrollToFixed"):"fixed"==o?U.trigger("postFixed.ScrollToFixed"):U.trigger("postUnfixed.ScrollToFixed")}var T=this;T.$el=o(i),T.el=i,T.$el.data("ScrollToFixed",T);var S,b,m,w,h,v=!1,U=T.$el,y=0,z=0,A=-1,C=-1,O=null,N=function(o){U.is(":visible")&&(v=!1,a())},W=function(o){window.requestAnimationFrame?requestAnimationFrame(a):a()},$=function(o){(o=o||window.event).preventDefault&&o.preventDefault(),o.returnValue=!1};T.init=function(){T.options=o.extend({},o.ScrollToFixed.defaultOptions,e),h=U.css("z-index"),T.$el.css("z-index",T.options.zIndex),O=o("<div />"),S=U.css("position"),b=U.css("position"),m=U.css("float"),w=U.css("top"),d()&&T.$el.after(O),o(window).bind("resize.ScrollToFixed",N),o(window).bind("scroll.ScrollToFixed",W),"ontouchmove"in window&&o(window).bind("touchmove.ScrollToFixed",a),T.options.preFixed&&U.bind("preFixed.ScrollToFixed",T.options.preFixed),T.options.postFixed&&U.bind("postFixed.ScrollToFixed",T.options.postFixed),T.options.preUnfixed&&U.bind("preUnfixed.ScrollToFixed",T.options.preUnfixed),T.options.postUnfixed&&U.bind("postUnfixed.ScrollToFixed",T.options.postUnfixed),T.options.preAbsolute&&U.bind("preAbsolute.ScrollToFixed",T.options.preAbsolute),T.options.postAbsolute&&U.bind("postAbsolute.ScrollToFixed",T.options.postAbsolute),T.options.fixed&&U.bind("fixed.ScrollToFixed",T.options.fixed),T.options.unfixed&&U.bind("unfixed.ScrollToFixed",T.options.unfixed),T.options.spacerClass&&O.addClass(T.options.spacerClass),U.bind("resize.ScrollToFixed",function(){O.height(U.height())}),U.bind("scroll.ScrollToFixed",function(){U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed"),a()}),U.bind("detach.ScrollToFixed",function(i){$(i),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed"),o(window).unbind("resize.ScrollToFixed",N),o(window).unbind("scroll.ScrollToFixed",W),U.unbind(".ScrollToFixed"),O.remove(),T.$el.removeData("ScrollToFixed")}),N()},T.init()},o.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1e3,baseClassName:"scroll-to-fixed-fixed",startpos:-1},o.fn.scrollToFixed=function(i){return this.each(function(){new o.ScrollToFixed(this,i)})}}(jQuery);


$('img.lazy').lazyload({
        failure_limit : 100,
        effect : "fadeIn",
    });

$(document).ready(function(){
  var aside_sidebar = $('aside.sidebar');
  var menu_header = $('.js-header');
  menu_header.scrollToFixed();

  $('#amazon-affiliate').scrollToFixed({
      startpos: function(){
        return aside_sidebar.outerHeight()+aside_sidebar.offset().top+300;
      },
      marginTop: menu_header.outerHeight(true),
      zIndex: 999
    });  
});

(function($,Article){
	var config = {};

    function init(options) {
        options = options || {};
        config = $.extend(config,options);
        bindloadnextarticle();
        bindchangeurl();
    }
    function loadnextarticle(){
        var offset = (config.offset || 0)+1;
        var deferred = $.Deferred();
        var promise = deferred.promise();
		    var current = window.location.pathname;
        var url = $('#load-next-article[self="'+current+'"]').attr('href')
        $.ajax(url, {
            method: 'GET',
        }).done(function(data) {
            config.offset = offset;
            deferred.resolve(data)
        });
        return promise;
    
    }
    function bindloadnextarticle(){
		    if($(window).width() > 640){
          var trigger_offset = 1000;
        }
        else{
          var trigger_offset = 2500;
          return
        }
        $(window).scroll(function() {
            if (!config.loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - trigger_offset)){
               config.loading =true;
               loadnextarticle().done(function(data){
					          article = $("<html/>").html(data).find('#js-container').html()
                    $('#js-container').append(article);
                    $('img.lazy').lazyload({
                        failure_limit : 100,
                        effect : "fadeIn",
                    });
                    config.loading = false;
               });
            }
        });
    }
    function bindchangeurl(){
        if(!window.history) return;
        var currentslug = config.current.slug;
        $(document).scroll(function () {
            $('.js-block').each(function () {
                var top = window.pageYOffset;
                var distance = top - $(this).offset().top;
                var slug = $(this).data('slug');
                var newurl = slug;
                if (distance < 30 && distance > -30 && currentslug != slug) {
                    window.history.pushState({path:newurl},'',newurl);
                    var title = $('article[data-slug="'+slug+'"] h1.entry-title');
                    if(title.length > 0) {
                        $('title').text(title.text());
                    }
                    Article.next(newurl);                    
                    currentslug = slug;
                }
            });
        });
    }

    function next(path){}

    Article = $.extend(Article, {
        config : config,
        next : next,        
        init: init,
    });
})($,(window.Article = window.Article || {}));
