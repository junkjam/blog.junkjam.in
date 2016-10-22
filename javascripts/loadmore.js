(function($,Articlei,GA){
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
        var promise = deferred.promise()
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
        $(window).scroll(function() {
            if (!config.loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - 1000)){
               config.loading =true;
               loadnextarticle().done(function(data){
					article = $("<html/>").html(data).find('#js-container').html()
                    $('#js-container').append(article);
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
					GA.push(['_trackPageview', newurl]);
					if (window.stButtons){window.stButtons.locateElements();}
                    currentslug = slug;
                }
            });
        });
    }
    Article = $.extend(Article, {
        config : config,
        init: init,
    });
})($,(window.Article = window.Article || {}),GA = window._gaq);
