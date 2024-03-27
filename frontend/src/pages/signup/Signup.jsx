import GenderCheckbox from "./GenderCheckbox"

const Signup = () => {
    return (
        <div className="flex flex-col item-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Signup{" "}
                    <span className="text-gray-600">Nemesis</span>
                </h1>

                <form>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input type="text" placeholder="Enter full name" className="w-full input input-bordered h-10" />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm your password" className="w-full input input-bordered h-10" />
                    </div>

                    <GenderCheckbox />

                    <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        Already have an account? Login
                    </a>

                    <div>
                        <button className="btn btn-block btn-sm mt-2">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup