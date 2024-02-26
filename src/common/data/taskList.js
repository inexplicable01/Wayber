// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";
import bgImage1 from "../../assets/images/small/img-7.jpg";
import bgImage2 from "../../assets/images/small/img-4.jpg";

const taskWidgets = [
    {
        id: 1,
        label: "Total Tasks",
        counter: "234",
        badge: "ri-arrow-up-line",
        badgeClass: "success",
        percentage: "17.32 %",
        icon: "ri-ticket-2-line",
        iconClass: "info",
        decimals: 1,
        prefix: "",
        suffix: "k",
    },
    {
        id: 2,
        label: "Pending Tasks",
        counter: "64.5",
        badge: "ri-arrow-down-line",
        badgeClass: "danger",
        percentage: "0.87 %",
        icon: "mdi mdi-timer-sand",
        iconClass: "warning",
        decimals: 1,
        prefix: "",
        suffix: "k",
    },
    {
        id: 3,
        label: "Completed Tasks",
        counter: "116.21",
        badge: "ri-arrow-down-line",
        badgeClass: "danger",
        percentage: "2.52 %",
        icon: "ri-checkbox-circle-line",
        iconClass: "success",
        decimals: 2,
        prefix: "",
        suffix: "K",
    },
    {
        id: 4,
        label: "Deleted Tasks",
        counter: "14.84",
        badge: "ri-arrow-up-line",
        badgeClass: "success",
        percentage: "0.63 %",
        icon: "ri-delete-bin-line",
        iconClass: "danger",
        decimals: 2,
        prefix: "$",
        suffix: "%",
    },
];

const allTask = [
    {
        id: 1,
        taskId: "#VLZ632",
        project: "Wayber - v1.0.0",
        task: "Error message when placing an orders?",
        creater: "Robert McMahon",
        // subItem: [avatar3, avatar1],
        subItem: [{ id: 1, img: avatar3 }, { id: 2, img: avatar1 }],
        dueDate: "25 Jan, 2022",
        status: "Inprogress",
        statusClass: "secondary",
        priority: "High",
        priorityClass: "danger",
    },
    {
        id: 2,
        taskId: "#VLZ453",
        project: "Skote - v1.0.0",
        task: "Profile Page Satructure",
        creater: "Mary Cousar",
        // subItem: [avatar10, avatar9, avatar5],
        subItem: [{ id: 1, img: avatar10 }, { id: 2, img: avatar9 }, { id: 3, img: avatar5 }],
        dueDate: "20 Dec, 2021",
        status: "New",
        statusClass: "info",
        priority: "Low",
        priorityClass: "success",
    },
    {
        id: 3,
        taskId: "#VLZ454",
        project: "Skote - v2.3.0",
        task: "Apologize for shopping Error!",
        creater: "Nathan Cole",
        // subItem: [avatar5, avatar6, avatar7, avatar8],
        subItem: [{ id: 1, img: avatar5 }, { id: 2, img: avatar6 }, { id: 3, img: avatar7 }, { id: 4, img: avatar8 }],
        dueDate: "23 Oct, 2021",
        status: "Completed",
        statusClass: "success",
        priority: "Medium",
        priorityClass: "warning",
    },
    {
        id: 4,
        taskId: "#VLZ455",
        project: "Minia - v1.4.0",
        task: "Post launch reminder/ post list",
        creater: "Joseph Parker",
        // subItem: [avatar2],
        subItem: [{ id: 1, img: avatar2 }],
        dueDate: "05 Oct, 2021",
        status: "Pending",
        statusClass: "warning",
        priority: "High",
        priorityClass: "danger",
    },
    {
        id: 5,
        taskId: "#VLZ456",
        project: "Minia - v1.2.0",
        task: "Make a creating an account profile",
        creater: "Henry Baird",
        // subItem: [avatar3, avatar10, avatar9],
        subItem: [{ id: 1, img: avatar3 }, { id: 2, img: avatar10 }, { id: 3, img: avatar9 }],
        dueDate: "17 Oct, 2021",
        status: "Inprogress",
        statusClass: "secondary",
        priority: "Medium",
        priorityClass: "warning",
    },
    {
        id: 6,
        taskId: "#VLZ657",
        project: "Minimal - v2.1.0",
        task: "Change email option process",
        creater: "Tonya Noble",
        // subItem: [avatar6, avatar7],
        subItem: [{ id: 1, img: avatar6 }, { id: 2, img: avatar7 }],
        dueDate: "04 Dec, 2021",
        status: "Completed",
        statusClass: "success",
        priority: "High",
        priorityClass: "danger",
    },
    {
        id: 7,
        taskId: "#VLZ458",
        project: "Dason - v1.1.0",
        task: "User research",
        creater: "Donald Palmer",
        // subItem: [avatar10, avatar9, avatar8, avatar1],
        subItem: [{ id: 1, img: avatar10 }, { id: 2, img: avatar9 }, { id: 3, img: avatar8 }, { id: 4, img: avatar1 }],
        dueDate: "11 Oct, 2021",
        status: "New",
        statusClass: "info",
        priority: "Low",
        priorityClass: "success",
    },
    {
        id: 8,
        taskId: "#VLZ459",
        project: "Dorsin - Landing Page",
        task: "Benner design for FB & Twitter",
        creater: "Carter",
        // subItem: [avatar5, avatar4],
        subItem: [{ id: 1, img: avatar5 }, { id: 2, img: avatar4 }],
        dueDate: "16 Dec, 2021",
        status: "Pending",
        statusClass: "warning",
        priority: "Medium",
        priorityClass: "warning",
    },
    {
        id: 9,
        taskId: "#VLZ460",
        project: "Qexal - Landing Page",
        task: "Brand logo design",
        creater: "David Nichols",
        // subItem: [avatar6, avatar7, avatar8],
        subItem: [{ id: 1, img: avatar6 }, { id: 2, img: avatar7 }, { id: 3, img: avatar8 }],
        dueDate: "29 Dec, 2021",
        status: "Pending",
        statusClass: "warning",
        priority: "High",
        priorityClass: "danger",
    },
    {
        id: 10,
        taskId: "#VLZ461",
        project: "Doot - Chat App Template",
        task: "Additional Calendar",
        creater: "Diana Kohler",
        // subItem: [avatar4],
        subItem: [{ id: 1, img: avatar4 }],
        dueDate: "13 Oct, 2021",
        status: "New",
        statusClass: "info",
        priority: "Low",
        priorityClass: "success",
    },
    {
        id: 11,
        taskId: "#VLZ462",
        project: "Skote - v2.1.0",
        task: "Edit customer testimonial",
        creater: "Nathan Cole",
        // subItem: [avatar7, avatar8],
        subItem: [{ id: 1, img: avatar7 }, { id: 2, img: avatar8 }],
        dueDate: "02 Jan, 2021",
        status: "Inprogress",
        statusClass: "secondary",
        priority: "Medium",
        priorityClass: "warning",
    },
];

const kanbanBoardData = [
    {
        id: 1,
        name: "Unassigned",
        badge: "2",
        badgeClass: "success",
        tasks: [
            {
                id: 11,
                taskId: "#VL2436",
                title: "Profile Page Satructure",
                desc: "Profile Page means a web page accessible to the public or to guests.",
                progressBar: "15%",
                date: "03 Jan, 2022",
                progressBarColor: "danger",
                progressBarText: "secondary",
                tags: [
                    { tag: "Admin" }
                ],
                members: [
                    { id: 1, img: avatar6 },
                    { id: 2, img: avatar5 },
                ],
                view: "04",
                message: "19",
                file: "02",
                isTaskId: true,
            },
            {
                id: 12,
                taskId: "#VL2436",
                title: "Wayber - Admin Layout Design",
                desc: "The dashboard is the front page of the Administration UI.",
                date: "07 Jan, 2022",
                tags: [
                    { tag: "Layout" },
                    { tag: "Admin" },
                    { tag: "Dashboard" }
                ],
                members: [
                    { id: 1, img: avatar7 },
                    { id: 2, img: avatar6 },
                    { id: 2, img: avatar1 },
                ],
                view: "14",
                message: "32",
                file: "05",
            }
        ]
    },
    {
        id: 2,
        name: "To Do",
        badge: "2",
        badgeClass: "secondary",
        tasks: [
            {
                id: 21,
                taskId: "#VL2436",
                title: "Admin Layout Design",
                desc: "Landing page template with clean, minimal and modern design.",
                date: "07 Jan, 2022",
                tags: [
                    { tag: "Design" },
                    { tag: "Website" },
                ],
                members: [
                    { id: 1, img: avatar10 },
                    { id: 2, img: avatar3 },
                    { id: 3, img: avatar2 },
                ],
                view: "13",
                message: "52",
                file: "17",
            },
            {
                id: 22,
                taskId: "#VL2436",
                title: "Marketing & Sales",
                desc: "Sales and marketing are two business functions within an organization.",
                date: "27 Dec, 2021",
                tags: [
                    { tag: "Marketing" },
                    { tag: "Business" },
                ],
                members: [
                    { id: 1, img: avatar9 },
                    { id: 2, img: avatar8 },
                ],
                view: "24",
                message: "10",
                file: "10",
            }
        ]
    },
    {
        id: 3,
        name: "Inprogress",
        badge: "2",
        badgeClass: "warning",
        tasks: [
            {
                id: 31,
                taskId: "#VL2457",
                title: "Brand Logo Design",
                desc: "BrandCrowd's brand logo maker allows you to generate and customize stand-out brand logos in minutes.",
                progressBar: "55%",
                date: "22 Dec, 2021",
                progressBarColor: "warning",
                tags: [
                    { tag: "Logo" },
                    { tag: "Design" },
                    { tag: "UI/UX" },
                ],
                members: [
                    { id: 1, img: avatar5 },
                    { id: 2, img: avatar7 },
                    { id: 3, img: avatar6 },
                ],
                view: "24",
                message: "10",
                file: "10",
                isTaskIdHeader: true,
                isProgessBarFooter: true,
            },
            {
                id: 32,
                taskId: "#VL2743",
                title: "Change Old App Icon",
                desc: "Change app icons on Android: How do you change the look of your apps.",
                progressBar: "0%",
                date: "24 Oct, 2021",
                progressBarColor: "primary",
                tags: [
                    { tag: "Design" },
                    { tag: "Website" },
                ],
                members: [
                    { id: 1, img: avatar10 },
                    { id: 2, img: avatar9 },
                    { id: 3, img: avatar5 },
                ],
                view: "64",
                message: "35",
                file: "23",
                isTaskIdHeader: true,
                isProgessBarFooter: true,
            }
        ]
    },
    {
        id: 4,
        name: "In Reviews",
        badge: "3",
        badgeClass: "info",
        tasks: [
            {
                id: 41,
                taskId: "#VL2453",
                title: "Create Product Animations",
                desc: "BrandCrowd's brand logo maker allows you to generate and customize stand-out brand logos in minutes.",
                progressBar: "100%",
                date: "16 Nov, 2021",
                progressBarColor: "success",
                tags: [
                    { tag: "Ecommerce" },
                ],
                members: [
                    { id: 1, img: avatar1 },
                ],
                view: "08",
                message: "54",
                file: "28",
                bgImage: bgImage1,
                isTaskIdHeader: true,
                isProgessBarFooter: true,
            },
            {
                id: 42,
                taskId: "#VL2340",
                title: "Product Features Analysis",
                desc: "An essential part of strategic planning is running a product feature analysis.",
                progressBar: "67%",
                date: "05 Jan, 2022",
                progressBarColor: "warning",
                tags: [
                    { tag: "Product" },
                    { tag: "Analysis" },
                ],
                members: [
                    { id: 1, img: avatar5 },
                    { id: 2, img: avatar6 },
                ],
                view: "14",
                message: "31",
                file: "07",
                isTaskIdHeader: true,
                isProgessBarFooter: true,
            },
            {
                id: 43,
                taskId: "#VL2462",
                title: "Create a Graph of Sketch",
                desc: "To make a pie chart with equal slices create a perfect circle by selecting an Oval Tool.",
                progressBar: "0%",
                date: "05 Jan, 2022",
                progressBarColor: "primary",
                tags: [
                    { tag: "Sketch" },
                    { tag: "Marketing" },
                    { tag: "Design" },
                ],
                members: [
                    { id: 1, img: avatar4 },
                    { id: 2, img: avatar8 },
                    { id: 3, img: avatar2 },
                    { id: 4, img: avatar1 },
                ],
                view: "12",
                message: "74",
                file: "37",
                isTaskIdHeader: true,
                isProgessBarFooter: true,
            }
        ]
    },
    {
        id: 5,
        name: "Completed",
        badge: "1",
        badgeClass: "success",
        tasks: [
            {
                id: 51,
                taskId: "#VL2451",
                title: "Create a Blog Template UI",
                desc: "Landing page template with clean, minimal and modern design.",
                progressBar: "35%",
                date: "3 Day",
                progressBarColor: "danger",
                progressBarText: "info",
                tags: [
                    { tag: "Design" },
                    { tag: "Website" },
                ],
                members: [
                    { id: 1, img: avatar8 },
                    { id: 2, img: avatar7 },
                    { id: 3, img: avatar6 },
                ],
                view: "24",
                message: "10",
                file: "10",
                isTaskId: true,
            }
        ]
    },
    {
        id: 6,
        name: "New",
        badge: "1",
        badgeClass: "success",
        tasks: [
            {
                id: 61,
                taskId: "#VL5287",
                title: "Banner Design for FB & Twitter",
                desc: "Landing page template with clean, minimal and modern design.",
                progressBar: "55%",
                date: "07 Jan, 2022",
                progressBarColor: "warning",
                tags: [
                    { tag: "UI/UX" },
                    { tag: "Graphic" },
                ],
                members: [
                    { id: 1, img: avatar3 },
                    { id: 2, img: avatar2 },
                ],
                view: "11",
                message: "26",
                file: "30",
                bgImage: bgImage2,
                isTaskIdHeader: true,
                isProgessBarFooter: true,
            }
        ]
    },
];

export { taskWidgets, allTask, kanbanBoardData };