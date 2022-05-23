export function getRestorePasswordTemplate(confirmedHash: string) {
  return `To reset your password pelae follow a link: <a tagret="_blank" href="${process.env.FRONTEND_URL}/restore-password/verify?token=${restoreToken}"> 
      Click here(not scam) </a>`;
}
