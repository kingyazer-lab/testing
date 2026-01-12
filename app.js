// SoloDay 重构版应用主逻辑 - 基于P0修改意见
class SoloDayApp {
    constructor() {
        this.currentPage = 'start';
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkUserStatus();
        this.initializeApp();
    }

    // 绑定事件
    bindEvents() {
        // 开始页面事件
        document.getElementById('start-btn').addEventListener('click', () => this.handleStart());
        
        // 状态选择事件（只在【我的】页面）
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleStatusChange(e.target.dataset.status));
        });
        
        // 三件事卡片事件
        document.querySelectorAll('.today-card').forEach(card => {
            card.querySelector('.card-action-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const action = card.dataset.action;
                this.navigateToPage(action);
            });
        });
        
        // 返回按钮事件
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.navigateToPage('home'));
        });
        
        // 吃什么页面事件
        document.getElementById('today-what-eat').addEventListener('click', () => this.showTodayEatOptions());
        document.getElementById('week-eat-plan').addEventListener('click', () => this.showWeekEatPlan());
        document.getElementById('refresh-list').addEventListener('click', () => this.refreshShoppingList());
        
        // 清洁页面事件
        document.getElementById('do-clean-now').addEventListener('click', () => this.startCleaning());
        document.getElementById('remind-later').addEventListener('click', () => this.setCleanReminder());
        document.getElementById('back-home').addEventListener('click', () => this.navigateToPage('home'));
        
        // 用品补给页面事件
        document.querySelectorAll('.add-supply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.addToSupplyList(e.target));
        });
        
        // 我的页面事件
        document.getElementById('about-product').addEventListener('click', () => this.showAboutProduct());
        
        // 设置开关事件
        document.getElementById('clean-reminder').addEventListener('change', (e) => this.updateSetting('clean_reminder', e.target.checked));
        document.getElementById('food-reminder').addEventListener('change', (e) => this.updateSetting('food_reminder', e.target.checked));
        
        // 底部导航事件
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = item.dataset.page;
                this.navigateToPage(page);
            });
        });
        
        // 输入框回车事件（昵称输入）
        document.getElementById('nickname').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleStart();
            }
        });
    }

    // 检查用户状态
    checkUserStatus() {
        const user = DataUtils.getCurrentUser();
        if (user) {
            this.currentUser = user;
            // 如果有用户数据，直接跳转到首页
            this.navigateToPage('home');
        }
    }

    // 初始化应用
    initializeApp() {
        this.updateHomePage();
        this.initializeSettings();
    }

    // 处理开始（简化登录流程）
    handleStart() {
        const nickname = document.getElementById('nickname').value.trim();
        
        // 创建或更新用户
        if (nickname) {
            this.currentUser = DataUtils.updateUserNickname(nickname);
        } else {
            this.currentUser = DataUtils.getCurrentUser();
        }
        
        this.navigateToPage('home');
        this.showMessage('欢迎回来', 'success');
    }

    // 处理状态变更（只在【我的】页面）
    handleStatusChange(status) {
        // 更新状态按钮样式
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-status="${status}"]`).classList.add('active');
        
        // 更新用户状态
        this.currentUser = DataUtils.updateUserStatus(status);
        
        // 更新相关页面内容
        this.updateHomePage();
        this.updateProfilePage();
        this.showMessage('状态已更新', 'success');
    }

    // 更新首页内容（P0修改：状态只展示，不可操作）
    updateHomePage() {
        if (!this.currentUser) return;
        
        const status = this.currentUser.current_status;
        const suggestions = DataUtils.getTodaySuggestions(status);
        
        // 更新状态说明
        const statusText = this.getStatusText(status);
        document.getElementById('status-text').textContent = statusText;
        document.getElementById('status-description').textContent = suggestions.status_description;
    }

    // 更新我的页面
    updateProfilePage() {
        if (!this.currentUser) return;
        
        const status = this.currentUser.current_status;
        const rhythmText = DataUtils.getRhythmDescription();
        
        // 更新状态按钮
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-status="${status}"]`).classList.add('active');
        
        // 更新节奏描述
        document.getElementById('rhythm-text').textContent = rhythmText;
    }

    // 页面导航
    navigateToPage(page) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // 显示目标页面
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            // 更新底部导航
            this.updateBottomNav(page);
            
            // 初始化页面内容
            this.initializePage(page);
            
            // 显示/隐藏底部导航
            this.toggleBottomNav(page !== 'start');
        }
    }

    // 更新底部导航
    updateBottomNav(activePage) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-page="${activePage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    // 显示/隐藏底部导航
    toggleBottomNav(show) {
        const bottomNav = document.getElementById('bottom-nav');
        bottomNav.style.display = show ? 'flex' : 'none';
    }

    // 初始化页面内容
    initializePage(page) {
        switch (page) {
            case 'home':
                this.updateHomePage();
                break;
            case 'eat':
                this.initializeEatPage();
                break;
            case 'clean':
                this.initializeCleanPage();
                break;
            case 'supplies':
                this.initializeSuppliesPage();
                break;
            case 'profile':
                this.updateProfilePage();
                break;
        }
    }

    // 初始化吃什么页面
    initializeEatPage() {
        const status = DataUtils.getUserStatus();
        const suggestion = DataUtils.getEatSuggestion(status);
        document.getElementById('today-eat-advice').textContent = suggestion;
        
        // 隐藏购物清单
        document.getElementById('shopping-list').style.display = 'none';
    }

    // 初始化清洁页面
    initializeCleanPage() {
        const status = DataUtils.getUserStatus();
        const advice = DataUtils.getCleaningAdvice(status);
        
        if (advice.length > 0) {
            const rule = advice[0];
            document.getElementById('clean-scene').innerHTML = `
                <h3>${rule.scene_name}</h3>
                <div class="clean-duration">建议时长：${rule.suggest_duration}</div>
                <div class="clean-prompt">${rule.prompt_text}</div>
            `;
            document.getElementById('clean-scene').dataset.scene = rule.scene;
        }
        
        // 隐藏反馈区域
        document.getElementById('clean-feedback').style.display = 'none';
        document.querySelector('.clean-actions').style.display = 'flex';
    }

    // 初始化用品补给页面
    initializeSuppliesPage() {
        const products = DataUtils.getSuppliesProducts();
        const suppliesList = document.querySelector('.supplies-list');
        
        // 清空现有内容
        suppliesList.innerHTML = '';
        
        // 重新生成商品卡片
        products.forEach(product => {
            const card = this.createSupplyCard(product);
            suppliesList.appendChild(card);
        });
    }

    // 创建商品卡片
    createSupplyCard(product) {
        const card = document.createElement('div');
        card.className = 'supply-card';
        card.innerHTML = `
            <div class="supply-info">
                <h3 class="supply-name">${product.product_name}</h3>
                <div class="supply-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="supply-cycle">建议使用周期：${product.cycle}</div>
                <p class="supply-desc">${product.description}</p>
            </div>
            <button class="add-supply-btn">加入下次补给</button>
        `;
        
        // 绑定事件
        card.querySelector('.add-supply-btn').addEventListener('click', (e) => {
            this.addToSupplyList(e.target);
        });
        
        return card;
    }

    // 初始化设置
    initializeSettings() {
        const settings = DataUtils.getAppSettings();
        document.getElementById('clean-reminder').checked = settings.clean_reminder;
        document.getElementById('food-reminder').checked = settings.food_reminder;
    }

    // 获取状态文本
    getStatusText(status) {
        const statusMap = {
            steady: '稳',
            tired: '累',
            messy: '乱',
            empty: '空'
        };
        return statusMap[status] || '稳';
    }

    // 显示今日吃什么选项
    showTodayEatOptions() {
        const status = DataUtils.getUserStatus();
        const suggestions = SoloDayData.eat_suggestions[status] || SoloDayData.eat_suggestions.steady;
        
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        const suggestion = suggestions[randomIndex];
        
        document.getElementById('today-eat-advice').textContent = suggestion;
        this.showMessage('已更新今日饮食建议', 'success');
    }

    // 显示本周饮食计划
    showWeekEatPlan() {
        const status = DataUtils.getUserStatus();
        const suggestions = SoloDayData.eat_suggestions[status] || SoloDayData.eat_suggestions.steady;
        
        // 随机选择3个不同的建议
        const selectedSuggestions = [];
        const indices = [];
        while (indices.length < 3 && indices.length < suggestions.length) {
            const index = Math.floor(Math.random() * suggestions.length);
            if (!indices.includes(index)) {
                indices.push(index);
                selectedSuggestions.push(suggestions[index]);
            }
        }
        
        // 显示3天计划
        document.getElementById('today-eat-advice').innerHTML = 
            `<strong>本周3天简单吃计划：</strong><br><br>
             今天：${selectedSuggestions[0]}<br><br>
             明天：${selectedSuggestions[1] || selectedSuggestions[0]}<br><br>
             后天：${selectedSuggestions[2] || selectedSuggestions[0]}`;
        
        // 显示购物清单
        this.showShoppingList();
        this.showMessage('已生成本周饮食计划', 'success');
    }

    // 显示购物清单
    showShoppingList() {
        const status = DataUtils.getUserStatus();
        const items = DataUtils.getShoppingList(status);
        
        const itemsList = items.map(item => `<li>${item}</li>`).join('');
        document.getElementById('shopping-items').innerHTML = itemsList;
        document.getElementById('shopping-list').style.display = 'block';
    }

    // 刷新购物清单
    refreshShoppingList() {
        const status = DataUtils.getUserStatus();
        const items = DataUtils.getShoppingList(status);
        
        const itemsList = items.map(item => `<li>${item}</li>`).join('');
        document.getElementById('shopping-items').innerHTML = itemsList;
        this.showMessage('购物清单已刷新', 'success');
    }

    // 开始清洁
    startCleaning() {
        const scene = document.getElementById('clean-scene').dataset.scene;
        
        // 显示清洁反馈（P0修改：使用降指令感文案）
        const feedback = DataUtils.getCleanFeedback(scene);
        document.getElementById('feedback-text').textContent = feedback;
        
        // 隐藏操作按钮，显示反馈
        document.querySelector('.clean-actions').style.display = 'none';
        document.getElementById('clean-feedback').style.display = 'block';
        
        // 记录清洁时间
        DataUtils.setLastCleanTime(scene);
        
        this.showMessage('清洁完成！', 'success');
    }

    // 设置清洁提醒
    setCleanReminder() {
        this.showMessage('已设置提醒，稍后通知您', 'success');
        setTimeout(() => {
            this.showMessage('该清洁了，现在感觉怎么样？', 'info');
        }, 5000); // 5秒后提醒（演示用）
    }

    // 添加到补给清单
    addToSupplyList(button) {
        const card = button.closest('.supply-card');
        const productName = card.querySelector('.supply-name').textContent;
        
        // 改变按钮状态
        button.textContent = '已添加';
        button.style.color = '#4CAF50';
        button.disabled = true;
        
        this.showMessage(`已将${productName}加入补给清单`, 'success');
        
        // 2秒后恢复按钮状态（演示用）
        setTimeout(() => {
            button.textContent = '加入下次补给';
            button.style.color = '#007AFF';
            button.disabled = false;
        }, 2000);
    }

    // 显示关于产品
    showAboutProduct() {
        alert('SoloDay 是为一个人长期生活的人设计的生活方式系统。\n\n我们相信，简单的生活也可以很美好。\n没有打卡，没有压力，只有安静的建议。');
    }

    // 更新设置
    updateSetting(setting, value) {
        const settings = DataUtils.getAppSettings();
        settings[setting] = value;
        DataUtils.saveAppSettings(settings);
        
        const settingText = setting === 'clean_reminder' ? '清洁提醒' : '饮食建议';
        this.showMessage(`${settingText}已${value ? '开启' : '关闭'}`, 'success');
    }

    // 显示消息
    showMessage(message, type = 'info') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `${type}-message`;
        messageEl.textContent = message;
        
        // 添加到页面
        document.body.appendChild(messageEl);
        
        // 3秒后移除
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }

    // 显示错误消息
    showError(message) {
        this.showMessage(message, 'error');
    }

    // 显示成功消息
    showSuccess(message) {
        this.showMessage(message, 'success');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new SoloDayApp();
});

// 添加一些实用的全局函数
window.SoloDayUtils = {
    // 格式化时间
    formatTime(date) {
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};