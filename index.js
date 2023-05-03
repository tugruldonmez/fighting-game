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
        this.health=100
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
function determineWinner({player,enemy,timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display='flex'//bu satır sadece savaş bittiğinde display='flex' olmasını sağlar
    if(player.health>enemy.health){
        document.querySelector('#displayText').innerHTML='Player 1 Wins !!'
        
    }
    else if(player.health<enemy.health){
        document.querySelector('#displayText').innerHTML='Player 2 Wins !!'
    }
    else{
        document.querySelector('#displayText').innerHTML=='Draw !!'
    }
}
let timer=60
let timerId
function decreaseTimer(){
    if (timer>0){
        timerId=setTimeout(decreaseTimer,1000)// setTimeout belirtilen fonksiyonu belirtilen süre(ms) içerisinde tekrar tekrar çalıştırır
        timer--
        document.querySelector('#timer').innerHTML=timer//innerHTML dememizin sebebi style veya div in fonksiyonlarıyla değil divin içindeki nesneyi işlememiz
    }
    else{
        determineWinner({player,enemy})
    }
}
decreaseTimer()

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
            enemy.health-=20
            document.querySelector('#enemyHealth').style.width=enemy.health+'%'//document.querySelector html dosyasına erişmemizi sağlar
        }
    //enemy player'a vurduğunda çalışacak kod
    if(rectangularCollision({
        rectangle1:enemy,
        rectangle2:player

    })&&
        enemy.isAttacking
        ){
            enemy.isAttacking=false//tek atakta düşmana bir kere hasar vurulması için
            player.health-=20
            document.querySelector('#playerHealth').style.width=player.health+'%'
        }

        //Canlar sıfırlanınca kazananı yazdır
        if(enemy.health<=0||player.health<=0){
            determineWinner({player,enemy,timerId})
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