import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


function ThreeGraphics(renderer){

        var scene = new THREE.Scene();
        scene.background = new THREE.Color("rgb(50, 50, 50)");
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const cubeWidth = 1.5
        var boxGeometry = new THREE.BoxGeometry(cubeWidth, cubeWidth, cubeWidth);
         var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
       const controls = new OrbitControls(camera, renderer.domElement);

         


        let cubes = []
        function createCubes (){
          const cube = new THREE.Mesh(boxGeometry, material);
          var [x, y, z] = Array(3)
            .fill()
            .map(() => THREE.MathUtils.randFloatSpread(200));

            cube.position.set(x, y, z);
            cubes.push(cube);
            scene.add(cube)
        }
        for (let i=0; i<500; i++){
          createCubes();
        }



        camera.position.z = 5;
        var animate = function () {
          requestAnimationFrame(animate);
          for(let i=0; i<cubes.length; i++){
            cubes[i].rotation.x += 0.09;
            cubes[i].rotation.y += 0.09;
            cubes[i].rotation.z += 0.01;
          }

          renderer.render(scene, camera);
        };
        controls.update();
        animate();
}

export default ThreeGraphics;
