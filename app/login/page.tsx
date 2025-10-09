"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await signUp.email({
          email,
          password,
          name: name,
        });
      } else {
        await signIn.email({
          email,
          password,
        });
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Sign Up" : "Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="name" className="mb-2">
                  Nom
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="password" className="mb-2">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              {isSignUp ? "Créer un compte" : "Se connecter"}
            </Button>
          </form>

          <div className="mt-4 w-full flex justify-center items-center">
            <div>
              {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
            </div>
            <Button
              variant="link"
              className="ml-2 p-0"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Se connecter" : "Créer un compte"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
