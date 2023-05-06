const canvas =document.querySelector('canvas');
const c=canvas.getContext('2d');

canvas.width=1024
canvas.height=578
c.fillRect(0,0,canvas.width,canvas.height)

const gravity=0.73

const background=new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./img/background.png'
})
const Shop=new Sprite({
    position:{
        x:600,
        y:228
    },
    imageSrc:'./img/shop.png',
    scale:2,
    framesMax:6,
})

const player = new Fighter({
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
    },
    imageSrc:'./img/samuraiMack/Idle.png',
    framesMax:8,
    scale:2,
    offset: {
        x:100  ,
        y:100
    },
    sprites: {
        idle:{
            imageSrc:'./img/samuraiMack/Idle.png',
            framesMax:8
        },
        run:{
            imageSrc:'./img/samuraiMack/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./img/samuraiMack/Jump.png',
            framesMax:2
        },
        fall:{
            imageSrc:'./img/samuraiMack/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            framesMax:6
        }
    }
})
const enemy = new Fighter({
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
    color:'red',
    imageSrc:'./img/kenji/Idle.png',
    framesMax:4,
    scale:2,
    offset: {
        x:100  ,
        y:110
    },
    sprites: {
        idle:{
            imageSrc:'./img/kenji/Idle.png',
            framesMax:4
        },
        run:{
            imageSrc:'./img/kenji/Run.png',
            framesMax:8
        },
        jump:{
            imageSrc:'./img/kenji/Jump.png',
            framesMax:2
        },
        fall:{
            imageSrc:'./img/kenji/Fall.png',
            framesMax:2
        },
        attack1:{
            imageSrc:'./img/kenji/Attack1.png',
            framesMax:4
        }
    }
}
        )

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

decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)//

    background.update()
    Shop.update()
    player.update()
    enemy.update()

    player.velocity.x=0//tuştan kaldırılınca hareket etmemesini sağlar
    enemy.velocity.x=0
    //player hareketleri için
    if(keys.a.pressed&& player.lastKey=='a'){
        player.velocity.x=-4
        player.switchSprites('run')
    }
    else if(keys.d.pressed&& player.lastKey=='d'){
        player.velocity.x=4
        player.switchSprites('run')
    }
    else{
        player.switchSprites('idle')
    }
    if(player.velocity.y<0){
        player.switchSprites('jump')
    }
    else if(player.velocity.y>0){
        player.switchSprites('fall')
    }

    //enemy hareketleri için
    if(keys.ArrowLeft.pressed&& enemy.lastKey=='ArrowLeft'){
        enemy.velocity.x=-4
        enemy.switchSprites('run')
    }
    else if(keys.ArrowRight.pressed&& enemy.lastKey=='ArrowRight'){
        enemy.velocity.x=4
        enemy.switchSprites('run')
    }
    else{
        enemy.switchSprites('idle')
    }
    if(enemy.velocity.y<0){
        enemy.switchSprites('jump')
    }
    else if(enemy.velocity.y>0){
        enemy.switchSprites('fall')
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