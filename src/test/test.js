<template>
 <div id="wrap">
		<canvas id="canvas" width="900" height="900" style="transform: translate(-50%, -50%) scale(1, 1);"></canvas>
		<p id="options" style="display: none;">
			<span class="color-check">
				<input type="checkbox" id="colored-check">
				<label for="colored-check">Colored</label>
			</span>
		</p>
	</div> 
</template>

<script>
	<script src="../assets/main/v-animator.js"></script>
	<script src="../assets/main/pages.js"></script>
	<script src="../assets/main/mainScript.js"></script>
</script>

<style>
	#wrap {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
			background-color: blue;
		}

		#canvas {
			position: absolute;
			left: 50%;
			top: 50%;
			-outline: 1px solid #fff;
		}
</style>