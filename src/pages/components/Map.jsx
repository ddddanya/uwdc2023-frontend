import React, { useEffect, useState, useCallback } from 'react';
import zones from "../../constants/zones";
import { throttle } from 'lodash'; // Убедитесь, что lodash установлен

const Map = ({ initialUsers, setMainUsers, socket, username, toast }) => {
    const [users, setUsers] = useState(initialUsers);
    const [dragging, setDragging] = useState(null);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [oldPosition, setOldPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    const onMouseDown = (e, userId) => {
        const user = users.find(user => user.id === userId);
        if (user.user.username !== username) return;
        setOldPosition({ x: user.x, y: user.y });
        setStartPosition({
            x: e.clientX - user.x,
            y: e.clientY - user.y,
        });
        setDragging(userId);
        e.preventDefault();
    };

    const onMouseMove = useCallback(throttle((e) => {
        if (dragging === null) return;

        const newX = e.clientX - startPosition.x;
        const newY = e.clientY - startPosition.y;

        const newUserPositions = users.map(user => {
            if (user.id === dragging) {
                return { ...user, x: newX, y: newY };
            }
            return user;
        });

        socket.emit("move", { x: newX, y: newY });

        setUsers(newUserPositions);
    }, 20), [dragging, startPosition, users, socket]);

    const onMouseUp = () => {
        try {
            const user = users.find(user => user.id === dragging);
            const newZone = zones.find(zone => {
                return user.x > zone.leftX && user.x < zone.rightX && user.y > zone.topY && user.y < zone.bottomY;
            });
            if (newZone) {
                const usersInZone = users.filter(user => {
                    return user.x > newZone.leftX && user.x < newZone.rightX && user.y > newZone.topY && user.y < newZone.bottomY;
                });

                if (newZone.maxUsers < usersInZone.length) {
                    const _users = users.map(user => {
                        if (user.id === dragging) {
                            return { ...user, x: oldPosition.x, y: oldPosition.y };
                        }
                        return user;
                    });
                    setMainUsers(_users);
                    socket.emit("move", { x: oldPosition.x, y: oldPosition.y });
                    setDragging(null);
                    toast("Zone is full", {
                        icon: "🚫",
                        position: "bottom-right",
                    })
                    return;
                }
            }
            setMainUsers(users);
            setDragging(null);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // Очистка для троттлинга
        return () => onMouseMove.cancel();
    }, [onMouseMove]);


    return (
        <svg width="1500" height="690" viewBox="0 0 3612 1662" fill="none" xmlns="http://www.w3.org/2000/svg"
             onMouseMove={onMouseMove}
             onMouseLeave={onMouseUp}
             onMouseUp={onMouseUp}>

                <g id="office_base_clean 1">
                    {/* draw zones rectanagle */}
{/*                    {zones.map((zone, index) => (*/}
{/*<rect key={index} x={zone.leftX} y={zone.topY} width={zone.rightX - zone.leftX} height={zone.bottomY - zone.topY} fill={"#000"} fillOpacity="0.5"/>*/}
{/*                    ))}*/}
                    <g id="Stairs">
                        <path id="Vector" d="M2399.97 58.9299V638.94" stroke="#333333" stroke-width="2"
                              stroke-miterlimit="10"/>
                        <path id="Vector_2" d="M2081.37 58.9299V638.94" stroke="#333333" stroke-width="2"
                              stroke-miterlimit="10"/>
                        <path id="Vector_3" d="M2116.77 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_4" d="M2152.17 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_5" d="M2187.57 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_6" d="M2222.97 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_7" d="M2258.37 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_8" d="M2293.77 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_9" d="M2329.17 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_10" d="M2364.57 58.9299V638.94" stroke="#333333" stroke-width="0.5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_11" d="M2399.97 319.31H2081.37V348.94H2399.97V319.31Z" fill="white"
                              stroke="#333333" stroke-width="2" stroke-miterlimit="10"/>
                        <path id="Vector_12" d="M2383.53 354.85H2097.82V362.09H2383.53V354.85Z" fill="white"
                              stroke="#333333" stroke-width="2" stroke-miterlimit="10"/>
                        <path id="Vector_13" d="M2383.53 306.15H2097.82V313.39H2383.53V306.15Z" fill="white"
                              stroke="#333333" stroke-width="2" stroke-miterlimit="10"/>
                        <path id="Vector_14" d="M2426.58 625.28H2097.82V632.52H2426.58V625.28Z" fill="white"
                              stroke="#333333" stroke-width="2" stroke-miterlimit="10"/>
                        <path id="Vector_15" d="M2426.58 63.6599H2097.82V70.8999H2426.58V63.6599Z" fill="white"
                              stroke="#333333" stroke-width="2" stroke-miterlimit="10"/>
                    </g>
                    <g id="External Walls">
                        <path id="Vector_16"
                              d="M366.55 49.3599V875.46H439.19V1481.93H804.09V1422.81H939.24V1387.33H3251.97V49.3599H366.55Z"
                              stroke="#333333" stroke-width="15" stroke-miterlimit="10"/>
                    </g>
                    <g id="Internal Walls">
                        <path id="Vector_17" d="M604.75 49.3599V470.01H1740V49.3599" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_18" d="M1042.29 49.3599V470.01" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_19" d="M366.55 282.49H604.75" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_20" d="M1740 470.01V1387.33" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_21" d="M1344.69 1287.66V1387.33" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_22" d="M1740 928.67H2567.78" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_23" d="M1740 650.77H2567.78" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_24" d="M2567.78 49.3599V1387.33" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_25" d="M2811.05 49.3599V520.69H3251.97" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_26" d="M2162.34 928.67V1449.87V1620.34" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_27" d="M1932.58 928.67V1090H2442.77" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_28" d="M1856.56 1090H1932.58" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_29" d="M1880.21 58.9299V650.77" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_30" d="M2081.37 49.3599V348.94" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                        <path id="Vector_31" d="M2005.23 1387.33V1620.34H2310.97V1387.33" stroke="#333333"
                              stroke-width="15" stroke-miterlimit="10"/>
                        <path id="Vector_32" d="M1740 1064.66H1675.8" stroke="#333333" stroke-width="10"
                              stroke-miterlimit="10"/>
                    </g>
                    <g id="Toilets">
                        <path id="Vector_33"
                              d="M2084.49 1590.63C2096 1590.63 2105.33 1578.28 2105.33 1563.04C2105.33 1547.8 2096 1535.45 2084.49 1535.45C2072.98 1535.45 2063.65 1547.8 2063.65 1563.04C2063.65 1578.28 2072.98 1590.63 2084.49 1590.63Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_34"
                              d="M2055.4 1584.28H2113.57C2116.79 1584.28 2119.4 1586.89 2119.4 1590.11V1613.33H2049.57V1590.11C2049.57 1586.89 2052.18 1584.28 2055.4 1584.28Z"
                              fill="white" stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_35"
                              d="M2238.7 1590.63C2250.21 1590.63 2259.54 1578.28 2259.54 1563.04C2259.54 1547.8 2250.21 1535.45 2238.7 1535.45C2227.19 1535.45 2217.86 1547.8 2217.86 1563.04C2217.86 1578.28 2227.19 1590.63 2238.7 1590.63Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_36"
                              d="M2209.62 1584.28H2267.79C2271.01 1584.28 2273.62 1586.89 2273.62 1590.11V1613.33H2203.79V1590.11C2203.79 1586.89 2206.4 1584.28 2209.62 1584.28Z"
                              fill="white" stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_37"
                              d="M2126.8 1139.89H2158.65V1216.3H2126.8C2124.21 1216.3 2122.12 1214.2 2122.12 1211.62V1144.58C2122.12 1141.99 2124.22 1139.9 2126.8 1139.9V1139.89Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_38"
                              d="M2122.11 1147.83H2143.29C2147.19 1147.83 2150.36 1151 2150.36 1154.9V1201.3C2150.36 1205.2 2147.19 1208.37 2143.29 1208.37H2122.11V1147.83Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_39"
                              d="M2135.59 1183.28C2137.53 1183.28 2139.11 1181.7 2139.11 1179.76C2139.11 1177.82 2137.53 1176.24 2135.59 1176.24C2133.65 1176.24 2132.07 1177.82 2132.07 1179.76C2132.07 1181.7 2133.65 1183.28 2135.59 1183.28Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_40"
                              d="M2126.8 1222.51H2158.65V1298.92H2126.8C2124.21 1298.92 2122.12 1296.82 2122.12 1294.24V1227.2C2122.12 1224.61 2124.22 1222.52 2126.8 1222.52V1222.51Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_41"
                              d="M2122.11 1230.45H2143.29C2147.19 1230.45 2150.36 1233.62 2150.36 1237.52V1283.92C2150.36 1287.82 2147.19 1290.99 2143.29 1290.99H2122.11V1230.45Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_42"
                              d="M2135.59 1265.9C2137.53 1265.9 2139.11 1264.32 2139.11 1262.38C2139.11 1260.44 2137.53 1258.86 2135.59 1258.86C2133.65 1258.86 2132.07 1260.44 2132.07 1262.38C2132.07 1264.32 2133.65 1265.9 2135.59 1265.9Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                    </g>
                    <g id="rando Wall">
                        <path id="Vector_43" d="M2748.06 1378.73V1117.03H2869.49" stroke="#333333" stroke-width="5"
                              stroke-miterlimit="10"/>
                        <path id="Vector_44" d="M2967.88 1159.24V1103.21H3245.59" stroke="#333333" stroke-width="5"
                              stroke-miterlimit="10"/>
                    </g>
                    <g id="Chairs">
                        <g id="Group">
                            <path id="Vector_45"
                                  d="M910.12 592.57H957.83C961.38 592.57 964.27 595.45 964.27 599.01V650.24C964.27 654.1 961.14 657.22 957.29 657.22H910.68C906.82 657.22 903.7 654.09 903.7 650.24V599.01C903.7 595.46 906.58 592.57 910.14 592.57H910.12Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_46"
                                  d="M901.56 608.31H905.82C908.03 608.31 909.83 610.1 909.83 612.32V648.8C909.83 650.86 908.16 652.53 906.1 652.53H901.26C899.2 652.53 897.53 650.86 897.53 648.8V612.35C897.53 610.12 899.34 608.32 901.56 608.32V608.31Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_47"
                                  d="M962.14 608.31H966.4C968.61 608.31 970.41 610.1 970.41 612.32V649.15C970.41 651.02 968.89 652.53 967.03 652.53H961.49C959.62 652.53 958.11 651.01 958.11 649.15V612.35C958.11 610.12 959.92 608.32 962.14 608.32V608.31Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_48" d="M903.68 602.3H964.26" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_2">
                            <path id="Vector_49"
                                  d="M532.033 817.629L498.297 783.893C495.787 781.382 495.78 777.302 498.297 774.785L534.522 738.56C537.251 735.83 541.671 735.838 544.393 738.56L577.351 771.518C580.081 774.248 580.074 778.667 577.351 781.389L541.126 817.614C538.616 820.125 534.536 820.132 532.019 817.614L532.033 817.629Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_50"
                                  d="M549.219 812.554L546.206 809.542C544.644 807.979 544.637 805.441 546.206 803.871L572.002 778.076C573.458 776.619 575.82 776.619 577.277 778.076L580.699 781.498C582.156 782.955 582.156 785.316 580.699 786.773L554.925 812.547C553.348 814.124 550.796 814.117 549.226 812.547L549.219 812.554Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_51"
                                  d="M506.372 769.722L503.359 766.71C501.797 765.147 501.789 762.609 503.359 761.039L529.402 734.996C530.724 733.674 532.867 733.681 534.182 734.996L538.099 738.913C539.422 740.236 539.415 742.378 538.099 743.694L512.078 769.715C510.501 771.292 507.948 771.285 506.379 769.715L506.372 769.722Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_52" d="M543.47 815.3L500.63 772.47" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_3">
                            <path id="Vector_53"
                                  d="M1106.94 835.02V882.73C1106.94 886.28 1104.06 889.17 1100.5 889.17H1049.27C1045.41 889.17 1042.29 886.04 1042.29 882.19V835.58C1042.29 831.72 1045.42 828.6 1049.27 828.6H1100.5C1104.05 828.6 1106.94 831.48 1106.94 835.04V835.02Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_54"
                                  d="M1091.2 826.46V830.72C1091.2 832.93 1089.41 834.73 1087.19 834.73H1050.71C1048.65 834.73 1046.98 833.06 1046.98 831V826.16C1046.98 824.1 1048.65 822.43 1050.71 822.43H1087.16C1089.39 822.43 1091.19 824.24 1091.19 826.46H1091.2Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_55"
                                  d="M1091.2 887.04V891.3C1091.2 893.51 1089.41 895.31 1087.19 895.31H1050.36C1048.49 895.31 1046.98 893.79 1046.98 891.93V886.39C1046.98 884.52 1048.5 883.01 1050.36 883.01H1087.16C1089.39 883.01 1091.19 884.82 1091.19 887.04H1091.2Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_56" d="M1097.21 828.58V889.16" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_4">
                            <path id="Vector_57"
                                  d="M834.52 1146.38V1194.09C834.52 1197.64 831.64 1200.53 828.08 1200.53H776.85C772.99 1200.53 769.87 1197.4 769.87 1193.55V1146.94C769.87 1143.08 773 1139.96 776.85 1139.96H828.08C831.63 1139.96 834.52 1142.84 834.52 1146.4V1146.38Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_58"
                                  d="M818.78 1137.83V1142.09C818.78 1144.3 816.99 1146.1 814.77 1146.1H778.29C776.23 1146.1 774.56 1144.43 774.56 1142.37V1137.53C774.56 1135.47 776.23 1133.8 778.29 1133.8H814.74C816.97 1133.8 818.77 1135.61 818.77 1137.83H818.78Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_59"
                                  d="M818.78 1198.4V1202.66C818.78 1204.87 816.99 1206.67 814.77 1206.67H777.94C776.07 1206.67 774.56 1205.15 774.56 1203.29V1197.75C774.56 1195.88 776.08 1194.37 777.94 1194.37H814.74C816.97 1194.37 818.77 1196.18 818.77 1198.4H818.78Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_60" d="M824.79 1139.95V1200.52" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_5">
                            <path id="Vector_61"
                                  d="M1180.66 882.73V835.02C1180.66 831.47 1183.54 828.58 1187.1 828.58H1238.33C1242.19 828.58 1245.31 831.71 1245.31 835.56V882.17C1245.31 886.03 1242.18 889.15 1238.33 889.15H1187.1C1183.55 889.15 1180.66 886.27 1180.66 882.71V882.73Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_62"
                                  d="M1196.4 891.28V887.02C1196.4 884.81 1198.19 883.01 1200.41 883.01H1236.89C1238.95 883.01 1240.62 884.68 1240.62 886.74V891.58C1240.62 893.64 1238.95 895.31 1236.89 895.31H1200.44C1198.21 895.31 1196.41 893.5 1196.41 891.28H1196.4Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_63"
                                  d="M1196.4 830.7V826.44C1196.4 824.23 1198.19 822.43 1200.41 822.43H1237.24C1239.11 822.43 1240.62 823.95 1240.62 825.81V831.35C1240.62 833.22 1239.1 834.73 1237.24 834.73H1200.44C1198.21 834.73 1196.41 832.92 1196.41 830.7H1196.4Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_64" d="M1190.39 889.16V828.58" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_6">
                            <path id="Vector_65"
                                  d="M1201.43 148.3H1249.14C1252.69 148.3 1255.58 151.18 1255.58 154.74V205.97C1255.58 209.83 1252.45 212.95 1248.6 212.95H1201.99C1198.13 212.95 1195.01 209.82 1195.01 205.97V154.74C1195.01 151.19 1197.89 148.3 1201.45 148.3H1201.43Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_66"
                                  d="M1192.88 164.03H1197.14C1199.35 164.03 1201.15 165.82 1201.15 168.04V204.52C1201.15 206.58 1199.48 208.25 1197.42 208.25H1192.58C1190.52 208.25 1188.85 206.58 1188.85 204.52V168.07C1188.85 165.84 1190.66 164.04 1192.88 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_67"
                                  d="M1253.46 164.03H1257.72C1259.93 164.03 1261.73 165.82 1261.73 168.04V204.87C1261.73 206.74 1260.21 208.25 1258.35 208.25H1252.81C1250.94 208.25 1249.43 206.73 1249.43 204.87V168.07C1249.43 165.84 1251.24 164.04 1253.46 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_68" d="M1195 158.03H1255.58" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_7">
                            <path id="Vector_69"
                                  d="M1140.34 283.53V235.82C1140.34 232.27 1143.22 229.38 1146.78 229.38H1198.01C1201.87 229.38 1204.99 232.51 1204.99 236.36V282.97C1204.99 286.83 1201.86 289.95 1198.01 289.95H1146.78C1143.23 289.95 1140.34 287.07 1140.34 283.51V283.53Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_70"
                                  d="M1156.07 292.09V287.83C1156.07 285.62 1157.86 283.82 1160.08 283.82H1196.56C1198.62 283.82 1200.29 285.49 1200.29 287.55V292.39C1200.29 294.45 1198.62 296.12 1196.56 296.12H1160.11C1157.88 296.12 1156.08 294.31 1156.08 292.09H1156.07Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_71"
                                  d="M1156.07 231.51V227.25C1156.07 225.04 1157.86 223.24 1160.08 223.24H1196.91C1198.78 223.24 1200.29 224.76 1200.29 226.62V232.16C1200.29 234.03 1198.77 235.54 1196.91 235.54H1160.11C1157.88 235.54 1156.08 233.73 1156.08 231.51H1156.07Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_72" d="M1150.06 289.97V229.39" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_8">
                            <path id="Vector_73"
                                  d="M1611.93 235.83V283.54C1611.93 287.09 1609.05 289.98 1605.49 289.98H1554.26C1550.4 289.98 1547.28 286.85 1547.28 283V236.39C1547.28 232.53 1550.41 229.41 1554.26 229.41H1605.49C1609.04 229.41 1611.93 232.29 1611.93 235.85V235.83Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_74"
                                  d="M1596.19 227.27V231.53C1596.19 233.74 1594.4 235.54 1592.18 235.54H1555.7C1553.64 235.54 1551.97 233.87 1551.97 231.81V226.97C1551.97 224.91 1553.64 223.24 1555.7 223.24H1592.15C1594.38 223.24 1596.18 225.05 1596.18 227.27H1596.19Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_75"
                                  d="M1596.19 287.85V292.11C1596.19 294.32 1594.4 296.12 1592.18 296.12H1555.35C1553.48 296.12 1551.97 294.6 1551.97 292.74V287.2C1551.97 285.33 1553.49 283.82 1555.35 283.82H1592.15C1594.38 283.82 1596.18 285.63 1596.18 287.85H1596.19Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_76" d="M1602.2 229.39V289.97" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_9">
                            <path id="Vector_77"
                                  d="M1301.67 148.3H1349.38C1352.93 148.3 1355.82 151.18 1355.82 154.74V205.97C1355.82 209.83 1352.69 212.95 1348.84 212.95H1302.23C1298.37 212.95 1295.25 209.82 1295.25 205.97V154.74C1295.25 151.19 1298.13 148.3 1301.69 148.3H1301.67Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_78"
                                  d="M1293.11 164.03H1297.37C1299.58 164.03 1301.38 165.82 1301.38 168.04V204.52C1301.38 206.58 1299.71 208.25 1297.65 208.25H1292.81C1290.75 208.25 1289.08 206.58 1289.08 204.52V168.07C1289.08 165.84 1290.89 164.04 1293.11 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_79"
                                  d="M1353.69 164.03H1357.95C1360.16 164.03 1361.96 165.82 1361.96 168.04V204.87C1361.96 206.74 1360.44 208.25 1358.58 208.25H1353.04C1351.17 208.25 1349.66 206.73 1349.66 204.87V168.07C1349.66 165.84 1351.47 164.04 1353.69 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_80" d="M1295.23 158.03H1355.81" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_10">
                            <path id="Vector_81"
                                  d="M1401.9 148.3H1449.61C1453.16 148.3 1456.05 151.18 1456.05 154.74V205.97C1456.05 209.83 1452.92 212.95 1449.07 212.95H1402.46C1398.6 212.95 1395.48 209.82 1395.48 205.97V154.74C1395.48 151.19 1398.36 148.3 1401.92 148.3H1401.9Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_82"
                                  d="M1393.35 164.03H1397.61C1399.82 164.03 1401.62 165.82 1401.62 168.04V204.52C1401.62 206.58 1399.95 208.25 1397.89 208.25H1393.05C1390.99 208.25 1389.32 206.58 1389.32 204.52V168.07C1389.32 165.84 1391.13 164.04 1393.35 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_83"
                                  d="M1453.93 164.03H1458.19C1460.4 164.03 1462.2 165.82 1462.2 168.04V204.87C1462.2 206.74 1460.68 208.25 1458.82 208.25H1453.28C1451.41 208.25 1449.9 206.73 1449.9 204.87V168.07C1449.9 165.84 1451.71 164.04 1453.93 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_84" d="M1395.47 158.03H1456.05" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_11">
                            <path id="Vector_85"
                                  d="M1502.14 148.3H1549.85C1553.4 148.3 1556.29 151.18 1556.29 154.74V205.97C1556.29 209.83 1553.16 212.95 1549.31 212.95H1502.7C1498.84 212.95 1495.72 209.82 1495.72 205.97V154.74C1495.72 151.19 1498.6 148.3 1502.16 148.3H1502.14Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_86"
                                  d="M1493.58 164.03H1497.84C1500.05 164.03 1501.85 165.82 1501.85 168.04V204.52C1501.85 206.58 1500.18 208.25 1498.12 208.25H1493.28C1491.22 208.25 1489.55 206.58 1489.55 204.52V168.07C1489.55 165.84 1491.36 164.04 1493.58 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_87"
                                  d="M1554.16 164.03H1558.42C1560.63 164.03 1562.43 165.82 1562.43 168.04V204.87C1562.43 206.74 1560.91 208.25 1559.05 208.25H1553.51C1551.64 208.25 1550.13 206.73 1550.13 204.87V168.07C1550.13 165.84 1551.94 164.04 1554.16 164.04V164.03Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_88" d="M1495.7 158.03H1556.28" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_12">
                            <path id="Vector_89"
                                  d="M1549.84 366.94H1502.13C1498.58 366.94 1495.69 364.06 1495.69 360.5V309.27C1495.69 305.41 1498.82 302.29 1502.67 302.29H1549.28C1553.14 302.29 1556.26 305.42 1556.26 309.27V360.5C1556.26 364.05 1553.38 366.94 1549.82 366.94H1549.84Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_90"
                                  d="M1558.4 351.21H1554.14C1551.93 351.21 1550.13 349.42 1550.13 347.2V310.72C1550.13 308.66 1551.8 306.99 1553.86 306.99H1558.7C1560.76 306.99 1562.43 308.66 1562.43 310.72V347.17C1562.43 349.4 1560.62 351.2 1558.4 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_91"
                                  d="M1497.83 351.21H1493.57C1491.36 351.21 1489.56 349.42 1489.56 347.2V310.37C1489.56 308.5 1491.08 306.99 1492.94 306.99H1498.48C1500.35 306.99 1501.86 308.51 1501.86 310.37V347.17C1501.86 349.4 1500.05 351.2 1497.83 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_92" d="M1556.28 357.22H1495.7" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_13">
                            <path id="Vector_93"
                                  d="M1449.61 366.94H1401.9C1398.35 366.94 1395.46 364.06 1395.46 360.5V309.27C1395.46 305.41 1398.59 302.29 1402.44 302.29H1449.05C1452.91 302.29 1456.03 305.42 1456.03 309.27V360.5C1456.03 364.05 1453.15 366.94 1449.59 366.94H1449.61Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_94"
                                  d="M1458.16 351.21H1453.9C1451.69 351.21 1449.89 349.42 1449.89 347.2V310.72C1449.89 308.66 1451.56 306.99 1453.62 306.99H1458.46C1460.52 306.99 1462.19 308.66 1462.19 310.72V347.17C1462.19 349.4 1460.38 351.2 1458.16 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_95"
                                  d="M1397.59 351.21H1393.33C1391.12 351.21 1389.32 349.42 1389.32 347.2V310.37C1389.32 308.5 1390.84 306.99 1392.7 306.99H1398.24C1400.11 306.99 1401.62 308.51 1401.62 310.37V347.17C1401.62 349.4 1399.81 351.2 1397.59 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_96" d="M1456.05 357.22H1395.47" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_14">
                            <path id="Vector_97"
                                  d="M1349.37 366.94H1301.66C1298.11 366.94 1295.22 364.06 1295.22 360.5V309.27C1295.22 305.41 1298.35 302.29 1302.2 302.29H1348.81C1352.67 302.29 1355.79 305.42 1355.79 309.27V360.5C1355.79 364.05 1352.91 366.94 1349.35 366.94H1349.37Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_98"
                                  d="M1357.93 351.21H1353.67C1351.46 351.21 1349.66 349.42 1349.66 347.2V310.72C1349.66 308.66 1351.33 306.99 1353.39 306.99H1358.23C1360.29 306.99 1361.96 308.66 1361.96 310.72V347.17C1361.96 349.4 1360.15 351.2 1357.93 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_99"
                                  d="M1297.35 351.21H1293.09C1290.88 351.21 1289.08 349.42 1289.08 347.2V310.37C1289.08 308.5 1290.6 306.99 1292.46 306.99H1298C1299.87 306.99 1301.38 308.51 1301.38 310.37V347.17C1301.38 349.4 1299.57 351.2 1297.35 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_100" d="M1355.81 357.22H1295.23" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_15">
                            <path id="Vector_101"
                                  d="M1249.14 366.94H1201.43C1197.88 366.94 1194.99 364.06 1194.99 360.5V309.27C1194.99 305.41 1198.12 302.29 1201.97 302.29H1248.58C1252.44 302.29 1255.56 305.42 1255.56 309.27V360.5C1255.56 364.05 1252.68 366.94 1249.12 366.94H1249.14Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_102"
                                  d="M1257.69 351.21H1253.43C1251.22 351.21 1249.42 349.42 1249.42 347.2V310.72C1249.42 308.66 1251.09 306.99 1253.15 306.99H1257.99C1260.05 306.99 1261.72 308.66 1261.72 310.72V347.17C1261.72 349.4 1259.91 351.2 1257.69 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_103"
                                  d="M1197.11 351.21H1192.85C1190.64 351.21 1188.84 349.42 1188.84 347.2V310.37C1188.84 308.5 1190.36 306.99 1192.22 306.99H1197.76C1199.63 306.99 1201.14 308.51 1201.14 310.37V347.17C1201.14 349.4 1199.33 351.2 1197.11 351.2V351.21Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_104" d="M1255.58 357.22H1195" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_16">
                            <path id="Vector_105"
                                  d="M1527.46 835.02V882.73C1527.46 886.28 1524.58 889.17 1521.02 889.17H1469.79C1465.93 889.17 1462.81 886.04 1462.81 882.19V835.58C1462.81 831.72 1465.94 828.6 1469.79 828.6H1521.02C1524.57 828.6 1527.46 831.48 1527.46 835.04V835.02Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_106"
                                  d="M1511.72 826.47V830.73C1511.72 832.94 1509.93 834.74 1507.71 834.74H1471.23C1469.17 834.74 1467.5 833.07 1467.5 831.01V826.17C1467.5 824.11 1469.17 822.44 1471.23 822.44H1507.68C1509.91 822.44 1511.71 824.25 1511.71 826.47H1511.72Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_107"
                                  d="M1511.72 887.04V891.3C1511.72 893.51 1509.93 895.31 1507.71 895.31H1470.88C1469.01 895.31 1467.5 893.79 1467.5 891.93V886.39C1467.5 884.52 1469.02 883.01 1470.88 883.01H1507.68C1509.91 883.01 1511.71 884.82 1511.71 887.04H1511.72Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_108" d="M1517.73 828.58V889.16" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_17">
                            <path id="Vector_109"
                                  d="M920.35 1296.42V1248.71C920.35 1245.16 923.23 1242.27 926.79 1242.27H978.02C981.88 1242.27 985 1245.4 985 1249.25V1295.86C985 1299.72 981.87 1302.84 978.02 1302.84H926.79C923.24 1302.84 920.35 1299.96 920.35 1296.4V1296.42Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_110"
                                  d="M936.08 1304.97V1300.71C936.08 1298.5 937.87 1296.7 940.09 1296.7H976.57C978.63 1296.7 980.3 1298.37 980.3 1300.43V1305.27C980.3 1307.33 978.63 1309 976.57 1309H940.12C937.89 1309 936.09 1307.19 936.09 1304.97H936.08Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_111"
                                  d="M936.09 1244.39V1240.13C936.09 1237.92 937.88 1236.12 940.1 1236.12H976.93C978.8 1236.12 980.31 1237.64 980.31 1239.5V1245.04C980.31 1246.91 978.79 1248.42 976.93 1248.42H940.13C937.9 1248.42 936.1 1246.61 936.1 1244.39H936.09Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_112" d="M930.08 1302.85V1242.27" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_18">
                            <path id="Vector_113"
                                  d="M1267.14 1248.71V1296.42C1267.14 1299.97 1264.26 1302.86 1260.7 1302.86H1209.47C1205.61 1302.86 1202.49 1299.73 1202.49 1295.88V1249.27C1202.49 1245.41 1205.62 1242.29 1209.47 1242.29H1260.7C1264.25 1242.29 1267.14 1245.17 1267.14 1248.73V1248.71Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_114"
                                  d="M1251.41 1240.15V1244.41C1251.41 1246.62 1249.62 1248.42 1247.4 1248.42H1210.92C1208.86 1248.42 1207.19 1246.75 1207.19 1244.69V1239.85C1207.19 1237.79 1208.86 1236.12 1210.92 1236.12H1247.37C1249.6 1236.12 1251.4 1237.93 1251.4 1240.15H1251.41Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_115"
                                  d="M1251.42 1300.73V1304.99C1251.42 1307.2 1249.63 1309 1247.41 1309H1210.58C1208.71 1309 1207.2 1307.48 1207.2 1305.62V1300.08C1207.2 1298.21 1208.72 1296.7 1210.58 1296.7H1247.38C1249.61 1296.7 1251.41 1298.51 1251.41 1300.73H1251.42Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_116" d="M1257.42 1242.27V1302.85" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_19">
                            <path id="Vector_117"
                                  d="M586.02 1346.29H538.31C534.76 1346.29 531.87 1343.41 531.87 1339.85V1288.62C531.87 1284.76 535 1281.64 538.85 1281.64H585.46C589.32 1281.64 592.44 1284.77 592.44 1288.62V1339.85C592.44 1343.4 589.56 1346.29 586 1346.29H586.02Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_118"
                                  d="M594.58 1330.56H590.32C588.11 1330.56 586.31 1328.77 586.31 1326.55V1290.07C586.31 1288.01 587.98 1286.34 590.04 1286.34H594.88C596.94 1286.34 598.61 1288.01 598.61 1290.07V1326.52C598.61 1328.75 596.8 1330.55 594.58 1330.55V1330.56Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_119"
                                  d="M534 1330.56H529.74C527.53 1330.56 525.73 1328.77 525.73 1326.55V1289.72C525.73 1287.85 527.25 1286.34 529.11 1286.34H534.65C536.52 1286.34 538.03 1287.86 538.03 1289.72V1326.52C538.03 1328.75 536.22 1330.55 534 1330.55V1330.56Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_120" d="M592.45 1336.56H531.87" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_20">
                            <path id="Vector_121"
                                  d="M538.31 999.49H586.02C589.57 999.49 592.46 1002.37 592.46 1005.93V1057.16C592.46 1061.02 589.33 1064.14 585.48 1064.14H538.87C535.01 1064.14 531.89 1061.01 531.89 1057.16V1005.93C531.89 1002.38 534.77 999.49 538.33 999.49H538.31Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_122"
                                  d="M529.75 1015.22H534.01C536.22 1015.22 538.02 1017.01 538.02 1019.23V1055.71C538.02 1057.77 536.35 1059.44 534.29 1059.44H529.45C527.39 1059.44 525.72 1057.77 525.72 1055.71V1019.26C525.72 1017.03 527.53 1015.23 529.75 1015.23V1015.22Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_123"
                                  d="M590.33 1015.22H594.59C596.8 1015.22 598.6 1017.01 598.6 1019.23V1056.06C598.6 1057.93 597.08 1059.44 595.22 1059.44H589.68C587.81 1059.44 586.3 1057.92 586.3 1056.06V1019.26C586.3 1017.03 588.11 1015.23 590.33 1015.23V1015.22Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_124" d="M531.87 1009.22H592.45" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_21">
                            <path id="Vector_125"
                                  d="M1575.45 1368.88H1527.74C1524.19 1368.88 1521.3 1366 1521.3 1362.44V1311.21C1521.3 1307.35 1524.43 1304.23 1528.28 1304.23H1574.89C1578.75 1304.23 1581.87 1307.36 1581.87 1311.21V1362.44C1581.87 1365.99 1578.99 1368.88 1575.43 1368.88H1575.45Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_126"
                                  d="M1584 1353.15H1579.74C1577.53 1353.15 1575.73 1351.36 1575.73 1349.14V1312.66C1575.73 1310.6 1577.4 1308.93 1579.46 1308.93H1584.3C1586.36 1308.93 1588.03 1310.6 1588.03 1312.66V1349.11C1588.03 1351.34 1586.22 1353.14 1584 1353.14V1353.15Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_127"
                                  d="M1523.42 1353.15H1519.16C1516.95 1353.15 1515.15 1351.36 1515.15 1349.14V1312.31C1515.15 1310.44 1516.67 1308.93 1518.53 1308.93H1524.07C1525.94 1308.93 1527.45 1310.45 1527.45 1312.31V1349.11C1527.45 1351.34 1525.64 1353.14 1523.42 1353.14V1353.15Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_128" d="M1581.88 1359.16H1521.31" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_22">
                            <path id="Vector_129"
                                  d="M811.2 84.6099H858.91C862.46 84.6099 865.35 87.4899 865.35 91.0499V142.28C865.35 146.14 862.22 149.26 858.37 149.26H811.76C807.9 149.26 804.78 146.13 804.78 142.28V91.0499C804.78 87.4999 807.66 84.6099 811.22 84.6099H811.2Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_130"
                                  d="M802.64 100.34H806.9C809.11 100.34 810.91 102.13 810.91 104.35V140.83C810.91 142.89 809.24 144.56 807.18 144.56H802.34C800.28 144.56 798.61 142.89 798.61 140.83V104.38C798.61 102.15 800.42 100.35 802.64 100.35V100.34Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_131"
                                  d="M863.22 100.34H867.48C869.69 100.34 871.49 102.13 871.49 104.35V141.18C871.49 143.05 869.97 144.56 868.11 144.56H862.57C860.7 144.56 859.19 143.04 859.19 141.18V104.38C859.19 102.15 861 100.35 863.22 100.35V100.34Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_132" d="M804.76 94.3398H865.34" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_23">
                            <g id="Group_24">
                                <path id="Vector_133"
                                      d="M759.53 454.37H721.05C718.19 454.37 715.86 452.04 715.86 449.18V416.84C715.86 408.78 722.41 402.23 730.47 402.23H750.11C758.17 402.23 764.72 408.78 764.72 416.84V449.18C764.72 452.04 762.39 454.37 759.53 454.37Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_134" d="M764.72 446.52H715.87" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_135"
                                  d="M718.5 423.83C718.5 421.654 716.736 419.89 714.56 419.89C712.384 419.89 710.62 421.654 710.62 423.83V437.91C710.62 440.086 712.384 441.85 714.56 441.85C716.736 441.85 718.5 440.086 718.5 437.91V423.83Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_136"
                                  d="M768.61 423.83C768.61 421.654 766.846 419.89 764.67 419.89C762.494 419.89 760.73 421.654 760.73 423.83V437.91C760.73 440.086 762.494 441.85 764.67 441.85C766.846 441.85 768.61 440.086 768.61 437.91V423.83Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_25">
                            <g id="Group_26">
                                <path id="Vector_137"
                                      d="M827.95 454.37H789.47C786.61 454.37 784.28 452.04 784.28 449.18V416.84C784.28 408.78 790.83 402.23 798.89 402.23H818.53C826.59 402.23 833.14 408.78 833.14 416.84V449.18C833.14 452.04 830.81 454.37 827.95 454.37Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_138" d="M833.14 446.52H784.29" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_139"
                                  d="M786.91 423.83C786.91 421.654 785.146 419.89 782.97 419.89C780.794 419.89 779.03 421.654 779.03 423.83V437.91C779.03 440.086 780.794 441.85 782.97 441.85C785.146 441.85 786.91 440.086 786.91 437.91V423.83Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_140"
                                  d="M837.03 423.83C837.03 421.654 835.266 419.89 833.09 419.89C830.914 419.89 829.15 421.654 829.15 423.83V437.91C829.15 440.086 830.914 441.85 833.09 441.85C835.266 441.85 837.03 440.086 837.03 437.91V423.83Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_27">
                            <g id="Group_28">
                                <path id="Vector_141"
                                      d="M616.24 394.91V356.43C616.24 353.57 618.57 351.24 621.43 351.24H653.77C661.83 351.24 668.38 357.79 668.38 365.85V385.49C668.38 393.55 661.83 400.1 653.77 400.1H621.43C618.57 400.1 616.24 397.77 616.24 394.91Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_142" d="M624.09 400.1V351.24" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_143"
                                  d="M646.78 353.87C648.956 353.87 650.72 352.106 650.72 349.93C650.72 347.754 648.956 345.99 646.78 345.99H632.7C630.524 345.99 628.76 347.754 628.76 349.93C628.76 352.106 630.524 353.87 632.7 353.87H646.78Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_144"
                                  d="M646.78 403.98C648.956 403.98 650.72 402.216 650.72 400.04C650.72 397.864 648.956 396.1 646.78 396.1H632.7C630.524 396.1 628.76 397.864 628.76 400.04C628.76 402.216 630.524 403.98 632.7 403.98H646.78Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_29">
                            <g id="Group_30">
                                <path id="Vector_145"
                                      d="M1727.5 241.18V279.66C1727.5 282.52 1725.17 284.85 1722.31 284.85H1689.97C1681.91 284.85 1675.36 278.3 1675.36 270.24V250.6C1675.36 242.54 1681.91 235.99 1689.97 235.99H1722.31C1725.17 235.99 1727.5 238.32 1727.5 241.18Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_146" d="M1719.65 235.98V284.84" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_147"
                                  d="M1696.96 282.22C1694.78 282.22 1693.02 283.984 1693.02 286.16C1693.02 288.336 1694.78 290.1 1696.96 290.1H1711.04C1713.22 290.1 1714.98 288.336 1714.98 286.16C1714.98 283.984 1713.22 282.22 1711.04 282.22H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_148"
                                  d="M1696.96 232.1C1694.78 232.1 1693.02 233.864 1693.02 236.04C1693.02 238.216 1694.78 239.98 1696.96 239.98H1711.04C1713.22 239.98 1714.98 238.216 1714.98 236.04C1714.98 233.864 1713.22 232.1 1711.04 232.1H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_31">
                            <g id="Group_32">
                                <path id="Vector_149"
                                      d="M1727.49 166.22V204.7C1727.49 207.56 1725.16 209.89 1722.3 209.89H1689.96C1681.9 209.89 1675.35 203.34 1675.35 195.28V175.64C1675.35 167.58 1681.9 161.03 1689.96 161.03H1722.3C1725.16 161.03 1727.49 163.36 1727.49 166.22Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_150" d="M1719.65 161.03V209.89" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_151"
                                  d="M1696.95 207.26C1694.77 207.26 1693.01 209.024 1693.01 211.2C1693.01 213.376 1694.77 215.14 1696.95 215.14H1711.03C1713.21 215.14 1714.97 213.376 1714.97 211.2C1714.97 209.024 1713.21 207.26 1711.03 207.26H1696.95Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_152"
                                  d="M1696.96 157.14C1694.78 157.14 1693.02 158.904 1693.02 161.08C1693.02 163.256 1694.78 165.02 1696.96 165.02H1711.04C1713.22 165.02 1714.98 163.256 1714.98 161.08C1714.98 158.904 1713.22 157.14 1711.04 157.14H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_33">
                            <g id="Group_34">
                                <path id="Vector_153"
                                      d="M1727.49 316.64V355.12C1727.49 357.98 1725.16 360.31 1722.3 360.31H1689.96C1681.9 360.31 1675.35 353.76 1675.35 345.7V326.06C1675.35 318 1681.9 311.45 1689.96 311.45H1722.3C1725.16 311.45 1727.49 313.78 1727.49 316.64Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_154" d="M1719.65 311.44V360.3" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_155"
                                  d="M1696.96 357.68C1694.78 357.68 1693.02 359.444 1693.02 361.62C1693.02 363.796 1694.78 365.56 1696.96 365.56H1711.04C1713.22 365.56 1714.98 363.796 1714.98 361.62C1714.98 359.444 1713.22 357.68 1711.04 357.68H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_156"
                                  d="M1696.96 307.56C1694.78 307.56 1693.02 309.324 1693.02 311.5C1693.02 313.676 1694.78 315.44 1696.96 315.44H1711.04C1713.22 315.44 1714.98 313.676 1714.98 311.5C1714.98 309.324 1713.22 307.56 1711.04 307.56H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_35">
                            <g id="Group_36">
                                <path id="Vector_157"
                                      d="M1727.49 392.09V430.57C1727.49 433.43 1725.16 435.76 1722.3 435.76H1689.96C1681.9 435.76 1675.35 429.21 1675.35 421.15V401.51C1675.35 393.45 1681.9 386.9 1689.96 386.9H1722.3C1725.16 386.9 1727.49 389.23 1727.49 392.09Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_158" d="M1719.65 386.9V435.76" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_159"
                                  d="M1696.96 433.13C1694.78 433.13 1693.02 434.894 1693.02 437.07C1693.02 439.246 1694.78 441.01 1696.96 441.01H1711.04C1713.22 441.01 1714.98 439.246 1714.98 437.07C1714.98 434.894 1713.22 433.13 1711.04 433.13H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_160"
                                  d="M1696.96 383.02C1694.78 383.02 1693.02 384.784 1693.02 386.96C1693.02 389.136 1694.78 390.9 1696.96 390.9H1711.04C1713.22 390.9 1714.98 389.136 1714.98 386.96C1714.98 384.784 1713.22 383.02 1711.04 383.02H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_37">
                            <g id="Group_38">
                                <path id="Vector_161"
                                      d="M2793.2 146.27V184.75C2793.2 187.61 2790.87 189.94 2788.01 189.94H2755.67C2747.61 189.94 2741.06 183.39 2741.06 175.33V155.69C2741.06 147.63 2747.61 141.08 2755.67 141.08H2788.01C2790.87 141.08 2793.2 143.41 2793.2 146.27Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_162" d="M2785.35 141.08V189.94" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_163"
                                  d="M2762.67 187.31C2760.49 187.31 2758.73 189.074 2758.73 191.25C2758.73 193.426 2760.49 195.19 2762.67 195.19H2776.75C2778.93 195.19 2780.69 193.426 2780.69 191.25C2780.69 189.074 2778.93 187.31 2776.75 187.31H2762.67Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_164"
                                  d="M2762.66 137.19C2760.48 137.19 2758.72 138.954 2758.72 141.13C2758.72 143.306 2760.48 145.07 2762.66 145.07H2776.74C2778.92 145.07 2780.68 143.306 2780.68 141.13C2780.68 138.954 2778.92 137.19 2776.74 137.19H2762.66Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_39">
                            <g id="Group_40">
                                <path id="Vector_165"
                                      d="M2793.2 74.4197V112.9C2793.2 115.76 2790.87 118.09 2788.01 118.09H2755.67C2747.61 118.09 2741.06 111.54 2741.06 103.48V83.8396C2741.06 75.7796 2747.61 69.2297 2755.67 69.2297H2788.01C2790.87 69.2297 2793.2 71.5597 2793.2 74.4197Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_166" d="M2785.35 69.2297V118.09" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_167"
                                  d="M2762.67 115.46C2760.49 115.46 2758.73 117.224 2758.73 119.4C2758.73 121.576 2760.49 123.34 2762.67 123.34H2776.75C2778.93 123.34 2780.69 121.576 2780.69 119.4C2780.69 117.224 2778.93 115.46 2776.75 115.46H2762.67Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_168"
                                  d="M2762.67 65.3398C2760.49 65.3398 2758.73 67.1038 2758.73 69.2798C2758.73 71.4558 2760.49 73.2197 2762.67 73.2197H2776.75C2778.93 73.2197 2780.69 71.4558 2780.69 69.2798C2780.69 67.1038 2778.93 65.3398 2776.75 65.3398H2762.67Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_41">
                            <g id="Group_42">
                                <path id="Vector_169"
                                      d="M1727.49 90.2599V128.74C1727.49 131.6 1725.16 133.93 1722.3 133.93H1689.96C1681.9 133.93 1675.35 127.38 1675.35 119.32V99.6798C1675.35 91.6198 1681.9 85.0698 1689.96 85.0698H1722.3C1725.16 85.0698 1727.49 87.3999 1727.49 90.2599Z"
                                      fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                                <path id="Vector_170" d="M1719.65 85.0698V133.93" stroke="#333333" stroke-width="0.76"
                                      stroke-miterlimit="10"/>
                            </g>
                            <path id="Vector_171"
                                  d="M1696.95 131.3C1694.77 131.3 1693.01 133.064 1693.01 135.24C1693.01 137.416 1694.77 139.18 1696.95 139.18H1711.03C1713.21 139.18 1714.97 137.416 1714.97 135.24C1714.97 133.064 1713.21 131.3 1711.03 131.3H1696.95Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                            <path id="Vector_172"
                                  d="M1696.96 81.1796C1694.78 81.1796 1693.02 82.9436 1693.02 85.1196C1693.02 87.2956 1694.78 89.0596 1696.96 89.0596H1711.04C1713.22 89.0596 1714.98 87.2956 1714.98 85.1196C1714.98 82.9436 1713.22 81.1796 1711.04 81.1796H1696.96Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.79" stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_43">
                            <path id="Vector_173"
                                  d="M2022.23 948.39H2069.94C2073.49 948.39 2076.38 951.27 2076.38 954.83V1006.06C2076.38 1009.92 2073.25 1013.04 2069.4 1013.04H2022.79C2018.93 1013.04 2015.81 1009.91 2015.81 1006.06V954.83C2015.81 951.28 2018.69 948.39 2022.25 948.39H2022.23Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_174"
                                  d="M2013.68 964.12H2017.94C2020.15 964.12 2021.95 965.91 2021.95 968.13V1004.61C2021.95 1006.67 2020.28 1008.34 2018.22 1008.34H2013.38C2011.32 1008.34 2009.65 1006.67 2009.65 1004.61V968.16C2009.65 965.93 2011.46 964.13 2013.68 964.13V964.12Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_175"
                                  d="M2074.26 964.12H2078.52C2080.73 964.12 2082.53 965.91 2082.53 968.13V1004.96C2082.53 1006.83 2081.01 1008.34 2079.15 1008.34H2073.61C2071.74 1008.34 2070.23 1006.82 2070.23 1004.96V968.16C2070.23 965.93 2072.04 964.13 2074.26 964.13V964.12Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_176" d="M2015.8 958.12H2076.38" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_44">
                            <path id="Vector_177"
                                  d="M2732.33 861.41V813.7C2732.33 810.15 2735.21 807.26 2738.77 807.26H2790C2793.86 807.26 2796.98 810.39 2796.98 814.24V860.85C2796.98 864.71 2793.85 867.83 2790 867.83H2738.77C2735.22 867.83 2732.33 864.95 2732.33 861.39V861.41Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_178"
                                  d="M2748.06 869.97V865.71C2748.06 863.5 2749.85 861.7 2752.07 861.7H2788.55C2790.61 861.7 2792.28 863.37 2792.28 865.43V870.27C2792.28 872.33 2790.61 874 2788.55 874H2752.1C2749.87 874 2748.07 872.19 2748.07 869.97H2748.06Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_179"
                                  d="M2748.06 809.39V805.13C2748.06 802.92 2749.85 801.12 2752.07 801.12H2788.9C2790.77 801.12 2792.28 802.64 2792.28 804.5V810.04C2792.28 811.91 2790.76 813.42 2788.9 813.42H2752.1C2749.87 813.42 2748.07 811.61 2748.07 809.39H2748.06Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_180" d="M2742.06 867.85V807.27" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_45">
                            <path id="Vector_181"
                                  d="M3095.77 706.03H3048.06C3044.51 706.03 3041.62 703.15 3041.62 699.59V648.36C3041.62 644.5 3044.75 641.38 3048.6 641.38H3095.21C3099.07 641.38 3102.19 644.51 3102.19 648.36V699.59C3102.19 703.14 3099.31 706.03 3095.75 706.03H3095.77Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_182"
                                  d="M3104.33 690.29H3100.07C3097.86 690.29 3096.06 688.5 3096.06 686.28V649.8C3096.06 647.74 3097.73 646.07 3099.79 646.07H3104.63C3106.69 646.07 3108.36 647.74 3108.36 649.8V686.25C3108.36 688.48 3106.55 690.28 3104.33 690.28V690.29Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_183"
                                  d="M3043.75 690.29H3039.49C3037.28 690.29 3035.48 688.5 3035.48 686.28V649.45C3035.48 647.58 3037 646.07 3038.86 646.07H3044.4C3046.27 646.07 3047.78 647.59 3047.78 649.45V686.25C3047.78 688.48 3045.97 690.28 3043.75 690.28V690.29Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_184" d="M3102.21 696.29H3041.63" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_46">
                            <path id="Vector_185"
                                  d="M3069.88 1027.82V980.11C3069.88 976.56 3072.76 973.67 3076.32 973.67H3127.55C3131.41 973.67 3134.53 976.8 3134.53 980.65V1027.26C3134.53 1031.12 3131.4 1034.24 3127.55 1034.24H3076.32C3072.77 1034.24 3069.88 1031.36 3069.88 1027.8V1027.82Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_186"
                                  d="M3085.61 1036.38V1032.12C3085.61 1029.91 3087.4 1028.11 3089.62 1028.11H3126.1C3128.16 1028.11 3129.83 1029.78 3129.83 1031.84V1036.68C3129.83 1038.74 3128.16 1040.41 3126.1 1040.41H3089.65C3087.42 1040.41 3085.62 1038.6 3085.62 1036.38H3085.61Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_187"
                                  d="M3085.61 975.8V971.54C3085.61 969.33 3087.4 967.53 3089.62 967.53H3126.45C3128.32 967.53 3129.83 969.05 3129.83 970.91V976.45C3129.83 978.32 3128.31 979.83 3126.45 979.83H3089.65C3087.42 979.83 3085.62 978.02 3085.62 975.8H3085.61Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_188" d="M3079.61 1034.25V973.68" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_47">
                            <path id="Vector_189"
                                  d="M3088.34 765.35V813.06C3088.34 816.61 3085.46 819.5 3081.9 819.5H3030.67C3026.81 819.5 3023.69 816.37 3023.69 812.52V765.91C3023.69 762.05 3026.82 758.93 3030.67 758.93H3081.9C3085.45 758.93 3088.34 761.81 3088.34 765.37V765.35Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_190"
                                  d="M3072.6 756.8V761.06C3072.6 763.27 3070.81 765.07 3068.59 765.07H3032.11C3030.05 765.07 3028.38 763.4 3028.38 761.34V756.5C3028.38 754.44 3030.05 752.77 3032.11 752.77H3068.56C3070.79 752.77 3072.59 754.58 3072.59 756.8H3072.6Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_191"
                                  d="M3072.6 817.38V821.64C3072.6 823.85 3070.81 825.65 3068.59 825.65H3031.76C3029.89 825.65 3028.38 824.13 3028.38 822.27V816.73C3028.38 814.86 3029.9 813.35 3031.76 813.35H3068.56C3070.79 813.35 3072.59 815.16 3072.59 817.38H3072.6Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_192" d="M3078.6 758.92V819.5" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_48">
                            <path id="Vector_193"
                                  d="M3120.31 1250.41H3168.02C3171.57 1250.41 3174.46 1253.29 3174.46 1256.85V1308.08C3174.46 1311.94 3171.33 1315.06 3167.48 1315.06H3120.87C3117.01 1315.06 3113.89 1311.93 3113.89 1308.08V1256.85C3113.89 1253.3 3116.77 1250.41 3120.33 1250.41H3120.31Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_194"
                                  d="M3111.76 1266.14H3116.02C3118.23 1266.14 3120.03 1267.93 3120.03 1270.15V1306.63C3120.03 1308.69 3118.36 1310.36 3116.3 1310.36H3111.46C3109.4 1310.36 3107.73 1308.69 3107.73 1306.63V1270.18C3107.73 1267.95 3109.54 1266.15 3111.76 1266.15V1266.14Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_195"
                                  d="M3172.34 1266.14H3176.6C3178.81 1266.14 3180.61 1267.93 3180.61 1270.15V1306.98C3180.61 1308.85 3179.09 1310.36 3177.23 1310.36H3171.69C3169.82 1310.36 3168.31 1308.84 3168.31 1306.98V1270.18C3168.31 1267.95 3170.12 1266.15 3172.34 1266.15V1266.14Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_196" d="M3113.88 1260.14H3174.45" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                        <g id="Group_49">
                            <path id="Vector_197"
                                  d="M3168.02 1236.11H3120.31C3116.76 1236.11 3113.87 1233.23 3113.87 1229.67V1178.44C3113.87 1174.58 3117 1171.46 3120.85 1171.46H3167.46C3171.32 1171.46 3174.44 1174.59 3174.44 1178.44V1229.67C3174.44 1233.22 3171.56 1236.11 3168 1236.11H3168.02Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.98" stroke-miterlimit="10"/>
                            <path id="Vector_198"
                                  d="M3176.57 1220.37H3172.31C3170.1 1220.37 3168.3 1218.58 3168.3 1216.36V1179.88C3168.3 1177.82 3169.97 1176.15 3172.03 1176.15H3176.87C3178.93 1176.15 3180.6 1177.82 3180.6 1179.88V1216.33C3180.6 1218.56 3178.79 1220.36 3176.57 1220.36V1220.37Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_199"
                                  d="M3115.99 1220.37H3111.73C3109.52 1220.37 3107.72 1218.58 3107.72 1216.36V1179.53C3107.72 1177.66 3109.24 1176.15 3111.1 1176.15H3116.64C3118.51 1176.15 3120.02 1177.67 3120.02 1179.53V1216.33C3120.02 1218.56 3118.21 1220.36 3115.99 1220.36V1220.37Z"
                                  fill="#F2F2F2" stroke="#333333" stroke-width="0.94" stroke-miterlimit="10"/>
                            <path id="Vector_200" d="M3174.45 1226.37H3113.88" stroke="#333333" stroke-width="0.94"
                                  stroke-miterlimit="10"/>
                        </g>
                    </g>
                    <g id="Couches tables etc">
                        <path id="Vector_201"
                              d="M2266.75 731.58H2301.48V788.29H2266.75C2260.76 788.29 2255.9 783.43 2255.9 777.44V742.42C2255.9 736.43 2260.76 731.57 2266.75 731.57V731.58Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_202"
                              d="M2266.75 731.58V736.58C2263.53 736.58 2260.9 739.2 2260.9 742.43V777.45C2260.9 780.67 2263.52 783.3 2266.75 783.3V788.3"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_203"
                              d="M2411.92 788.29H2377.19V731.58H2411.92C2417.91 731.58 2422.77 736.44 2422.77 742.43V777.45C2422.77 783.44 2417.91 788.3 2411.92 788.3V788.29Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_204"
                              d="M2411.92 788.29V783.29C2415.14 783.29 2417.77 780.67 2417.77 777.44V742.42C2417.77 739.2 2415.15 736.57 2411.92 736.57V731.57"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_205"
                              d="M2367.69 687.35V722.08H2310.98V687.35C2310.98 681.36 2315.84 676.5 2321.83 676.5H2356.85C2362.84 676.5 2367.7 681.36 2367.7 687.35H2367.69Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_206"
                              d="M2367.69 687.35H2362.69C2362.69 684.13 2360.07 681.5 2356.84 681.5H2321.82C2318.6 681.5 2315.97 684.12 2315.97 687.35H2310.97"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_207"
                              d="M2310.97 832.52V797.79H2367.68V832.52C2367.68 838.51 2362.82 843.37 2356.83 843.37H2321.81C2315.82 843.37 2310.96 838.51 2310.96 832.52H2310.97Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_208"
                              d="M2310.97 832.52H2315.97C2315.97 835.74 2318.59 838.37 2321.82 838.37H2356.84C2360.06 838.37 2362.69 835.75 2362.69 832.52H2367.69"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_209" d="M560.64 329.6H495.32V403.99H560.64V329.6Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_210"
                              d="M435.21 538.63H382.69V334.86H435.21C437.41 334.86 439.19 333.08 439.19 330.88C439.19 328.68 437.41 326.9 435.21 326.9H374.99V546.59H435.21C437.41 546.59 439.19 544.81 439.19 542.61C439.19 540.41 437.41 538.63 435.21 538.63Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_211"
                              d="M382.69 470.81H433.75C436.75 470.81 439.19 473.25 439.19 476.25V533.18C439.19 536.18 436.75 538.62 433.75 538.62H382.69V470.8V470.81Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_212"
                              d="M382.69 334.86H433.75C436.75 334.86 439.19 337.3 439.19 340.3V397.23C439.19 400.23 436.75 402.67 433.75 402.67H382.69V334.85V334.86Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_213"
                              d="M382.69 403H433.75C436.75 403 439.19 405.44 439.19 408.44V465.37C439.19 468.37 436.75 470.81 433.75 470.81H382.69V402.99V403Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_214"
                              d="M2228.06 1300.91H2175.54V1165.28H2228.06C2230.26 1165.28 2232.04 1163.5 2232.04 1161.3C2232.04 1159.1 2230.26 1157.32 2228.06 1157.32H2167.84V1308.88H2228.06C2230.26 1308.88 2232.04 1307.1 2232.04 1304.9C2232.04 1302.7 2230.26 1300.92 2228.06 1300.92V1300.91Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_215"
                              d="M2175.54 1233.1H2226.6C2229.6 1233.1 2232.04 1235.54 2232.04 1238.54V1295.47C2232.04 1298.47 2229.6 1300.91 2226.6 1300.91H2175.54V1233.09V1233.1Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_216"
                              d="M2175.54 1165.28H2226.6C2229.6 1165.28 2232.04 1167.72 2232.04 1170.72V1227.65C2232.04 1230.65 2229.6 1233.09 2226.6 1233.09H2175.54V1165.27V1165.28Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_217"
                              d="M2632.22 543.71H2579.7V408.08H2632.22C2634.42 408.08 2636.2 406.3 2636.2 404.1C2636.2 401.9 2634.42 400.12 2632.22 400.12H2572V551.68H2632.22C2634.42 551.68 2636.2 549.9 2636.2 547.7C2636.2 545.5 2634.42 543.72 2632.22 543.72V543.71Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_218"
                              d="M2579.7 475.89H2630.76C2633.76 475.89 2636.2 478.33 2636.2 481.33V538.26C2636.2 541.26 2633.76 543.7 2630.76 543.7H2579.7V475.88V475.89Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_219"
                              d="M2579.7 408.07H2630.76C2633.76 408.07 2636.2 410.51 2636.2 413.51V470.44C2636.2 473.44 2633.76 475.88 2630.76 475.88H2579.7V408.06V408.07Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_220"
                              d="M2239.57 1155.73V1103.21H2306.99V1155.73C2306.99 1157.93 2308.77 1159.71 2310.97 1159.71C2313.17 1159.71 2314.95 1157.93 2314.95 1155.73V1103.21V1095.51H2306.99H2239.57H2231.61V1103.21V1155.73C2231.61 1157.93 2233.39 1159.71 2235.59 1159.71C2237.79 1159.71 2239.57 1157.93 2239.57 1155.73Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_221"
                              d="M2307.39 1103.21V1154.27C2307.39 1157.27 2304.95 1159.71 2301.95 1159.71H2245.02C2242.02 1159.71 2239.58 1157.27 2239.58 1154.27V1103.21H2307.4H2307.39Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_222"
                              d="M2979.71 204.99C3002.26 204.99 3020.54 186.71 3020.54 164.16C3020.54 141.61 3002.26 123.33 2979.71 123.33C2957.16 123.33 2938.88 141.61 2938.88 164.16C2938.88 186.71 2957.16 204.99 2979.71 204.99Z"
                              fill="white" stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_223"
                              d="M2979.71 306.5C3002.26 306.5 3020.54 288.22 3020.54 265.67C3020.54 243.12 3002.26 224.84 2979.71 224.84C2957.16 224.84 2938.88 243.12 2938.88 265.67C2938.88 288.22 2957.16 306.5 2979.71 306.5Z"
                              fill="white" stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_224"
                              d="M2957.22 408.2C2979.77 408.2 2998.05 389.92 2998.05 367.37C2998.05 344.82 2979.77 326.54 2957.22 326.54C2934.67 326.54 2916.39 344.82 2916.39 367.37C2916.39 389.92 2934.67 408.2 2957.22 408.2Z"
                              fill="white" stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_225"
                              d="M2341.3 813.35C2371.36 813.35 2395.72 788.985 2395.72 758.93C2395.72 728.875 2371.36 704.51 2341.3 704.51C2311.24 704.51 2286.88 728.875 2286.88 758.93C2286.88 788.985 2311.24 813.35 2341.3 813.35Z"
                              fill="white" stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_226"
                              d="M3086.39 113.735L3061.65 136.588C3055.54 142.227 3046.02 141.849 3040.38 135.745L3022.32 116.199C3016.69 110.094 3017.06 100.57 3023.17 94.9315L3047.91 72.078C3052.31 68.0135 3059.17 68.2859 3063.24 72.6859L3087 98.4102C3091.07 102.81 3090.79 109.678 3086.39 113.742L3086.39 113.735Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_227"
                              d="M3086.42 113.77L3083.03 110.1C3085.4 107.91 3085.54 104.21 3083.36 101.84L3059.59 76.1101C3057.4 73.7401 3053.7 73.6001 3051.33 75.7801L3047.94 72.1101"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_228"
                              d="M3100.25 255.516L3072.03 273.894C3065.07 278.428 3055.74 276.458 3051.2 269.494L3036.68 247.195C3032.15 240.231 3034.12 230.905 3041.08 226.371L3069.31 207.993C3074.33 204.724 3081.05 206.145 3084.32 211.164L3103.43 240.511C3106.7 245.531 3105.28 252.256 3100.26 255.524L3100.25 255.516Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_229"
                              d="M3100.19 255.42L3097.46 251.23C3100.16 249.47 3100.93 245.84 3099.17 243.14L3080.06 213.79C3078.3 211.09 3074.67 210.32 3071.97 212.08L3069.24 207.89"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_230"
                              d="M3068.44 379.269L3034.82 381.337C3026.53 381.847 3019.39 375.534 3018.88 367.239L3017.24 340.68C3016.73 332.385 3023.05 325.244 3031.34 324.734L3064.96 322.666C3070.93 322.298 3076.08 326.851 3076.45 332.83L3078.6 367.784C3078.97 373.762 3074.42 378.911 3068.44 379.279L3068.44 379.269Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_231"
                              d="M3068.45 379L3068.14 374.01C3071.36 373.81 3073.81 371.03 3073.62 367.82L3071.47 332.86C3071.27 329.64 3068.49 327.19 3065.28 327.38L3064.97 322.39"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_232"
                              d="M2860.94 319.528L2893.82 326.835C2901.93 328.638 2907.05 336.68 2905.25 344.792L2899.47 370.768C2897.67 378.88 2889.63 383.997 2881.52 382.194L2848.64 374.887C2842.79 373.588 2839.1 367.789 2840.4 361.942L2848 327.756C2849.3 321.909 2855.1 318.219 2860.95 319.518L2860.94 319.528Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_233"
                              d="M2861.02 319.31L2859.94 324.19C2856.79 323.49 2853.66 325.48 2852.97 328.63L2845.37 362.82C2844.67 365.97 2846.66 369.1 2849.81 369.79L2848.73 374.67"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_234"
                              d="M2895.78 88.0522L2925.27 104.309C2932.55 108.32 2935.2 117.476 2931.19 124.754L2918.35 148.059C2914.34 155.337 2905.18 157.986 2897.9 153.975L2868.41 137.719C2863.16 134.828 2861.25 128.225 2864.14 122.979L2881.04 92.3088C2883.93 87.0628 2890.54 85.1522 2895.78 88.0434L2895.78 88.0522Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_235"
                              d="M2895.68 88.2L2893.27 92.5799C2890.45 91.0199 2886.88 92.05 2885.33 94.88L2868.42 125.55C2866.86 128.37 2867.89 131.94 2870.72 133.49L2868.31 137.87"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_236"
                              d="M608.6 536.98V484.46H676.02V536.98C676.02 539.18 677.8 540.96 680 540.96C682.2 540.96 683.98 539.18 683.98 536.98V484.46V476.76H676.02H608.6H600.64V484.46V536.98C600.64 539.18 602.42 540.96 604.62 540.96C606.82 540.96 608.6 539.18 608.6 536.98Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_237"
                              d="M676.42 484.47V535.53C676.42 538.53 673.98 540.97 670.98 540.97H614.05C611.05 540.97 608.61 538.53 608.61 535.53V484.47H676.43H676.42Z"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_238" d="M747.21 479.18H685.43V540.96H747.21V479.18Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_239" d="M437.98 612.31V550.53H376.2V612.31H437.98Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_240" d="M2636.2 558.42H2577.94V616.68H2636.2V558.42Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_241" d="M3146.93 489.48H2998.04V518.61H3146.93V489.48Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_242" d="M2636.2 332.97H2577.94V391.23H2636.2V332.97Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_243" d="M2693.55 62.8201H2664.42V91.9501H2693.55V62.8201Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_244" d="M3238.77 191.7V108.8H3177.64V191.7H3238.77Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_245" d="M3177.64 191.7V108.8H3172.79V191.7H3177.64Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_246" d="M3238.76 277.64V194.74H3177.63V277.64H3238.76Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_247" d="M3177.65 277.63V194.73H3172.8V277.63H3177.65Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_248" d="M3238.77 363.94V281.04H3177.64V363.94H3238.77Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_249" d="M3177.64 363.94V281.04H3172.79V363.94H3177.64Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_250" d="M3238.77 450.88V367.98H3177.64V450.88H3238.77Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_251" d="M3177.64 450.88V367.98H3172.79V450.88H3177.64Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                    </g>
                    <g id="Desks">
                        <path id="Vector_252"
                              d="M470.75 1269.15H653.57C657.718 1269.15 661.08 1265.79 661.08 1261.64V1177.6C661.08 1173.45 657.718 1170.09 653.57 1170.09H470.75C466.602 1170.09 463.24 1173.45 463.24 1177.6V1261.64C463.24 1265.79 466.602 1269.15 470.75 1269.15Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_253"
                              d="M760.14 1261.5V1078.68C760.14 1074.53 756.778 1071.17 752.63 1071.17H668.59C664.442 1071.17 661.08 1074.53 661.08 1078.68V1261.5C661.08 1265.65 664.442 1269.01 668.59 1269.01H752.63C756.778 1269.01 760.14 1265.65 760.14 1261.5Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_254"
                              d="M470.75 1170.09H653.57C657.718 1170.09 661.08 1166.73 661.08 1162.58V1078.54C661.08 1074.39 657.718 1071.03 653.57 1071.03H470.75C466.602 1071.03 463.24 1074.39 463.24 1078.54V1162.58C463.24 1166.73 466.602 1170.09 470.75 1170.09Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_255"
                              d="M1033.03 957.53V774.71C1033.03 770.562 1029.67 767.2 1025.52 767.2H941.48C937.333 767.2 933.97 770.562 933.97 774.71V957.53C933.97 961.678 937.333 965.04 941.48 965.04H1025.52C1029.67 965.04 1033.03 961.678 1033.03 957.53Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_256"
                              d="M1025.38 668.13H842.56C838.413 668.13 835.05 671.492 835.05 675.64V759.68C835.05 763.828 838.413 767.19 842.56 767.19H1025.38C1029.53 767.19 1032.89 763.828 1032.89 759.68V675.64C1032.89 671.492 1029.53 668.13 1025.38 668.13Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_257"
                              d="M926.32 157.48H743.5C739.353 157.48 735.99 160.842 735.99 164.99V249.03C735.99 253.178 739.353 256.54 743.5 256.54H926.32C930.468 256.54 933.83 253.178 933.83 249.03V164.99C933.83 160.842 930.468 157.48 926.32 157.48Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_258"
                              d="M1453.12 957.52V774.7C1453.12 770.552 1449.76 767.19 1445.61 767.19H1361.57C1357.42 767.19 1354.06 770.552 1354.06 774.7V957.52C1354.06 961.668 1357.42 965.03 1361.57 965.03H1445.61C1449.76 965.03 1453.12 961.668 1453.12 957.52Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_259"
                              d="M1566.99 187.84H1184.17C1180.02 187.84 1176.66 191.202 1176.66 195.35V319.39C1176.66 323.538 1180.02 326.9 1184.17 326.9H1566.99C1571.14 326.9 1574.5 323.538 1574.5 319.39V195.35C1574.5 191.202 1571.14 187.84 1566.99 187.84Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_260"
                              d="M1354.06 957.52V774.7C1354.06 770.552 1350.7 767.19 1346.55 767.19H1262.51C1258.36 767.19 1255 770.552 1255 774.7V957.52C1255 961.668 1258.36 965.03 1262.51 965.03H1346.55C1350.7 965.03 1354.06 961.668 1354.06 957.52Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_261"
                              d="M1192.81 1360.56V1177.74C1192.81 1173.59 1189.45 1170.23 1185.3 1170.23H1101.26C1097.11 1170.23 1093.75 1173.59 1093.75 1177.74V1360.56C1093.75 1364.71 1097.11 1368.07 1101.26 1368.07H1185.3C1189.45 1368.07 1192.81 1364.71 1192.81 1360.56Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_262"
                              d="M1643.45 1186.59H1460.63C1456.48 1186.59 1453.12 1189.95 1453.12 1194.1V1278.14C1453.12 1282.29 1456.48 1285.65 1460.63 1285.65H1643.45C1647.6 1285.65 1650.96 1282.29 1650.96 1278.14V1194.1C1650.96 1189.95 1647.6 1186.59 1643.45 1186.59Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_263"
                              d="M3238.34 1276.45H3055.52C3051.37 1276.45 3048.01 1279.81 3048.01 1283.96V1368C3048.01 1372.15 3051.37 1375.51 3055.52 1375.51H3238.34C3242.49 1375.51 3245.85 1372.15 3245.85 1368V1283.96C3245.85 1279.81 3242.49 1276.45 3238.34 1276.45Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_264"
                              d="M3238.34 1109.71H3055.52C3051.37 1109.71 3048.01 1113.07 3048.01 1117.22V1201.26C3048.01 1205.41 3051.37 1208.77 3055.52 1208.77H3238.34C3242.49 1208.77 3245.85 1205.41 3245.85 1201.26V1117.22C3245.85 1113.07 3242.49 1109.71 3238.34 1109.71Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_265"
                              d="M2808.45 750.17V932.99C2808.45 937.138 2811.81 940.5 2815.96 940.5H2900C2904.15 940.5 2907.51 937.138 2907.51 932.99V750.17C2907.51 746.022 2904.15 742.66 2900 742.66H2815.96C2811.81 742.66 2808.45 746.022 2808.45 750.17Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_266"
                              d="M2907.52 697.79V880.61C2907.52 884.758 2910.88 888.12 2915.03 888.12H2999.07C3003.22 888.12 3006.58 884.758 3006.58 880.61V697.79C3006.58 693.642 3003.22 690.28 2999.07 690.28H2915.03C2910.88 690.28 2907.52 693.642 2907.52 697.79Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_267"
                              d="M2980.51 630.94H3163.33C3167.48 630.94 3170.84 627.578 3170.84 623.43V539.39C3170.84 535.242 3167.48 531.88 3163.33 531.88H2980.51C2976.36 531.88 2973 535.242 2973 539.39V623.43C2973 627.578 2976.36 630.94 2980.51 630.94Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_268"
                              d="M3245.99 1091.88V909.06C3245.99 904.912 3242.63 901.55 3238.48 901.55H3154.44C3150.29 901.55 3146.93 904.912 3146.93 909.06V1091.88C3146.93 1096.03 3150.29 1099.39 3154.44 1099.39H3238.48C3242.63 1099.39 3245.99 1096.03 3245.99 1091.88Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_269"
                              d="M1093.75 1360.57V1177.75C1093.75 1173.6 1090.39 1170.24 1086.24 1170.24H1002.2C998.052 1170.24 994.69 1173.6 994.69 1177.75V1360.57C994.69 1364.72 998.052 1368.08 1002.2 1368.08H1086.24C1090.39 1368.08 1093.75 1364.72 1093.75 1360.57Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_270"
                              d="M586.3 653.3H436.66V726.79H557.04C573.2 726.79 586.3 739.89 586.3 756.05V877.85H659.79V726.78C659.79 686.19 626.89 653.29 586.3 653.29V653.3Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                        <path id="Vector_271"
                              d="M2103.55 1018.97H1988.63C1986.02 1018.97 1983.91 1021.08 1983.91 1023.69V1076.52C1983.91 1079.13 1986.02 1081.24 1988.63 1081.24H2103.55C2106.16 1081.24 2108.27 1079.13 2108.27 1076.52V1023.69C2108.27 1021.08 2106.16 1018.97 2103.55 1018.97Z"
                              fill="#DADADA" stroke="#333333" stroke-width="1.92" stroke-miterlimit="10"/>
                    </g>
                    <g id="Columns">
                        <path id="Vector_272"
                              d="M2966.8 886.09H2911.74C2911.14 886.09 2910.66 886.573 2910.66 887.17V942.23C2910.66 942.826 2911.14 943.31 2911.74 943.31H2966.8C2967.4 943.31 2967.88 942.826 2967.88 942.23V887.17C2967.88 886.573 2967.4 886.09 2966.8 886.09Z"
                              fill="#333333"/>
                        <path id="Vector_273"
                              d="M1379.46 965.49H1324.4C1323.8 965.49 1323.32 965.973 1323.32 966.57V1021.63C1323.32 1022.23 1323.8 1022.71 1324.4 1022.71H1379.46C1380.06 1022.71 1380.54 1022.23 1380.54 1021.63V966.57C1380.54 965.973 1380.06 965.49 1379.46 965.49Z"
                              fill="#333333"/>
                    </g>
                    <g id="Cabinets">
                        <path id="Vector_274" d="M1152.94 1126.75H1045.67V1163.49H1152.94V1126.75Z" stroke="#333333"
                              stroke-miterlimit="10"/>
                        <path id="Vector_275" d="M1323.35 965.45H1216.08V1002.19H1323.35V965.45Z" stroke="#333333"
                              stroke-miterlimit="10"/>
                        <path id="Vector_276" d="M704.79 888.55H455.87V925.29H704.79V888.55Z" stroke="#333333"
                              stroke-width="1.52" stroke-miterlimit="10"/>
                        <path id="Vector_277" d="M407.09 738.05H376.2V845.07H407.09V738.05Z" stroke="#333333"
                              stroke-width="1.52" stroke-miterlimit="10"/>
                        <path id="Vector_278" d="M1484.56 481.18H1196.39V517.92H1484.56V481.18Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_279" d="M1484.56 517.92H1196.39V523.06H1484.56V517.92Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_280" d="M2573.84 977.17V1044.39H2610.58V977.17H2573.84Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_281" d="M2610.58 977.17V1044.39H2615.72V977.17H2610.58Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_282" d="M2573.84 1044.4V1150.64H2620.07V1044.4H2573.84Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_283" d="M2620.07 1087.64V1107.37H2625.03V1087.64H2620.07Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_284" d="M2573.84 1150.64V1256.88H2620.07V1150.64H2573.84Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_285" d="M2620.07 1193.89V1213.62H2625.03V1193.89H2620.07Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_286"
                              d="M2966.8 886.09H2911.74C2911.14 886.09 2910.66 886.573 2910.66 887.17V942.23C2910.66 942.826 2911.14 943.31 2911.74 943.31H2966.8C2967.4 943.31 2967.88 942.826 2967.88 942.23V887.17C2967.88 886.573 2967.4 886.09 2966.8 886.09Z"
                              fill="#333333"/>
                        <path id="Vector_287" d="M2804.41 736.78H2910.65V690.55H2804.41V736.78Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_288" d="M2847.67 690.54H2867.4V685.58H2847.67V690.54Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_289" d="M2816.37 1378.15H2922.61V1331.92H2816.37V1378.15Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_290" d="M2859.62 1331.92H2879.35V1326.96H2859.62V1331.92Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_291" d="M2922.61 1378.15H3028.85V1331.92H2922.61V1378.15Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_292" d="M2965.87 1331.92H2985.6V1326.96H2965.87V1331.92Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_293" d="M3245.59 901.78V855.55H3176.36V901.78H3245.59Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_294" d="M3176.35 890.06V870.33H3171.39V890.06H3176.35Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_295" d="M439.19 1481.93H796.68V1436.53H439.19V1481.93Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_296" d="M439.19 1436.54H796.68V1431.4H439.19V1436.54Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_297" d="M1628.26 1377.09H1712V1340.35H1628.26V1377.09Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_298" d="M1628.26 1340.35H1712V1335.21H1628.26V1340.35Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_299" d="M1728.84 1287.66V1144.72H1701.46V1287.66H1728.84Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_300" d="M1728.84 745.34V669.14H1692.1V745.34H1728.84Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_301" d="M1692.1 745.34V669.14H1686.96V745.34H1692.1Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_302" d="M1728.84 667V590.8H1692.1V667H1728.84Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_303" d="M1692.1 667V590.8H1686.96V667H1692.1Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_304" d="M1028.34 61.1799H944.6V97.9199H1028.34V61.1799Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_305" d="M1028.34 97.9199H944.6V103.06H1028.34V97.9199Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_306" d="M731.45 61.1799H664.72V90.4599H731.45V61.1799Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_307" d="M731.45 90.46H664.72V94.55H731.45V90.46Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_308" d="M614.53 181.78V290.1H643.81V181.78H614.53Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_309" d="M1007.35 157.46V223.59H1031.21V157.46H1007.35Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_310" d="M2184.58 660.56H2116.16V725.3H2184.58V660.56Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_311" d="M2215.91 898.98H2112.91V922.99H2215.91V898.98Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_312" d="M2184.58 725.31H2116.16V730.45H2184.58V725.31Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_313" d="M2083.78 649.09H1741.83V722.08H2083.78V649.09Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_314" d="M1972.52 928.67H1932.58V1090H1972.52V928.67Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_315" d="M2162.34 928.67H2122.4V1090H2162.34V928.67Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_316" d="M1009.13 975.73H911.35V1009.22H1009.13V975.73Z" stroke="#333333"
                              stroke-miterlimit="10"/>
                        <path id="Vector_317" d="M448.86 1356.14V1428.53H482.35V1356.14H448.86Z" stroke="#333333"
                              stroke-miterlimit="10"/>
                        <path id="Vector_318" d="M448.87 1280.87V1353.26H482.36V1280.87H448.87Z" stroke="#333333"
                              stroke-miterlimit="10"/>
                        <path id="Vector_319" d="M1921.32 1316.38H1740V1387.09H1921.32V1316.38Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_320" d="M2567.79 1223.84H2496.27V1387.33H2567.79V1223.84Z" stroke="#333333"
                              stroke-miterlimit="10"/>
                        <path id="Vector_321" d="M1565.87 481.73H1489.67V518.47H1565.87V481.73Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                    </g>
                    <g id="Sinks">
                        <path id="Vector_322"
                              d="M1754.64 1360.79H1811.27V1370.25C1811.27 1372.53 1809.42 1374.38 1807.14 1374.38H1758.77C1756.49 1374.38 1754.64 1372.53 1754.64 1370.25V1360.79Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_323"
                              d="M1763.41 1323.42H1802.51C1807.35 1323.42 1811.28 1327.35 1811.28 1332.19V1360.79H1754.65V1332.19C1754.65 1327.35 1758.58 1323.42 1763.42 1323.42H1763.41Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_324" d="M1786.32 1346.22H1779.58V1367.66H1786.32V1346.22Z" fill="white"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_325"
                              d="M1840.48 1360.79H1897.11V1370.25C1897.11 1372.53 1895.26 1374.38 1892.98 1374.38H1844.61C1842.33 1374.38 1840.48 1372.53 1840.48 1370.25V1360.79Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_326"
                              d="M1849.24 1323.42H1888.34C1893.18 1323.42 1897.11 1327.35 1897.11 1332.19V1360.79H1840.48V1332.19C1840.48 1327.35 1844.41 1323.42 1849.25 1323.42H1849.24Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_327" d="M1872.16 1346.22H1865.42V1367.66H1872.16V1346.22Z" fill="white"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_328"
                              d="M1993.09 677.36H1936.46V667.9C1936.46 665.62 1938.31 663.77 1940.59 663.77H1988.96C1991.24 663.77 1993.09 665.62 1993.09 667.9V677.36Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_329"
                              d="M1984.32 714.73H1945.22C1940.38 714.73 1936.45 710.8 1936.45 705.96V677.36H1993.08V705.96C1993.08 710.8 1989.15 714.73 1984.31 714.73H1984.32Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_330" d="M1961.4 691.93H1968.14V670.49H1961.4V691.93Z" fill="white"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_331"
                              d="M2542.34 1289.72V1233.09H2551.8C2554.08 1233.09 2555.93 1234.94 2555.93 1237.22V1285.59C2555.93 1287.87 2554.08 1289.72 2551.8 1289.72H2542.34Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_332"
                              d="M2504.97 1280.96V1241.86C2504.97 1237.02 2508.9 1233.09 2513.74 1233.09H2542.34V1289.72H2513.74C2508.9 1289.72 2504.97 1285.79 2504.97 1280.95V1280.96Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_333" d="M2527.76 1258.05V1264.79H2549.2V1258.05H2527.76Z" fill="white"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_334"
                              d="M2542.34 1357.75V1301.12H2551.8C2554.08 1301.12 2555.93 1302.97 2555.93 1305.25V1353.62C2555.93 1355.9 2554.08 1357.75 2551.8 1357.75H2542.34Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_335"
                              d="M2504.96 1348.99V1309.89C2504.96 1305.05 2508.89 1301.12 2513.73 1301.12H2542.33V1357.75H2513.73C2508.89 1357.75 2504.96 1353.82 2504.96 1348.98V1348.99Z"
                              stroke="#333333" stroke-miterlimit="10"/>
                        <path id="Vector_336" d="M2527.77 1326.07V1332.81H2549.21V1326.07H2527.77Z" fill="white"
                              stroke="#333333" stroke-miterlimit="10"/>
                    </g>
                    <g id="Doors">
                        <path id="Vector_337" d="M913.9 1414.67H828.31V1431.39H913.9V1414.67Z" fill="white"/>
                        <path id="Vector_338" d="M823.2 1431.4H828.3V1414.68H823.2V1431.4Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_339" d="M913.91 1431.4H919.01V1414.68H913.91V1431.4Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_340" d="M908.8 1513.39H913.9V1431.39H908.8V1513.39Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_341">
                            <path d="M828.31 1431.4C828.31 1476.19 864.21 1512.57 908.8 1513.4L828.31 1431.4Z"
                                  fill="white"/>
                            <path d="M828.31 1431.4C828.31 1476.19 864.21 1512.57 908.8 1513.4" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_342" d="M1062.25 476.77H1147.84V460.05H1062.25V476.77Z" fill="white"/>
                        <path id="Vector_343" d="M1152.94 460.04H1147.84V476.76H1152.94V460.04Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_344" d="M1062.25 460.04H1057.15V476.76H1062.25V460.04Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_345" d="M1067.35 378.04H1062.25V460.04H1067.35V378.04Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_346">
                            <path d="M1147.84 460.04C1147.84 415.25 1111.94 378.87 1067.35 378.04L1147.84 460.04Z"
                                  fill="white"/>
                            <path d="M1147.84 460.04C1147.84 415.25 1111.94 378.87 1067.35 378.04" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_347" d="M1733.47 755.55V841.14H1750.19V755.55H1733.47Z" fill="white"/>
                        <path id="Vector_348" d="M1750.19 846.24V841.14H1733.47V846.24H1750.19Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_349" d="M1750.19 755.54V750.44H1733.47V755.54H1750.19Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_350" d="M1832.19 760.64V755.54H1750.19V760.64H1832.19Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_351">
                            <path d="M1750.19 841.14C1794.98 841.14 1831.36 805.24 1832.19 760.65L1750.19 841.14Z"
                                  fill="white"/>
                            <path d="M1750.19 841.14C1794.98 841.14 1831.36 805.24 1832.19 760.65" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_352" d="M1899.36 922.99H1813.77V939.71H1899.36V922.99Z" fill="white"/>
                        <path id="Vector_353" d="M1808.67 939.71H1813.77V922.99H1808.67V939.71Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_354" d="M1899.36 939.71H1904.46V922.99H1899.36V939.71Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_355" d="M1894.26 1021.71H1899.36V939.71H1894.26V1021.71Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_356">
                            <path d="M1813.77 939.71C1813.77 984.5 1849.67 1020.88 1894.26 1021.71L1813.77 939.71Z"
                                  fill="white"/>
                            <path d="M1813.77 939.71C1813.77 984.5 1849.67 1020.88 1894.26 1021.71" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_357" d="M1998.19 935.45H2083.78V918.73H1998.19V935.45Z" fill="white"/>
                        <path id="Vector_358" d="M2088.88 918.73H2083.78V935.45H2088.88V918.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_359" d="M1998.19 918.73H1993.09V935.45H1998.19V918.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_360" d="M2003.29 836.73H1998.19V918.73H2003.29V836.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_361">
                            <path d="M2083.78 918.73C2083.78 873.94 2047.88 837.56 2003.29 836.73L2083.78 918.73Z"
                                  fill="white"/>
                            <path d="M2083.78 918.73C2083.78 873.94 2047.88 837.56 2003.29 836.73" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_362" d="M1025.78 460.04H940.19V476.76H1025.78V460.04Z" fill="white"/>
                        <path id="Vector_363" d="M935.08 476.77H940.18V460.05H935.08V476.77Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_364" d="M1025.79 476.77H1030.89V460.05H1025.79V476.77Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_365" d="M1020.68 460.05H1025.78V378.05H1020.68V460.05Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_366">
                            <path d="M940.19 460.04C940.19 415.25 976.09 378.87 1020.68 378.04L940.19 460.04Z"
                                  fill="white"/>
                            <path d="M940.19 460.04C940.19 415.25 976.09 378.87 1020.68 378.04" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_367" d="M522.35 272.52H436.76V289.24H522.35V272.52Z" fill="white"/>
                        <path id="Vector_368" d="M431.66 289.25H436.76V272.53H431.66V289.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_369" d="M522.36 289.25H527.46V272.53H522.36V289.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_370" d="M517.26 272.52H522.36V190.52H517.26V272.52Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_371">
                            <path d="M436.76 272.52C436.76 227.73 472.66 191.35 517.25 190.52L436.76 272.52Z"
                                  fill="white"/>
                            <path d="M436.76 272.52C436.76 227.73 472.66 191.35 517.25 190.52" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_372" d="M375.72 206.83V121.24H359V206.83H375.72Z" fill="white"/>
                        <path id="Vector_373" d="M359 116.13V121.23H375.72V116.13H359Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_374" d="M359 206.83V211.93H375.72V206.83H359Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_375" d="M375.73 201.73V206.83H457.73V201.73H375.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_376">
                            <path d="M375.73 121.23C420.52 121.23 456.9 157.13 457.73 201.72L375.73 121.23Z"
                                  fill="white"/>
                            <path d="M375.73 121.23C420.52 121.23 456.9 157.13 457.73 201.72" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_377" d="M2040.98 1395.45H2126.57V1378.73H2040.98V1395.45Z" fill="white"/>
                        <path id="Vector_378" d="M2131.68 1378.73H2126.58V1395.45H2131.68V1378.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_379" d="M2040.98 1378.73H2035.88V1395.45H2040.98V1378.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_380" d="M2046.09 1395.45H2040.99V1477.45H2046.09V1395.45Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_381">
                            <path d="M2126.58 1395.45C2126.58 1440.24 2090.68 1476.62 2046.09 1477.45L2126.58 1395.45Z"
                                  fill="white"/>
                            <path d="M2126.58 1395.45C2126.58 1440.24 2090.68 1476.62 2046.09 1477.45" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_382" d="M2189.25 1395.45H2274.84V1378.73H2189.25V1395.45Z" fill="white"/>
                        <path id="Vector_383" d="M2279.94 1378.73H2274.84V1395.45H2279.94V1378.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_384" d="M2189.24 1378.73H2184.14V1395.45H2189.24V1378.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_385" d="M2194.34 1395.45H2189.24V1477.45H2194.34V1395.45Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_386">
                            <path d="M2274.84 1395.45C2274.84 1440.24 2238.94 1476.62 2194.35 1477.45L2274.84 1395.45Z"
                                  fill="white"/>
                            <path d="M2274.84 1395.45C2274.84 1440.24 2238.94 1476.62 2194.35 1477.45" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_387" d="M2597.31 1395.45H2682.9V1378.73H2597.31V1395.45Z" fill="white"/>
                        <path id="Vector_388" d="M2688 1378.73H2682.9V1395.45H2688V1378.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_389" d="M2597.31 1378.73H2592.21V1395.45H2597.31V1378.73Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_390" d="M2602.41 1395.45H2597.31V1477.45H2602.41V1395.45Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_391">
                            <path d="M2682.9 1395.45C2682.9 1440.24 2647 1476.62 2602.41 1477.45L2682.9 1395.45Z"
                                  fill="white"/>
                            <path d="M2682.9 1395.45C2682.9 1440.24 2647 1476.62 2602.41 1477.45" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_392" d="M2399.98 939.71H2485.57V922.99H2399.98V939.71Z" fill="white"/>
                        <path id="Vector_393" d="M2490.67 922.99H2485.57V939.71H2490.67V922.99Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_394" d="M2399.97 922.99H2394.87V939.71H2399.97V922.99Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_395" d="M2405.07 939.71H2399.97V1021.71H2405.07V939.71Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_396">
                            <path d="M2485.57 939.71C2485.57 984.5 2449.67 1020.88 2405.08 1021.71L2485.57 939.71Z"
                                  fill="white"/>
                            <path d="M2485.57 939.71C2485.57 984.5 2449.67 1020.88 2405.08 1021.71" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_397" d="M2577.94 836.03V750.44H2561.22V836.03H2577.94Z" fill="white"/>
                        <path id="Vector_398" d="M2561.22 745.34V750.44H2577.94V745.34H2561.22Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_399" d="M2561.22 836.04V841.14H2577.94V836.04H2561.22Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_400" d="M2577.95 830.94V836.04H2659.95V830.94H2577.95Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_401">
                            <path d="M2577.94 750.44C2622.73 750.44 2659.11 786.34 2659.94 830.93L2577.94 750.44Z"
                                  fill="white"/>
                            <path d="M2577.94 750.44C2622.73 750.44 2659.11 786.34 2659.94 830.93" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_402" d="M2821.15 289.21V203.62H2804.43V289.21H2821.15Z" fill="white"/>
                        <path id="Vector_403" d="M2804.42 198.52V203.62H2821.14V198.52H2804.42Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_404" d="M2804.41 289.21V294.31H2821.13V289.21H2804.41Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_405" d="M2821.14 284.11V289.21H2903.14V284.11H2821.14Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_406">
                            <path d="M2821.14 203.62C2865.93 203.62 2902.31 239.52 2903.14 284.11L2821.14 203.62Z"
                                  fill="white"/>
                            <path d="M2821.14 203.62C2865.93 203.62 2902.31 239.52 2903.14 284.11" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_407" d="M2860.34 526.97H2945.93V510.25H2860.34V526.97Z" fill="white"/>
                        <path id="Vector_408" d="M2951.03 510.24H2945.93V526.96H2951.03V510.24Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_409" d="M2860.34 510.24H2855.24V526.96H2860.34V510.24Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_410" d="M2865.44 428.25H2860.34V510.25H2865.44V428.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_411">
                            <path d="M2945.93 510.24C2945.93 465.45 2910.03 429.07 2865.44 428.24L2945.93 510.24Z"
                                  fill="white"/>
                            <path d="M2945.93 510.24C2945.93 465.45 2910.03 429.07 2865.44 428.24" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_412" d="M1752.8 574.68V489.09H1736.08V574.68H1752.8Z" fill="white"/>
                        <path id="Vector_413" d="M1736.06 483.99V489.09H1752.78V483.99H1736.06Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_414" d="M1736.07 574.68V579.78H1752.79V574.68H1736.07Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_415" d="M1752.79 569.58V574.68H1834.79V569.58H1752.79Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_416">
                            <path d="M1752.79 489.09C1797.58 489.09 1833.96 524.99 1834.79 569.58L1752.79 489.09Z"
                                  fill="white"/>
                            <path d="M1752.79 489.09C1797.58 489.09 1833.96 524.99 1834.79 569.58" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                        <path id="Vector_417" d="M1890.53 152.29V66.7H1873.81V152.29H1890.53Z" fill="white"/>
                        <path id="Vector_418" d="M1873.8 61.5999V66.7H1890.52V61.5999H1873.8Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_419" d="M1873.8 152.3V157.4H1890.52V152.3H1873.8Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_420" d="M1890.52 147.2V152.3H1972.52V147.2H1890.52Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <g id="Vector_421">
                            <path d="M1890.53 66.7C1935.32 66.7 1971.7 102.6 1972.53 147.19L1890.53 66.7Z"
                                  fill="white"/>
                            <path d="M1890.53 66.7C1935.32 66.7 1971.7 102.6 1972.53 147.19" stroke="#333333"
                                  stroke-width="1.64" stroke-miterlimit="10"/>
                        </g>
                    </g>
                    <g id="Glazed Walls">
                        <path id="Vector_422" d="M1350.15 1172.39H1338.49V1184.05H1350.15V1172.39Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_423" d="M1469.45 1060.33H1457.79V1071.99H1469.45V1060.33Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_424" d="M1350.15 1060.33H1338.49V1071.99H1350.15V1060.33Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_425" d="M1578.45 1060.33H1566.79V1071.99H1578.45V1060.33Z" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_426" d="M1344.32 1071.98V1172.39" stroke="#333333" stroke-width="4"
                              stroke-miterlimit="10"/>
                        <path id="Vector_427" d="M1344.32 1184.04V1287.66" stroke="#333333" stroke-width="4"
                              stroke-miterlimit="10"/>
                        <path id="Vector_428" d="M1350.15 1066.16H1457.79" stroke="#333333" stroke-width="4"
                              stroke-miterlimit="10"/>
                        <path id="Vector_429" d="M1469.44 1066.16H1566.79" stroke="#333333" stroke-width="4"
                              stroke-miterlimit="10"/>
                    </g>
                    <g id="Windows">
                        <path id="Vector_430" d="M913.68 462.45H719.66V479.17H913.68V462.45Z" fill="white"/>
                        <path id="Vector_431" d="M714.56 479.18H719.66V462.46H714.56V479.18Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_432" d="M913.68 479.18H918.78V462.46H913.68V479.18Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_433" d="M719.66 465.5H912.78" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_434" d="M719.66 470.01H912.78" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_435" d="M896.16 41H772.14V57.72H896.16V41Z" fill="white"/>
                        <path id="Vector_436" d="M767.04 57.72H772.14V41H767.04V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_437" d="M896.17 57.72H901.27V41H896.17V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_438" d="M772.14 44.05H895.26" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_439" d="M772.14 48.55H895.26" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_440" d="M1571.78 462.45H1177.76V479.17H1571.78V462.45Z" fill="white"/>
                        <path id="Vector_441" d="M1172.66 479.18H1177.76V462.46H1172.66V479.18Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_442" d="M1571.79 479.18H1576.89V462.46H1571.79V479.18Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_443" d="M1177.76 465.5H1570.88" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_444" d="M1177.76 470.01H1570.88" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_445" d="M1750.19 345.15V241.13H1733.47V345.15H1750.19Z" fill="white"/>
                        <path id="Vector_446" d="M1733.47 236.03V241.13H1750.19V236.03H1733.47Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_447" d="M1733.47 345.16V350.26H1750.19V345.16H1733.47Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_448" d="M1747.14 241.13V344.25" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_449" d="M1742.64 241.13V344.25" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_450" d="M1256.32 1378.97H1162.3V1395.69H1256.32V1378.97Z" fill="white"/>
                        <path id="Vector_451" d="M1261.42 1378.97H1256.32V1395.69H1261.42V1378.97Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_452" d="M1162.29 1378.97H1157.19V1395.69H1162.29V1378.97Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_453" d="M1256.32 1392.64H1163.2" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_454" d="M1256.32 1388.14H1163.2" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_455" d="M1498.16 1378.97H1404.14V1395.69H1498.16V1378.97Z" fill="white"/>
                        <path id="Vector_456" d="M1503.26 1378.97H1498.16V1395.69H1503.26V1378.97Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_457" d="M1404.13 1378.97H1399.03V1395.69H1404.13V1378.97Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_458" d="M1498.16 1392.64H1405.04" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_459" d="M1498.16 1388.14H1405.04" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_460" d="M447.34 1117.98H430.62V1212H447.34V1117.98Z" fill="white"/>
                        <path id="Vector_461" d="M447.35 1217.1V1212H430.63V1217.1H447.35Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_462" d="M447.35 1117.98V1112.88H430.63V1117.98H447.35Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_463" d="M433.68 1212V1118.88" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_464" d="M438.18 1212V1118.88" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_465" d="M2577.95 883.86V851.84H2561.23V883.86H2577.95Z" fill="white"/>
                        <path id="Vector_466" d="M2561.22 846.74V851.84H2577.94V846.74H2561.22Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_467" d="M2561.22 883.87V888.97H2577.94V883.87H2561.22Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_468" d="M2574.89 851.84V882.96" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_469" d="M2570.39 851.84V882.96" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_470" d="M2577.95 736.36V704.34H2561.23V736.36H2577.95Z" fill="white"/>
                        <path id="Vector_471" d="M2561.22 699.24V704.34H2577.94V699.24H2561.22Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_472" d="M2561.22 736.36V741.46H2577.94V736.36H2561.22Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_473" d="M2574.89 704.34V735.46" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_474" d="M2570.39 704.34V735.46" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_475" d="M2754.14 41H2682.12V57.72H2754.14V41Z" fill="white"/>
                        <path id="Vector_476" d="M2677.02 57.72H2682.12V41H2677.02V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_477" d="M2754.14 57.72H2759.24V41H2754.14V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_478" d="M2682.12 44.05H2753.23" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_479" d="M2682.12 48.55H2753.23" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_480" d="M1261.3 41H1189.28V57.72H1261.3V41Z" fill="white"/>
                        <path id="Vector_481" d="M1184.18 57.72H1189.28V41H1184.18V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_482" d="M1261.3 57.72H1266.4V41H1261.3V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_483" d="M1189.28 44.05H1260.39" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_484" d="M1189.28 48.55H1260.39" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_485" d="M521.66 41H449.64V57.72H521.66V41Z" fill="white"/>
                        <path id="Vector_486" d="M444.54 57.72H449.64V41H444.54V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_487" d="M521.66 57.72H526.76V41H521.66V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_488" d="M449.64 44.05H520.76" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_489" d="M449.64 48.55H520.76" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_490" d="M421.67 272.52H389.65V289.24H421.67V272.52Z" fill="white"/>
                        <path id="Vector_491" d="M384.56 289.25H389.66V272.53H384.56V289.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_492" d="M421.67 289.25H426.77V272.53H421.67V289.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_493" d="M389.65 275.57H420.77" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_494" d="M389.65 280.08H420.77" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_495" d="M569.77 272.52H537.75V289.24H569.77V272.52Z" fill="white"/>
                        <path id="Vector_496" d="M532.66 289.25H537.76V272.53H532.66V289.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_497" d="M569.77 289.25H574.87V272.53H569.77V289.25Z" fill="white"
                              stroke="#333333" stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_498" d="M537.75 275.57H568.87" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_499" d="M537.75 280.08H568.87" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_500" d="M1551.3 41H1479.28V57.72H1551.3V41Z" fill="white"/>
                        <path id="Vector_501" d="M1474.18 57.72H1479.28V41H1474.18V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_502" d="M1551.3 57.72H1556.4V41H1551.3V57.72Z" fill="white" stroke="#333333"
                              stroke-width="1.64" stroke-miterlimit="10"/>
                        <path id="Vector_503" d="M1479.28 44.05H1550.39" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                        <path id="Vector_504" d="M1479.28 48.55H1550.39" stroke="#333333" stroke-width="1.64"
                              stroke-miterlimit="10"/>
                    </g>
                    {users.map((user) => (
                        <g
                            key={user.id}
                            onMouseDown={(e) => onMouseDown(e, user.id)}
                            style={{cursor: 'grab'}}
                        >
                            <image
                                href={`/avatars/avatar-0${user.user.avatar.replace("avatar", "")}.svg`}
                                x={user.x}
                                y={user.y}
                                width="100"
                                height="100"
                            />
                        </g>
                    ))}
                </g>
            </svg>
)
    ;
};

export default Map;
