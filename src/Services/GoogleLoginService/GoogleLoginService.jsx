import axios from "axios"

// const baseURL = "http://localhost:5113/api/GoogleAccount"
// const baseURL = "https://localhost:7081/api/GoogleAccount"
const baseURL = "https://recordsapi.runasp.net/api/GoogleAccount"

export const authService = {
  async googleLogin(idToken) {
    try {
      const response = await axios.post(`${baseURL}/GoogleLogin`, {
        idToken,
      })

      return {
        token: response.data.token,
        expiration: new Date(response.data.expiration),
      }
    } catch (error) {
      console.error("An error occured during Google login:", error)
      throw new Error(
        error.response?.data?.message || "Google login error appeared"
      )
    }
  },
}
