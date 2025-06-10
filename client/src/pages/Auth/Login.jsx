import AuthForm from "@/components/forms/AuthForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm type="login" />
    </div>
  );
}
