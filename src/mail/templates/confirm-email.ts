export function getConfirmEmailTemplate(confirmedHash: string) {
  return `To confirm your email address please follow the link: <a tagret="_blank" href="${process.env.BACKEND_URL}/auth/verify?confirmed_hash=${confirmedHash}"> 
    Click here(not scam) </a>`;
}
