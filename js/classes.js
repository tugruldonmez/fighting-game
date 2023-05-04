class Sprite{//player ı oluşturan class
    constructor({position, imageSrc, scale=1, framesMax=1}){
        this.position=position
        this.width=50
        this.height=150
        this.image=new Image()
        this.image.src=imageSrc
        this.scale=scale//scale de resmin boyutunu kaç ile çarpmak istediğimiz
        this.framesMax=framesMax//shop.png 6 farklı shop içeriyor animasyon haline getirmek için  
        this.framesCurrent=0//mevcut frame
        this.framesHold=15//gösterileceği süre
        this.framesElapsed=0

    }
    draw(){
        c.drawImage(this.image,
            this.framesCurrent*(this.image.width/this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height, 
            this.position.x, 
            this.position.y, 
            (this.image.width/this.framesMax)*this.scale, 
            this.image.height*this.scale)
        c
    }
    update(){
        this.draw()
        this.framesElapsed++
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
    
}
    
class Fighter{//player ı oluşturan class
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
        if(this.position.y+this.height+this.velocity.y >=485)// ekranın altına geldiğinde karakterlerin ekrandan çıkmaması için >=485
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