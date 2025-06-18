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
      },
      {
        "keyword": "城山日出峰",
        "title": "城山日出峰交通及玩乐良心攻略",
        "author": "都给我吃喝玩乐！",
        "likes": 142,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/167b81cfd6179bfe207c603ba04a88f8/1040g00831atldkk6ned05nfor85g88d1165bedo!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/6744794e0000000006015fdf"
      },
      {
        "keyword": "城山日出峰",
        "title": "在jeju🍊城山日出峰拍到了人生照片！",
        "author": "BABYCHAN.",
        "likes": 74,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/bb51764fbf3551e1969f13f00f4d4632/1040g008318cjt78iju0049r816ch15k5fstsu88!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66face77000000002c02aeac"
      },
      {
        "keyword": "城山日出峰",
        "title": "不要被滤镜骗了，真实的济州岛城山日出峰",
        "author": "小红薯66C617F8",
        "likes": 58,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/de4272e9eb0302eb5176f25252e713de/spectrum/1040g0k0316fh7kgn1c005olnrd0mddf2j10q7e8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66bc4193000000001e01ebbf"
      },
      {
        "keyword": "城山日出峰",
        "title": "城山日出峰被骗了！",
        "author": "萧寒",
        "likes": 41,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/1eb969918f0c4fb0720b3558da6a4672/1040g00831i79qr65n0005o4k3j1g9fk814f54m8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/683d0b160000000003039818"
      },
      {
        "keyword": "城山日出峰",
        "title": "城山日出峰当然要去看日出啦 济州-1",
        "author": "大猫猫爱旅行",
        "likes": 34,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/1e58082da140a1eeb13525f1d78c4d5e/1040g2sg31c59j31v0c9g5prfnen62moggki20p8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/6776c0aa0000000013009d36"
      },
      {
        "keyword": "城山日出峰",
        "title": "城山日出峰 你爬了吗？",
        "author": "Shh..",
        "likes": 14,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/f8b90489b797c0f15ba3758a0cd0515b/1040g2sg3180lbq5g460040t6d1tvr1t2ghc3alg!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66ee9063000000002700340b"
      }
    ]
  },
  "food": {
    "name": "美食推荐", 
    "items": [
      {
        "keyword": "咸得海滩",
        "title": "济州咸德海边！！人均70的一人食海鲜石锅饭♨️",
        "author": "大发",
        "likes": 152,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/26b1c5e2316181fab6cf92f0401cfdef/1040g008318drbq3tgs5043dalc27sa77pnedtb0!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66fcc12f000000001902cbc5"
      },
      {
        "keyword": "济州岛",
        "title": "在济州岛三天吃了18家。。。（附地址）",
        "author": "yìyì",
        "likes": 60,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/89c6d6a1ef6441cc9c855b78cb6a9bb3/1040g00831in96lkphc104a35hlntlai9hcnp0s8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/684d692000000000220265ec"
      }
    ]
  },
  "accommodation": {
    "name": "住宿体验",
    "items": [
      {
        "keyword": "咸得海滩",
        "title": "在咸德我推荐这家酒店",
        "author": "桐谷美0",
        "likes": 147,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/68596bb29e0eafbb7068b9c2306fafec/1040g0083116456bd6a004a1cpcl2oqcg2p1itno!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/660ec8080000000004019927"
      },
      {
        "keyword": "咸得海滩",
        "title": "济州岛～酒店来了",
        "author": "Hana",
        "likes": 51,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/d30683bebe31ed1daf6379b42e9ca167/1040g2sg317nbhtahjq705osb4nr7rcgg27m0m8o!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66e508bd000000000c01ae5a"
      },
      {
        "keyword": "济州岛",
        "title": "🇰🇷济州岛！人生海景房！280r俩人",
        "author": "大脸草莓",
        "likes": 22,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/538fee8970900af31e843822aefb748c/notes_pre_post/1040g3k831ihvk6a0083048l0kvabidmo5821kfo!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/6847fc8e00000000220254fc"
      }
    ]
  },
  "transport": {
    "name": "交通出行",
    "items": [
      {
        "keyword": "咸得海滩",
        "title": "人在济州🚖机场打车到咸德真的超方便‼️",
        "author": "溜吧在苏州",
        "likes": 101,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/54c2cd8c489ccb7611afe62f0a1fdcb5/1040g2sg316noa0k70ud048hqu33us8fmijt0nv0!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66c4ac9e000000001d01967c"
      }
    ]
  },
  "general": {
    "name": "综合攻略",
    "items": [
      {
        "keyword": "济州岛",
        "title": "济州岛真的会惩罚每个不好好做攻略的人",
        "author": "蓝书",
        "likes": 9552,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/46e587fd7aad92fd7b2586335bfba39f/1040g008315igo0620u005o0umvhgbm29dg6cnr8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/669e8b54000000000a02477e"
      },
      {
        "keyword": "城山日出峰",
        "title": "强烈建议去济州岛海边住一晚",
        "author": "包子王小猪",
        "likes": 8600,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/7487978a74a4833797f1b77e488fe4e0/1040g008315r68ekv1a005op4ghlosi55isldpf8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/66a76ccf0000000005032b09"
      },
      {
        "keyword": "济州岛",
        "title": "✈️江浙沪牛马不请假🩵济州岛2天3夜攻略",
        "author": "Aya",
        "likes": 5854,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/02afe16ad40d6b298d2b993d0d5445a7/notes_pre_post/1040g3k831fvnofumg6005og72g7410g7ieq5org!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/67f3c53f000000000f039585"
      },
      {
        "keyword": "城山日出峰",
        "title": "淡季的济州岛真的是人间理想！Live图！附机位",
        "author": "贾还好",
        "likes": 3872,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/c5d6a0a98fa70cfff93133ccb2b948a1/1040g2sg31dq0v5ji10704bbq3io0cl0hat8sai0!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/67ac602000000000180086f2"
      },
      {
        "keyword": "城山日出峰",
        "title": "济州岛四天三晚旅游攻略（p人版）",
        "author": "yuyu",
        "likes": 1583,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/6ec8ea3e884fe2e3ff1b5d1329c195c2/1040g008319g40ogeme004a6kh7cudgn1ua395go!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/671f2932000000002100ae64"
      },
      {
        "keyword": "济州岛",
        "title": "太满意我的济州岛攻略了",
        "author": "Caro",
        "likes": 1532,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/54184ef82e075f346d5b9e81c86ba9ae/notes_pre_post/1040g3k031igi59elg2704a72ttf8d0s42846l00!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/6846868400000000030394a8"
      },
      {
        "keyword": "济州岛",
        "title": "Jeju | 免签济州说走就走🍊J人新鲜攻略",
        "author": "一颗六月柠",
        "likes": 788,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/179239266af3fb18fa5b5e15fd6bb8bf/1040g00831igk0h2602005o0dncdg9d5k41h4ff8!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/684695b3000000002001d052"
      },
      {
        "keyword": "城山日出峰",
        "title": "适合带娃出国旅游地区—济州岛",
        "author": "柱爸一定行",
        "likes": 668,
        "image_url": "https://sns-webpic-qc.xhscdn.com/202506181422/30514bac61939d2c8647c4ff03fe4bc5/1040g2sg31imv5gl0gu705ne0rgug8duc3fj8hug!nc_n_webp_mw_1",
        "note_url": "https://www.xiaohongshu.com/explore/68483ff5000000002202af02"
      }
    ]
  }
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