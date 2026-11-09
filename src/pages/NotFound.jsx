import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 text-center">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold tracking-[0.2em] text-[#242424]">
                    PROD<span className="text-[#77736C]">EXA</span>
                </h1>

                <div className="mb-4">
                    <h2 className="text-8xl font-extrabold tracking-tight text-[#242424] sm:text-9xl">
                        404
                    </h2>
                </div>

                <div className="max-w-md">
                    <h3 className="text-2xl font-bold text-[#242424]">
                        Page Not Found
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#77736C] sm:text-base">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#242424] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3A3A3A]"
                >
                    Back to Home
                    <ArrowRight size={16} />
                </button>

                <p className="mt-12 text-xs font-medium tracking-[0.15em] text-[#77736C]">
                    PRODEXA · PRODUCT CATALOG
                </p>
            </div>
        </main>
    );
}

export default NotFound;