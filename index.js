const canvas =document.querySelector('canvas');
const c=canvas.getContext('2d');

canvas.width=1024
canvas.height=578
c.fillRect(0,0,canvas.width,canvas.height)

const gravity=0.73

class Sprite{//player ı oluşturan class
    constructor({position,velocity,color='blue',offset}){
        this.position=position
        this.velocity=velocity
        this.width=50
        this.height=150
        this.lastKey
        this.attackBox={
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset:offset,
            width: 100,
            height: 50
        }
        this.color=color
        this.isAttacking//atak tuşuna basıldığında
    }
    
    draw(){
        c.fillStyle=this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        //attackBox
        if(this.isAttacking){//sadece saldırdığında kılıç gözükecek
            c.fillStyle='green'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
                )
        }
        
    }
    update(){
        this.draw()
        this.attackBox.position.x=this.position.x-this.attackBox.offset.x//offseti çıkararak enemynin kılıcını diğer tarafa aldık
        this.attackBox.position.y=this.position.y

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.position.y+this.height+this.velocity.y >=578)// ekranın altına geldiğinde karakterlerin ekrandan çıkmaması için =0
        {
            this.velocity.y=0
        }
        else{
            this.velocity.y+=gravity
        }
    }
    attack(){
        this.isAttacking=true
        setTimeout(()=>{
            this.isAttacking=false
        },
        100//atak yaptıktan sonra 100ms gecikme
        )
    }
    
}
const player = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    offset:{
        x: 0,
        y: 0
    }
})
const enemy = new Sprite({
    position: {
      x: 400,
      y: 100
    },
    velocity: {
      x: 0,
      y: 0
    },
    offset:{
        x: +50,
        y: 0
    },
    color:'red'
})

const keys={
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
}

function rectangularCollision({rectangle1, rectangle2}){
    return (
            rectangle1.attackBox.position.x + rectangle1.attackBox.width>=//attackbox düşmana x ekseninde değiyorsa 
            rectangle2.position.x&&
            rectangle1.attackBox.position.x<=rectangle2.position.x+rectangle2.width&&
            rectangle1.attackBox.position.y+rectangle1.attackBox.height>=
            rectangle2.position.y&&
            rectangle1.attackBox.position.y<=rectangle2.position.y+rectangle2.height        
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)//
    player.update()
    enemy.update()

    player.velocity.x=0//tuştan kaldırılınca hareket etmemesini sağlar
    enemy.velocity.x=0

    //player hareketleri için
    if(keys.a.pressed&& player.lastKey=='a'){
        player.velocity.x=-4
    }
    else if(keys.d.pressed&& player.lastKey=='d'){
        player.velocity.x=4
    }

    //enemy hareketleri için
    if(keys.ArrowLeft.pressed&& enemy.lastKey=='ArrowLeft'){
        enemy.velocity.x=-4
    }
    else if(keys.ArrowRight.pressed&& enemy.lastKey=='ArrowRight'){
        enemy.velocity.x=4
    }

    //player enemy'e vurduğunda çalışacak kod
    if(rectangularCollision({
        rectangle1:player,
        rectangle2:enemy

    })&&
        player.isAttacking
        ){
            player.isAttacking=false//tek atakta düşmana bir kere hasar vurulması için
            console.log('player attack')
        }
    //enemy player'a vurduğunda çalışacak kod
    if(rectangularCollision({
        rectangle1:enemy,
        rectangle2:player

    })&&
        enemy.isAttacking
        ){
            enemy.isAttacking=false//tek atakta düşmana bir kere hasar vurulması için
            console.log('enemy attack')
        }
}
animate()

window.addEventListener('keydown',(Event) =>{//tuşa basıldığında hareket ettiren
    switch(Event.key){
//player keys
        case 'd':
            keys.d.pressed=true
            player.lastKey='d'
            break
        case 'a':
            keys.a.pressed=true
            player.lastKey='a'
            break
        case 'w':
            player.velocity.y=-10
            break
        case' ':
            player.attack()
            break
//enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastKey='ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastKey='ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y=-10
            break
        case 'p':
            enemy.attack()
            break
    }
})
window.addEventListener('keyup',(Event) =>{//eli tuştan kaldırdığında hareketi durduran
    switch(Event.key){

//player keys
        case 'd':
            keys.d.pressed=false
            break
        case 'a':
            keys.a.pressed=false
            break
//enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break
}
})