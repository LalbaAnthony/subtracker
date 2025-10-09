// This page is just a fallback and should never be seen.
// The / path is not used in this app. Every / request is redirected to /dashboard or /login by the middleware.

export default function Page() {
  return <div>Default page no one should ever see</div>;
}
