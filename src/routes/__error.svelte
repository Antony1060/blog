<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: status !== 500 ? `${status}: ${error.message}` : ""
			}
		};
	}
</script>

<script>
	export let title;
</script>

<h1 style="text-align: center;">{title}</h1>