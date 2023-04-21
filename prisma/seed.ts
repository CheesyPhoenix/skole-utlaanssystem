import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
	//admin user
	if ((await prisma.user.findFirst({ where: { isAdmin: true } })) === null) {
		const defaultAdminPass = process.env.DEFAULT_ADMIN_PASSWORD;
		if (defaultAdminPass === undefined) {
			console.log(
				"No default admin user created; no default admin password was set. (env: DEFAULT_ADMIN_PASSWORD)"
			);
		} else {
			await prisma.user.create({
				data: {
					name: "admin",
					passwordHash: bcrypt.hashSync(defaultAdminPass, 10),
				},
			});

			console.log("Created default admin user");
		}
	}

	//default devices
	if (process.env.DEV === "true") {
		await prisma.deviceType.upsert({
			where: { name: "Arduino" },
			update: {},
			create: {
				name: "Arduino",
				Devices: { create: [{}, {}, {}] },
				CompatibleAddons: {
					create: [
						{
							name: "20 pack o' cables",
							Addons: { create: [{}, {}, {}] },
						},
						{
							name: "100m long singular cable",
							Addons: { create: [{}] },
						},
					],
				},
			},
		});

		await prisma.deviceType.upsert({
			where: { name: "Micro-bit" },
			update: {},
			create: {
				name: "Micro-bit",
				Devices: { create: [{}, {}, {}, {}, {}] },
				CompatibleAddons: {
					create: [
						{
							name: "Robocar",
							Addons: { create: [{}] },
						},
						{
							name: "Pin-out adapter",
							Addons: { create: [{}, {}, {}] },
						},
						{
							name: "Breadboard kit",
							Addons: { create: [{}, {}, {}] },
						},
						{
							name: "Hovercraft set",
							Addons: { create: [{}, {}] },
						},
					],
				},
			},
		});

		console.log("Created default devices");
	} else {
		console.log("Seeding for production, not including default devices");
	}

	// default user
	if (process.env.DEV === "true") {
		await prisma.user.upsert({
			where: { name: "Test" },
			update: { passwordHash: bcrypt.hashSync("Test", 10) },
			create: { name: "Test", passwordHash: bcrypt.hashSync("Test", 10) },
		});
		await prisma.user.upsert({
			where: { name: "Teacher" },
			update: { passwordHash: bcrypt.hashSync("Teacher", 10) },
			create: {
				name: "Teacher",
				passwordHash: bcrypt.hashSync("Teacher", 10),
			},
		});

		console.log(
			"Added default users: Test and Teacher. Passwords are same as username"
		);
	} else {
		console.log("Seeding for production, not including default users");
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
