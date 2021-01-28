import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js"
var clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
const renderer = new THREE.WebGLRenderer();
var obj;
var m,n;
var idle,walk;
var position;
var character,characterWalk,characterIdle;

document.addEventListener('keydown',key_down);
document.addEventListener('keyup',key_up);

// instantiate a loader


//
//const loader = new THREE.FBXLoader();
//const loader = new THREE.FBXLoader();

/*loader.load(
	// resource URL
	`model/source/pubgmale.fbx`, function( object ) {
		//mesh = group.children[0];
		//mesh.material = new THREE.MeshPhongMaterial();
		scene.add( object);
	});*/

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
//type="module"

//Controls
const controls = new OrbitControls(camera,renderer.domElement);


//create the Shape
const geometry = new THREE.BoxGeometry(1,1,1);

//create  a material,colour or imageTexture

	//Cube Textures Array
	var cubeMaterial = [
		new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Right
		new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Left
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Top
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('Texture/4.png'), side: THREE.DoubleSide } ),//Bottom
		new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Front
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Back
	];

var material = new THREE.MeshFaceMaterial(cubeMaterial);
var cube = new THREE.Mesh( geometry, material );


//scene.add( cube );

//Position of camera
camera.position.z = 3;

//Light
var ambientLight = new THREE.AmbientLight(0xffffff,2);
scene.add(ambientLight);


//Resize View Event
window.addEventListener('resize',function(){
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
})

//aDDING SKYBOX
	const BackLoader = new THREE.CubeTextureLoader();
    const texture = BackLoader.load([
        './Texture/Right.jpg',
        './Texture/Left.jpg',
        './Texture/Top.jpg',
        './Texture/Bottom.jpg',
        './Texture/Front.jpg',
        './Texture/Back.jpg',
    ]);
	scene.background = texture;
	
	




//Game Logic
var update = function(){
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	//m.update(1000);
	if(m){
		var delta = clock.getDelta();
		m.update( delta )}

	if(n){
			var delta = clock.getDelta();
			n.update( delta )}	

	/*if(position){
		character.position.x = position;
	}	*/
	

}
//var mixer;


//draw Scene
var render = function(){
	renderer.render(scene,camera);
}
            
//run Gameloop(update,render,repeat)
const animate = function () {
	requestAnimationFrame( animate );

	

	update();
	render();
}

//LoadAnimatedModel() {
    /*const loader = new FBXLoader();
    loader.setPath('./assets/');
    loader.load('swat.fbx',function ( object ) {
		//const m = new THREE.AnimationMixer(object);
		//const idle = m.clipAction(object.animations[0]);
		//idle.play();
		//object.scale.setScalar(0.1);


		//obj = object;
		//scene.add(obj);

		
		
		
	} ); */

	const animated = new FBXLoader();
    	animated.setPath('./assets/');
    	animated.load('Walking(skin).fbx',function (animated) {

		m = new THREE.AnimationMixer(animated);
		
		
		//const mixer = new THREE.AnimationMixer( animated );
		//const clips = animated.animations;
		walk = m.clipAction(animated.animations[0]);
		walk.play();
		
		characterWalk = animated;
		characterWalk.scale.setScalar(0.009);
		scene.add(characterWalk);
		characterWalk.visible=false;
		
		 
		} ); 
	function call(set,remove){
		
		set.visible = true;
		if(remove){
			remove.visible = false;
		}
	}
	

	const animated2 = new FBXLoader();
    	animated2.setPath('./assets/');
    	animated2.load('idle.fbx',function (animated2) {

		n = new THREE.AnimationMixer(animated2);
		
		
		//const mixer = new THREE.AnimationMixer( animated );
		//const clips = animated.animations;
		idle= n.clipAction(animated2.animations[0]);
		idle.play();
		
		characterIdle = animated2;
		characterIdle.scale.setScalar(0.009);
		scene.add(characterIdle);
		characterIdle.visible=true;
		
		 
		} ); 
	
	 
	



	/*
	
	
      
      /*idleA.load('walk.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        //this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      scene.add(fbx);
    });*/
	
	
	
	/*{
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      }*/

      /*const params = {
        target: fbx,
        camera: camera,
      }
      //const controls = new BasicCharacterControls(params);

      const idleA = new FBXLoader();
      idleA.setPath('./assets/');
      idleA.load('walk.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        //this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      scene.add(fbx);
    });
  //}*/
//key_down();
  function key_down(event){
    var W = 87;
    var S = 83;
    var A = 65;
    var D = 68;
    var minus = 189;
	var plus = 187;
	//var posX = character.position.x;
	//var posY = character.position.y;


	var k = event.keyCode;
	if(k==W ||k==S||k==A||k==D){
		if(k == A){ // rotate left
			//position.x = posX - 80; 
			characterWalk.bodyOrientation = 360;
			characterIdle.bodyOrientation = 360;
			characterWalk.position.x = characterWalk.position.x+0.03;
			characterIdle.position.x = characterIdle.position.x+0.03;
			

			
			//character.rotation.y += 1
		}
		if(k == D){ // rotate right
			//position.y = posX + 80; 
			characterWalk.position.x = characterWalk.position.x-0.03;
			characterIdle.position.x = characterIdle.position.x-0.03;
			
		}
		if(k == W){ // go forward
			//position = posY + 80;
			characterWalk.position.z = characterWalk.position.z+0.03;
			characterIdle.position.z = characterIdle.position.z+0.03;
			
		}
		if(k == S){ // go back
			//position.y = posY - 80; 
			characterWalk.position.z = characterWalk.position.z-0.03;
			characterIdle.position.z = characterIdle.position.z-0.03;
		}
		characterWalk.visible = true;
		characterIdle.visible = false;
	
	}

	

    console.log(k);
    


}

function key_up(event){
	var W = 87;
    var S = 83;
    var A = 65;
	var D = 68;
	var k = event.keyCode;
	
	if(k==W ||k==S||k==A||k==D){
		call(characterIdle,characterWalk);
	}

}
  
  

animate();

extension.gitAddCommitPush;
