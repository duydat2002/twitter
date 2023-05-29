import { removeRefreshToken } from "../../db/refreshTokens";
import { sendRefreshToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refresh_token");

    // Delete refresh token
    removeRefreshToken(refreshToken);
  } catch (error) {}

  sendRefreshToken(event, null);

  return {
    message: "Done",
  };
});
