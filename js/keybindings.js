window.addEventListener('keydown',(Event) =>{//tuşa basıldığında hareket ettiren
    if(!player.dead){
    //player keys
    switch(Event.key){
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
    }
}
    if(!enemy.dead){
    //enemy keys
    switch(Event.key){
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
}
}
)
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