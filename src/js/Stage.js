
export default class Stage {

    constructor() {
        this.progress = 0
        this.canvas = document.getElementById('scene')
        this.scene = new Scene(this.canvas)
    }

}
