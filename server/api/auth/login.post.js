import { getUserByUsername } from "../../db/users";
import { sendError } from "h3";
import { generateTokens, sendRefreshToken } from "../../utils/jwt";
import bcrypt from "bcrypt";
import { userTransformer } from "../../transformers/user";
import { createRefreshToken } from "../../db/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  }

  // User registered
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    );
  }

  // Compare password
  const doesThePasswordMatch = await bcrypt.compareSync(
    password,
    user.password
  );

  // Generate token
  // Access token
  // Refresh token
  const { accessToken, refreshToken } = generateTokens(user);

  // Save in db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // Add http only cookie
  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
