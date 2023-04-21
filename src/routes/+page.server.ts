export function load({ cookies }) {
	const session = cookies.get("sessionKey");

	return { session };
}
