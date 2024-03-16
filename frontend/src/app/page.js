import SigninForm from "@/components/SignInForm/SigninForm";

export default async function Home() {
  return (
    <main className="h-[100svh] w-full flex items-center justify-center">
      <SigninForm />
    </main>
  );
}
export const BACKEND_URL = process.env.BACKEND;
