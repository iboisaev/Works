
$(document).ready(function(){
    let sidebarMenu = $('aside').find('nav'),
        sidebarMenuItem = sidebarMenu.find('li.dropdown');
    sidebarMenuItem.on('click', function(e){
        if($(window).width() <= 1024){
            e.preventDefault();
            let open = $(this).find('a').attr('href');
            console.log(open);
            $(open).toggleClass('active');
        }
        else{
           $(this).find('ul').slideToggle();
            $(this).toggleClass('active'); 
        }
        
    })
    $('.sort_trigger').on('click', function(){
        console.log('click')
        $('.sort_items').slideToggle();
    })
    let sortItem = $('.sort_items').find('ul').find('li');
    sortItem.on('click', function(){
        sortItem.removeClass('active');
        $(this).addClass('active');
        let choose = $(this).find('a').html();
        $('.sort_trigger').html(choose);
        $('.sort_items').slideToggle();

    })

    $('#menu_toggler').on('click', function(){
        $(this).toggleClass('active')
        $('.menu_mobile').toggleClass('show');
        $('body').toggleClass('overflow');
    });
    $('.open_popup').on('click', function(){
        let popup = $(this).attr('href'),
            height = $(popup).height();
        $(popup).addClass('open');
        if($(window).width() > 1024){
            $('body').addClass('overflow');
        }
        $('.main_content').css('height', height);
    })
    $('.close_popup').on('click', function(e){
        let popup = $(this).attr('for');
        
        if(popup == undefined){
            e.preventDefault()
            popup = $(this).attr('href');
        }
        console.log(popup);
        $(popup).removeClass('open');
        if($(window).width() > 1024){
            $('body').removeClass('overflow');
        }
        $('.main_content').css('height', 'auto');
        
    });
    $('#to_dashboard').on('click', function(){
        $('#menuMain').addClass('hide');
        $('#menuDashboard').addClass('show')
    });
    $('#to_main').on('click', function(){
        $('#menuMain').removeClass('hide');
        $('#menuDashboard').removeClass('show')
    });

    // 
    $('.single-block__top').on('click', function() {
        $(this).toggleClass('active');
        $(this).next().toggleClass('active');
    });

    // 
    $('.match-single__info-btn').on('click', function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).find('use').attr('xlink:href', 'img/heart.svg#heart');   
        } else { 
            $(this).find('use').attr('xlink:href', 'img/heart-empty.svg#heart-empty');
        }
    });

    // 
    if ($('.match-single__block').length >= 2) {
        $('.match-single__title').html(`<span>${$('.match-single__block').length} matches</span>`);
    }

    // 
    $('.match-single__more').on('click', function() {
        let parentChildren = $(this).parent('.match-single__block').children('.match-single__bottom');

        $(this).toggleClass('active');
        parentChildren.children('.match-single__btns').toggleClass('md-hide');
        parentChildren.children('.match-single__retainer').children('.match-single__retainer-block').toggleClass('md-hide');
    });
});

function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
    
testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('html').classList.add('webp');
    }else{
    document.querySelector('html').classList.add('no-webp');
    }
});