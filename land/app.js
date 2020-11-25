$(document).ready(function() {
  var destroyComment = true,
      destroyIngredient = true,
      MenuLink = $('.js-link'),
      mobileWidth = 767,
      CommentBreakpoint = 991,
      Banner = $('.hurryUp'),
      BannerClose = $('.hurryUp__close'),
      BannerButton = $('.show-btn'),      

      topMenu = $('#fixed-nav'),
      topMenuItems = topMenu.find('li'),

      navbar = $('.navbar'),
      jsNavbarPoint = $('.js-button'),

      TopSection = $('#prime'),
      BottomSection = $('#prime-bottom'),
      windowWidth, windowHeigth,MenuHeight, jsNavbarShowTop, jsNavbarShowBottom, TopSectionPos,BottomSectionPos;
    function detectwindowWidth(){
      windowWidth = window.innerWidth
    }
    function detectSize(){
      windowWidth = window.innerWidth,
      windowHeigth = window.innerHeight,
      MenuHeight = topMenu.innerHeight(),
      jsNavbarShowTop =jsNavbarPoint.offset().top + jsNavbarPoint.innerHeight(),
      jsNavbarShowBottom = jsNavbarPoint.eq(1).offset().top,
      TopSectionPos = TopSection.offset().top + TopSection.innerHeight(),
      BottomSectionPos = BottomSection.offset().top; 
    }

  function animateScroll(element, speed) {
    $("html, body").animate({
      scrollTop: element.offset().top}, speed);
  };

  function hideMenu() {
      navbar.removeClass('fixed');
  };
  function showMenu() {
      navbar.addClass('fixed');
    };
 function hideMenuMobyle(){      
      if(windowWidth <= mobileWidth) {
          hideMenu();
          $('body').css({'overflow' : 'visible'});
      }      
  }
  function switchMenuItems(scrolled) {
    topMenuItems.each(function() {
      var link = $(this).find("a"),
          idSection = link.attr("href"),
          sectionTop = $(idSection).offset().top ,
          sectionBottom = sectionTop + $(idSection).innerHeight();

      if(scrolled + MenuHeight >= sectionTop && scrolled + MenuHeight <= sectionBottom) {
        $(this).addClass("js-active");
        return;
      }
      if(scrolled + MenuHeight > sectionBottom) {
        topMenuItems.removeClass("js-active");
      }
    });
    return;
  };
  function slideDetect() {
    if(windowWidth <= CommentBreakpoint && destroyComment){
           $('.comments-list').slick({
              infinite: true,
              dots: true,
              slidesToScroll: 1,
              autoplaySpeed: 4000,
              autoplay: true
            });            
             destroyComment = false;
       } else if(windowWidth > CommentBreakpoint && !destroyComment){
         $('.comments-list').slick('unslick');
          destroyComment = true;
    };
     if(windowWidth <= mobileWidth && destroyIngredient){
         $('.ingredients-list').slick({
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 3,
          autoplay: true,   
          autoplaySpeed: 4000
      });
         destroyIngredient = false;
      } else if(windowWidth > mobileWidth && !destroyIngredient){
         $('.ingredients-list').slick('unslick');
          destroyIngredient = true;
    };
  };

 /*******************    load   *********************/
  detectwindowWidth();
  slideDetect();
  detectSize();
/*******************    resize   *********************/
   $(window).on("resize", function() {  
          detectwindowWidth();
          hideMenuMobyle();
          slideDetect();
          detectSize();
     });
/*******************  end  resize   *********************/

/*******************  scroll   *********************/
  $(window).on("scroll", function() {
     var scrolledTop = $(window).scrollTop() ,
        scrolledBottom = scrolledTop + windowHeigth;
        if(scrolledTop >= jsNavbarShowTop) {  
            if(scrolledBottom >= jsNavbarShowBottom){
              hideMenu();
            }else{
              showMenu();
              switchMenuItems(scrolledTop);
            }
          } else {
            hideMenu();
          }
    if(windowWidth > mobileWidth) { 
        if(scrolledTop + MenuHeight >= TopSectionPos && scrolledBottom < BottomSectionPos) {
              if(~Banner.attr('class').indexOf('js-fixed')){               
               BannerButton.removeClass('js-active');
              } else{
                BannerButton.addClass('js-active');
              }
           } else {
              BannerButton.removeClass('js-active');
              Banner.removeClass('js-fixed');             
        }  
        if(scrolledBottom >= BottomSectionPos){                
              Banner.appendTo(BottomSection);
        }
        if(scrolledTop <= TopSectionPos){
              Banner.appendTo(TopSection);
        } 
    }   
  });
   /******************* end scroll   *********************/

   /******************* click   *********************/
   BannerButton.on("click", function() {
      Banner.removeClass('js-hide');
      Banner.addClass('js-fixed'); 
      $(this).removeClass('js-active');    
   });

   BannerClose.on("click", function() {
      if(~Banner.attr('class').indexOf('js-fixed')){
        Banner.removeClass('js-fixed');
        BannerButton.addClass('js-active');
      }else{
        Banner.addClass('js-hide');
      }
   });
  MenuLink.on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("href");
          hideMenuMobyle();       
          animateScroll($(id), 900);
          topMenuItems.removeClass('js-active');
  });
  $('.js-to-form').on("click", function() {
      var scrolledTop = $(window).scrollTop(),
          docHeight = $(document).outerHeight(true);
          id = $(this).attr("href");
      if(scrolledTop < (docHeight-scrolledTop))
        {
          id = id+1;
        }else{
          id = id+2;
        } 
          hideMenuMobyle();
          animateScroll($(id), 900); 
  });
});
