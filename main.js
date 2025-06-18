// 英雄区域轮播功能
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.hero-indicator');
const totalSlides = slides.length;
// 自动轮播
function autoSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}
// 显示指定幻灯片
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}
// 手动切换幻灯片
function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    showSlide(currentSlideIndex);
}
// 点击指示器切换
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}
// 启动自动轮播（每4秒切换一次）
setInterval(autoSlide, 4000);
// 触摸滑动支持（移动端）
let startX = 0;
let endX = 0;
document.querySelector('.hero').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});
document.querySelector('.hero').addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    }
}
// 返回顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// 显示/隐藏返回顶部按钮
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});
// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 小红书评论展示功能
let reviewsData = {};
let allReviews = [];

async function loadReviewsData() {
    try {
        const response = await fetch('processed_reviews.json');
        if (!response.ok) {
            throw new Error('无法加载评论数据');
        }
        reviewsData = await response.json();
        
        // 修正数据结构处理
        allReviews = [];
        Object.values(reviewsData).forEach(category => {
            if (category.items && Array.isArray(category.items)) {
                allReviews.push(...category.items);
            }
        });
        
        allReviews.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        displayReviews('all');
        
    } catch (error) {
        console.error('加载评论数据失败:', error);
        document.getElementById('reviews-container').innerHTML = 
            '<p style="text-align: center; color: #666;">暂时无法加载评论数据，请稍后再试</p>';
    }
}

function displayReviews(category) {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    let reviews = [];
    
    if (category === 'all') {
        reviews = allReviews.slice(0, 12);
    } else {
        // 修正分类筛选逻辑
        const categoryData = reviewsData[category];
        if (categoryData && categoryData.items) {
            reviews = categoryData.items.slice(0, 12);
        }
    }
    
    if (reviews.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">暂时无法加载评论数据，请稍后再试</p>';
        return;
    }
    
    container.innerHTML = reviews.map(review => {
        const title = review.title || '无标题';
        const author = review.author || '匿名用户';
        const likes = review.likes || 0;
        const imageUrl = review.image_url || 'images/济州岛首页背景.svg';
        const noteUrl = review.note_url || '#';
        
        return `
            <div class="review-card" onclick="window.open('${noteUrl}', '_blank')">
                <div class="review-image">
                    <img src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.src='images/济州岛首页背景.svg'">
                </div>
                <div class="review-content">
                    <h3 class="review-title">${title}</h3>
                    <div class="review-meta">
                        <span class="review-author">@${author}</span>
                        <span class="review-likes">❤️ ${likes}</span>
                    </div>
                    <a href="${noteUrl}" target="_blank" class="review-link" onclick="event.stopPropagation()">
                        查看完整笔记 →
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

function initReviewsFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayReviews(this.dataset.category);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('reviews-container')) {
        loadReviewsData();
        initReviewsFilter();
    }
});