/*!
 * Socialite v2.0 - Pinterest extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
!function(t,e,i,n){i.network("pinterest",{script:{src:"//assets.pinterest.com/js/pinit.js","data-pin-build":"parsePinBtns"}}),i.widget("pinterest","pinit",{process:function(t){if("a"!==t.el.nodeName.toLowerCase())return!0;var e="socialite-instance-"+t.uid,i=t.el.getAttribute("href");t.el.id=e,t.el.href="#"+e,t.el.setAttribute("data-default-href",i),t.el.setAttribute("onclick",'(function(){window.open("'+i+'")})();')},init:function(n){i.processInstance(n);var a=e.createElement("a");a.className="pin-it-button",i.copyDataAttributes(n.el,a),a.setAttribute("href",n.el.getAttribute("data-default-href")),a.setAttribute("count-layout",n.el.getAttribute("data-count-layout")||"horizontal"),n.el.appendChild(a),i.networkReady("pinterest")&&t.parsePinBtns()}})}(window,window.document,window.Socialite);