<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="https://pulsechain.com/favicon128.png" />
</svelte:head>

{@render children()}
