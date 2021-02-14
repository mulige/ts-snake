export default class Snake {
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;
    constructor() {
        this.head = document.querySelector('#snake > li') as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('li')
        this.element = document.getElementById('snake')!;
    }
    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }
    set X(value: number) {
        if (this.X === value) return;
        if (value < 0 || value > 290) {
            throw new Error('dead')
        }
        // 禁止蛇掉头，就是在向右的时候不能向左移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                // 如果新值value大于X，说明蛇在向右走，此时发生掉头，应该使蛇继续向右走
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkBody()
    }
    set Y(value: number) {
        if (this.Y === value) return;
        if (value < 0 || value > 290) {
            throw new Error('dead')
        }
        // 禁止蛇掉头，就是在向右的时候不能向左移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                // 如果新值value大于X，说明蛇在向右走，按下了同样的方向，
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px'
        this.checkBody()
    }
    // 吃到食物增加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<li></li>")
    }
    // 蛇身体移动的方法
    moveBody() {
        // 将后面身体的位置设置为前面的位置
        //  4 = 3
        // 蛇头位置不需要修改
        console.log(this.bodies.length);

        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            console.log(X, Y);

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = (this.bodies[i] as HTMLElement);
            if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
                throw new Error('撞到自己了')
            }
        }
    }
}