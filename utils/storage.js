class Storage {

    setStorage(key, value) {
        // 存对象进去转成字符串
        value = typeof value === 'object' ? JSON.stringify(value) : value;
        localStorage.setItem(key, value);
    }

    removeStorage(key) {
        localStorage.removeItem(key);
    }

    getStorage(key) {
        if (!localStorage.getItem(key)) {  // 不存在，返回一个空串出去
            return {[key]: ''};
        };
        return JSON.parse(localStorage.getItem(key));
    }

    clearStorage() {
        localStorage.clear();
    }
};

export default new Storage();
