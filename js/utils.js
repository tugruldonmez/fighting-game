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