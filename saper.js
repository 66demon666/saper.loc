    const app = Vue.createApp({
        data() {
            return {
                field: [],
                fieldWidth: 0,
                fieldHeight: 0,
            }
        },
        created() {
            this.createField(5, 5);
            this.setBombs(2);
        },
        methods: {
            createField(width, height) {
                let id = 0;
                this.fieldHeight = height;
                this.fieldWidth = width;
                console.log(this.fieldWidth + ":" + this.fieldHeight);
                for (let h = 0; h < height; h++) {
                    this.field[h] = [];
                    for (let w = 0; w < width; w++) {
                        this.field[h].push({
                            id: id,
                            isBomb: false,
                            bombsCount: 0,
                        });
                        id++;
                    }
                }
            },
            getRandomInt(max) {
                return Math.floor(Math.random() * max);
            },
            markCell(x, y) {
                this.field[x][y].isBomb = true;
            },
            calcBombsNear(x, y) {
                //верхний левый угол
                if (((x - 1) >= 0) && ((y - 1) >= 0)) {
                    this.field[x - 1][y - 1].bombsCount++;
                }
                //верхний правый угол
                if (((x + 1) < this.fieldWidth) && ((y - 1) >= 0)) {
                    this.field[x + 1][y - 1].bombsCount++;
                }
                //верхний кубик
                if (((y - 1) >= 0)) {
                    this.field[x][y - 1].bombsCount++;
                }

                //нижний левый угол
                if (((x - 1) >= 0) && ((y + 1) < this.fieldHeight)) {
                    this.field[x - 1][y + 1].bombsCount++;
                }
                //нижний правый угол
                if (((x + 1) < this.fieldWidth) && ((y + 1) < this.fieldHeight)) {
                    this.field[x + 1][y + 1].bombsCount++;
                }
                //нижний кубик
                if (((y + 1) < this.fieldHeight)) {
                    this.field[x][y + 1].bombsCount++;
                }

                //Слева
                if (((x - 1) >= 0)) {
                    this.field[x - 1][y].bombsCount++;
                }

                //Справа
                if (((x + 1) < this.fieldWidth)) {
                    this.field[x + 1][y].bombsCount++;
                }
            },
            openCell(y, x) {
                this.field[y][x].isOpen = true;
            },
            setBombs(bombsCount) {
                for (let i = 0; i < bombsCount; i++) {
                    let randomY = this.getRandomInt(this.fieldHeight);
                    let randomX = this.getRandomInt(this.fieldWidth);
                    while (this.field[randomY][randomX].isBomb) {
                        randomY = this.getRandomInt(this.fieldHeight);
                        randomX = this.getRandomInt(this.fieldWidth);
                    }
                    console.log(randomY + "," + randomX);
                    this.field[randomY][randomX].isBomb = true;
                    this.calcBombsNear(randomY, randomX);
                }
            }
        }
    });
    test = app.mount("#game");