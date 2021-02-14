export default class Food {
    element: HTMLElement;
    constructor() {
        // 获取页面中的元素，并赋值，感叹号的意思是声明元素一定存在
        this.element = document.getElementById('food')!;
    }
    // 定义一个获取事物X轴的方法
    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }
    // 修改食物的位置
    change() {
        // 食物的位置最小是0 ，最大是290
        // 蛇移动一次就是10，所以食物的位置一定是整10
        let X = this.getRandom()
        let Y = this.getRandom()
        this.element.style.left = X + 'px'
        this.element.style.top = Y + 'px'
    }
    // 计算随机数的方法
    getRandom() {
        return Math.round(Math.random() * 29) * 10
    }
}
