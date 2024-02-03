import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import avatarList from "../constants/avatars";
import classNames from "../utils/classNames";

const Auth = () => {
    const nav = useNavigate();
    const [selectedColor, setSelectedColor] = useState(avatarList[1]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (localStorage.getItem("username")) {
            nav("/");
        }
    }, []);

    const onButtonClick = () => {
        if (!username) {
            return toast("Username is required", {
                icon: "🚫",
            });
        }

        localStorage.setItem("username", username);
        localStorage.setItem("avatar", selectedColor.name);

        nav("/");
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Choose avatar
                            </RadioGroup.Label>
                            <div className="mt-4 flex items-center space-x-3">
                                {avatarList.map((color) => (
                                    <RadioGroup.Option
                                        key={color.name}
                                        value={color}
                                        className={({ active, checked }) =>
                                            classNames(
                                                "ring-indigo-600",
                                                active && checked ? "ring ring-offset-1" : "",
                                                !active && checked ? "ring-2" : "",
                                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0 focus:outline-none",
                                            )
                                        }
                                    >
                                        <RadioGroup.Label as="span" className="sr-only">
                                            {color.name}
                                        </RadioGroup.Label>
                                        <img
                                            aria-hidden="true"
                                            className={classNames(
                                                "h-12 w-12 rounded-full border border-black border-opacity-10",
                                            )}
                                            src={color.element}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div>
                        <button
                            onClick={onButtonClick}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Auth;
