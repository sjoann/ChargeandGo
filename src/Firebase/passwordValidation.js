export default function passwordValidation(pw) {
    if (!pw) return "Password can't be empty."
    if (pw.length < 5) return 'Password must be at least 5 characters long.'
    return ''
}