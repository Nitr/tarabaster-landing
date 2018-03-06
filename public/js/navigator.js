$( document ).ready(function() {

	var h_hght = 50; // высота шапки
	var h_mrg = 0;    // отступ когда шапка уже не видна
	                 
	$(function(){
	 
	    var elem = $('#main-nav');
	    var logo = $('#main-logo');
	    var lphone = $('#left-phone');
	    var top = $(this).scrollTop();
	     
	    if(top > h_hght){
	        elem.css('top', h_mrg);
	    }           
	     
	    $(window).scroll(function(){
	        top = $(this).scrollTop();
	         
	        if (top+h_mrg < h_hght) {
	            elem.css('top', (h_hght-top));
	            logo.removeClass('main-logo-min');
	            lphone.css('display', 'none');
	        } else {
	            elem.css('top', h_mrg);
	            logo.addClass('main-logo-min');
	            lphone.css('display', 'block');	            
	        }
	    });
	 
	});
	
	$('#contactform').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var recipient = button.data('whatever');
		var modal = $(this);	  
		console.log(recipient);
		if (recipient !== undefined) {
			modal.find('.modal-body .colorselect').val(recipient);
		} else {
			modal.find('.modal-body .colorselect').val();	  	
		}
	})

	$('#collapseForm').on('shown.bs.collapse', function () {
	   $("#collapseDiv .fa").removeClass("fa-chevron-left").addClass("fa-chevron-down");
	   $("#collapseDiv .open-text").html("Свернуть");	   
	});

	$('#collapseForm').on('hidden.bs.collapse', function () {
	   $("#collapseDiv .fa").removeClass("fa-chevron-down").addClass("fa-chevron-left");	   
	   $("#collapseDiv .open-text").html("Открыть полную форму");
	});


	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	    event.preventDefault();
	    $(this).ekkoLightbox();
	});

	$('.go_to').click( function(){ 
	var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) { 
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top-50 }, 500);
        }
	    return false;
    }); 


    // Cache selectors
	var lastId,
	    topMenu = $("#top-menu"),
	    topMenuHeight = topMenu.outerHeight()+15,
	    // All list items
	    menuItems = topMenu.find("a"),
	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({ 
	      scrollTop: offsetTop
	  }, 500);
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href='#"+id+"']").parent().addClass("active");
	   }                   
	});

});