
document.addEventListener('DOMContentLoaded', () => {
    const scrollItems = document.querySelectorAll('.scroll-item');
    const header = document.querySelector('.header');
    const main = document.querySelector('.main');
    const clientHeight = document.documentElement.clientHeight;
    const mainHeight = main.offsetHeight;
    const stages = document.querySelector('.stages');
    const img = document.querySelector('.stages__picture');
    const links = document.querySelectorAll('.stages__content-link');
    const stagesHeight = stages.offsetHeight;
    const progressLine = document.querySelectorAll('.progress-line');
    const footer = document.querySelector('.footer');
    const anchor = document.querySelector('.btn-to-top');
    const footerHeight = footer.offsetHeight;
    let lastScrollTop = 0;
    let lastScrollHeight = 0;

   //smooth scroll
   const toTop = () => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        });
    
        let scrollDistance = window.scrollY;
        let maxScrollDistance = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let isAbsolute = maxScrollDistance - footerHeight;
        if (scrollDistance > lastScrollHeight) {
            anchor.style.position = 'absolute'
        } else {
            anchor.style.position = 'fixed'
        }

        if(scrollDistance > isAbsolute) {
            anchor.style.position = 'absolute'
        }

        lastScrollHeight = scrollDistance;
   };   
   
   const fixedMain = () => {
    if(mainHeight <= clientHeight) { 

        const coreElement = document.querySelector(".js-home-main");
        main.style.top = "0";
        main.style.left = "0";
        main.style.right = "0";
        main.style.position = "fixed";
        coreElement.style.paddingTop = `${mainHeight}px`;
    }
   };
   
    //fixed header
        
    const fixedHeader = () => {
        let scrollDistance = window.scrollY;
        if(scrollDistance > lastScrollTop) {
            header.classList.remove('is-fixed');
        } else {
            header.classList.add('is-fixed');
        }

        if(scrollDistance === 0) {
            header.classList.remove('is-fixed');
        }

        lastScrollTop = scrollDistance;
    };


    //scroll animation for sections

    const scrollAnimation = () => {
       let windowCenter = (window.innerHeight / 2) + window.scrollY; 
           scrollItems.forEach(el => {
           let scrollOffset = el.offsetTop + (el.offsetHeight / 2);
           if (windowCenter >= scrollOffset) {
               el.classList.add('animation') 
           } else {
                el.classList.remove('animation') 
           }
       })
    };


    //scroll animation for section stages

    const imageResize = () => {
        const stagesOffset = offset(stages).top;
        const stagesStart = 4;

        let stagesPoint = window.innerHeight - (stagesHeight / stagesStart);

        if (stagesHeight > window.innerHeight) {
            stagesPoint = window.innerHeight - window.innerHeight / stagesStart;
        }

        if((pageYOffset > stagesOffset - stagesStart) && pageYOffset < (stagesOffset + stagesHeight)) {
            img.classList.add('stages__picture_animation');
            links.forEach((link) => {
            link.classList.add('stages__content-link_animation')
            });
            progressLine.forEach((line) => {
                line.classList.add('progress-line_animation')
            })
        } else {
                img.classList.remove('stages__picture_animation');
                links.forEach((link) => {
                    link.classList.remove('stages__content-link_animation')
                });
                progressLine.forEach((line) => {
                    line.classList.remove('progress-line_animation')
                })
        }

        // if( windowCenter > stagesTop) {
        //     img.classList.add('stages__picture_animation');
        //     links.forEach((link) => {
        //         link.classList.add('stages__content-link_animation')
        //     })
        // } else {
        //     img.classList.remove('stages__picture_animation');
        //     links.forEach((link) => {
        //         link.classList.remove('stages__content-link_animation')
        //     })
        // }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }
    }



    window.addEventListener('scroll', () => {
        scrollAnimation();
        toTop();
        fixedHeader();
        fixedMain();
        imageResize();
    });

});

 

    //slider in main

    
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlide() {
        showSlides(slideIndex += 1);
    }

    function minusSlide() {
        showSlides(slideIndex -= 1);  
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
        
    function showSlides(n) {
        let i;
        const slides = document.querySelectorAll(".main__slide");
        

        if (n > slides.length) {
            slideIndex = 1
        } 
        if (n < 1) {
            slideIndex = slides.length
        } 

        for(i=0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        

        slides[slideIndex-1].style.display = "block";


        const arrows = document.querySelectorAll(".arrow");
        if (slides.length === 1) { 
            arrows.forEach((arrow) => {
                arrow.style.display = "none"
            })
        }
        
        
        const circle = document.querySelector('.circle-ring');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        

        circle.style.strokeDasharray = ` ${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        

        function setProgress(percent) {
            const offset = circumference - percent / 100 * circumference;
            circle.style.strokeDashoffset = offset;
        }
        
    }




    // slider with progress bar

    const slides = document.querySelectorAll('.slide');

    function slideShow(){
    // get current slide
        const current = document.querySelector('.slide_active')
        //remove active class
        current.classList.remove('slide_active');
        // if there is a nextElementSibling:
        if(current.nextElementSibling){
            //add active to next slide
            current.nextElementSibling.classList.add('slide_active')
        } else {
            // add active to first one
            slides[0].classList.add('slide_active')
        }

        setTimeout('slideShow()', 6000)
    // 3000 will make 3s per slide which will match our progress bar
    }

    // load the function when the website loads
    window.onload = slideShow;


  



    // img to full screen 
    const modal = document.querySelector('.overlay')
    const resize = document.querySelector('.resize_btn');
    const closeModal = document.querySelector('.overlay__close');
    const image = document.querySelector('.overlay__img');

    resize.addEventListener('click', () =>  {
        modal.style.display = 'block'
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    image.addEventListener('click', () => {
        if(modal.style.display = 'block') {
            modal.style.display = 'none'
        }
  })
  


