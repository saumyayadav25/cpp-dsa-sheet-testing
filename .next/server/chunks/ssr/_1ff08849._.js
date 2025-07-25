module.exports = {

"[project]/components/AuthButtons.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AuthButtons)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
function AuthButtons() {
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuItems = [
        {
            label: "Home",
            href: "/",
            icon: ""
        },
        {
            label: "Star on GitHub",
            href: "https://github.com/saumyayadav25/DSA-Supreme-3.0",
            icon: "⭐"
        },
        {
            label: "Give Testimonial",
            href: "https://forms.gle/8BXQC1o3hsVsEEBp9",
            icon: "✨"
        },
        {
            label: "Provide Feedback",
            href: "https://forms.gle/bdwBp8oFRWugcrcg9",
            icon: "💭"
        },
        {
            label: "Support the project",
            href: "https://www.buymeacoffee.com/saumyayadav",
            icon: "🔥"
        }
    ];
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const hamburgerVariants = {
        closed: {
            rotate: 0,
            scale: 1
        },
        open: {
            rotate: 180,
            scale: 1.1
        }
    };
    const dropdownVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: -10,
            rotateX: 15,
            transition: {
                duration: 0.2,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -20,
            rotateY: -15
        },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 400
            }
        },
        exit: {
            opacity: 0,
            x: 20,
            rotateY: 15,
            transition: {
                duration: 0.15
            }
        }
    };
    const HamburgerIcon = ({ isOpen })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-6 h-6 flex flex-col justify-center items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                    animate: {
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 0 : -4
                    },
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                    },
                    className: "block w-5 h-0.5 bg-white origin-center absolute"
                }, void 0, false, {
                    fileName: "[project]/components/AuthButtons.tsx",
                    lineNumber: 101,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                    animate: {
                        opacity: isOpen ? 0 : 1,
                        x: isOpen ? -10 : 0
                    },
                    transition: {
                        duration: 0.2,
                        ease: "easeInOut"
                    },
                    className: "block w-5 h-0.5 bg-white origin-center absolute"
                }, void 0, false, {
                    fileName: "[project]/components/AuthButtons.tsx",
                    lineNumber: 109,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                    animate: {
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? 0 : 4
                    },
                    transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                    },
                    className: "block w-5 h-0.5 bg-white origin-center absolute"
                }, void 0, false, {
                    fileName: "[project]/components/AuthButtons.tsx",
                    lineNumber: 117,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AuthButtons.tsx",
            lineNumber: 100,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: ()=>setShowDropdown((prev)=>!prev),
                className: "relative p-3 rounded-xl transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                variants: hamburgerVariants,
                animate: showDropdown ? "open" : "closed",
                whileHover: {
                    scale: 1.05
                },
                whileTap: {
                    scale: 0.95
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HamburgerIcon, {
                        isOpen: showDropdown
                    }, void 0, false, {
                        fileName: "[project]/components/AuthButtons.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg -z-10",
                        animate: {
                            opacity: showDropdown ? 0.6 : 0,
                            scale: showDropdown ? 1.2 : 0.8
                        },
                        transition: {
                            duration: 0.3
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/AuthButtons.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AuthButtons.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: showDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: dropdownVariants,
                    initial: "hidden",
                    animate: "visible",
                    exit: "exit",
                    className: "absolute right-0 mt-3 w-64 origin-top-right z-50",
                    style: {
                        perspective: "1000px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative backdrop-blur-2xl bg-gradient-to-tl from-blue-950/90 via-neutral-950/90 to-neutral-950/90  drop-shadow-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/AuthButtons.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-0 rounded-2xl",
                                style: {
                                    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                                    backgroundSize: "300% 300%"
                                },
                                animate: {
                                    backgroundPosition: [
                                        "0% 0%",
                                        "100% 100%",
                                        "0% 0%"
                                    ]
                                },
                                transition: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/AuthButtons.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative p-2",
                                children: [
                                    menuItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
                                            href: item.href,
                                            target: item.href.startsWith("http") ? "_blank" : "_self",
                                            rel: "noopener noreferrer",
                                            variants: itemVariants,
                                            className: "group flex items-center gap-3 px-4 py-3 text-sm text-gray-200 rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-white relative overflow-hidden",
                                            whileHover: {
                                                scale: 1.02,
                                                x: 4
                                            },
                                            whileTap: {
                                                scale: 0.98
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100",
                                                    initial: {
                                                        x: "-100%"
                                                    },
                                                    whileHover: {
                                                        x: "0%"
                                                    },
                                                    transition: {
                                                        duration: 0.3
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthButtons.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    className: "text-lg flex-shrink-0 relative z-10",
                                                    whileHover: {
                                                        scale: 1.2,
                                                        rotate: 15
                                                    },
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 10
                                                    },
                                                    children: item.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthButtons.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "relative z-10 font-bold text-sm",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthButtons.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 21
                                                }, this),
                                                item.href.startsWith("http") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    className: "ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-100 relative z-10",
                                                    initial: {
                                                        rotate: -45,
                                                        scale: 0
                                                    },
                                                    whileHover: {
                                                        rotate: 0,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 15
                                                    },
                                                    children: "↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AuthButtons.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/components/AuthButtons.tsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2",
                                        initial: {
                                            scaleX: 0
                                        },
                                        animate: {
                                            scaleX: 1
                                        },
                                        transition: {
                                            delay: 0.5,
                                            duration: 0.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/AuthButtons.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AuthButtons.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AuthButtons.tsx",
                        lineNumber: 162,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AuthButtons.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AuthButtons.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AuthButtons.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/Navbar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Navbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AuthButtons.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Navbar({ searchTerm, setSearchTerm, streak }) {
    const [showMobileSearch, setShowMobileSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearchFocused, setIsSearchFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle scroll effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    const toggleMobileSearch = ()=>{
        setShowMobileSearch((prev)=>{
            const newState = !prev;
            if (newState && searchInputRef.current) {
                setTimeout(()=>searchInputRef.current?.focus(), 100);
            }
            return newState;
        });
    };
    const navLinks = [
        {
            href: '/',
            label: 'Home',
            isActive: false
        },
        {
            href: '/notes',
            label: 'Notes',
            isActive: false
        },
        {
            href: '/sheet',
            label: 'Practice Sheet',
            isActive: true
        }
    ];
    const streakVariants = {
        idle: {
            scale: 1,
            rotate: 0
        },
        active: {
            scale: [
                1,
                1.2,
                1
            ],
            rotate: [
                0,
                10,
                -10,
                0
            ]
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].nav, {
        initial: {
            opacity: 0,
            y: -20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.6
        },
        className: `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#10131c]/80 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'bg-[#10131c]/80 backdrop-blur-md shadow-md border-b border-gray-800/50'} px-4 sm:px-10 md:px-14 py-4 sm:py-5`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        whileHover: {
                            scale: 1.01
                        },
                        whileTap: {
                            scale: 1.0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "group relative text-2xl font-bold text-white hover:cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative z-10",
                                children: [
                                    "DSA",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500",
                                        children: "Mate"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 74,
                                        columnNumber: 18
                                    }, this),
                                    " Template"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "hidden md:flex items-center relative group max-w-md flex-1 mx-8",
                        animate: {
                            scale: isSearchFocused ? 1.02 : 1
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `relative w-full transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `relative backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 ${isSearchFocused ? 'bg-white/15 shadow-2xl ring-2 ring-blue-400/50' : 'bg-white/10 shadow-lg hover:bg-white/12'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-neutral-500/10",
                                        animate: {
                                            backgroundPosition: isSearchFocused ? [
                                                '0% 50%',
                                                '100% 50%',
                                                '0% 50%'
                                            ] : '0% 50%'
                                        },
                                        transition: {
                                            duration: 3,
                                            repeat: isSearchFocused ? Infinity : 0,
                                            ease: "linear"
                                        },
                                        style: {
                                            backgroundSize: '200% 200%'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex items-center px-5 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                animate: {
                                                    scale: isSearchFocused ? 1.1 : 1,
                                                    color: isSearchFocused ? '#60a5fa' : '#9ca3af'
                                                },
                                                transition: {
                                                    duration: 0.2
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiSearch"], {
                                                    className: "mr-3 text-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search questions...",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value),
                                                onFocus: ()=>setIsSearchFocused(true),
                                                onBlur: ()=>setIsSearchFocused(false),
                                                className: "bg-transparent focus:outline-none text-sm text-white placeholder-gray-400 w-full font-medium"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        scale: 0
                                                    },
                                                    onClick: ()=>setSearchTerm(''),
                                                    className: "ml-2 p-1 rounded-full hover:bg-white/20 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                                                        className: "text-gray-400 hover:text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex items-center gap-6 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                title: `Streak: ${streak} day${streak === 1 ? '' : 's'}`,
                                variants: streakVariants,
                                animate: streak > 0 ? "active" : "idle",
                                transition: {
                                    duration: 0.6,
                                    repeat: streak > 0 ? Infinity : 0,
                                    repeatDelay: 3
                                },
                                whileHover: {
                                    scale: 1.1
                                },
                                className: "cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${streak > 0 ? 'text-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20' : 'text-gray-400 opacity-50 hover:opacity-75'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaFire"], {
                                            className: "text-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        streak > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                            className: "text-sm font-bold",
                                            initial: {
                                                scale: 0
                                            },
                                            animate: {
                                                scale: 1
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 25
                                            },
                                            children: streak
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            navLinks.map((link, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    whileHover: {
                                        y: -2
                                    },
                                    whileTap: {
                                        y: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: `relative px-3 py-2  rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `relative z-10 ${link.label === 'Practice Sheet' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`,
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this)
                                }, link.href, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:hidden flex items-center gap-3 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: toggleMobileSearch,
                                className: "p-2 rounded-xl hover:bg-white/10 transition-colors",
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        rotate: showMobileSearch ? 90 : 0
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    children: showMobileSearch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                                        className: "text-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 216,
                                        columnNumber: 35
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiSearch"], {
                                        className: "text-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 216,
                                        columnNumber: 65
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:cursor-pointer hover:text-blue-400 transition-colors text-sm",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/notes",
                                className: "hover:cursor-pointer hover:text-blue-400 transition-colors text-sm",
                                children: "Notes"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        title: `Streak: ${streak} day${streak === 1 ? '' : 's'}`,
                                        whileHover: {
                                            scale: 1.1
                                        },
                                        className: "cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center gap-1 ${streak > 0 ? 'text-orange-400' : 'text-gray-400 opacity-50'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaFire"], {
                                                    className: "text-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 17
                                                }, this),
                                                streak > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold",
                                                    children: streak
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 230,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showMobileSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        height: 0,
                        y: -20
                    },
                    animate: {
                        opacity: 1,
                        height: "auto",
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        height: 0,
                        y: -20
                    },
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    },
                    className: "sm:hidden mt-4 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiSearch"], {
                                    className: "mr-3 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 256,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: searchInputRef,
                                    type: "text",
                                    placeholder: "Search questions...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    className: "bg-transparent focus:outline-none text-sm w-full text-white placeholder-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 257,
                                    columnNumber: 17
                                }, this),
                                searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    onClick: ()=>setSearchTerm(''),
                                    className: "ml-2 p-1 rounded-full hover:bg-white/20 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                                        className: "text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 272,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 266,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 255,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 254,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Navbar.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Navbar.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}}),
"[project]/data/questions.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "sampleTopics": (()=>sampleTopics)
});
const sampleTopics = [
    // Basics of Programming
    {
        id: 1,
        name: 'Basics of Programming',
        questions: [
            {
                id: 1,
                title: 'Say "Hello, World" with c++(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/cpp-hello-world/problem?'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/NamasteDuniya.cpp',
                companies: [
                    'WITCH',
                    'Google',
                    'Apple'
                ]
            },
            {
                id: 2,
                title: 'Basic Data Types(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/c-tutorial-basic-data-types/problem?'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/variablesAndDatatypes.cpp'
            },
            {
                id: 3,
                title: 'Input and Output(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/cpp-input-and-output/problem?'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/userinput.cpp'
            },
            {
                id: 4,
                title: 'Conditional Statements(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/c-tutorial-conditional-if-else/problem?'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/ifelsestatements.cpp'
            },
            {
                id: 5,
                title: 'Switch Case Statement(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/c-switch-case-statement5900/0'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/01%20Introduction%20to%20C%2B%2B/SwitchStatements.cpp'
            }
        ]
    },
    // patterns
    {
        id: 2,
        name: 'Patterns',
        // add questions 
        questions: [
            {
                id: 1,
                title: 'Solid Square Pattern',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/program-to-print-solid-and-hollow-square-patterns/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20of%20Programming-level-1/Let's%20Solve%20Patterns/solidSquare.cpp"
            },
            {
                id: 19,
                title: 'Full Fancy 12 Pattern',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    code: 'https://www.glassdoor.co.uk/Interview/write-a-program-in-c-c-java-to-print-the-pattern-1-2-2-3-3-3-4-4-4-4-4-4-4-4-3-3-3-2-2-1-QTN_1391507.htm'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Mega%20session-patterns/fullFancy12Pattern.cpp"
            },
            {
                id: 21,
                title: 'Numeric Hollow Half Pyramid Pattern',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/hollow-half-pyramid-pattern-using-numbers/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/numericHollowHalfPyramid.cpp"
            },
            {
                id: 23,
                title: 'Numeric Palindrome Equilateral Pyramid Pattern',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    code: 'https://prepinsta.com/java-program/palindromic-pyramid-pattern-using-java/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/numericPalindromeEquilateralPyramid.cpp"
            },
            {
                id: 25,
                title: 'Fancy Pattern 1',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/fancyPattern1.cpp"
            },
            {
                id: 26,
                title: 'Fancy Pattern 2',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/fancyPattern2.cpp"
            },
            {
                id: 27,
                title: 'Fancy Pattern 3',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/fancyPattern3.cpp"
            },
            {
                id: 28,
                title: "Floyd's Triangle Pattern",
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/c/c-program-to-print-floyds-triangle-pyramid-patterns/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/floydsTriangle.cpp"
            },
            {
                id: 29,
                title: "Pascal's Triangle Pattern",
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/pascals-triangle/description/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/pascalsTriangle.cpp"
            },
            {
                id: 30,
                title: 'Butterfly Pattern',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/dsa/program-to-print-butterfly-pattern-star-pattern/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/02%20Basics%20Of%20Programming-Level-2/Week%202-%20assignments/butterflyPattern.cpp"
            }
        ]
    },
    // arrays
    {
        id: 3,
        name: 'Arrays',
        questions: [
            {
                id: 1,
                title: 'Linear Search Algorithm(for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Let's%20learn%20arrays/linearSearch.cpp"
            },
            {
                id: 7,
                title: 'Two Sum',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/two-sum/description/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Week3-%20Assignments/03_keyPair.cpp"
            },
            {
                id: 16,
                title: 'Transpose of 2D matrix (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/transpose-of-matrix-1587115621/1'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Array%20Class-3/Questions/transposeMatrix.cpp"
            },
            {
                id: 22,
                title: 'Move Negative Nos. to Left of Array/ Dutch National Flag Algorithm',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Week3-%20Assignments/07_moveNegativeNumberToLeft.cpp"
            },
            {
                id: 33,
                title: 'Maximum Subarray(Kadane Algorithm) ⭐⭐⭐ 👩🏻‍💻 ',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/maximum-subarray/description/'
                },
                solutionLink: "https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/03%20Arrays%2C%20Time%20complexity%20and%20Space%20complexity/Mega%20class-%20arrays/kadaneAlgo_maximumSubArray.cpp"
            }
        ]
    },
    // searching and sorting
    {
        id: 4,
        name: 'Searching and Sorting',
        questions: [
            {
                id: 1,
                title: 'Binary Search',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/binary-search/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20And%20Sorting%20Class-1/binary%20search/binarySearch.cpp',
                companies: [
                    'WITCH'
                ]
            },
            {
                id: 6,
                title: 'Sqrt(x) (Search space pattern)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/sqrtx/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20and%20Sorting%20class-2/searchSpace/leetcode69.cpp'
            },
            {
                id: 8,
                title: 'Find Quotient(for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/division-without-using-multiplication-division-and-mod-operator/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20and%20Sorting%20Class-3/getQuotient.cpp'
            },
            {
                id: 11,
                title: 'Odd Occurring Element',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/find-the-odd-occurence4820/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Searching%20and%20Sorting%20Class-3/oddOccuringElement.cpp'
            },
            {
                id: 12,
                title: 'Square root with precision',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/05%20Searching%20%26%20Sorting/Mega%20Class-%20Binary%20Searching/precisionSqrt.cpp'
            }
        ]
    },
    // char arrays and strings
    {
        id: 5,
        name: 'Char Arrays and Strings',
        questions: [
            {
                id: 1,
                title: 'Remove all Adjacent Duplicates in a String',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode1047.cpp'
            },
            {
                id: 2,
                title: 'Remove all occurrences of a substring',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/remove-all-occurrences-of-a-substring/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode1910.cpp'
            },
            {
                id: 3,
                title: 'Valid Palindrome II',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/valid-palindrome-ii/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode680.cpp'
            },
            {
                id: 4,
                title: 'Palindromic substrings',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/palindromic-substrings/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-2/leetcode%20questions/leetcode647.cpp'
            },
            {
                id: 5,
                title: 'Decode the message',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/decode-the-message/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/07%20Char%20Arrays%20And%20Strings/Char%20Arrays%20%26%20Strings%20Class-3/leetcode2325.cpp'
            }
        ]
    },
    // basic maths and pointers
    {
        id: 6,
        name: 'Basic Maths and Pointers',
        questions: [
            {
                id: 1,
                title: 'C++ Pointers ( Incrementing a variable) - (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/c-pointers-set-1introduction/0'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Pointers-%20Class%201/pointer.cpp'
            },
            {
                id: 2,
                title: 'Count Primes',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/count-primes/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/204CountPrimes.cpp'
            },
            {
                id: 3,
                title: 'Fast Exponentiation',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/powx-n/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/fastExponentiation.cpp'
            },
            {
                id: 4,
                title: 'GCD of two numbers',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/gcd.cpp'
            },
            {
                id: 5,
                title: 'Modular exponentiation for large numbers',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/modular-exponentiation-for-large-numbers5537/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Basic%20Mathematics%20for%20DSA/modularExponentitationForLargeNumbers.cpp'
            },
            {
                id: 6,
                title: 'Sieve of eratosthenes',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Optimising%20Sieve%20and%20Segmented%20Sieve/seiveofEratosthenes.cpp'
            },
            {
                id: 7,
                title: 'Segmented Sieve',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/find-prime-numbers-in-a-range4718/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Optimising%20Sieve%20and%20Segmented%20Sieve/segmentedSieve.cpp'
            },
            {
                id: 8,
                title: 'Product of primes',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/product-of-primes5328/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/08%20Basic%20Maths%20%26%20Pointers/Optimising%20Sieve%20and%20Segmented%20Sieve/productOfPrimes.cpp'
            }
        ]
    },
    // recursion
    {
        id: 7,
        name: 'Recursion',
        questions: [
            {
                id: 1,
                title: 'Factorial',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/factorial5739/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-1/main.cpp'
            },
            {
                id: 2,
                title: 'Fibonacci Number',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/fibonacci-number/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-1/main.cpp'
            },
            {
                id: 3,
                title: 'Basic array operations using recursion',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-2/main.cpp'
            },
            {
                id: 4,
                title: 'Binary Search using recursion',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/binary-search-1587115620/11'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-2/binarySearch.cpp'
            },
            {
                id: 6,
                title: 'House Robber (optimise using DP)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/house-robber/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/09%20Recursion/Recursion%20Class-3/leetcode198.cpp'
            }
        ]
    },
    // backtracking and divide and conquer
    {
        id: 8,
        name: 'Backtracking and DnC',
        questions: [
            {
                id: 1,
                title: 'Merge Sort / Divide and conquer ',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/merge-sort/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Dnc%20Class-1/main.cpp'
            },
            {
                id: 2,
                title: 'Quick Sort',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/quick-sort/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Quick%20Sort%5BEnd%20Element%20as%20Pivot%5D/main.cpp'
            },
            {
                id: 3,
                title: 'Rat in a Maze Problem - I',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20Dnc%20Class-2/ratInMaze.cpp'
            },
            {
                id: 4,
                title: 'Permutations',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/permutations/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20Class-3/leetcode46Permutations.cpp'
            },
            {
                id: 5,
                title: 'N Queens',
                difficulty: 'hard',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/n-queens/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20Class-3/leetcode51N_Queens.cpp'
            },
            {
                id: 6,
                title: 'Sudoku Solver',
                difficulty: 'hard',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/sudoku-solver/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20class-4/leetcode37SudokuSolver.cpp'
            },
            {
                id: 7,
                title: 'Letter combinations of a phone number',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/Backtracking%20%26%20DnC%20class-4/leetcode17LetterCombinationsOfPhoneNumber.cpp'
            },
            {
                id: 8,
                title: 'Generate Parentheses',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/generate-parentheses/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/DnC%20and%20Backtracking%20Mega%20Class/22GenerateParentheses.cpp'
            },
            {
                id: 9,
                title: 'Combinations',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/combinations/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/10%20Backtracking%20%26%20DnC/DnC%20and%20Backtracking%20Mega%20Class/77Combinations.cpp'
            }
        ]
    },
    // oops
    {
        id: 9,
        name: 'OOPS concepts',
        questions: [
            {
                id: 1,
                title: 'How to create objects in Cpp',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/How%20to%20Create%20Objects%20in%20C%2B%2B'
            },
            {
                id: 2,
                title: 'Encapsulation',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Implementing%20Encapsulation'
            },
            {
                id: 3,
                title: 'Inheritance',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Implementing%20Inheritance'
            },
            {
                id: 4,
                title: 'Polymorphism',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Polymorphism'
            },
            {
                id: 5,
                title: 'Abstraction',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Abstraction'
            },
            {
                id: 6,
                title: 'Miscellaneous Concepts',
                difficulty: 'hard',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/11%20OOPs%20Concepts/Miscellaneous%20Concepts'
            }
        ]
    },
    // linked lists
    {
        id: 10,
        name: 'Linked Lists',
        questions: [
            {
                id: 1,
                title: 'Linked List Insertion At Head / Beginning',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/linked-list-insertion-at-beginning/0'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtHead.cpp'
            },
            {
                id: 2,
                title: 'Print Linked List elements',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/print-linked-list-elements/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtHead.cpp'
            },
            {
                id: 3,
                title: 'Linked List Insertion At Tail / End',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/linked-list-insertion-1587115620/0'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtTail.cpp'
            },
            {
                id: 4,
                title: 'Linked List Insertion At Position',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/node-at-a-given-index-in-linked-list/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-1/insertAtPosition.cpp'
            },
            {
                id: 9,
                title: 'Reverse Linked List',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/reverse-linked-list/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/12%20Linked%20List/Linked%20List%20Class-3/206ReverseLL.cpp'
            }
        ]
    },
    // stacks
    {
        id: 11,
        name: 'Stacks',
        questions: [
            {
                id: 1,
                title: 'Stack Implementation (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/special-stack/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-1/creation.cpp'
            },
            {
                id: 2,
                title: 'Implement two stacks in an array',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-1/twoStack-usingArray.cpp'
            },
            {
                id: 4,
                title: 'Insert an Element at the Bottom of a Stack',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/insert-an-element-at-the-bottom-of-a-stack/0'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-1/insertAtBottom.cpp'
            },
            {
                id: 8,
                title: 'Sorted Insert in Stack',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-2/sortedInsert.cpp'
            },
            {
                id: 10,
                title: 'Check Expression contains redundant bracket or not',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/expression-contains-redundant-bracket-or-not/0'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/13%20Stacks/Stack%20Class-2/gfg/checkRedundant.cpp'
            }
        ]
    },
    // queues
    {
        id: 12,
        name: 'Queues',
        questions: [
            {
                id: 1,
                title: 'Implement Queue using array',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/implement-queue-using-array/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-queue.cpp'
            },
            {
                id: 2,
                title: 'Deque Implementations',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/deque-implementations/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-deque.cpp'
            },
            {
                id: 3,
                title: 'Implement Circular Queue (for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/design-circular-queue/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-circularQueue.cpp'
            },
            {
                id: 4,
                title: 'Implement Circular Deque',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/design-circular-deque/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%201/implement-circularDeque.cpp'
            },
            {
                id: 5,
                title: 'Reverse a Queue',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/queue-reversal/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/14%20Queues/Queue%20Class%20-%202/reverse-a-queue.cpp'
            }
        ]
    },
    // generic and binary trees
    {
        id: 13,
        name: 'Generic and Binary Trees',
        questions: [
            {
                id: 1,
                title: 'Preorder Traversal',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/preorder-traversal/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp'
            },
            {
                id: 2,
                title: 'Inorder Traversal ',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/inorder-traversal/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp'
            },
            {
                id: 3,
                title: 'Postorder Traversal',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/postorder-traversal/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp'
            },
            {
                id: 4,
                title: 'Level Order Traversal ',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/level-order-traversal/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%201/02-Traversal.cpp'
            },
            {
                id: 8,
                title: 'Lowest Common Ancestor(LCA) of a Binary Tree ⭐⭐⭐',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/15%20Generic%20and%20Binary%20Trees/Trees%20Class%20-%202/02-Lowest-Common-Ancestor-of-Binary-Tree.cpp'
            }
        ]
    },
    // bst
    {
        id: 14,
        name: 'Binary Search Trees',
        questions: [
            {
                id: 1,
                title: 'Build BST and traverse',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/creation.cpp'
            },
            {
                id: 2,
                title: 'Min and max element in BST',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/01-max-min.cpp'
            },
            {
                id: 3,
                title: 'Search a node in BST',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/search-a-node-in-bst/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/02-search.cpp'
            },
            {
                id: 4,
                title: 'Delete Node in a BST',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/delete-node-in-a-bst/description/"'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/Binary%20Search%20Trees%20Class%20-%201/03-delete-a-node.cpp'
            },
            {
                id: 5,
                title: 'Two Sum IV - Input is a BST',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/16%20Binary%20Search%20Trees/BST%20-%20mega%20class/04-two-sum-IV-input-is-a-BST.cpp'
            }
        ]
    },
    // heaps
    {
        id: 15,
        name: 'Heaps',
        questions: [
            {
                id: 1,
                title: 'Heap Creation',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%201/01-create-Heap.cpp'
            },
            {
                id: 2,
                title: 'Build Heap and Heap Sort(for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/heap-sort/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%201/02-buildHeap-and-heapsort.cpp'
            },
            {
                id: 3,
                title: 'Kth Largest Element in an Array',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%202%20or%203/01-find-kth-largest-element-in-array.cpp'
            },
            {
                id: 4,
                title: 'Check Completeness of a Binary Tree',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/check-completeness-of-a-binary-tree/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%202%20or%203/02-check-completeness-of-a-binary-tree.cpp'
            },
            {
                id: 5,
                title: 'Is Binary Tree Heap',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/is-binary-tree-heap/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/17%20Heaps/Heaps%20Class%20-%202%20or%203/03-is-binary-tree-heap.cpp'
            }
        ]
    },
    // maps and tries
    {
        id: 16,
        name: 'Maps and Tries',
        questions: [
            {
                id: 1,
                title: 'Maps STL Practice',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    hackerrank: 'https://www.hackerrank.com/challenges/cpp-maps/problem'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/tree/main/04%20Complete%20Cpp%20STL/Containers/Map'
            },
            {
                id: 2,
                title: 'Two Sum - using Maps',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/two-sum/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%202/01-two-sum.cpp'
            },
            {
                id: 5,
                title: 'Implement Trie (Prefix Tree)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/implement-trie-prefix-tree/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%204/01-implement-trie.cpp'
            },
            {
                id: 6,
                title: 'Longest Common Prefix',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/longest-common-prefix/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%204/02-longest-common-prefix.cpp'
            },
            {
                id: 7,
                title: 'Searching using Trie (for practice)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/18%20Maps%20And%20Tries/Maps%20and%20Tries%20Class%20-%204/searching.cpp'
            }
        ]
    },
    // dp
    {
        id: 17,
        name: 'Dynamic Programming',
        questions: [
            {
                id: 1,
                title: 'Fibonacci Number(using dp)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/fibonacci-number/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%201/01-fibonacci.cpp'
            },
            {
                id: 2,
                title: 'House Robber',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/house-robber/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%202/01-house-robber.cpp'
            },
            {
                id: 3,
                title: 'Longest Increasing Subsequence',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/longest-increasing-subsequence/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%202/02-longest-increasing-subsequence.cpp'
            },
            {
                id: 4,
                title: 'Coin Change',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    leetcode: 'https://leetcode.com/problems/coin-change/description/'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%202/03-coin-change.cpp'
            },
            {
                id: 5,
                title: '0 - 1 Knapsack Problem',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/19%20Dynamic%20Programming%20Level%20-%201/DP%20class%20-%203/01-0-1-knapsack-problem.cpp'
            }
        ]
    },
    // graphs
    {
        id: 18,
        name: 'Graphs',
        questions: [
            {
                id: 1,
                title: 'Print adjacency list',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%201/main.cpp'
            },
            {
                id: 2,
                title: 'BFS of graph (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%201/traversal.cpp'
            },
            {
                id: 3,
                title: 'DFS of graph (for practice)',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%201/traversal.cpp'
            },
            {
                id: 5,
                title: 'Directed Graph Cycle(Detect cycle)',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%202/directed-graph-cycle-dfs.cpp'
            },
            {
                id: 6,
                title: 'Topological sort',
                difficulty: 'medium',
                isSolved: false,
                isMarkedForRevision: false,
                links: {
                    gfg: 'https://www.geeksforgeeks.org/problems/topological-sort/1'
                },
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/blob/main/20%20Graphs/Graphs%20Class%20-%203/01-topological-sort.cpp'
            }
        ]
    },
    // bonus
    {
        id: 19,
        name: 'Bonus',
        questions: [
            {
                id: 1,
                title: 'Add questions here',
                difficulty: 'easy',
                isSolved: false,
                isMarkedForRevision: false,
                links: {},
                solutionLink: 'https://github.com/saumyayadav25/DSA-Supreme-3.0/'
            }
        ]
    }
];
}}),
"[project]/components/SheetContent.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SheetContent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/si/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/questions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function SheetContent({ difficultyFilter, statusFilter, revisionFilter, searchTerm, platformFilter, companyFilter }) {
    const [openTopics, setOpenTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedProgress = localStorage.getItem('dsa-progress');
        if (storedProgress) {
            setProgress(JSON.parse(storedProgress));
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('dsa-progress', JSON.stringify(progress));
    }, [
        progress
    ]);
    const toggleCheckbox = (id, field)=>{
        setProgress((prev)=>{
            const current = prev[id] || {};
            const updated = {
                ...current,
                [field]: !current[field]
            };
            if (field === 'isSolved' && !current[field]) {
                updated.solvedTime = Date.now();
            }
            return {
                ...prev,
                [id]: updated
            };
        });
    };
    const toggleTopic = (topicId)=>{
        setOpenTopics((prev)=>prev.includes(topicId) ? prev.filter((id)=>id !== topicId) : [
                ...prev,
                topicId
            ]);
    };
    const difficultyClasses = {
        easy: 'text-green-500',
        medium: 'text-yellow-400',
        hard: 'text-red-500'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleTopics"].map((topic)=>{
            const totalQuestions = topic.questions.length;
            const solvedQuestions = topic.questions.filter((q)=>{
                const uniqueKey = `${topic.id}-${q.id}`;
                const local = progress[uniqueKey] || {};
                return local.isSolved ?? q.isSolved;
            }).length;
            const isCompleted = solvedQuestions === totalQuestions;
            const filteredQuestions = topic.questions.filter((q)=>{
                const uniqueKey = `${topic.id}-${q.id}`;
                const local = progress[uniqueKey] || {};
                const isSolved = local.isSolved ?? q.isSolved;
                const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;
                if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
                if (statusFilter === 'solved' && !isSolved) return false;
                if (statusFilter === 'unsolved' && isSolved) return false;
                if (revisionFilter === 'marked' && !isMarked) return false;
                if (revisionFilter === 'unmarked' && isMarked) return false;
                if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
                if (platformFilter) {
                    const availableLinks = Object.keys(q.links || {});
                    if (!availableLinks.includes(platformFilter)) return false;
                }
                if (companyFilter && (!q.companies || !q.companies.includes(companyFilter))) return false;
                return true;
            });
            if (filteredQuestions.length === 0) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 border border-gray-700 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleTopic(topic.id),
                        className: "w-full flex justify-between items-center px-4 py-3 bg-[#131313]  hover:bg-[#16171a] text-left text-lg font-medium transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: topic.name
                            }, void 0, false, {
                                fileName: "[project]/components/SheetContent.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-400 font-medium px-2 py-2 ml-auto",
                                children: isCompleted ? '🎉 Completed' : `✅ ${solvedQuestions} / ${totalQuestions} solved`
                            }, void 0, false, {
                                fileName: "[project]/components/SheetContent.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: `transform transition-transform duration-200 ${openTopics.includes(topic.id) ? 'rotate-180' : ''}`,
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 9l6 6 6-6",
                                    stroke: "white",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/SheetContent.tsx",
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SheetContent.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SheetContent.tsx",
                        lineNumber: 115,
                        columnNumber: 13
                    }, this),
                    openTopics.includes(topic.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto bg-[#131313] px-4 py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full text-left text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 px-3 w-2/5 text-center",
                                                children: "Question"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SheetContent.tsx",
                                                lineNumber: 148,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 px-3 w-1/6 text-center",
                                                children: "Practice Links"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SheetContent.tsx",
                                                lineNumber: 149,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 px-3 w-1/6 text-center",
                                                children: "Difficulty"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SheetContent.tsx",
                                                lineNumber: 150,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 px-3 w-1/6 text-center",
                                                children: "Solved"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SheetContent.tsx",
                                                lineNumber: 151,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 px-3 w-1/6 text-center",
                                                children: "Revision"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SheetContent.tsx",
                                                lineNumber: 152,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 px-3 w-1/6 text-center",
                                                children: "Solution"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SheetContent.tsx",
                                                lineNumber: 153,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SheetContent.tsx",
                                        lineNumber: 147,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/SheetContent.tsx",
                                    lineNumber: 146,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filteredQuestions.map((q)=>{
                                        const uniqueKey = `${topic.id}-${q.id}`;
                                        const local = progress[uniqueKey] || {};
                                        const isSolved = local.isSolved ?? q.isSolved;
                                        const isMarked = local.isMarkedForRevision ?? q.isMarkedForRevision;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-gray-700 hover:bg-[#16171a] transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3",
                                                    children: q.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SheetContent.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 text-center flex justify-center gap-2",
                                                    children: [
                                                        q.links.leetcode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.leetcode,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "LeetCode",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiLeetcode"], {
                                                                className: "text-orange-500 text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 31
                                                        }, this),
                                                        q.links.gfg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.gfg,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "GeeksforGeeks",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiGeeksforgeeks"], {
                                                                className: "text-green-500 text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 31
                                                        }, this),
                                                        q.links.hackerrank && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.hackerrank,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "HackerRank",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiHackerrank"], {
                                                                className: "text-white text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 181,
                                                            columnNumber: 31
                                                        }, this),
                                                        q.links.spoj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.spoj,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "SPOJ",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiSpoj"], {
                                                                className: "text-white text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 31
                                                        }, this),
                                                        q.links.ninja && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.ninja,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "Coding Ninjas",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiCodingninjas"], {
                                                                className: "text-white text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 192,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 31
                                                        }, this),
                                                        q.links.code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.code,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "Code",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaCode"], {
                                                                className: "text-blue-200 text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 31
                                                        }, this),
                                                        q.links.custom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: q.links.custom,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            title: "Custom",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaCode"], {
                                                                className: "text-blue-400 text-2xl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SheetContent.tsx",
                                                                lineNumber: 202,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/SheetContent.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: `text-center py-2 px-3 font-semibold ${difficultyClasses[q.difficulty]}`,
                                                    children: q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SheetContent.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: isSolved,
                                                        onChange: ()=>toggleCheckbox(uniqueKey, 'isSolved'),
                                                        className: `accent-green-500 cursor-pointer`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SheetContent.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SheetContent.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: isMarked,
                                                        onChange: ()=>toggleCheckbox(uniqueKey, 'isMarkedForRevision'),
                                                        className: `accent-red-500 cursor-pointer`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SheetContent.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SheetContent.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2 px-3 text-center flex justify-center items-center text-2xl",
                                                    children: q.solutionLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: q.solutionLink,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        title: "Solution on GitHub",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaGithub"], {}, void 0, false, {
                                                            fileName: "[project]/components/SheetContent.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 33
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SheetContent.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 31
                                                    }, this) : '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SheetContent.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, uniqueKey, true, {
                                            fileName: "[project]/components/SheetContent.tsx",
                                            lineNumber: 164,
                                            columnNumber: 25
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/SheetContent.tsx",
                                    lineNumber: 156,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SheetContent.tsx",
                            lineNumber: 145,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SheetContent.tsx",
                        lineNumber: 144,
                        columnNumber: 15
                    }, this)
                ]
            }, topic.id, true, {
                fileName: "[project]/components/SheetContent.tsx",
                lineNumber: 114,
                columnNumber: 11
            }, this);
        })
    }, void 0, false);
}
}}),
"[project]/components/POTD.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>POTD)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function POTD({ potd, updateStreak }) {
    const [isSolved, setIsSolved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const lastDone = localStorage.getItem('potd_last_done');
        // Reset streak if missed a day (i.e., lastDone !== yesterday AND !== today)
        if (lastDone && lastDone !== yesterday && lastDone !== today) {
            localStorage.setItem('potd_streak', '0');
        }
        setIsSolved(today === lastDone);
    }, []);
    const handleMarkDone = ()=>{
        const today = new Date().toDateString();
        const lastDone = localStorage.getItem('potd_last_done');
        const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
        if (lastDone === new Date(Date.now() - 86400000).toDateString()) {
            const newStreak = savedStreak + 1;
            localStorage.setItem('potd_streak', newStreak.toString());
        } else if (lastDone !== today) {
            localStorage.setItem('potd_streak', '1');
        }
        localStorage.setItem('potd_last_done', today);
        setIsSolved(true);
        updateStreak(); // notify parent to update Navbar
    };
    if (!potd) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#141414] border border-gray-600 rounded-lg p-4 mb-8 flex justify-between items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-blue-400 mb-2",
                        children: "🔥 Problem of the Day"
                    }, void 0, false, {
                        fileName: "[project]/components/POTD.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-medium",
                        children: potd.title
                    }, void 0, false, {
                        fileName: "[project]/components/POTD.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1 text-gray-400 capitalize",
                        children: [
                            "Difficulty:",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-semibold ${potd.difficulty === "easy" ? "text-green-400" : potd.difficulty === "medium" ? "text-yellow-400" : "text-red-400"}`,
                                children: potd.difficulty
                            }, void 0, false, {
                                fileName: "[project]/components/POTD.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/POTD.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-3 text-sm text-gray-300",
                        children: [
                            Object.entries(potd.links || {}).map(([platform, url])=>{
                                const displayName = platform === 'leetcode' ? 'LeetCode' : platform === 'gfg' ? 'GeeksForGeeks' : platform === 'hackerrank' ? 'HackerRank' : platform === 'spoj' ? 'SPOJ' : platform === 'ninja' ? 'Coding Ninjas' : platform === 'code' ? 'Other Platform' : platform === 'custom' ? 'View Question' : platform;
                                const textColor = platform === 'leetcode' ? 'text-blue-400' : platform === 'gfg' ? 'text-green-400' : platform === 'hackerrank' ? 'text-yellow-300' : platform === 'spoj' ? 'text-purple-400' : platform === 'ninja' ? 'text-pink-400' : platform === 'code' ? 'text-orange-400' : platform === 'custom' ? 'text-blue-300' : 'text-gray-300';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: url,
                                    target: "_blank",
                                    className: `underline ${textColor}`,
                                    children: displayName
                                }, platform, false, {
                                    fileName: "[project]/components/POTD.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this);
                            }),
                            potd.solutionLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: potd.solutionLink,
                                target: "_blank",
                                className: "text-gray-300 underline",
                                children: "GitHub Solution"
                            }, void 0, false, {
                                fileName: "[project]/components/POTD.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/POTD.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/POTD.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            !isSolved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleMarkDone,
                className: "bg-green-600 hover:bg-green-500 hover:cursor-pointer text-white px-4 py-2 rounded text-sm",
                children: "Mark as Done"
            }, void 0, false, {
                fileName: "[project]/components/POTD.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-green-400 font-medium text-sm",
                children: "✅ Today's POTD Completed!"
            }, void 0, false, {
                fileName: "[project]/components/POTD.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/POTD.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}}),
"[project]/utils/getPOTD.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getPOTD": (()=>getPOTD)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/questions.ts [app-ssr] (ecmascript)");
;
// Simple pseudo-random generator based on seed (dayId)
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
function getPOTD() {
    const allQuestions = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleTopics"].flatMap((topic)=>topic.questions);
    const today = new Date();
    const dayId = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)); // unique ID per day
    const randomIndex = Math.floor(seededRandom(dayId) * allQuestions.length);
    return allQuestions[randomIndex];
}
}}),
"[project]/components/Footer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Footer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-[#24262a] text-white px-4 md:px-20 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between gap-10 text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold mb-3",
                                children: "About Us"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 11,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-300 mb-4",
                                children: "DSA Practice is your ultimate destination for all DSA (Data Structures and Algorithms) questions."
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://www.buymeacoffee.com/saumyayadav",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "inline-block mt-4 bg-yellow-600 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition",
                                children: "☕ Buy me a coffee"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold mb-3",
                                children: "Quick Links"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/",
                                            className: "hover:text-blue-400",
                                            children: "Home"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/sheet",
                                            className: "hover:text-blue-400",
                                            children: "Practice Problems"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://github.com/saumyayadav25/DSA-Supreme-3.0",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-blue-400",
                                            children: "All DSA Codes"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/notes",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-blue-400",
                                            children: "Notes"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://forms.gle/bdwBp8oFRWugcrcg9",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-blue-400",
                                            children: "Feedback Form"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold mb-3",
                                children: "Follow Us"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-4 text-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://x.com/SaumyaYadav817",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "hover:text-blue-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaTwitter"], {}, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://github.com/saumyayadav25",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "hover:text-blue-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaGithub"], {}, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://www.linkedin.com/in/saumya-yadav-/",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "hover:text-blue-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaLinkedin"], {}, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold mb-3 text-white",
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Email: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "mailto:contact.dsapractice@gmail.com",
                                        className: "text-blue-400",
                                        children: "contact.dsapractice@gmail.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.tsx",
                                        lineNumber: 67,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-sm text-gray-400 mt-10",
                children: "© 2024 DSA Practice. All Rights Reserved."
            }, void 0, false, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/TestimonialPrompt.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TestimonialPrompt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function TestimonialPrompt() {
    const [showPrompt, setShowPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>setShowPrompt(true), 5000);
        return ()=>clearTimeout(timer);
    }, []);
    if (!showPrompt) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 40
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.4
        },
        className: "fixed bottom-20 right-3 z-50 bg-[#202029] hover:bg-[#19191f] text-white px-3 py-2 rounded-lg shadow-md w-[85vw] max-w-[300px] sm:px-4 sm:py-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowPrompt(false),
                    className: "absolute top-0 right-0 text-gray-400 hover:text-white transition",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                        className: "sm:text-lg text-md"
                    }, void 0, false, {
                        fileName: "[project]/components/TestimonialPrompt.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/TestimonialPrompt.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pr-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "sm:text-sm text-xs font-medium mb-3 leading-relaxed",
                            children: "❤️ Your journey matters. Share how this sheet helped you — and inspire others by filling the testimonial form."
                        }, void 0, false, {
                            fileName: "[project]/components/TestimonialPrompt.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "https://forms.gle/8BXQC1o3hsVsEEBp9",
                            target: "_blank",
                            className: "bg-blue-600 hover:bg-blue-700 sm:text-sm text-xs text-white px-2 py-1 rounded inline-block sm:px-3 sm:py-1",
                            children: "Fill Form"
                        }, void 0, false, {
                            fileName: "[project]/components/TestimonialPrompt.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TestimonialPrompt.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/TestimonialPrompt.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/TestimonialPrompt.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/ReportIssueButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReportIssueButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function ReportIssueButton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: "https://forms.gle/doYqjXbW7AisPP5x6",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "fixed bottom-4 right-4 sm:bottom-5 sm:right-5 bg-[#3a3b3f] text-white py-2 px-4 sm:py-3 sm:px-5 rounded-full text-sm font-semibold shadow-lg z-[1000] hover:bg-[#46474e] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 max-w-[90vw] text-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "hidden sm:inline text-lg",
                    children: "💬 Report an issue"
                }, void 0, false, {
                    fileName: "[project]/components/ReportIssueButton.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline sm:hidden text-lg",
                    children: "💬"
                }, void 0, false, {
                    fileName: "[project]/components/ReportIssueButton.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ReportIssueButton.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ReportIssueButton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/DailyRecommendation.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/questions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const DailyRecommendation = ()=>{
    const [recommended, setRecommended] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const today = new Date().toDateString();
        const stored = localStorage.getItem('daily-recommendation');
        const storedData = stored ? JSON.parse(stored) : null;
        if (storedData?.date === today) {
            setRecommended(storedData.data);
            return;
        }
        const progress = JSON.parse(localStorage.getItem('dsa-progress') || '{}');
        // Step 1: Count solved questions per topic
        const topicProgress = {};
        for (const topic of __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleTopics"]){
            let solvedCount = 0;
            for (const question of topic.questions){
                const key = `${topic.id}-${question.id}`;
                if (progress[key]?.isSolved) {
                    solvedCount++;
                }
            }
            topicProgress[topic.id] = solvedCount;
        }
        // Step 2: Sort topics by least solved count
        const sortedTopics = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sampleTopics"]
        ].sort((a, b)=>topicProgress[a.id] - topicProgress[b.id]);
        // Step 3: Collect weak questions from those topics
        const weakQuestions = [];
        for (const topic of sortedTopics){
            for (const question of topic.questions){
                const key = `${topic.id}-${question.id}`;
                const qProgress = progress[key] || {};
                const isUnsolved = !qProgress.isSolved;
                const needsRevision = qProgress.isMarkedForRevision;
                const isDifficult = qProgress.difficult;
                if (isUnsolved || needsRevision || isDifficult) {
                    weakQuestions.push({
                        topic,
                        question
                    });
                }
            }
            if (weakQuestions.length) break; // only from the weakest topic
        }
        // Step 4: Pick 1 random weak question
        if (weakQuestions.length > 0) {
            const chosen = weakQuestions[Math.floor(Math.random() * weakQuestions.length)];
            setRecommended(chosen);
            localStorage.setItem('daily-recommendation', JSON.stringify({
                date: today,
                data: chosen
            }));
        }
    }, []);
    if (!recommended) return null;
    // Fallback to first available question link
    const link = recommended.question.links?.leetcode || recommended.question.links?.gfg || recommended.question.links?.hackerrank || recommended.question.links?.spoj || recommended.question.links?.ninja || recommended.question.links?.code || recommended.question.links?.custom || '#';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 rounded-xl shadow-sm border border-gray-600 bg-[#141414] my-4 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold mb-2",
                children: "📌 Recommended For You"
            }, void 0, false, {
                fileName: "[project]/components/DailyRecommendation.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Topic:"
                    }, void 0, false, {
                        fileName: "[project]/components/DailyRecommendation.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    " ",
                    recommended.topic.name
                ]
            }, void 0, true, {
                fileName: "[project]/components/DailyRecommendation.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Question:"
                    }, void 0, false, {
                        fileName: "[project]/components/DailyRecommendation.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    " ",
                    recommended.question.title
                ]
            }, void 0, true, {
                fileName: "[project]/components/DailyRecommendation.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
                children: "Go to Question"
            }, void 0, false, {
                fileName: "[project]/components/DailyRecommendation.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/DailyRecommendation.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = DailyRecommendation;
}}),
"[project]/app/sheet/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SheetPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SheetContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SheetContent.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$POTD$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/POTD.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getPOTD$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/getPOTD.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TestimonialPrompt$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TestimonialPrompt.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ReportIssueButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ReportIssueButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DailyRecommendation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/DailyRecommendation.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
function SheetPage() {
    const [difficultyFilter, setDifficultyFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [revisionFilter, setRevisionFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [platformFilter, setPlatformFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [companyFilter, setCompanyFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [streak, setStreak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [potd, setPotd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const potd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$getPOTD$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPOTD"])();
        setPotd(potd);
        const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
        setStreak(savedStreak);
    }, []);
    const updateStreak = ()=>{
        const updatedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
        setStreak(updatedStreak);
    };
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const resetFilters = ()=>{
        setDifficultyFilter('');
        setStatusFilter('');
        setRevisionFilter('');
        setPlatformFilter('');
        setCompanyFilter('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                searchTerm: searchTerm,
                setSearchTerm: setSearchTerm,
                streak: streak
            }, void 0, false, {
                fileName: "[project]/app/sheet/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-[#131313] text-white px-4 md:px-12 py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ReportIssueButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 text-white text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl md:text-4xl font-bold mb-4 ",
                                children: "DSA Practice Problems"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm md:text-base text-gray-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Note:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    " Questions marked with the (for practice) tag do not include the exact solutions. The provided code solutions in this section serve as hints or are solutions to similar problems from platforms like ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-400",
                                        children: "LeetCode"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 18
                                    }, this),
                                    ", ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-400",
                                        children: "GeeksforGeeks"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 67
                                    }, this),
                                    ", or ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-yellow-400",
                                        children: "HackerRank"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 125
                                    }, this),
                                    " ..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 bg-[#202226] border border-gray-500 text-gray-300 rounded-lg px-4 py-3 inline-block text-sm md:text-base",
                                children: [
                                    "⚠️ Company-wise filtering is currently in progress. You might see incomplete or missing tags. Contribute company-specific questions via ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://forms.gle/8WccErg3TBFTMPkj9",
                                        className: "underline text-gray-200 hover:text-gray-100",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        children: "this form"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 55
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-sm md:text-base text-gray-300 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "text-sm md:text-base text-gray-300 mt-2",
                                children: "⚡: asked in 20+ companies"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "text-sm md:text-base text-gray-300 mt-1",
                                children: "⚡🔥: asked in 50+ companies"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "text-sm md:text-base text-gray-300 mt-1",
                                children: "⚡🔥🏆: asked in 80+ companies"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "text-sm md:text-base text-gray-300",
                                children: "(Based on data from LeetCode and GeeksforGeeks company tags)"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 flex flex-wrap md:flex-row gap-4 md:items-center text-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: difficultyFilter,
                                onChange: (e)=>setDifficultyFilter(e.target.value),
                                // className="bg-white/5 rounded-lg px-3 py-2 md:px-4 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-white/8 transition duration-200"
                                className: "bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Difficulties"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "easy",
                                        children: "Easy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "medium",
                                        children: "Medium"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "hard",
                                        children: "Hard"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: statusFilter,
                                onChange: (e)=>setStatusFilter(e.target.value),
                                // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
                                className: "bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Solved Status"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "solved",
                                        children: "Solved"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "unsolved",
                                        children: "Unsolved"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: revisionFilter,
                                onChange: (e)=>setRevisionFilter(e.target.value),
                                // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
                                className: "bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Revision Status"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "marked",
                                        children: "Marked for Revision"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "unmarked",
                                        children: "Not Marked"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: platformFilter,
                                onChange: (e)=>setPlatformFilter(e.target.value),
                                // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
                                className: "bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Platform"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "leetcode",
                                        children: "LeetCode"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "gfg",
                                        children: "GeeksforGeeks"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "hackerrank",
                                        children: "HackerRank"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "spoj",
                                        children: "SPOJ"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ninja",
                                        children: "Coding Ninjas"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "code",
                                        children: "Others"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: companyFilter,
                                onChange: (e)=>setCompanyFilter(e.target.value),
                                // className="bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-lg px-3 py-2 md:px-4 shadow-md hover:bg-white/8 transition duration-200"
                                className: "bg-white text-black relative z-10 rounded px-4 py-2 focus:outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Companies"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Adobe",
                                        children: "Adobe"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Amazon",
                                        children: "Amazon"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Apple",
                                        children: "Apple"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Cisco",
                                        children: "Cisco"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "DE shaw",
                                        children: "DE shaw"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Flipkart",
                                        children: "Flipkart"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Google",
                                        children: "Google"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Intuit",
                                        children: "Intuit"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "MakeMyTrip",
                                        children: "MakeMyTrip"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Meta",
                                        children: "Meta"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Microsoft",
                                        children: "Microsoft"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Morgan Stanley",
                                        children: "Morgan Stanley"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Nvidia",
                                        children: "Nvidia"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Oracle",
                                        children: "Oracle"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Paypal",
                                        children: "PayPal"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Paytm",
                                        children: "Paytm"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "PhonePe",
                                        children: "PhonePe"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Salesforce",
                                        children: "Salesforce"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Samsung",
                                        children: "Samsung"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Sprinklr",
                                        children: "Sprinklr"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Swiggy",
                                        children: "Swiggy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Tesla",
                                        children: "Tesla"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Walmart",
                                        children: "Walmart"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Uber",
                                        children: "Uber"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Visa",
                                        children: "Visa"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "WITCH",
                                        children: "WITCH"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sheet/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetFilters,
                                className: "bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-300 rounded-lg px-4 py-2 shadow-md hover:bg-red-500/20 transition duration-200",
                                children: "Reset Filters"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://dsamate.vercel.app/sheet",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "bg-[#131313] border text-white rounded px-4 py-2 hover:bg-gray-200 hover:text-[#131313] w-auto md:w-fit",
                                children: "🔗 View Full List"
                            }, void 0, false, {
                                fileName: "[project]/app/sheet/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$POTD$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        potd: potd,
                        updateStreak: updateStreak
                    }, void 0, false, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$DailyRecommendation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 195,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SheetContent$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        difficultyFilter: difficultyFilter,
                        statusFilter: statusFilter,
                        revisionFilter: revisionFilter,
                        searchTerm: searchTerm,
                        platformFilter: platformFilter,
                        companyFilter: companyFilter
                    }, void 0, false, {
                        fileName: "[project]/app/sheet/page.tsx",
                        lineNumber: 197,
                        columnNumber: 1
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/sheet/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/sheet/page.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TestimonialPrompt$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/sheet/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),

};

//# sourceMappingURL=_1ff08849._.js.map