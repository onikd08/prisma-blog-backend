import { prisma } from "../lib/prisma";
import { UserRoles } from "../middlewares/auth";

const seedAdmin = async () => {
  const adminData = {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: UserRoles.ADMIN,
  };
  try {
    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: adminData.email as string,
      },
    });

    if (user) {
      throw new Error("User already exists!!!");
    }

    const createAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://localhost:3000",
        },
        body: JSON.stringify(adminData),
      }
    );

    const response = await createAdmin.json();
    console.log(response);

    if (createAdmin.ok) {
      const admin = await prisma.user.update({
        where: {
          email: adminData.email as string,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("Admin created successfully");
      console.log(admin);
    } else {
      throw new Error("Failed to create admin");
    }
  } catch (error) {
    console.error(error);
  }
};

seedAdmin();
