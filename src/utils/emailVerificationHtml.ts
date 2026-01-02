import { User } from "better-auth/types";

const emailVerificationHtml = (
  user: Omit<User, "id" | "createdAt" | "updatedAt" | "emailVerified" | "role">,
  url: string
) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify your email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#0f172a; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">
                  Prisma Blog App
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <p style="font-size:16px; color:#111827;">
                  Hi ${user.name ?? "there"},
                </p>

                <p style="font-size:15px; color:#374151; line-height:1.6;">
                  Thanks for signing up! Please confirm your email address by clicking the button below.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="${url}"
                    style="
                      background:#2563eb;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 24px;
                      border-radius:6px;
                      font-size:16px;
                      display:inline-block;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#6b7280; line-height:1.6;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:14px; word-break:break-all;">
                  <a href="${url}" style="color:#2563eb;">
                    ${url}
                  </a>
                </p>

                <p style="font-size:14px; color:#6b7280; margin-top:30px;">
                  If you did not create this account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:20px; text-align:center;">
                <p style="font-size:12px; color:#9ca3af; margin:0;">
                  © ${new Date().getFullYear()} Prisma Blog App
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export default emailVerificationHtml;
