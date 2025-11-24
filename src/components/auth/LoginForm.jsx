import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ API base (from .env or fallback)
  const API_BASE =
    import.meta.env.VITE_API_BASE || "https://reticulation-backend-1.onrender.com/api";
    console.log("base url",API_BASE)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {  // check for token instead of success
  // Save session
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  toast({
    title: "Login Successful!",
    description: `Redirecting to ${data.user?.role || "user"} dashboard...`,
  });

  setEmail("");
  setPassword("");

  // Redirect based on role
  setTimeout(() => {
    if (data.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate(`/dashboard/${data.user?.role?.toLowerCase() || "customer"}`);
    }
  }, 1000);
} else {
  toast({
    title: "Login Failed",
    description: data.error || data.message || "Invalid email or password.",
    variant: "destructive",
  });
}


    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-email"
            type="email"
            placeholder="m@example.com"
            required
            className="pl-10 input-light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-password"
            type="password"
            required
            className="pl-10 input-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" />
          <Label
            htmlFor="remember-me"
            className="text-sm font-normal text-muted-foreground"
          >
            Remember me
          </Label>
        </div>
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={() => navigate("/login?tab=signup-customer")}
        >
          Sign up
        </Button>
      </p>
    </form>
  );
};

export default LoginForm;
