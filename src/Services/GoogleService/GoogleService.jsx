import axios from "axios"
import { jwtDecode} from "jwt-decode";

// const baseURL = "http://localhost:5113/api/GoogleAccount"
const baseURL = "https://localhost:7081/api/GoogleAccount"
// const baseURL = "https://recordsapi.runasp.net/api/GoogleAccount"

// metoda nemuze byt asynchronni, jinak hlasi chyby
export const SendGoogleCredentialToApi = async (googleCredential) => {
    if (!googleCredential) {
        console.error("Error: googleCredential is null or undefined")
    }
    console.log("SendGoogleCredentialToApi:", googleCredential)
    setTimeout(async () => {
    try {
        const receivingDataFromApi = await axios.post(`${baseURL}/GoogleLogin`,
            {
                importedGoogleLoginToken: googleCredential
            }
        )
        console.log("receivingDataFromApi:", receivingDataFromApi)
        return receivingDataFromApi
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
    }, 2000)
}