import { useNavigate } from "react-router-dom";

function LoginPage({
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    checkLogin,
  }) {

    const navigate = useNavigate();

    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF8F4] p-6">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E0D8] bg-white p-8 shadow-sm">
            <h1 className="text-center text-3xl font-bold tracking-wide text-[#242424]">
                PROD<span className="text-[#A99A84]">EXA</span>
            </h1>
            <p className="mb-8 mt-3 text-center text-sm leading-relaxed text-[#77736C]">
                Sign in to access your personal wishlist
            </p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const isSuccess = checkLogin();
                    
                    if (isSuccess) {
                        navigate("/wishlist")
                    }
                }}
            >
                <div>
                <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-[#242424]">
                    Username
                </label>

                <input
                className="w-full rounded-xl border border-[#E5E0D8] bg-[#FAF8F4] px-4 py-3 text-sm text-[#242424] outline-none transition duration-200 placeholder:text-[#A69B8B] focus:border-[#242424] focus:ring-1 focus:ring-[#242424]"
                    type="text"
                    id="username"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
                
                <div>
                <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#242424]">
                    Password
                </label>

                <input
                className="w-full rounded-xl border border-[#E5E0D8] bg-[#FAF8F4] px-4 py-3 text-sm text-[#242424] outline-none transition duration-200 placeholder:text-[#A69B8B] focus:border-[#242424] focus:ring-1 focus:ring-[#242424]"
                    type="password"
                    id="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                
                {errorMessage && (
                    <div
                        role="alert"
                        className="mt-5 rounded-xl border border-[#B45345]/20 bg-[#B45345]/5 px-4 py-3 text-sm font-medium text-[#B45345]"
                    >
                        {errorMessage}
                    </div>
                )}
                <button className="mt-6 w-full rounded-xl bg-[#242424] px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-[#3A3A3A] hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#242424] focus:ring-offset-2" type="submit">Login</button>
            </form>
            <p className="mt-5 text-center text-xs text-[#A69B8B]">
                Demo Account: user / prodexa123
            </p>
        </div>
      </div>
    );
  }

  export default LoginPage;