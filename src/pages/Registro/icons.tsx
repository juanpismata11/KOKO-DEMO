/* Inline SVGs for the Registro page. All aria-hidden — the
   control around each one (button, label) already carries the
   accessible name. */

export function EyeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path
                d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    )
}

export function EyeOffIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path
                d="M3 3l18 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M9.9 5.3C10.6 5.1 11.3 5 12 5c7 0 10.5 7 10.5 7a15.6 15.6 0 0 1-3.4 4.4M6.5 6.7C3.6 8.5 1.5 12 1.5 12s3.5 7 10.5 7c1.3 0 2.5-.2 3.6-.6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.9 10c-.4.5-.6 1.2-.6 2a2.7 2.7 0 0 0 2.7 2.7c.8 0 1.5-.3 2-.7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function AppleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M16.4 1.5c.1 1.1-.3 2.1-1 2.9-.7.8-1.8 1.4-2.9 1.3-.1-1.1.4-2.2 1-2.9.7-.8 1.9-1.4 2.9-1.3Z" />
            <path d="M20.6 17.1c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9-1.9 0-2.4.9-3.7.9-1.6 0-2.8-1.5-3.7-2.9C2.2 16.9 1.7 12.4 3.4 9.6c1.2-2 3-3.1 4.7-3.1 1.4 0 2.6.9 3.5.9.9 0 2.3-1.1 3.9-1 .7 0 2.6.3 3.8 2-.1.1-2.3 1.3-2.3 3.9 0 3.1 2.7 4.2 2.6 4.2Z" />
        </svg>
    )
}

export function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                fill="#4285F4"
                d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2c-.3 1.4-1.1 2.6-2.3 3.4v2.8h3.7c2.2-2 3.4-4.9 3.4-8.3Z"
            />
            <path
                fill="#34A853"
                d="M12 23c3.1 0 5.7-1 7.6-2.8l-3.7-2.8c-1 .7-2.4 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v2.9A11 11 0 0 0 12 23Z"
            />
            <path
                fill="#FBBC05"
                d="M5.6 13.8a6.6 6.6 0 0 1 0-4.2V6.7H1.8a11 11 0 0 0 0 9.9l3.8-2.8Z"
            />
            <path
                fill="#EA4335"
                d="M12 5.4c1.7 0 3.2.6 4.4 1.7l3.3-3.2C17.7 2 15.1 1 12 1 7.7 1 3.9 3.5 1.8 6.7l3.8 2.9c.9-2.7 3.4-4.2 6.4-4.2Z"
            />
        </svg>
    )
}

export function FacebookIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M15.1 8.6H17V5.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.6H6.7v3.5h2.8V23h3.6v-6.7h2.7l.4-3.5h-3.1V10.6c0-1 .3-1.9 1.9-1.9Z" />
        </svg>
    )
}

export function ArrowLeftIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path
                d="M19 12H5M5 12l6-6M5 12l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
