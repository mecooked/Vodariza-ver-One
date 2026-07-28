document.addEventListener("DOMContentLoaded", function () {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitType, ScrollToPlugin);

    const smoother = ScrollSmoother.create({
        wrapper: ".wrapper",
        content: ".content",
        smooth: 1.5,
        effects: true
    });

    const text = new SplitType("#fadeText", {
        types: "lines",
        lineClass: "line"
    });

    gsap.from(text.lines, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: {
            each: 0.4,
            ease: "slow"
        }
    });

    gsap.from("#more", { 
        opacity: 0, 
        delay: 1.9,
        duration: 0.7, 
        ease: "slow" 
    });

    const createFadeUpAnimation = (selector, trigger, start = "top 85%", stagger = 0) => {
        const elements = gsap.utils.toArray(selector);
        if (elements.length === 0) return;

        gsap.from(elements, {
            scrollTrigger: {
                trigger: trigger || selector,
                start: start,
            },
            opacity: 0,
            y: 75,
            duration: 1,
            ease: 'power2.out',
            stagger: stagger
        });
    };

     const reviews = [
        {
            avatar: 'img/otziv-icon.png', 
            name: 'Сергей Барабанов',
            rating: '10/10',
            text: 'Вода просто великолепная! Ощущается настоящая чистота и свежесть, как будто пьешь прямо из горного источника. Упаковка тоже на высоте. Однозначно буду брать еще.'
        },
        {
            avatar: 'img/otziv-icon.png', 
            name: 'Елена Петрова',
            rating: '9/10',
            text: 'Очень приятная и мягкая на вкус вода. Отлично утоляет жажду после тренировки. Сняла один балл только за то, что хотелось бы видеть ее в большем количестве магазинов.'
        },
        {
            avatar: 'img/otziv-icon.png',
            name: 'Иван Смирнов',
            rating: '10/10',
            text: 'Это лучшая вода, которую я пробовал за последнее время. Никакого постороннего привкуса, только натуральная свежесть. Идеально подходит для ежедневного употребления. Рекомендую!'
        }
    ];


    const reviewAvatar = document.getElementById('review-avatar');
    const reviewName = document.getElementById('review-name');
    const reviewRating = document.getElementById('review-rating');
    const reviewText = document.getElementById('review-text');
    const prevReviewBtn = document.getElementById('prev-review');
    const nextReviewBtn = document.getElementById('next-review');
    
    let currentReviewIndex = 0;
    let isReviewAnimating = false;

    // отзывы
    function updateReviewDisplay() {
        if (isReviewAnimating) return;
        isReviewAnimating = true;

        const currentReview = reviews[currentReviewIndex];
        const elementsToAnimate = [reviewAvatar, reviewName, reviewRating, reviewText];
        
        gsap.to(elementsToAnimate, {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: 'power1.in',
            onComplete: () => {
                // обновляем контент, когда он невидим
                reviewAvatar.style.backgroundImage = `url(${currentReview.avatar})`;
                reviewName.textContent = currentReview.name;
                reviewRating.textContent = currentReview.rating;
                reviewText.textContent = currentReview.text;
                
                gsap.to(elementsToAnimate, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power1.out',
                    onComplete: () => {
                        isReviewAnimating = false;
                    }
                });
            }
        });
    }


    nextReviewBtn.addEventListener('click', () => {
        currentReviewIndex++;
        if (currentReviewIndex >= reviews.length) {
            currentReviewIndex = 0;
        }
        updateReviewDisplay();
    });

    prevReviewBtn.addEventListener('click', () => {
        currentReviewIndex--;
        if (currentReviewIndex < 0) {
            currentReviewIndex = reviews.length - 1;
        }
        updateReviewDisplay();
    });
    
    updateReviewDisplay();


    const products = [
        {
            title: 'ВОДАРИЦА',
            subtitle: 'КЛАССИЧЕСКАЯ',
            description: 'Вкус абхазских вод, который уже стал бессмертной классикой. Чистая, освежающая и идеально сбалансированная.',
            image: 'img/bottle.png',
        },
        {
            title: 'ВОДАРИЦА',
            subtitle: 'ЦИТРУС',
            description: 'Яркий и бодрящий вкус с нотками лимона и лайма. Идеальный выбор для тех, кто ищет что-то новое и свежее.',
            image: 'img/bottle.png',
        },
        {
            title: 'ВОДАРИЦА',
            subtitle: 'МЯТА',
            description: 'Освежающий бриз в каждом глотке. Натуральный экстракт мяты дарит прохладу и утоляет жажду в жаркий день.',
            image: 'img/bottle.png',
        }
    ];

    
    const centerCell = document.getElementById('center-cell-main');
    const nextBtn = document.getElementById('next-bottle');
    const prevBtn = document.getElementById('prev-bottle');
    
    const titleEl = document.getElementById('product-title');
    const subtitleEl = document.getElementById('product-subtitle');
    const descriptionEl = document.getElementById('product-description');

    let currentIndex = 0;
    const totalSlides = products.length;
    let isAnimating = false;

    // --- Функция для создания ОДНОЙ бутылки ---
    function createBottle(index) {
        const bottle = document.createElement('div');
        bottle.className = 'bottle';
        bottle.style.backgroundImage = `url(${products[index].image})`;
        return bottle;
    }

    // создаем и добавляем первую бутылку
    centerCell.appendChild(createBottle(currentIndex));

    // --- обновление состояния стрелок ---
    function updateArrowState() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }

    // --- обновление текста ---
    function updateText() {
        const product = products[currentIndex];
        gsap.to([titleEl, subtitleEl, descriptionEl], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                titleEl.textContent = product.title;
                subtitleEl.textContent = product.subtitle;
                descriptionEl.textContent = product.description;
                gsap.to([titleEl, subtitleEl, descriptionEl], { opacity: 1, duration: 0.3 });
            }
        });
    }

    // --- главная функция переключения ---
    function changeSlide(direction) {
        if (isAnimating) return;

        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        
        // проверяем, что не выходим за границы
        if (newIndex < 0 || newIndex >= totalSlides) return;
        
        isAnimating = true;

        const oldBottle = centerCell.querySelector('.bottle');
        const newBottle = createBottle(newIndex);
        
        // откуда появится новая бутылка
        const startX = direction === 'next' ? '200%' : '-200%';
        gsap.set(newBottle, { x: startX });
        centerCell.appendChild(newBottle);

        // куда уедет старая бутылка
        const endX = direction === 'next' ? '-200%' : '200%';
        
        // анимашейн
        gsap.to(oldBottle, { x: endX, duration: 0.8, ease: 'power2.inOut', onComplete: () => oldBottle.remove() });
        gsap.to(newBottle, { x: '0%', duration: 0.8, ease: 'power2.inOut' });
        
        currentIndex = newIndex;
        updateText();
        updateArrowState();
        
        // разблокируем кнопки после завершения анимации
        gsap.delayedCall(0.8, () => { isAnimating = false; });
    }
    
    nextBtn.addEventListener('click', () => changeSlide('next'));
    prevBtn.addEventListener('click', () => changeSlide('prev'));

    updateText();
    updateArrowState();

// ссылочки
const anchorLinks = document.querySelectorAll('a[href^="#"]');

const offsetInPixels = -75;

anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElem = document.querySelector(targetId);

        if (targetElem) {
            let targetPosition = smoother.offset(targetElem, "top top");

            targetPosition += offsetInPixels;

            gsap.to(smoother, {
                scrollTop: targetPosition,
                duration: 2.5,
                ease: "power2.inOut"
            });
        }
    });
});

    // анимки

    createFadeUpAnimation(".benefits", ".benefits", "top 80%", 0.35);
    createFadeUpAnimation(".benefits-image", ".ben-str-2", "top 80%");
    

    createFadeUpAnimation(".slide3 .wrapper-title1-txt", ".slide3");
    createFadeUpAnimation(".slide3 .slide3-image", ".slide3", "top 70%");
    createFadeUpAnimation(".slide3 .btn1", ".slide3", "top 60%");

    createFadeUpAnimation(".slide4 .levo > *", ".slide4 .levo", "top 80%", 0.2); // анимируем дочерние элементы левого блока
    createFadeUpAnimation(".slide4 .pravo .container-image", ".slide4 .pravo", "top 80%");

    createFadeUpAnimation(".slide5 .fraza", ".slide5");
    createFadeUpAnimation(".slide5 .bigbox", ".slide5", "top 80%");
    createFadeUpAnimation(".slide5 .down-minerals .min", ".down-minerals", "top 90%", 0.2); // с задержкой

    createFadeUpAnimation(".slide6 .pravo > *", ".slide6 .pravo", "top 70%", 0.2); // анимируем дочерние элементы правого блока

    createFadeUpAnimation(".slide7 .levo > *", ".slide7 .levo", "top 80%", 0.2);
    createFadeUpAnimation(".slide7 .pravo", ".slide7 .pravo", "top 80%");

    createFadeUpAnimation(".slide8 .txt-wrapper", ".slide8");
    createFadeUpAnimation(".slide8 .otziv-cont", ".slide8", "top 80%");

    createFadeUpAnimation("footer > *", "footer", "top 95%", 0.2);

});