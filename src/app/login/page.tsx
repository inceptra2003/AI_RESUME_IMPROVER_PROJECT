import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <form className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-8 border rounded-lg bg-gray-50 border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="border p-2 rounded text-gray-900"
                    placeholder="you@example.com"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="border p-2 rounded text-gray-900"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex gap-2 pt-2">
                <button formAction={login} className="bg-black text-white p-2 rounded flex-1 hover:bg-gray-800 transition-colors">Log in</button>
                <button formAction={signup} className="bg-white text-black border border-gray-300 p-2 rounded flex-1 hover:bg-gray-50 transition-colors">Sign up</button>
            </div>
        </form>
    )
}
