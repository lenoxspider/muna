// Demo-grade invitation code check used by both the landing CTA form and
// the join modal. The real product validates tokens server-side (PRD §5).
export function verifyJoinCode(raw) {
  const code = (raw ?? '').trim().toUpperCase()
  if (!code) {
    return { valid: false, message: 'Enter an invitation code to continue.' }
  }
  if (code.includes('MUNA') || code.includes('BRIGHT')) {
    return {
      valid: true,
      orgName: 'Bright Minds Academy',
      slug: 'bright-minds',
      assessments: 3,
    }
  }
  return {
    valid: false,
    message: 'Invalid or expired invitation code. Please verify with your mentor.',
  }
}
