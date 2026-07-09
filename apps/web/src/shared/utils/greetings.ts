export function timeGreeting() {
  const hours = new Date().getHours();
  let timeGreeting = "Welcome back";
  if (hours < 12) timeGreeting = "Good morning";
  else if (hours < 18) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";
  return timeGreeting;
}
