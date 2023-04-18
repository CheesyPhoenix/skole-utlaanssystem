<script lang="ts">
	import { trpc } from "$lib/trpc/client";

	let username = "";
	let password = "";
	let userType = "student";

	async function submit() {
		await trpc().login.login.query({ username, password });
	}
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Login</h1>

	<form on:submit|preventDefault={submit}>
		<input
			class="block"
			type="text"
			name="username"
			id="username"
			bind:value={username}
			placeholder="Username"
		/>
		<input
			class="block"
			type="password"
			name="password"
			id="password"
			bind:value={password}
			placeholder="Password"
		/>

		<input
			class="block"
			type="radio"
			name="userType"
			id="userType"
			value="student"
			bind:group={userType}
		/>
		<input
			class="block"
			type="radio"
			name="userType"
			id="userType"
			value="teacher"
			bind:group={userType}
		/>
		<input
			class="block"
			type="radio"
			name="userType"
			id="userType"
			value="admin"
			bind:group={userType}
		/>
	</form>
</main>
