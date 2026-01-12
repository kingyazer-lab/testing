// SoloDay 数据表结构 - 重构版
const SoloDayData = {
    // 用户表
    users: {
        currentUser: {
            user_id: 'user_001',
            nickname: '',
            current_status: 'steady', // steady, tired, messy, empty
            last_access_time: new Date(),
            created_at: new Date('2024-01-01'),
            rhythm_description: '你的生活节奏平稳，平均每2天查看一次吃什么建议',
            remind_preference: {
                clean: true,
                food: true
            }
        }
    },

    // 今日建议模板表
    today_suggestions: {
        steady: {
            status_description: '今天状态不错，保持平稳的节奏就好。',
            eat_suggestion: '今天适合简单的家常菜，比如番茄炒蛋配米饭，不需要太复杂。',
            clean_suggestion: '厨房台面看起来有些杂乱，简单的擦拭就能让厨房看起来更舒服。',
            relax_suggestion: '找个安静的角落，听首喜欢的歌，让心情保持平静。'
        },
        tired: {
            status_description: '看起来有些疲惫，今天就对自己好一点吧。',
            eat_suggestion: '推荐现成的三明治和热牛奶，不需要开火，10分钟就能吃完。',
            clean_suggestion: '今天可以稍微休息一下，清洁的事情明天再说也没关系。',
            relax_suggestion: '泡杯热茶，坐在窗边发发呆，给自己一点喘息的时间。'
        },
        messy: {
            status_description: '感觉有些混乱，慢慢来，一切都会好起来的。',
            eat_suggestion: '简单的面条最容易，煮一下加点调料就能吃。',
            clean_suggestion: '从一个角落开始整理，不需要一次做完，慢慢来。',
            relax_suggestion: '深呼吸几次，把混乱的思绪慢慢整理清楚。'
        },
        empty: {
            status_description: '今天感觉空空的，给自己一点温柔的陪伴。',
            eat_suggestion: '热乎乎的粥最适合现在，简单温暖，不会太麻烦。',
            clean_suggestion: '简单的整理就能让空间感觉更舒适一些。',
            relax_suggestion: '静静地坐一会儿，让空荡的感觉慢慢填满。'
        }
    },

    // 清洁规则表
    cleaning_rules: [
        {
            rule_id: 1,
            scene: 'kitchen',
            scene_name: '厨房台面',
            suggest_frequency: 'daily',
            suggest_duration: '10-15分钟',
            prompt_text: '台面看起来有些杂乱，简单的擦拭就能让厨房看起来更舒服。',
            status_conditions: { tired: false },
            priority: 5
        },
        {
            rule_id: 2,
            scene: 'bathroom',
            scene_name: '卫生间',
            suggest_frequency: '2days',
            suggest_duration: '15-20分钟',
            prompt_text: '卫生间需要一点关爱了，简单的清洁能让使用体验更好。',
            status_conditions: { tired: false },
            priority: 4
        },
        {
            rule_id: 3,
            scene: 'floor',
            scene_name: '地面',
            suggest_frequency: '3days',
            suggest_duration: '20-25分钟',
            prompt_text: '地面有些灰尘了，简单的清扫能让整个空间感觉更清爽。',
            status_conditions: { tired: false, empty: false },
            priority: 3
        }
    ],

    // 补给商品表
    supplies_products: [
        {
            product_id: 1,
            product_name: '温和洗面奶',
            tags: ['一人份', '不浪费', '好收纳'],
            cycle: '2个月',
            description: '温和不刺激，适合日常使用，小包装不易过期。',
            display_order: 1,
            is_active: true
        },
        {
            product_id: 2,
            product_name: '厨房湿巾',
            tags: ['一人份', '不浪费', '好收纳'],
            cycle: '1个月',
            description: '清洁台面很方便，抽取式设计，用完即弃。',
            display_order: 2,
            is_active: true
        },
        {
            product_id: 3,
            product_name: '速溶咖啡',
            tags: ['一人份', '好收纳'],
            cycle: '3个月',
            description: '小包装，冲泡简单，不用担心开封后变质。',
            display_order: 3,
            is_active: true
        },
        {
            product_id: 4,
            product_name: '垃圾袋',
            tags: ['一人份', '不浪费', '好收纳'],
            cycle: '2个月',
            description: '小号设计，适合一人使用，不易堆积异味。',
            display_order: 4,
            is_active: true
        },
        {
            product_id: 5,
            product_name: '洗发水',
            tags: ['一人份', '好收纳'],
            cycle: '3个月',
            description: '温和配方，适合日常使用，小包装便于携带。',
            display_order: 5,
            is_active: true
        }
    ],

    // 饮食建议数据
    eat_suggestions: {
        steady: [
            '今天适合吃一碗热汤面，加些青菜和一个鸡蛋。简单，温暖，不麻烦。',
            '简单的米饭配炒蛋，再加个清汤，营养均衡又容易做。',
            '蒸个鸡蛋羹，配点小菜，清淡但是很有饱腹感。'
        ],
        tired: [
            '推荐现成的三明治和热牛奶，不需要开火，10分钟就能吃完。',
            '简单的燕麦粥，加点蜂蜜和坚果，营养又省事。',
            '外卖的粥配咸菜，热乎的，不需要自己动手。'
        ],
        messy: [
            '简单的面条最容易，煮一下加点调料就能吃。',
            '微波炉加热的便当，配点热汤，快速解决一顿饭。',
            '面包配牛奶，简单直接，不需要太多思考。'
        ],
        empty: [
            '热乎乎的粥最适合现在，简单温暖，不会太麻烦。',
            '简单的白粥配咸菜，清淡但是能让胃舒服。',
            '热牛奶配饼干，简单却能带来一点温暖。'
        ]
    },

    // 购物清单模板
    shopping_lists: {
        steady: ['面条 500g', '鸡蛋 6个', '小青菜 一把', '西红柿 2个', '生抽 1瓶', '盐 1包'],
        tired: ['三明治 2个', '牛奶 1L', '燕麦片 1包', '蜂蜜 1瓶', '坚果 1袋', '咸菜 1包'],
        messy: ['面条 500g', '调料包 5包', '速冻饺子 1袋', '面包 1袋', '牛奶 1L', '咸菜 1包'],
        empty: ['大米 1kg', '咸菜 1包', '鸡蛋 6个', '牛奶 1L', '饼干 1盒', '白糖 1包']
    },

    // 清洁反馈文案（P0修改：降指令感）
    clean_feedback: {
        kitchen: [
            '可以了，今天不用再管这个',
            '做到了就行，不必做到完美',
            '你已经把生活接住了'
        ],
        bathroom: [
            '可以了，今天不用再管这个',
            '做到了就行，不必做到完美',
            '你已经把生活接住了'
        ],
        floor: [
            '可以了，今天不用再管这个',
            '做到了就行，不必做到完美',
            '你已经把生活接住了'
        ]
    },

    // 放松建议
    relax_suggestions: {
        steady: [
            '找个安静的角落，听首喜欢的歌，让心情保持平静。',
            '泡杯热茶，翻翻喜欢的书，享受片刻宁静。'
        ],
        tired: [
            '泡杯热茶，坐在窗边发发呆，给自己一点喘息的时间。',
            '找个舒适的椅子，闭上眼睛休息10分钟。'
        ],
        messy: [
            '深呼吸几次，把混乱的思绪慢慢整理清楚。',
            '听点轻音乐，让烦躁的心情慢慢平静下来。'
        ],
        empty: [
            '静静地坐一会儿，让空荡的感觉慢慢填满。',
            '写点东西，把心里的想法记录下来。'
        ]
    },

    // 用户节奏描述
    rhythm_descriptions: [
        '你的生活节奏平稳，平均每2天查看一次吃什么建议',
        '你最近比较关注饮食，经常查看吃什么页面',
        '你习惯定期清洁，保持着良好的生活节奏',
        '你最近有些疲惫，记得多照顾自己一些',
        '你的生活状态很规律，保持着简单的生活方式'
    ],

    // 本地存储键名
    storage_keys: {
        current_user: 'soloday_current_user',
        user_status: 'soloday_user_status',
        last_clean_time: 'soloday_last_clean_',
        shopping_list: 'soloday_shopping_list',
        app_settings: 'soloday_app_settings'
    }
};

// 数据操作工具函数
const DataUtils = {
    // 获取当前用户状态
    getCurrentUser() {
        const user = localStorage.getItem(SoloDayData.storage_keys.current_user);
        return user ? JSON.parse(user) : SoloDayData.users.currentUser;
    },

    // 保存用户状态
    saveCurrentUser(user) {
        localStorage.setItem(SoloDayData.storage_keys.current_user, JSON.stringify(user));
    },

    // 获取用户当前状态
    getUserStatus() {
        const user = this.getCurrentUser();
        return user.current_status;
    },

    // 更新用户状态
    updateUserStatus(status) {
        const user = this.getCurrentUser();
        user.current_status = status;
        user.last_access_time = new Date();
        this.saveCurrentUser(user);
        return user;
    },

    // 更新用户昵称
    updateUserNickname(nickname) {
        const user = this.getCurrentUser();
        user.nickname = nickname;
        this.saveCurrentUser(user);
        return user;
    },

    // 获取今日建议
    getTodaySuggestions(status) {
        return SoloDayData.today_suggestions[status] || SoloDayData.today_suggestions.steady;
    },

    // 获取清洁建议
    getCleaningAdvice(status) {
        const rules = SoloDayData.cleaning_rules.filter(rule => {
            // 检查状态条件
            if (rule.status_conditions && rule.status_conditions[status] === false) {
                return false;
            }
            
            // 检查时间条件（简化版）
            const lastCleanTime = this.getLastCleanTime(rule.scene);
            if (lastCleanTime) {
                const hoursSinceLastClean = (new Date() - new Date(lastCleanTime)) / (1000 * 60 * 60);
                
                if (rule.suggest_frequency === 'daily' && hoursSinceLastClean < 24) {
                    return false;
                }
                if (rule.suggest_frequency === '2days' && hoursSinceLastClean < 48) {
                    return false;
                }
                if (rule.suggest_frequency === '3days' && hoursSinceLastClean < 72) {
                    return false;
                }
            }
            
            return true;
        });

        // 按优先级排序并返回前2个
        return rules
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 2);
    },

    // 获取饮食建议
    getEatSuggestion(status) {
        const suggestions = SoloDayData.eat_suggestions[status] || SoloDayData.eat_suggestions.steady;
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        return suggestions[randomIndex];
    },

    // 获取购物清单
    getShoppingList(status) {
        const items = SoloDayData.shopping_lists[status] || SoloDayData.shopping_lists.steady;
        const randomItems = [];
        const itemCount = Math.min(4, items.length); // 最多4个物品
        
        // 随机选择物品
        const indices = [];
        while (indices.length < itemCount) {
            const index = Math.floor(Math.random() * items.length);
            if (!indices.includes(index)) {
                indices.push(index);
                randomItems.push(items[index]);
            }
        }
        
        return randomItems;
    },

    // 获取放松建议
    getRelaxSuggestion(status) {
        const suggestions = SoloDayData.relax_suggestions[status] || SoloDayData.relax_suggestions.steady;
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        return suggestions[randomIndex];
    },

    // 获取清洁反馈（P0修改：随机选择降指令感文案）
    getCleanFeedback(scene) {
        const feedbacks = SoloDayData.clean_feedback[scene] || SoloDayData.clean_feedback.kitchen;
        const randomIndex = Math.floor(Math.random() * feedbacks.length);
        return feedbacks[randomIndex];
    },

    // 获取用户节奏描述
    getRhythmDescription() {
        const user = this.getCurrentUser();
        const descriptions = SoloDayData.rhythm_descriptions;
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    },

    // 获取补给商品
    getSuppliesProducts() {
        return SoloDayData.supplies_products
            .filter(product => product.is_active)
            .sort((a, b) => a.display_order - b.display_order);
    },

    // 记录清洁时间
    setLastCleanTime(scene) {
        localStorage.setItem(SoloDayData.storage_keys.last_clean_time + scene, new Date().toISOString());
    },

    // 获取上次清洁时间
    getLastCleanTime(scene) {
        return localStorage.getItem(SoloDayData.storage_keys.last_clean_time + scene);
    },

    // 获取应用设置
    getAppSettings() {
        const settings = localStorage.getItem(SoloDayData.storage_keys.app_settings);
        return settings ? JSON.parse(settings) : {
            clean_reminder: true,
            food_reminder: true
        };
    },

    // 保存应用设置
    saveAppSettings(settings) {
        localStorage.setItem(SoloDayData.storage_keys.app_settings, JSON.stringify(settings));
    },

    // 初始化数据
    initializeData() {
        // 检查是否有现有用户数据
        if (!localStorage.getItem(SoloDayData.storage_keys.current_user)) {
            this.saveCurrentUser(SoloDayData.users.currentUser);
        }
        
        // 初始化应用设置
        if (!localStorage.getItem(SoloDayData.storage_keys.app_settings)) {
            this.saveAppSettings({
                clean_reminder: true,
                food_reminder: true
            });
        }
    },

    // 清除所有数据（用于测试）
    clearAllData() {
        Object.values(SoloDayData.storage_keys).forEach(key => {
            localStorage.removeItem(key);
        });
    }
};

// 初始化数据
DataUtils.initializeData();