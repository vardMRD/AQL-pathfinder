import LoginForm from "../LoginForm";

export default function LoginFormStoryboard() {
  return (
    <div className="p-6 bg-background">
      <LoginForm
        onLoginSuccess={(user) => console.log("User logged in:", user)}
        onRegisterClick={() => console.log("Register clicked")}
      />
    </div>
  );
}
