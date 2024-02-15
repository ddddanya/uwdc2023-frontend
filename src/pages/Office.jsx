import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Menu } from "@headlessui/react";
import {
    toast, Toaster
} from "react-hot-toast";

import classNames from "../utils/classNames";
import avatarList from "../constants/avatars";
import Map from "./components/Map";
import timeFrom from "../utils/timeFrom";
import zones from "../constants/zones";

const Office = () => {
    const nav = useNavigate();
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

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
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("message", (message) => {
            const user = users.find((u) => u.user.username.toLowerCase() === localStorage.getItem("username").toLowerCase());
            console.log(user);
            if (!user) return;

            if (user.zone.id != message.zone.id) return;
            if (messages.length > 5) setMessages((prev) => prev.slice(1))
            setMessages((prev) => [...prev, message]);
            document.getElementById("chat").scroll({
                top: document.getElementById("chat").scrollHeight,
                behavior: "smooth",
            })
        })

        return () => socket.off("message");
    }, [users, socket, messages])

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
                                                    <div className="flex flex-col">
                                                    <span className="truncate">
                            {user.user.username}{" "}
                                                        (working {timeFrom(new Date(user.connectedAt).getTime())})
                          </span>
                                                        <span className="text-xs text-gray-400">
                            {user?.zone?.name} (x: {user?.x}, y: {user?.y})
                            </span>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li>
                                    <div className="text-xs font-semibold leading-6 text-gray-400">
                                        ZONES
                                    </div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {zones.map((zone) => (
                                            <li key={zone.name}>
                                                <a
                                                    className={classNames(
                                                        false
                                                            ? "bg-gray-50 text-indigo-600"
                                                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                                    )}
                                                >

                                                    <div className="flex flex-col">
                                                        <span className="truncate">{zone.name}</span>
                                                        <span className="text-xs text-gray-400">
                            {users.filter((user) => user?.zone?.name === zone.name).length}{" "}users / {zone.maxUsers} max
                            </span>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li style={{
                                    maxHeight: "100%",
                                    overflowY: "auto"
                                }} id={"chat"}>
                                    <div className="text-xs font-semibold leading-6 text-gray-400" style={{
                                        position: "sticky",
                                        top: "0",
zIndex: "10",
                                        backgroundColor: "white"
                                    }}>
                                        CHAT
                                    </div>
                                    {messages.length === 0 && (
                                        <div className="mt-2">
                                            <span className="text-xs text-gray-400">
                                                No messages yet
                                            </span>
                                        </div>
                                    )}
                                    {messages.map((message) => (
                                        <div key={message.id} className="mt-2">
                                            <div className="flex items-center gap-x-3">
                                                <img className="h-8 w-8 rounded-full bg-gray-50" src={
                                                    avatarList.find(
                                                        (a) => a.name == message.user.user.avatar,
                                                    ).element
                                                } alt=""/>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold leading-6 text-gray-900">
                                                        {message.user.user.username}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {message.message}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-2" style={{
                                        position: "sticky",
                                        bottom: "0",
                                        zIndex: "10",
                                        backgroundColor: "white"
                                    }}>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Type a message"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    socket.emit("message", e.target.value);
                                                    e.target.value = "";
                                                }
                                            }}
                                        />
                                    </div>
                                </li>
                                    {/*<li className="mt-auto">*/}
                                    {/*    <a*/}
                                    {/*        href="#"*/}
                                    {/*        onClick={() => {*/}
                                    {/*            localStorage.removeItem("username");*/}
                                    {/*            nav("/auth");*/}
                                    {/*        }}*/}
                                    {/*        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-500 hover:bg-gray-50 hover:text-red-600"*/}
                                    {/*    >*/}
                                    {/*        Log out*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
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
                            >
                                <Map initialUsers={users} setMainUsers={setUsers} socket={socket}
                                     username={localStorage.getItem("username")} toast={toast}/>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toaster />
        </>
    );
};

export default Office;
