/* O jogador “ circulo azul” deve se movimentar com "w,a,s,d" ou as setinhas do teclado, ao pressionar o botão esquerdo do mouse na região da tela um projétil ira na direção aonde foi clicado dependendo da arma do jogador, caso os inimigos "círculos vermelho" forem atingindo pelo projétil levara dano e caso o jogador encostar no inimigos o jogador levara dano, o objetivo ser não levar dano e eliminar as levas de inimigos que aumenta ao decorrer do jogo       
*/
//-------------- classe do jogador -------------------------------- 
  class jogador{
  constructor (x,y,z){
  //------posiçao x y e tamanho z  -------------------------------
  this.x=x
  this.y=y
  this.z=z
  //--------------armar e seus parametros-------------------------  
  this.DanoBonos=0
  this.VelocidadeBonos=300
  this.arma=new arma_simples(this.VelocidadeBonos,this.DanoBonos )//---objeto: armar inicial do jogador 
  //--------------------------------------------------------------
  this.level=1 
  this.vida=100 
  }

    colocar(){//--------------- função do movimetação do jogador -----------
     if ((keyIsDown(LEFT_ARROW)||keyIsDown(65))&&this.x>0) {
    this.x-= 3;
  }

  if ((keyIsDown(RIGHT_ARROW)||keyIsDown(68))&&this.x<1000) {
    this.x += 3;
  }

  if((keyIsDown(UP_ARROW)||keyIsDown(87))&&this.y>0) {
   this.y -= 3;
  }

  if ((keyIsDown(DOWN_ARROW)||keyIsDown(83))&&this.y<600) {
    this.y += 3;
  }
  //------------------------------------------------------------
      
      
    circle(this.x,this.y,this.z+20)//--------- formado do jogador 
      this.arma.Posicao(this.x,this.y)//------ posição da armar do jogador 
      this.arma.ataque()//-------------------- funçao do ataque da armar 
  }
}
//----------------------------------------------------------------

//-------------------------armas-----------------------------------

  //--------classe pai "classe padrão para todas as armas"----------
  class armas{
  constructor(Tempo,dano){
  this.Tempo=Tempo 
  this.x=0
  this.y=0
  this.esp=0
  this.dano=dano  
  }
  //-------------funçao posição para a armar------------
  Posicao(x,y){
     
    push()
    this.x=progX(x,y)*(10+jog.z/2)+x
    this.y=progY(x,y)*(10+jog.z/2)+y
    if(this.esp>=this.Tempo*0.5) fill(180,30,60)
    else fill(0)
    angleMode(RADIANS)
    rectMode(CENTER)
    translate(progX(x,y)*(10+jog.z/2)+x,progY(x,y)*(10+jog.z/2)+y)
    rotate(-PI/2+atan2(mouseY - y, mouseX - x));
    rect(0,0,5,10)
    pop()
    
  } 
  //-----------------------------------------------
}
  //-------------classe filha "armar mais simples"
  class arma_simples extends armas{
 
    ataque(){//---------cria um  vetor com objetos "balas_simples" a cada circulo de tempo
    if(mouseIsPressed){
      if(this.esp>=this.Tempo*0.5){
      fill(0,0,0)
      bala=new balas_simples(this.x,this.y,5,5,ellipse,10+this.dano,0)
      balas.push(bala)
      
      jog.arma.esp=0  
       
      }    
  }   
  }
}
  //-------------classe filha "amar que dispara tres balas com maior dano e maior tempo"
  class arma_12 extends armas{
  
  Posicao(x,y){
     
    push()
    this.x=progX(x,y)*(10+jog.z/2)+x
    this.y=progY(x,y)*(10+jog.z/2)+y
    if(this.esp>=this.Tempo*1.3) fill(180,30,60)
    else fill(0)
    angleMode(RADIANS)
    rectMode(CENTER)
    translate(progX(x,y)*(10+jog.z/2)+x,progY(x,y)*(10+jog.z/2)+y)
    rotate(-PI/2+atan2(mouseY - y, mouseX - x));
    rect(0,0,15,10)
    pop()
    
  }       
  
    ataque(){//---------cria um  vetor com objetos "balas_simples" a cada circulo de tempo
    if(mouseIsPressed){
      if(this.esp>=this.Tempo*1.3){
      fill(0,0,0)
      for(let i=-1;i<2;i++){  
      bala=new balas_simples(this.x,this.y,15,15,ellipse,50+this.dano*0.5,i)
      balas.push(bala)
      }
      
      
      jog.arma.esp=0  
       
      }    
  }   
  }  
}
  //-------------classe filha "amar com características velocidade e dano "
  class arma_lazer extends armas{
  Posicao(x,y){
     
    push()
    this.x=progX(x,y)*(10+jog.z/2)+x
    this.y=progY(x,y)*(10+jog.z/2)+y
    if(this.esp>=this.Tempo*0.25) fill(180,30,60)
    else fill(0)
    angleMode(RADIANS)
    rectMode(CENTER)
    translate(progX(x,y)*(10+jog.z/2)+x,progY(x,y)*(10+jog.z/2)+y)
    rotate(-PI/2+atan2(mouseY - y, mouseX - x));
    rect(0,0,5,20)
    pop()
    
  } 
  
  ataque(){//---------cria um  vetor com objetos "bala_lazer" a cada circulo de tempo
     if(mouseIsPressed){
      if(this.esp>=this.Tempo*0.25){
      fill(0,0,0) 
      bala=new bala_lazer(this.x,this.y,20,4,rect,this.dano+15)
      balas.push(bala)
      jog.arma.esp=0  
      
       
    }
  }
  
}
}
  //-------------classe filha "armar que as balas nãos e mexem"
  class arma_espinho extends armas{
  Posicao(x,y){
    push()
    this.x=x
    this.y=y
    rectMode(CENTER)
    if(this.esp>=this.Tempo*0.15) fill(180,30,60)
    else fill(0)
    rect(x,y,8,8)
    pop()
  }
  
  ataque(){
    if(mouseIsPressed){
      if(this.esp>=this.Tempo*0.15){//---cria um  vetor com objetos "balas_espinhos" a cada circulo de tempo
      fill(0,0,0)    
        bala=new balas_espinhos(this.x,this.y,5,5,triangle,40+this.dano)
        balas.push(bala)
    
      jog.arma.esp=0  
      
        
       
      }    
  }   
  }  
  
}
  //-------------classe filha "arma com bala que se mover de acordo com seu mouse"
  class arma_seguidora extends armas{
    Posicao(x,y){
    push()
    this.x=progX(x,y)*(10+jog.z/2)+x
    this.y=progY(x,y)*(10+jog.z/2)+y
    fill(180,30,60)
    angleMode(RADIANS)
    rectMode(CENTER)
    translate(progX(x,y)*(3+jog.z/2)+x,progY(x,y)*(3+jog.z/2)+y)
    rotate(-PI/2+atan2(mouseY - y, mouseX - x));
    circle(0,0,8)
    pop()
  }
  
  ataque(){//---------cria um objetos "balas_seguidora" 
    if(balas.length==0){
      bala=new balas_seguidora(this.x,this.y,5,5,ellipse,this.dano+15)
    balas[0]=bala
  }
    }
}

//--------------------------------------------------------------------------------
//--------------------função que calcula o seno e coseno de acordo com valores x e y e mouseX e mouseY

function progX(x,y){
  
  return((mouseX-x)/(Math.sqrt((mouseX-x)**2+(mouseY-y)**2)))
  
}//--usada para o movimeto das balas
function progY(x,y){
  
  return((mouseY-y)/(Math.sqrt((mouseX-x)**2+(mouseY-y)**2)))
  
}//--usada para o movimeto das balas

//-----------------------------------------------------
//-------------------Balas-------------------

 let balas=[]//---- vetor que terar objetos das balas 
 let bala//--------varivel para auxiliar 

  //----------------classe pai "classe padrão para todas as balas "
  class Bala{
    constructor(x,y,tx,ty,formato,dano_ar){
    this.x=x
    this.y=y
    this.tx=tx
    this.ty=ty  
    this.velocidade_x = progX(this.x,this.y)
    this.velocidade_y = progY(this.x,this.y)
    this.formato=formato
    this.dano_ar=dano_ar
    this.R=this.dano_ar
    this.mouseY=mouseY
    this.mouseX=mouseX   
  }

   

}
   //-------------classe filha "a mais simples"
  class balas_simples extends Bala{
    constructor(x,y,tx,ty,formato,dano_ar,i){
    super(x,y,tx,ty,formato,dano_ar)
    this.i=i 
 }
    movimento(){

     this.x=this.x+5*this.velocidade_x+this.i*this.velocidade_y
     this.y=this.y+5*this.velocidade_y+this.i*this.velocidade_x
  
     this.formato(this.x,this.y,this.tx,this.ty)
      for(let i in mobss){
        if(dist(this.x,this.y,mobss[i].pos.x,mobss[i].pos.y)<=mobss[i].z/2+this.tx/2){
          this.R-=mobss[i].vida
          mobss[i].vida-=this.dano_ar
          this.dano_ar=this.R
  
        }                
      }
  }
}  
  //-------------classe filha "com características velocidade e dano "
  class bala_lazer extends Bala{
  
  movimento(){
    
    this.x=this.x+5*this.velocidade_x
    this.y=this.y+5*this.velocidade_y
    push()
    angleMode(RADIANS)
    rectMode(CENTER)
    translate(this.x,this.y)
    rotate(atan2(this.mouseY - this.y, this.mouseX - this.x))
    this.formato(0,0,this.tx,this.ty)
    
    for(let i in mobss){
      if(mobss[i].pos.x>this.x-this.tx/2-mobss[i].z/2&&mobss[i].pos.x<this.x+this.tx/2+mobss[i].z/2&&mobss[i].pos.y>this.y-this.ty/2-mobss[i].z/2&&mobss[i].pos.y<this.y+this.ty/2+mobss[i].z/2){
        this.R-=mobss[i].vida 
        mobss[i].vida-=this.dano_ar
          
        
      }
    }
   pop() 
  }
  
}
  //-------------classe filha "não se move "
  class balas_espinhos extends Bala{
  
  movimento(){
     this.formato(this.x,this.y,this.x+this.tx,this.y+this.ty,this.x-this.tx,this.y+this.ty)
        for(let i in mobss){
      if(mobss[i].pos.x>this.x-this.tx/2-mobss[i].z/2&&mobss[i].pos.x<this.x+this.tx/2+mobss[i].z/2&&mobss[i].pos.y>this.y-this.ty/2-mobss[i].z/2&&mobss[i].pos.y<this.y+this.ty/2+mobss[i].z/2){
          this.R-=mobss[i].vida
          mobss[i].vida-=this.dano_ar
          
        
      }
  }
}  
}
  //-------------classe filha "mover de acordo com seu mouse "
  class balas_seguidora extends Bala{
    constructor(x,y,tx,ty,formato,dano_ar){
      super(x,y,tx,ty,formato,dano_ar)
      this.pos=createVector(x,y)
      this.vel=createVector(10,10)
      
    }
    seguir(){
    let ponto = createVector(mouseX,mouseY)
    ponto.sub(this.pos)
    let angulo = this.vel.angleBetween(ponto)
    this.vel.rotate(angulo)
    
  }
   
    movimento() {
    //this.formato(this.pos.x,this.pos.y,this.tx,this.ty) 
    circle(this.pos.x,this.pos.y,10)
    if(dist(mouseX,mouseY,this.pos.x,this.pos.y)>=8)this.pos.add(this.vel)
    this.seguir()
      
    for(let i in mobss){
      if(dist(this.pos.x,this.pos.y,mobss[i].pos.x,mobss[i].pos.y)<=mobss[i].z/2+this.tx/2){
       mobss[i].vida-=this.dano_ar
         
  
        }                
      }
    
  }
}

//--------------mobs----------------
  //----------classe "mobs" sera o unimigo 
  class mobs {
  //----------construto que define posição tamnho e vida 
  constructor (x,y,z) {
    this.z=z
    this.pos=createVector(x,y)
    this.vel=createVector(20/this.z,20/this.z)
    this.vida=z
    if (jog.level>50)
     {
       this.vel=createVector(2,2)
       this.vida+=50
       if(this.z>60||this.z<40)this.z=random(40,60)
                      }
    
  }
  //-------------farar o calculo do movimento para seguir
  seguir(){
    let ponto = createVector(jog.x,jog.y)
    ponto.sub(this.pos)
    let angulo = this.vel.angleBetween(ponto)
    this.vel.rotate(angulo)
  }
  //--------------faz o movimento pem direção ao jogador
  movimento() { 
    this.pos.add(this.vel)
    this.seguir()
    
  }
  //--------------desenha o inimigo
  colocar() {
  
   if (jog.level>50)fill("rgb(255,0,0)")
    circle(this.pos.x,this.pos.y,this.z)
    

  }
}
  //------------
  let mobss=[]//----vetor de objetos "mobs"
  let mob//--------varivel para auxiliar 
//---------------------------

let jog= new jogador(400,400,0)//---objeto do jogador 


let ponto=0//------ pontos para cada mobs destruido
let Nl=1//-------- numero de mobs

let itens=[]//-----vetor de objetos intens 
//--------classe pai dos intens-------- 

class item{
  constructor(cor,x,y,z,h,nome){
    this.cor1=cor
    this.x=x
    this.y=y
    this.z=z
    this.h=h
    this.cor2=255
    this.estado=0
    this.nome=nome
  }
  colocar(){
   
    push()
    //rect(this.x,this.y,this.z,this.h)
    
    fill(this.cor1)
    textStyle(BOLD)
    text(this.nome,this.x-10,this.y+190,100)
    triangle(this.x+this.z-10,this.y+this.h-10,this.x+this.z/2,this.y+10,this.x+10,this.y+this.h/2)
    fill(this.cor2)
    circle(this.x+this.z*0.15,this.y+this.h*0.15,this.z/7+this.h/7)
    pop()
     
  }
  colocar_tela(x,y,z,h){
    push()
    
    fill(this.cor1)
    triangle(x+z-10,y+h-10,x+z/2,y+10,x+10,y+h/2)
    circle(x+z*0.15,y+h*0.15,z/7+h/7)
    pop()
    
  }
  
   Escolha() {
     
     if(mouseX>this.x&&mouseX<this.x+this.z&&mouseY>this.y&&mouseY<this.y+this.h){
       this.cor2=this.cor1
       fill(this.cor2)
       if(!mouseIsPressed){
         if(this.estado==2){
           this.Efeito()
           Nl=1
           this.estado=0
         }
         else this.estado=1
         
       }
       if(mouseIsPressed==true&&this.estado==1)this.estado=2
     }else {
       this.cor2=0
       this.estado=0
     }
     
}
  Dano(){
    jog.DanoBonos+=20
    jog.arma.dano+=20
    if(jog.DanoBonos>200){
    jog.DanoBonos=200
    jog.arma.dano=200
    }
  }
  Vida(){
    jog.z+=5
    jog.vida+=100+jog.z*5
  }
    Tempo(){
    jog.VelocidadeBonos-=jog.VelocidadeBonos*0.1
    jog.arma.Tempo-=jog.arma.Tempo*0.1
    if(jog.VelocidadeBonos<=30) {
      jog.VelocidadeBonos=30
      jog.arma.Tempo=30
    }
  }
  Armar(){
    let tipos=[arma_12,arma_lazer,arma_espinho,arma_seguidora]
    let tipo=random(tipos)
    balas=[]
    jog.arma=new tipo(jog.VelocidadeBonos,jog.DanoBonos+5)
  }
  //Efeito(){}
  
}
//-----------classe filha de intem que almenta o dano
class ItemDano extends item{
  Efeito(){
    this.Dano()
     jog.level++
  }
}
//-----------classe filha de intem que almenta o vida
class ItemVida extends item{
  Efeito(){
    this.Vida()
     jog.level++
  }
}
//-----------classe filha de intem que diminui o tempo
class ItemTempo extends item{
  Efeito(){
    this.Tempo()
     jog.level++
  }
}
//-----------classe filha de intem quecria uma nova arma para o jogador 
class ItemArmar extends item{
  Efeito(){
    this.Armar()
     jog.level++
  }
}

//----funçao de melhoria do jogador fazendo escolher um item 
function Level_UP(){
 background(60);
  for(let i in itens) {
    itens[i].Escolha() 
    itens[i].colocar()                 
          }
  //text(jog.VelocidadeBonos,400,300,400)
  //text(jog.vida,400,400,400)
 
  
}
//------ funçao que gera varios inimigos e coloca em um vertor  
function spawn(){
    for(;mobss.length<Nl;){
      do{
      mob = new mobs(random(-100,1100),random(-100,800),random(20,80))
    }while((mob.pos.x>0&&mob.pos.x<1000)&&(mob.pos.y>0&&mob.pos.y<700));
    
    mobss.push(mob)

  }
              
  
  for(let i in mobss){
      mobss[i].colocar()
      mobss[i].movimento()
   } 
  
} 
//----função que verefica se o inimogo chegou a vida a 0 ou o a vida do jogador a 0
function morte(){
  for(let i in mobss){
      if(mobss[i].vida<=0) {
          mobss.splice(i,1)
          Nl++
          ponto++
          break

        }
      if(mobss[i]){   
        if(dist(jog.x,jog.y,mobss[i].pos.x,mobss[i].pos.y)<=jog.z/2+10+mobss[i].z/2) {
        if(jog.x>mobss[i].pos.x){
          jog.x+=10
          mobss[i].pos.x-=10
        }else if(jog.x<mobss[i].pos.x){
          jog.x-=10
          mobss[i].pos.x+=10
      }
        if(jog.y>mobss[i].pos.y){
          jog.y+=10
          mobss[i].pos.y-=10
        }else if(jog.y<mobss[i].pos.y){
          jog.y-=10
          mobss[i].pos.y+=10
        }
          jog.vida-=mobss[i].z
          if(jog.vida<=0) Game_over()
    } 
   }       
                
        
      }
      
     for(let j in balas) 
       if(balas[j].R<1) balas.splice(j,1)
       
     
       
     
      

  }
//função de reiniciar o jogo cas a vida do jogador chegue a 0
function Game_over(){
  Nl=1
  ponto=0
  let controle = mobss.length
  for(i=0; i<mobss.length;i++) mobss.splice(i,controle)
  jog=new jogador(400,400,0)
  controle=balas.length
  for(i=0; i<balas.length;i++) balas.splice(i,controle)
}  
  
function setup() {
  createCanvas(1000,600);
  itens[0]=new ItemDano('#cf1e1b',200,20,260,260,"Dano")
  itens[1]=new ItemVida('#13A70D',570,20,260,260,"Vida")
  itens[2]=new ItemTempo('#2239DC',200,330,260,260,"Velocidade")
  itens[3]=new ItemArmar('#E1DE1A',570,330,260,260,"Armar")
 strokeWeight(2)
  
}
  
function draw() {
  
  
  background(60);
  textSize(30)
  //mostra quando melhor o jogador estar de acordo com os intens 
  for(let i=20,j=1;i<jog.DanoBonos;i+=20,j+=30)  
  itens[0].colocar_tela(j,1,40,40) 
  for(let i=1,j=6;i<300/jog.VelocidadeBonos;i++,j+=30)  
  itens[2].colocar_tela(j,30,40,40)  
  //----------------------------------
  // ver se o jogardor estar pronto para a melhoria 
  if(jog.level*jog.level==ponto
) Level_UP()
  
  else{
//------------chamando a funçao movimento de todas as balas
   for(let i in balas){
    fill(255,0,10) 
    balas[i].movimento()
   } 
   fill(27, 85, 245) 
   jog.colocar()//--funçao colocar jogador 
   fill(105, 0, 0)
   jog.arma.esp++
   spawn()//---funçao que gera varios inimigos e coloca em um vertor
   morte()//---função que verefica se o inimogo chegou a vida a 0 ou o a vida do jogador a 0
  

  //---------------placar---------------
  fill(0)
  text(ponto,10,65,100)
  text("LEVEL",825,30,100)
  text(jog.level,950,30,100)
  text("VIDA",825,60,100)
  text( jog.vida.toFixed(),900,60,100)
  }

}

  
  
  
  