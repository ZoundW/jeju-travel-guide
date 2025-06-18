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

// 小红书评论展示功能 - 嵌入数据版本
let reviewsData = {
  "attractions": {
    "name": "热门景点",
    "items": [
      {
        "keyword": "咸得海滩",
        "title": "📍济州岛咸德海滩| 巨漂亮无滤镜的果冻海🌊",
        "author": "Winnng2",
        "likes": 325,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/4313999ce7a44f6e6ab18c0687e7286b/1040g2sg318qm8mokk67043ptd6urprhs7gdu8r8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/67093797000000002a03768e"
      },
      {
        "keyword": "城山日出峰",
        "title": "免费机位‼️城山日出峰人生照片很容易错过",
        "author": "陈雅法Yaffa",
        "likes": 184,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/17b0ada1ad1831750501df65e048a919/1040g2sg318ih06co3u6g400r49j27nk8gd7pcso!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/6700db48000000001b021349"
      }
      // 添加更多数据...
    ]
  },
  "food": {
    "name": "美食推荐", 
    "items": [
      // 添加美食数据...
    ]
  }
  // 添加其他分类...
};

let allReviews = [];

// 修改为直接使用嵌入数据
function loadReviewsData() {
    try {
        console.log('使用嵌入的评论数据...');
        
        // 处理嵌入的数据
        allReviews = [];
        Object.keys(reviewsData).forEach(categoryKey => {
            const category = reviewsData[categoryKey];
            if (category && category.items && Array.isArray(category.items)) {
                category.items.forEach(item => {
                    item.category = categoryKey;
                });
                allReviews.push(...category.items);
            }
        });
        
        console.log('处理后的评论数据:', allReviews.length, '条');
        allReviews.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        displayReviews('all');
        
    } catch (error) {
        console.error('处理评论数据失败:', error);
        const container = document.getElementById('reviews-container');
        if (container) {
            container.innerHTML = `<div style="text-align: center; color: #666; padding: 2rem;"><p>⚠️ 评论数据处理失败</p></div>`;
        }
    }
}

function displayReviews(category) {
    const container = document.getElementById('reviews-container');
    if (!container) {
        console.error('找不到reviews-container元素');
        return;
    }
    
    let reviews = [];
    
    if (category === 'all') {
        reviews = allReviews.slice(0, 12);
    } else {
        // 修正分类筛选逻辑
        reviews = allReviews.filter(review => review.category === category).slice(0, 12);
    }
    
    console.log(`显示 ${category} 分类的评论:`, reviews.length, '条');
    
    if (reviews.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;"><p>该分类暂无评论数据</p></div>';
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

// 确保DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，检查reviews-container...');
    const container = document.getElementById('reviews-container');
    if (container) {
        console.log('找到reviews-container，开始初始化...');
        loadReviewsData();
        initReviewsFilter();
    } else {
        console.error('未找到reviews-container元素');
    }
});

// 如果DOM已经加载完成，立即执行
if (document.readyState === 'loading') {
    // DOM还在加载中，等待DOMContentLoaded事件
} else {
    // DOM已经加载完成，立即执行
    console.log('DOM已加载，立即初始化reviews...');
    const container = document.getElementById('reviews-container');
    if (container) {
        loadReviewsData();
        initReviewsFilter();
    }
}