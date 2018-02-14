
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var camera, scene, renderer;
var light1, light2, light3, light4, light5, light6;
init();
animate();

function init() {
	var container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.y = 40;
	scene = new THREE.Scene();
	var light, object;

	var intensity = 2.0;
	var distance = 200;
	var decay = 2.0;

	var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;

	var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );

	light1 = new THREE.PointLight( c1, intensity, distance, decay );
	scene.add( light1 );

	light2 = new THREE.PointLight( c2, intensity, distance, decay );
	scene.add( light2 );

	light3 = new THREE.PointLight( c3, intensity, distance, decay );
	scene.add( light3 );

	light4 = new THREE.PointLight( c4, intensity, distance, decay );
	scene.add( light4 );

	light5 = new THREE.PointLight( c5, intensity, distance, decay );
	scene.add( light5 );

	light6 = new THREE.PointLight( c6, intensity, distance, decay );
	scene.add( light6 );

	var dlight = new THREE.DirectionalLight( 0xffffff, 0.05 );
	dlight.position.set( 0.5, 1, 0 ).normalize();
	scene.add( dlight );

	scene.add( camera );
	var objectMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0.8, metalness: 0.5 } );

	var ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
	scene.add( ambientLight );

	var x = 0, y = 0;

	var heartShape = new THREE.Shape();

	heartShape.moveTo( x + 5, y + 5 );
	heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
	heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
	heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
	heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
	heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
	heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

	var geometry = new THREE.ShapeGeometry( heartShape );
	object = new THREE.Mesh( geometry, objectMaterial );
	//object = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100), objectMaterial );
	object.position.set(  0, 0, 0 );
	scene.add( object );


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
				requestAnimationFrame( animate );
				render();
}

function render() {
	var timer = Date.now() * 0.0001;

	//camera.position.x = Math.cos( timer ) * 800;
	//camera.position.z = Math.sin( timer ) * 800;
	camera.lookAt( scene.position );

	var z = 20, d = 50;

	light1.position.x = Math.sin( timer * 0.7 ) * d;
	light1.position.z = Math.cos( timer * 0.3 ) * d;

	light2.position.x = Math.cos( timer * 0.3 ) * d;
	light2.position.z = Math.sin( timer * 0.7 ) * d;

	light3.position.x = Math.sin( timer * 0.7 ) * d;
	light3.position.z = Math.sin( timer * 0.5 ) * d;

	light4.position.x = Math.sin( timer * 0.3 ) * d;
	light4.position.z = Math.sin( timer * 0.5 ) * d;

	light5.position.x = Math.cos( timer * 0.3 ) * d;
	light5.position.z = Math.sin( timer * 0.5 ) * d;

	light6.position.x = Math.cos( timer * 0.7 ) * d;
	light6.position.z = Math.cos( timer * 0.5 ) * d;

	scene.traverse( function( object ) {
		if ( object.isMesh === true ) {
			//object.rotation.x = timer * 5;
			object.rotation.z = timer * 2.5;
		}
	} );
	renderer.render( scene, camera );
}