/**
 * @author Olivier Darmon
 */

class Element{

    /**
     * 
     * @param {HTMLElement} objToClone : html element to clone
     * @param {HTMLElement} target : html element parent to add instance
     */
    constructor(objToClone , target){
        this.target = target;
        this.instance = objToClone.clone();

        this.speedMove = Math.floor(Math.random() * 5 + 5) ;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;

        this.radius = Math.floor(Math.random()* 300 + 300);
        this.variationY = -100 +  Math.floor(Math.random()* 300);
        this.factorY = -4 +  Math.floor(Math.random()* 8);

        this.target.append(this.instance);
    }


    get child(){
        return this.instance[0].firstChild.nextElementSibling;
    }


    getTransformStyle(){
        return "translate3d(" +  this.x + "px," +  this.y + "px," +  this.z + "px)" +
        "rotateX(" +  this.rotateX + "deg) " +
        "rotateY(" + this.rotateY + "deg) " +
        "rotateZ(" + this.rotateZ + "deg)"; 
    }
}


class Main{

    constructor(){
        this.elementsList = [];
        this.$content = $("#content");
        this.$panel = $("#content>.panel");
        this.bg = $("#layer");
        this.nPan = 40;
        this.createClones();
        this.styleUpdate;
    }

    start(){
        
        this.loop();
    }

    /**
     * create nPan elements and add css 3d with transform
     */
    createClones(){

        let element, angle;
        for(let i = 0 ; i < this.nPan ; i++){
            
            element = new Element(this.$panel, this.$content);
            
            angle = Math.floor(Math.random()* 360) * (Math.PI/180);
            element.x = Math.cos(angle) * element.radius;
            element.y = Math.floor(Math.random()* 300 - 40);
            element.z = Math.sin(angle) * element.radius;
            element.rotateX = Math.floor(Math.random()* 360);
            element.rotateY = Math.floor(Math.random()* 360);
            element.rotateZ = Math.floor(Math.random()* 360);
            element.instance.addClass('show');
            element.instance.removeClass('hide');
            element.instance[0].style.transform = element.getTransformStyle();
            element.tick = angle;
            this.elementsList.push(element);
        }

        $("#stage").append(this.$content);

    }

    /**
     * loop for create the whirlwind
     */
    loop(){


        requestAnimationFrame(this.loop.bind(this));

        
        this.elementsList.forEach(element=>{
            element.tick -= element.speedMove * 0.004;
            element.x = Math.cos(element.tick) * element.radius;
            element.y = Math.sin(element.tick) * element.variationY;
            element.z = Math.sin(element.tick) * element.radius;
            element.instance[0].style.transform = element.getTransformStyle(element.tick);
            element.child.style.transformOrigin = "20% 70% 50%";
            element.child.style.transform =  `rotate3d( 0.3, 1, 0.8 , ${element.tick *8 }rad)`;
        })


    }


}

