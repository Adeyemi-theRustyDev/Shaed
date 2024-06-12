import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_SERVER } from "../../utils/env_alias";
import ErrorList from "../../components/ErrorList";
import useFetch from "../../utils/useFetch";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({ username, password })
        };
        const [ error, data ] = await useFetch(`${AUTH_SERVER}/sign-in`, fetchOptions);
        if (error) {
            setErrors([...errors, error.toString()]);
            return;
        }
        console.log(data);  
        navigate("/");
    }

    return (
        <>
            <section className="pt-[8rem] min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-[4rem]">Sign-In</h1>
                <form className=" w-[80%] md:w-[700px] mx-auto flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                    {errors && <ErrorList errors={errors} />}
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button className="btn btn-wide btn-neutral flex self-center">Sign In</button>
                    <p className="self-center my-4">Do not have an account? <Link className="underline" to="/register">Register</Link></p>
                </form>
            </section>
        </>
    );
}

export default SignIn;