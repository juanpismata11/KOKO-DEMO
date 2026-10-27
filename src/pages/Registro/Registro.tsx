import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router"
import styles from "./Registro.module.css"
import {
    EyeIcon,
    EyeOffIcon,
    AppleIcon,
    GoogleIcon,
    FacebookIcon,
    ArrowLeftIcon,
} from "./icons"

type Mode = "register" | "login"

type FieldDef = {
    id: string
    label: string
    type: "text" | "email" | "tel" | "password"
    autoComplete: string
}

type Values = Record<string, string>
type Errors = Record<string, string>

const REGISTER_FIELDS: FieldDef[] = [
    { id: "fullName", label: "Full name", type: "text", autoComplete: "name" },
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
    { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    { id: "password", label: "Password", type: "password", autoComplete: "new-password" },
]

const LOGIN_FIELDS: FieldDef[] = [
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
    { id: "password", label: "Password", type: "password", autoComplete: "current-password" },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// matches .columnLeaving's animation-duration in Registro.module.css
const LEAVE_MS = 280

function validate(fields: FieldDef[], values: Values): Errors {
    const next: Errors = {}
    for (const field of fields) {
        const value = (values[field.id] ?? "").trim()
        if (!value) {
            next[field.id] = `Enter your ${field.label.toLowerCase()}`
        } else if (field.type === "email" && !EMAIL_RE.test(value)) {
            next[field.id] = "Enter a valid email"
        }
    }
    return next
}

export default function Registro() {
    const navigate = useNavigate()
    const [mode, setMode] = useState<Mode>("login")
    const [isLeaving, setIsLeaving] = useState(false)
    const leaveTimer = useRef(0)
    // true only for the very first paint — the page shouldn't
    // fade in on load, only when switching modes afterwards
    const [skipEnterAnim, setSkipEnterAnim] = useState(true)

    useEffect(() => {
        setSkipEnterAnim(false)
        return () => window.clearTimeout(leaveTimer.current)
    }, [])

    const [registerValues, setRegisterValues] = useState<Values>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    })
    const [loginValues, setLoginValues] = useState<Values>({ email: "", password: "" })
    const [registerErrors, setRegisterErrors] = useState<Errors>({})
    const [loginErrors, setLoginErrors] = useState<Errors>({})
    const [showPassword, setShowPassword] = useState(false)

    const isRegister = mode === "register"
    const fields = isRegister ? REGISTER_FIELDS : LOGIN_FIELDS
    const values = isRegister ? registerValues : loginValues
    const errors = isRegister ? registerErrors : loginErrors
    const setValues = isRegister ? setRegisterValues : setLoginValues

    const switchMode = (next: Mode) => {
        if (next === mode) return
        setIsLeaving(true)
        window.clearTimeout(leaveTimer.current)
        leaveTimer.current = window.setTimeout(() => {
            setMode(next)
            setIsLeaving(false)
            setShowPassword(false)
        }, LEAVE_MS)
    }

    const handleFieldChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [id]: event.target.value }))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const next = validate(fields, values)
        if (isRegister) setRegisterErrors(next)
        else setLoginErrors(next)
        if (Object.keys(next).length === 0) {
            // no backend here — this is a UI-only auth screen
        }
    }

    return (
        <div className={styles.page}>
            <button
                type="button"
                className={styles.backButton}
                onClick={() => navigate(-1)}
                aria-label="Go back"
            >
                <ArrowLeftIcon />
            </button>

            <div className={`${styles.formPanel} ${isRegister ? styles.formSlotLeft : styles.formSlotRight}`}>
                <div
                    key={mode}
                    className={`${styles.column} ${isLeaving ? styles.columnLeaving : ""} ${
                        !isLeaving && skipEnterAnim ? styles.columnNoAnim : ""
                    }`}
                >
                    <div className={styles.logo}>KOKO</div>

                    {isRegister ? (
                        <h1 className={styles.title}>
                            Start listing
                            <br />
                            your properties
                        </h1>
                    ) : (
                        <h1 className={styles.title}>
                            Welcome
                            <br />
                            back
                        </h1>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        {fields.map((field) => (
                            <div className={styles.field} key={field.id}>
                                <label htmlFor={field.id} className={styles.visuallyHidden}>
                                    {field.label}
                                </label>

                                {field.type === "password" ? (
                                    <div className={styles.passwordWrap}>
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={showPassword ? "text" : "password"}
                                            autoComplete={field.autoComplete}
                                            placeholder={field.label}
                                            className={styles.input}
                                            value={values[field.id] ?? ""}
                                            onChange={handleFieldChange(field.id)}
                                            aria-invalid={!!errors[field.id]}
                                            aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                                        />
                                        <button
                                            type="button"
                                            className={styles.eyeButton}
                                            onClick={() => setShowPassword((v) => !v)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        id={field.id}
                                        name={field.id}
                                        type={field.type}
                                        autoComplete={field.autoComplete}
                                        placeholder={field.label}
                                        className={styles.input}
                                        value={values[field.id] ?? ""}
                                        onChange={handleFieldChange(field.id)}
                                        aria-invalid={!!errors[field.id]}
                                        aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                                    />
                                )}

                                {errors[field.id] && (
                                    <p id={`${field.id}-error`} className={styles.error}>
                                        {errors[field.id]}
                                    </p>
                                )}
                            </div>
                        ))}

                        <button type="submit" className={styles.submit}>
                            {isRegister ? "Start" : "Log in"}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.social}>
                        <button type="button" className={styles.socialButton} aria-label="Continuar con Apple">
                            <AppleIcon />
                        </button>
                        <button type="button" className={styles.socialButton} aria-label="Continuar con Google">
                            <GoogleIcon />
                        </button>
                        <button type="button" className={styles.socialButton} aria-label="Continuar con Facebook">
                            <FacebookIcon />
                        </button>
                    </div>

                    {isRegister ? (
                        <p className={styles.loginLink}>
                            Already have an account?{" "}
                            <a
                                href="#"
                                className={styles.loginLinkStrong}
                                onClick={(event) => {
                                    event.preventDefault()
                                    switchMode("login")
                                }}
                            >
                                Log in
                            </a>
                        </p>
                    ) : (
                        <p className={styles.loginLink}>
                            Don&apos;t have an account?{" "}
                            <a
                                href="#"
                                className={styles.loginLinkStrong}
                                onClick={(event) => {
                                    event.preventDefault()
                                    switchMode("register")
                                }}
                            >
                                Register
                            </a>
                        </p>
                    )}
                </div>
            </div>

            <div
                className={`${styles.blockPanel} ${isRegister ? styles.blockSlotRight : styles.blockSlotLeft}`}
                aria-hidden="true"
            >
                <div className={styles.rightGlow} />
            </div>
        </div>
    )
}
