export default function passwordValidation(pw) {
    if (pw.length < 6) return 'Password must be at least 6 characters long.'
    return ''
}