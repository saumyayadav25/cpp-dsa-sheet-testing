import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User.model";
import { connect } from "@/db/config";
import bcrypt from "bcryptjs";
import { apiLimiter, res } from "@/middleware/rateLiming";

export async function POST(req: NextRequest) {
  try {
    // Wait for the rate limiter to process the request
    const rateLimitResult = await new Promise((resolve) => {
      apiLimiter(req as any, res as any, (next: any) => {
        resolve(next);
      });
    });

    // If rateLimitResult is not undefined, it means the rate limit was hit
    if (rateLimitResult) {
      console.log("rate :", rateLimitResult);
      return NextResponse.json(
        { message: "Too many requests, please try again later." },
        { status: 429 }
      );
    }
    await connect();

    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!email && !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    user.password = hashPassword;

    await user.save();

    return NextResponse.json(
      { success: true, message: "Password Updated." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Could not send OTP:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update password" },
      { status: 500 }
    );
  }
}

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="flex flex-col gap-3">
      <label>Password</label>
      <div className="flex items-center gap-2">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          readOnly
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={generatePassword}
          title="Generate strong password"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          🔑 Generate
        </button>
        <button
          onClick={copyToClipboard}
          title="Copy password"
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          📋 Copy
        </button>
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="bg-gray-300 text-black px-3 py-1 rounded"
        >
          {showPassword ? "🙈 Hide" : "👁️ Show"}
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
