import * as THREE from 'three';
import * as dat from './node_modules/dat.gui';
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
// import "./styles/style.css"


/////////////INITIALIZATION////////////////////////

        const renderer = new THREE.WebGLRenderer(
          {  
            antialias: true,
          }
        );

        renderer.setSize(window.innerWidth, window.innerHeight);
    
        renderer.shadowMap.enabled = true;
     

        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            100000
        )
        camera.position.set(10000,0.09,0)

        const scene = new THREE.Scene();

    
    ////Adding animation to the body of the document

        document.body.appendChild(renderer.domElement)

//////this is orbit control it allows to control the scene with left mouse clicks

        const orbit = new OrbitControls(
            camera,
            renderer.domElement
        )
            orbit.update()  


// GEOMETRY AND OBJECTS GO HERE      


/////------------This is a Template to create an object---------------------------

// const objectsGeometry = new THREE.SphereGeometry(2);
// const objectsMaterial = new THREE.MeshStandardMaterial({color:'white'})
// const objectsName = new THREE.Mesh(objectsGeometry,objectsMaterial);
// scene.add(objectsName)


////////////Loading Texture File////////////////

const textureLoader = new THREE.TextureLoader(); 

renderer.setClearColor('black')
////////////LIGHTS GO HERE///////////////

// const light = new THREE.PointLight( "0xff0000", 1, 100 );
// light.position.set( 50, 50, 50 );
// scene.add( light );



const ambientLight = new THREE.AmbientLight('white', 1)
ambientLight.position.set(0,0,0)
 scene.add(ambientLight)



const spotLight = new THREE.SpotLight({
    color:'white',
    intensity:1000000.0,
    speed:0,
    penumbra:0.01,
    angle:0,
});

 spotLight.position.set(10,10,10)
 spotLight.position.set(-100,100,500)

 spotLight.castShadow = true;

 scene.add(spotLight)


 

const spotLightHelper = new THREE.SpotLightHelper(spotLight);

    spotLightHelper.position.set(-10000,10,10)
    scene.add(spotLightHelper)


////////////////////Plane///////////////////////

const planeGeometry = new THREE.CircleGeometry(290,200,200);
const planeMaterial = new THREE.MeshPhongMaterial(
    {
        color:'white',
        side:THREE.DoubleSide,
        transparent:true,
        map:textureLoader.load('./images/saturn_ring.png')
    })
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.rotation.x= 20.5 * Math.PI;

plane.position.y = -0.05 * Math.PI;
plane.position.z = 0 * Math.PI;

plane.receiveShadow=true;
plane.castShadow=true;
scene.add(plane)


///////////////////////////////////Earth////////////

const earthGeometry = new THREE.SphereGeometry(100,100,100);
const earthMaterial = new THREE.MeshPhongMaterial(
    {
        color:'0xfffff',
        map:textureLoader.load('./images/earth_surface.jpg')

    })
const earth = new THREE.Mesh(earthGeometry,earthMaterial);

earth.position.x=175;
earth.position.y=75;
earth.position.z=7575;

earth.castShadow=true;
earth.receiveShadow=true;
scene.add(earth)


const earthWGeometry = new THREE.SphereGeometry(103,100,100);
const earthWMaterial = new THREE.MeshPhongMaterial(
    {
        color:'0xfffff',
        transparent:true,
        map:textureLoader.load('./images/earth_clouds.png')

    })
const earthW = new THREE.Mesh(earthWGeometry,earthWMaterial);

earthW.position.x=175;
earthW.position.y=75;
earthW.position.z=7575;

earthW.castShadow=true;
earthW.receiveShadow=true;
scene.add(earthW)
earthW.add(earth)

///////////////////////////////// Mars ///////////////////////


const marsGeometry = new THREE.SphereGeometry(90,100,100);
const marsMaterial = new THREE.MeshPhongMaterial(
    {
        color:'0xfffff',
        map:textureLoader.load('./images/mars.jpg')

    })
const mars = new THREE.Mesh(marsGeometry,marsMaterial);

mars.position.x=275;
mars.position.y=75;
mars.position.z=9175;

mars.castShadow=true;
mars.receiveShadow=true;
scene.add(mars)

/////////////JUPITER//////////////////////////////////

const jupiterGeometry = new THREE.SphereGeometry(200,100,100);
const jupiterMaterial = new THREE.MeshPhongMaterial(
    {
        color:'0xfffff',
        map:textureLoader.load('./images/jupiter.jpg')

    })
const jupiter = new THREE.Mesh(jupiterGeometry,jupiterMaterial);

    jupiter.position.x=1085;
    jupiter.position.y=230;
    jupiter.position.z=12075;

    jupiter.castShadow=true;
    jupiter.receiveShadow=true;
    scene.add(jupiter)
       










//////////////////////////Saturn//////////

const sphereGeometry = new THREE.SphereGeometry(120,200,200);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color:'white',
    map:textureLoader.load('./images/saturn.jpg')
})

const saturn = new THREE.Mesh(sphereGeometry, sphereMaterial);
saturn.castShadow=true;
saturn.receiveShadow=true;
saturn.position.x=275;
saturn.position.y=75;
saturn.position.z=14075;
scene.add(saturn)
saturn.add(plane)




///////////////////////////SUN//////////////////////

const sunGeometry = new THREE.SphereGeometry(900,100,100);
const sunMaterial = new THREE.MeshPhongMaterial(
    {
        color:'white',
        // emissive:'gold',
        map:textureLoader.load('./images/sun.jpg'),
        
        shininess:5000,

    })
const sun = new THREE.Mesh(sunGeometry,sunMaterial);

scene.add(sun)

sun.add(saturn, jupiter, mars,earth,earthW)

spotLight.add(sun)

//////////////////////////Background/////////////////


// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.setPath('./skybox/milkyway/')
// .load([
//     "px.png",
//     'nx.png',
  

//     "py.png",
//     'ny.png',

//     'pz.png',
//     "nz.png",  
    

// ])



///////////////objects go here////////////


const options = {
    speed:0,
    intensity:1000000,
    speed:0.001,
    angle:0.001,
    penumbra:0.01,

}



///////////GUI goes here for all the elements

const gui = new dat.GUI();


// gui.addColor(options,'jupiterColor').onChange((e)=>{

//     jupiter.material.color.set(e)
// });

gui.add(options, 'intensity',0.01,100000000);
gui.add(options, 'speed',0,1)
gui.add(options,'angle',0.001,9.45)
gui.add(options,"penumbra",0.00,0.623)

/////////////////ALL ANIMATIONS GO HERE /////////////
    let steps=0
        function animate (time){

            steps +=options.speed

            /////jupiter spin////

            // jupiter.rotation.y =  time / 1000;//
            sun.rotation.y =0.100 * steps * Math.PI;

            saturn.rotation.y =  time / 8000
            jupiter.rotation.y =  time / 7500
            mars.rotation.y =   time / 9500
            earth.rotation.y =  time / 10000
            earthW.rotation.y =  time / 100000 * -2;

            spotLight.intensity = options.intensity;
            spotLight.speed= options.speed;
            spotLight.angle=options.angle;
            spotLight.penumbra = options.penumbra;
            spotLightHelper.update()
            renderer.render(scene,camera)
        }
        
        renderer.setAnimationLoop(animate)
