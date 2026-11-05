function LoginPage({
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    checkLogin,
  }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#3B101B] via-[#702333] to-[#A34352] p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-red-900 mb-4 text-center">SMI Dashboard</h1>
            <p className="text-gray-500 mb-6 text-center">Silakan login untuk melanjutkan</p>

            <form
                onSubmit={(e) => {
                e.preventDefault();
                checkLogin();
                }}
            >
                <div>
                <label htmlFor="username">Username:</label>
                <input
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    type="text"
                    id="username"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
                
                <div>
                <label htmlFor="password">Password:</label>
                <input
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                        className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                        {errorMessage}
                    </div>
                )}
                <button className="mt-4 w-full rounded-lg bg-red-900 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-red-800 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2" type="submit">Login</button>
            </form>
            <p className="mt-4 text-gray-400 text-xs mb-6 text-center">Demo Credentials: admin / smi123</p>
        </div>
      </div>
    );
  }

  export default LoginPage;