class Sprite{//player ı oluşturan class
    constructor({position, 
        imageSrc, 
        scale=1, 
        framesMax=1,
        offset={x:0,y:0},
    }){
        this.position=position
        this.width=50
        this.height=150
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale//scale de resmin boyutunu kaç ile çarpmak istediğimiz
        this.framesMax=framesMax//animasyon haline getirmek için  
        this.framesCurrent=0
        this.framesHold=10//gösterileceği süre
        this.framesElapsed=0
        this.offset=offset
        
    }
    draw(){
        c.drawImage(this.image,
            this.framesCurrent*(this.image.width/this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height, 
            this.position.x-this.offset.x, 
            this.position.y-this.offset.y, 
            (this.image.width/this.framesMax)*this.scale, 
            this.image.height*this.scale)
    }
    animateFrames(){
        //animasyonun frameler arası zamanı için yazıldı
        if(this.framesElapsed%this.framesHold===0){
            //bacadan duman çıkma animasyonu için yazıldı
            if(this.framesCurrent<this.framesMax-1){
                this.framesCurrent++
            }
            else{
                this.framesCurrent=0
            }
        }
    }
    update(){
        this.draw()
        this.animateFrames()
    }
    
}
    
class Fighter extends Sprite{
    constructor({position,velocity,color='blue',
    imageSrc, 
    scale=1,
    framesMax=1,
    offset={x:0,y:0},
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined }
    }){
        super({//parent constructordan set etmek istediklerimizi super e yazdık 
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity=velocity
        this.width=50
        this.height=150
        this.lastKey
        this.attackBox={
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset:attackBox.offset,
            width: attackBox.width ,
            height: attackBox.height
        }
        this.framesCurrent=0//mevcut frame
        this.framesHold=5//gösterileceği süre
        this.framesElapsed=0
        this.color=color
        this.isAttacking//atak tuşuna basıldığında
        this.health=100
        this.sprites=sprites
        this.dead=false
        
        for( const sprite in this.sprites){
            sprites[sprite].image=new Image()
            sprites[sprite].image.src=sprites[sprite].imageSrc
        }
        console.log(this.sprites);
    }
    
    update(){
        this.draw()
        if(!this.dead){
            this.animateFrames()
        }
        
        this.framesElapsed++

        //attackboxes
        this.attackBox.position.x=this.position.x-this.attackBox.offset.x//offseti çıkararak enemynin kılıcını diğer tarafa aldık
        this.attackBox.position.y=this.position.y-this.attackBox.offset.y

        //attackboxları göstermek için
        // c.fillRect(this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )   

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.position.y+this.height+this.velocity.y >=485)// ekranın altına geldiğinde karakterlerin ekrandan çıkmaması için >=485
        {
            this.velocity.y=0
            this.position.y=335
            this.velocity.y=0
        }
        else{
            this.velocity.y+=gravity
        }

    }
    attack(){
        this.switchSprites('attack1')
        this.isAttacking=true
        setTimeout(()=>{
            this.isAttacking=false
        },
        1000//atak yaptıktan sonra 100ms gecikme
        )
    }

    switchSprites(sprite){

        //öldüğünde diğer animasyonları cancellayan kod
        if(this.image===this.sprites.death.image)
        {
            if(this.framesCurrent===this.sprites.death.framesMax-1){
                this.dead = true
            }
            return
        }
        //atak yapınca diğer animasyonları cancellayan kod
        if(
        this.image===this.sprites.attack1.image && 
        this.framesCurrent<this.sprites.attack1.framesMax-1)
        return
        //dmg yiyince diğer animasyonları cancellayan kod
        if(
            this.image===this.sprites.takeHit.image && 
            this.framesCurrent<this.sprites.takeHit.framesMax-1)
            return
        switch(sprite){
            case 'idle':
                if(this.image!==this.sprites.idle.image){
                    this.image=this.sprites.idle.image
                    this.framesMax=this.sprites.idle.framesMax
                    this.framesCurrent=0
                }
            break
            case 'run':
                if(this.image!==this.sprites.run.image){
                    this.image=this.sprites.run.image
                    this.framesMax=this.sprites.run.framesMax
                    this.framesCurrent=0
                }
            break
            case 'jump':
                if(this.image!==this.sprites.jump.image){
                    this.image=this.sprites.jump.image
                    this.framesMax=this.sprites.jump.framesMax
                    this.framesCurrent=0
                }
            break
            case 'fall':
                if(this.image!==this.sprites.fall.image){
                    this.image=this.sprites.fall.image
                    this.framesMax=this.sprites.fall.framesMax
                    this.framesCurrent=0
                }
            break
            case 'attack1':
                if(this.image!==this.sprites.attack1.image){
                    this.image=this.sprites.attack1.image
                    this.framesMax=this.sprites.attack1.framesMax
                    this.framesCurrent=0
                }
            break
            case 'takeHit':
                if(this.image!==this.sprites.takeHit.image){
                    this.image=this.sprites.takeHit.image
                    this.framesMax=this.sprites.takeHit.framesMax
                    this.framesCurrent=0
                }
            break
            case 'death':
                if(this.image!==this.sprites.death.image){
                    this.image=this.sprites.death.image
                    this.framesMax=this.sprites.death.framesMax
                    this.framesCurrent=0
                }
            break
        }
        
    
    }
}
