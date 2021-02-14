import snake from './snake'
import food from './food'
import scorePanel from './scorePanel'
export default class GameControl {
    snake: snake;
    food: food;
    scorePanel: scorePanel;
    direction: string = 'Right';
    isLive: boolean = true;
    constructor() {
        this.snake = new snake()
        this.food = new food()
        this.scorePanel = new scorePanel()
        this.init()
    }
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }
    keydownHandler(event: KeyboardEvent) {

        this.direction = event.key;
    }
    // 控制蛇移动的方法
    run() {
        // 根据方向修改蛇的位置
        let x = this.snake.X
        let y = this.snake.Y

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                y -= 10
                break;
            case "ArrowDown":
            case "Down":
                y += 10
                break;
            case "ArrowLeft":
            case "Left":
                x -= 10
                break;
            case "ArrowRight":
            case "Right":
                x += 10
                break;
        }
        this.checkEat(x, y)
        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (e) {
            this.isLive = false;
            alert('dead')

        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }
    // 蛇吃到食物的判断
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }

}