const canvas = document.getElementById('canvasId')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const nodeArray = [];
let time = 0,
mode = 1;
var clicked = false,
dNode = null;
let rect = canvas.getBoundingClientRect();
let hue = 0;
let range = 135;


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.onscroll=function(e){
 rect=canvas.getBoundingClientRect();
}


const mouse = {
    x: null,
    y: null,
}
canvas.addEventListener('click', function(event){
    
    mouse.x = (event.clientX - rect.left - 10)*1.46;
    mouse.y = (event.clientY - rect.top - 10)*1.46;
    dNode = containsNode(mouse.x, mouse.y);

    if(mode == 2 && dNode !=null){
        BFSearch(dNode);
    }
    if(mode == 3 && dNode !=null){
        dfs(dNode, 0);
    }

//    console.log('click x: ' + dNode.x +" y: " +  dNode.y)
});

    
// }
canvas.addEventListener('mousedown', function (event) {
if(mode == 1){
mouse.x = (event.clientX - rect.left - 10)*1.46;
mouse.y = (event.clientY - rect.top - 10)*1.46;
//  console.log("X: "+dNode.x+"Y:"+dNode.y)
//  console.log("X: "+mouse.x+"Y:"+mouse.y)

    dNode = containsNode(mouse.x, mouse.y);
    console.log("Click");
    if (dNode != null ) {
      clicked = true;

      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mousemove', onMouseMove, false);
    }
}
  }, false);
  
  function onMouseUp () {
  console.log("X: "+dNode.x+"Y:"+dNode.y)
  console.log("X: "+mouse.x+"Y:"+mouse.y)

    clicked = false;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }
  
  function onMouseMove (event) {
    mouse.x = (event.clientX - rect.left -10)*1.46;
    mouse.y = (event.clientY - rect.top -10)*1.46;
    dNode.x = mouse.x;
    dNode.y = mouse.y;
  }




// function drawCircle(){
// ctx.strokeStyle = 'red';
// ctx.fillStyle = 'blue';
// ctx.lineWidth = 5;
// ctx.beginPath();
// ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
// ctx.stroke();
// }

class Node {
    constructor(posx, posy, size){
        this.x = posx;
        this.y = posy;
        this.size = size;
        this.visited = 0;
        this.color = 0;
        this.yes = Math.random() * 360;
        this.stroke = "";
    }
    update(){

    }
    draw(){
    if (this.color == 0){
        this.stroke = 'yellow';
        ctx.fillStyle = 'yellow';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    if (this.color == 1){
        // console.log(hue);
        this.stroke = 'yellow';//'hsl('+hue+', 100%, 50%)';
        ctx.fillStyle = 'red';//'hsl('+k+', 100%, 50%)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    if (this.color == 2){
        this.stroke = 'hsl('+this.yes+', 100%, 50%)';//'yellow';
        ctx.fillStyle = 'hsl('+this.yes+', 100%, 50%)';//'blue';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    }
}
function init(){
    for(let i =0; i<80; i++){
        let nodeSize = Math.random() * 8 + 9;
        let nodePosx = Math.random() * canvas.width;
        let nodePosy = Math.random() * canvas.height;
        if(inSize(nodeSize, nodePosx, nodePosy)){
        nodeArray.push(new Node(nodePosx, nodePosy, nodeSize));
        }
        // nodeArray.push(new Node(800, 0, nodeSize));

        else{
            i--;
        }
    }
}
if(time == 0){
    init();
    time++;
    console.log(canvas.width)
}

function handleNode(){
    for(let i = 0; i<nodeArray.length; i++){
        nodeArray[i].draw();
    }
    for (let i = 0; i<nodeArray.length; i++){
        for(let y =i; y<nodeArray.length; y++){
            if(distance(nodeArray[i].x, nodeArray[i].y, nodeArray[y].x, nodeArray[y].y) < range){
                ctx.beginPath();
                ctx.strokeStyle = nodeArray[i].stroke;
                ctx.lineWidth = (range - distance(nodeArray[i].x, nodeArray[i].y,nodeArray[y].x, nodeArray[y].y))/20 + 1;
                ctx.moveTo(nodeArray[i].x, nodeArray[i].y);
                ctx.lineTo(nodeArray[y].x, nodeArray[y].y);
                ctx.stroke();
            }
        }
    }
}

function inSize(insize, inx, iny){
    for(y = 0; y <nodeArray.length; y++){
        if (distance(inx, iny, nodeArray[y].x, nodeArray[y].y) < insize+nodeArray[y].size){
                return false;
        }
    }
        if(inx - insize <= 0 || inx + insize >= canvas.width){
            return false;
        }
        if(iny - insize <= 0 || iny + insize >= canvas.height){
            return false;
        }
    return true;
}

async function BFSearch(Node){
    Node.visited = 1;
    bfsQ = [Node];

    let delay = 0;    
    while(bfsQ.length != 0){
            let u = bfsQ.shift();
            for(let i = 0; i<nodeArray.length;i++){
            if(distance(nodeArray[i].x, nodeArray[i].y, u.x, u.y)<range && distance(nodeArray[i].x, nodeArray[i].y, u.x, u.y) > 0 && nodeArray[i].visited == 0){
            nodeArray[i].visited = 1;
            delay +=1;
                setTimeout(()=> {
                // console.log(""+i);
                nodeArray[i].color = 1;
                }, 400*delay)
            bfsQ.push(nodeArray[i]);
                }
            }
    delay +=1
    u.visited = 2;
        setTimeout(() =>{
        u.color = 2
        }, 400*delay);
    
        }
    // for (let i=0;i<360;i++){
    //     setTimeout(() => {
    //         hue++;
    //     }, 10 *i);
    // }
}

function dfs(u, delay){
delay1 = delay
u.visited = 1;
    setTimeout(()=> {
    u.color = 1;
    }, 400*delay1)

for(let i = 0; i<nodeArray.length;i++){
    // console.log("outer i = "+i)
    if(distance(nodeArray[i].x, nodeArray[i].y, u.x, u.y)<range && distance(nodeArray[i].x, nodeArray[i].y, u.x, u.y) > 0 && nodeArray[i].visited == 0){
        // console.log("i = "+i)
        
        delay1 = dfs(nodeArray[i], delay1+1);
        // console.log(delay1);
    }
}
delay1 += 1
u.visited = 2;
    setTimeout(()=> {
    u.color = 2;
    }, 400*delay1)
return delay1;

}
/* helper functions */

function containsNode(inx, iny){
    
    for(let node of nodeArray){
        // console.log("x "+node.x +" y "+ node.y);
        // console.log("diastance: " +distance(node.x, node.y, inx, iny))
        if(distance(node.x, node.y, inx, iny) <= node.size){
            return node;
        } 
    }
    return null;
}

function distance(x1,y1,x2,y2){
    //console.log(Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2,2)));
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}
  

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handleNode();
    requestAnimationFrame(animate);
}
animate();
