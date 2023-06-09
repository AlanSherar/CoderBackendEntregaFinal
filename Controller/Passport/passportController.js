import passport from "passport"
import { passportService } from "../../Service/Passport/passportService.js"

passport.use("login", passportService.Login )

passport.use("signin", passportService.Signin )

passport.serializeUser( passportService.Serialize )

passport.deserializeUser( passportService.Deserialize )

export const passportController = passport