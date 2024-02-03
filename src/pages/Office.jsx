import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import socketIOClient from "socket.io-client";

import { Menu } from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import classNames from "../utils/classNames";
import avatarList from "../constants/avatars";
import Map from "./components/Map";
import timeFrom from "../utils/timeFrom";

const Office = () => {
    const nav = useNavigate();
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);

    const renderUsers = (_users) => {
        _users.forEach((user) => {
            if (
                document.querySelector(
                    `#user${user.socket.toLowerCase().replace(/^\s+/g, "")}`,
                )
            ) {
                document
                    .querySelector(
                        `#user${user.socket.toLowerCase().replace(/^\s+/g, "")}`,
                    )
                    .remove();
            }
            const chair = document
                .querySelectorAll("#Chairs g")
                [Number(user.chair) - 1].getBoundingClientRect();
            const userElement = document.createElement("img");
            userElement.id = "user" + user.socket.toLowerCase().replace(/^\s+/g, "");
            userElement.style.position = "absolute";
            userElement.style.top = chair.y + "px";
            userElement.style.left = chair.x + "px";
            userElement.style.width = "30px";
            userElement.style.height = "30px";
            userElement.style.borderRadius = "50%";
            userElement.style.zIndex = "100";
            userElement.style.pointerEvents = "none";
            userElement.src = avatarList.find(
                (a) => a.name == user.user.avatar,
            ).element;
            document.querySelector("#map").appendChild(userElement);
        });
    };

    useEffect(() => {
        if (!localStorage.getItem("username")) {
            nav("/auth");
        }
    }, []);

    useEffect(() => {
        const socket = socketIOClient("http://localhost:3000", {
            query: {
                avatar: localStorage.getItem("avatar"),
                username: localStorage.getItem("username"),
            },
        });
        setSocket(socket);

        socket.on("users", (_users) => {
            console.log(_users);
            setUsers(_users);

            renderUsers(_users);
        });

        return () => socket.disconnect();
    }, []);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const mapRef = useRef(null);

    const handleWheel = (e) => {
        e.preventDefault();
        const scaleAdjustment = e.deltaY > 0 ? 0.9 : 1.1;
        setScale((prevScale) => prevScale * scaleAdjustment);

        renderUsers(users);
    };

    const handleMouseDown = (e) => {
        const startX = e.pageX - position.x;
        const startY = e.pageY - position.y;

        const handleMouseMove = (moveEvent) => {
            const newX = moveEvent.pageX - startX;
            const newY = moveEvent.pageY - startY;
            setPosition({ x: newX, y: newY });

            renderUsers(users);
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            renderUsers(users);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <>
            <div>
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9y7Q6cQ0ZN4jW0_CXCn1EQigzszg0rs9nE3rkBfFzA&s"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-gray-400">
                                        USERS ONLINE
                                    </div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {users.map((user) => (
                                            <li key={user.user.name}>
                                                <a
                                                    className={classNames(
                                                        false
                                                            ? "bg-gray-50 text-indigo-600"
                                                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                                    )}
                                                >
                          <span
                              className={classNames(
                                  false
                                      ? "text-indigo-600 border-indigo-600"
                                      : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",
                              )}
                          >
                            {user.user.username.charAt(0)}
                          </span>
                                                    <span className="truncate">
                            {user.user.username}{" "}
                                                        {timeFrom(new Date(user.connectedAt).getTime())}
                          </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        onClick={() => {
                                            localStorage.removeItem("username");
                                            nav("/auth");
                                        }}
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                            aria-hidden="true"
                                        />
                                        Log out
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <div
                            className="h-6 w-px bg-gray-200 lg:hidden"
                            aria-hidden="true"
                        />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between">
                            <div></div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src={
                                                avatarList.find(
                                                    (a) => a.name == localStorage.getItem("avatar"),
                                                ).element
                                            }
                                            alt=""
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                      <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                          aria-hidden="true"
                      >
                        {localStorage.getItem("username")}
                      </span>
                    </span>
                                    </Menu.Button>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10 h-full">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div
                                id="map"
                                onWheel={handleWheel}
                                onMouseDown={handleMouseDown}
                                style={{
                                    cursor: "grab",
                                    overflow: "hidden",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Map scale={scale} position={position} mapRef={mapRef} />
                            </div>
                        </div>

                        <p className={"px-5 caret-blue-100"}>
                            You can move around the map, zoom in, zoom out.
                        </p>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Office;
