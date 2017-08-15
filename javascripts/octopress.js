function getNav() {
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

function testFeatures() {
  var features = ['maskImage'];
  $(features).map(function(i, feature) {
    if (Modernizr.testAllProps(feature)) {
      $('html').addClass(feature);
    } else {
      $('html').addClass('no-'+feature);
    }
  });
  if ("placeholder" in document.createElement("input")) {
    $('html').addClass('placeholder');
  } else {
    $('html').addClass('no-placeholder');
  }
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

function flashVideoFallback(){
  var flashplayerlocation = "/assets/jwplayer/player.swf",
      flashplayerskin = "/assets/jwplayer/glow/glow.xml";
  $('video').each(function(i, video){
    video = $(video);
    if (!Modernizr.video.h264 && swfobject.getFlashPlayerVersion() || window.location.hash.indexOf("flash-test") !== -1){
      video.children('source[src$=mp4]').first().map(i, function(source){
        var src = $(source).attr('src'),
            id = 'video_'+Math.round(1 + Math.random()*(100000)),
            width = video.attr('width'),
            height = parseInt(video.attr('height'), 10) + 30;
            video.after('<div class="flash-video"><div><div id='+id+'>');
        swfobject.embedSWF(flashplayerlocation, id, width, height + 30, "9.0.0",
          { file : src, image : video.attr('poster'), skin : flashplayerskin } ,
          { movie : src, wmode : "opaque", allowfullscreen : "true" }
        );
      });
      video.remove();
    }
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

$('document').ready(function() {
  testFeatures();
  wrapFlashVideos();
  flashVideoFallback();
  addCodeLineNumbers();
  addSidebarToggler();
  getNav();  
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

/*!	SWFObject v2.2 modified by Brandon Mathis to contain only what is necessary to dynamically embed flash objects
  * Uncompressed source in javascripts/libs/swfobject-dynamic.js
  * <http://code.google.com/p/swfobject/>
	released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){function s(a,b,d){var q,k=n(d);if(g.wk&&g.wk<312)return q;if(k){if(typeof a.id==l)a.id=d;if(g.ie&&g.win){var e="",c;for(c in a)if(a[c]!=Object.prototype[c])c.toLowerCase()=="data"?b.movie=a[c]:c.toLowerCase()=="styleclass"?e+=' class="'+a[c]+'"':c.toLowerCase()!="classid"&&(e+=" "+c+'="'+a[c]+'"');c="";for(var f in b)b[f]!=Object.prototype[f]&&(c+='<param name="'+f+'" value="'+b[f]+'" />');k.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+e+">"+c+
"</object>";q=n(a.id)}else{f=i.createElement(o);f.setAttribute("type",m);for(var h in a)a[h]!=Object.prototype[h]&&(h.toLowerCase()=="styleclass"?f.setAttribute("class",a[h]):h.toLowerCase()!="classid"&&f.setAttribute(h,a[h]));for(e in b)b[e]!=Object.prototype[e]&&e.toLowerCase()!="movie"&&(a=f,c=e,h=b[e],d=i.createElement("param"),d.setAttribute("name",c),d.setAttribute("value",h),a.appendChild(d));k.parentNode.replaceChild(f,k);q=f}}return q}function n(a){var b=null;try{b=i.getElementById(a)}catch(d){}return b}
function t(a){var b=g.pv,a=a.split(".");a[0]=parseInt(a[0],10);a[1]=parseInt(a[1],10)||0;a[2]=parseInt(a[2],10)||0;return b[0]>a[0]||b[0]==a[0]&&b[1]>a[1]||b[0]==a[0]&&b[1]==a[1]&&b[2]>=a[2]?!0:!1}function u(a){return/[\\\"<>\.;]/.exec(a)!=null&&typeof encodeURIComponent!=l?encodeURIComponent(a):a}var l="undefined",o="object",m="application/x-shockwave-flash",v=window,i=document,j=navigator,g=function(){var a=typeof i.getElementById!=l&&typeof i.getElementsByTagName!=l&&typeof i.createElement!=l,
b=j.userAgent.toLowerCase(),d=j.platform.toLowerCase(),g=d?/win/.test(d):/win/.test(b),d=d?/mac/.test(d):/mac/.test(b),b=/webkit/.test(b)?parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,k=!+"\u000b1",e=[0,0,0],c=null;if(typeof j.plugins!=l&&typeof j.plugins["Shockwave Flash"]==o){if((c=j.plugins["Shockwave Flash"].description)&&!(typeof j.mimeTypes!=l&&j.mimeTypes[m]&&!j.mimeTypes[m].enabledPlugin))k=!1,c=c.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),e[0]=parseInt(c.replace(/^(.*)\..*$/,"$1"),
10),e[1]=parseInt(c.replace(/^.*\.(.*)\s.*$/,"$1"),10),e[2]=/[a-zA-Z]/.test(c)?parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}else if(typeof v.ActiveXObject!=l)try{var f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(f&&(c=f.GetVariable("$version")))k=!0,c=c.split(" ")[1].split(","),e=[parseInt(c[0],10),parseInt(c[1],10),parseInt(c[2],10)]}catch(h){}return{w3:a,pv:e,wk:b,ie:k,win:g,mac:d}}();return{embedSWF:function(a,b,d,i,k,e,c,f,h){var j={success:!1,id:b};if(g.w3&&!(g.wk&&g.wk<312)&&
a&&b&&d&&i&&k){d+="";i+="";var p={};if(f&&typeof f===o)for(var m in f)p[m]=f[m];p.data=a;p.width=d;p.height=i;a={};if(c&&typeof c===o)for(var n in c)a[n]=c[n];if(e&&typeof e===o)for(var r in e)typeof a.flashvars!=l?a.flashvars+="&"+r+"="+e[r]:a.flashvars=r+"="+e[r];if(t(k))b=s(p,a,b),j.success=!0,j.ref=b}h&&h(j)},ua:g,getFlashPlayerVersion:function(){return{major:g.pv[0],minor:g.pv[1],release:g.pv[2]}},hasFlashPlayerVersion:t,createSWF:function(a,b,d){if(g.w3)return s(a,b,d)},getQueryParamValue:function(a){var b=
i.location.search||i.location.hash;if(b){/\?/.test(b)&&(b=b.split("?")[1]);if(a==null)return u(b);for(var b=b.split("&"),d=0;d<b.length;d++)if(b[d].substring(0,b[d].indexOf("="))==a)return u(b[d].substring(b[d].indexOf("=")+1))}return""}}}();


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

/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-video-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return w("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/* ScrollToFixed 
 * https://github.com/bigspotteddog/ScrollToFixed 
 * Copyright (c) 2011 Joseph Cava-Lynch MIT license
 */
!function(o){o.isScrollToFixed=function(i){return!!o(i).data("ScrollToFixed")},o.ScrollToFixed=function(i,e){function t(){U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed"),C=-1,y=U.offset().top,z=U.offset().left,T.options.offsets&&(z+=U.offset().left-U.position().left),-1==A&&(A=z),S=U.css("position"),v=!0,-1!=T.options.bottom&&(U.trigger("preFixed.ScrollToFixed"),c(),U.trigger("fixed.ScrollToFixed"))}function n(o){var i=T.options.startpos;return-1!=i?"function"==typeof i?i.apply(U):i:o}function s(){var o=T.options.limit;return o?"function"==typeof o?o.apply(U):o:0}function r(){return"fixed"===S}function l(){return"absolute"===S}function d(){return!(r()||l())}function c(){if(!r()){var o=U[0].getBoundingClientRect();O.css({display:U.css("display"),width:o.width,height:o.height,float:U.css("float")}),cssOptions={"z-index":T.options.zIndex,position:"fixed",top:-1==T.options.bottom?u():"",bottom:-1==T.options.bottom?"":T.options.bottom,"margin-left":"0px"},T.options.dontSetWidth||(cssOptions.width=U.css("width")),U.css(cssOptions),U.addClass(T.options.baseClassName),T.options.className&&U.addClass(T.options.className),S="fixed"}}function p(){var o=s(),i=z;T.options.removeOffsets&&(i="",o-=y),cssOptions={position:"absolute",top:o,left:i,"margin-left":"0px",bottom:""},T.options.dontSetWidth||(cssOptions.width=U.css("width")),U.css(cssOptions),S="absolute"}function x(){d()||(C=-1,O.css("display","none"),U.css({"z-index":h,width:"",position:b,left:"",top:w,"margin-left":""}),U.removeClass("scroll-to-fixed-fixed"),T.options.className&&U.removeClass(T.options.className),S=null)}function f(o){o!=C&&(U.css("left",z-o),C=o)}function u(){var o=T.options.marginTop;return o?"function"==typeof o?o.apply(U):o:0}function a(){if(o.isScrollToFixed(U)&&!U.is(":hidden")){var i=v,e=d();v?d()&&(y=U.offset().top,z=U.offset().left):t();var a=o(window).scrollLeft(),S=o(window).scrollTop(),m=s();T.options.minWidth&&o(window).width()<T.options.minWidth?d()&&i||(g(),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed")):T.options.maxWidth&&o(window).width()>T.options.maxWidth?d()&&i||(g(),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed")):-1==T.options.bottom?m>0&&S>=m-u()?e||l()&&i||(g(),U.trigger("preAbsolute.ScrollToFixed"),p(),U.trigger("unfixed.ScrollToFixed")):S>=n(y)-u()?(r()&&i||(g(),U.trigger("preFixed.ScrollToFixed"),c(),C=-1,U.trigger("fixed.ScrollToFixed")),f(a)):d()&&i||(g(),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed")):m>0?S+o(window).height()-U.outerHeight(!0)>=m-(u()||-F())?r()&&(g(),U.trigger("preUnfixed.ScrollToFixed"),"absolute"===b?p():x(),U.trigger("unfixed.ScrollToFixed")):(r()||(g(),U.trigger("preFixed.ScrollToFixed"),c()),f(a),U.trigger("fixed.ScrollToFixed")):f(a)}}function F(){return T.options.bottom?T.options.bottom:0}function g(){var o=U.css("position");"absolute"==o?U.trigger("postAbsolute.ScrollToFixed"):"fixed"==o?U.trigger("postFixed.ScrollToFixed"):U.trigger("postUnfixed.ScrollToFixed")}var T=this;T.$el=o(i),T.el=i,T.$el.data("ScrollToFixed",T);var S,b,m,w,h,v=!1,U=T.$el,y=0,z=0,A=-1,C=-1,O=null,N=function(o){U.is(":visible")&&(v=!1,a())},W=function(o){window.requestAnimationFrame?requestAnimationFrame(a):a()},$=function(o){(o=o||window.event).preventDefault&&o.preventDefault(),o.returnValue=!1};T.init=function(){T.options=o.extend({},o.ScrollToFixed.defaultOptions,e),h=U.css("z-index"),T.$el.css("z-index",T.options.zIndex),O=o("<div />"),S=U.css("position"),b=U.css("position"),m=U.css("float"),w=U.css("top"),d()&&T.$el.after(O),o(window).bind("resize.ScrollToFixed",N),o(window).bind("scroll.ScrollToFixed",W),"ontouchmove"in window&&o(window).bind("touchmove.ScrollToFixed",a),T.options.preFixed&&U.bind("preFixed.ScrollToFixed",T.options.preFixed),T.options.postFixed&&U.bind("postFixed.ScrollToFixed",T.options.postFixed),T.options.preUnfixed&&U.bind("preUnfixed.ScrollToFixed",T.options.preUnfixed),T.options.postUnfixed&&U.bind("postUnfixed.ScrollToFixed",T.options.postUnfixed),T.options.preAbsolute&&U.bind("preAbsolute.ScrollToFixed",T.options.preAbsolute),T.options.postAbsolute&&U.bind("postAbsolute.ScrollToFixed",T.options.postAbsolute),T.options.fixed&&U.bind("fixed.ScrollToFixed",T.options.fixed),T.options.unfixed&&U.bind("unfixed.ScrollToFixed",T.options.unfixed),T.options.spacerClass&&O.addClass(T.options.spacerClass),U.bind("resize.ScrollToFixed",function(){O.height(U.height())}),U.bind("scroll.ScrollToFixed",function(){U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed"),a()}),U.bind("detach.ScrollToFixed",function(i){$(i),U.trigger("preUnfixed.ScrollToFixed"),x(),U.trigger("unfixed.ScrollToFixed"),o(window).unbind("resize.ScrollToFixed",N),o(window).unbind("scroll.ScrollToFixed",W),U.unbind(".ScrollToFixed"),O.remove(),T.$el.removeData("ScrollToFixed")}),N()},T.init()},o.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1e3,baseClassName:"scroll-to-fixed-fixed",startpos:-1},o.fn.scrollToFixed=function(i){return this.each(function(){new o.ScrollToFixed(this,i)})}}(jQuery);


$("img.lazy").lazyload();

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
		var trigger_offset = ($(window).width() > 640)?1000:3000;
        $(window).scroll(function() {
            if (!config.loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - trigger_offset)){
               config.loading =true;
               loadnextarticle().done(function(data){
					          article = $("<html/>").html(data).find('#js-container').html()
                    $('#js-container').append(article);
                    $("img.lazy").lazyload();
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
                    Article.read(newurl);                    
                    currentslug = slug;
                }
            });
        });
    }

    function read(path){}

    Article = $.extend(Article, {
        config : config,
        read : read,        
        init: init,
    });
})($,(window.Article = window.Article || {}));
