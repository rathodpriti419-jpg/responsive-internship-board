/* =========================================
   RESPONSIVE INTERNSHIP BOARD
========================================= */


/* -----------------------------------------
   DOM ELEMENTS
----------------------------------------- */

const internshipList = document.getElementById("internshipList");

const searchInput = document.getElementById("searchInput");

const domainFilter = document.getElementById("domainFilter");

const clearButton = document.getElementById("clearButton");

const emptyClearButton =
    document.getElementById("emptyClearButton");

const emptyMessage =
    document.getElementById("emptyMessage");

const errorMessage =
    document.getElementById("errorMessage");

const resultCount =
    document.getElementById("resultCount");


/* -----------------------------------------
   DATA
----------------------------------------- */

const internships = [

    {
        id: 1,

        title: "Frontend Developer Intern",

        company: "BrightTech Solutions",

        domain: "Web Development",

        location: "Remote",

        duration: "3 Months",

        type: "Full-time",

        description:
            "Work on responsive websites and learn modern frontend development.",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },


    {
        id: 2,

        title: "Web Development Intern",

        company: "CodeNest Technologies",

        domain: "Web Development",

        location: "Ahmedabad",

        duration: "6 Months",

        type: "Hybrid",

        description:
            "Build simple web pages and improve your practical development skills.",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },


    {
        id: 3,

        title: "Flutter Developer Intern",

        company: "AppWorld Labs",

        domain: "Mobile Development",

        location: "Remote",

        duration: "3 Months",

        type: "Part-time",

        description:
            "Create mobile application screens using Flutter and Dart.",

        skills: [
            "Flutter",
            "Dart",
            "Firebase"
        ]
    },


    {
        id: 4,

        title: "Python Developer Intern",

        company: "FutureSoft",

        domain: "Python",

        location: "Bhavnagar",

        duration: "4 Months",

        type: "Full-time",

        description:
            "Learn Python programming and work on small real-world projects.",

        skills: [
            "Python",
            "SQL",
            "Git"
        ]
    },


    {
        id: 5,

        title: "Data Science Intern",

        company: "DataVision AI",

        domain: "Data Science",

        location: "Remote",

        duration: "6 Months",

        type: "Full-time",

        description:
            "Explore data analysis and machine learning using real datasets.",

        skills: [
            "Python",
            "Pandas",
            "Machine Learning"
        ]
    },


    {
        id: 6,

        title: "UI/UX Design Intern",

        company: "CreativePixel Studio",

        domain: "UI/UX Design",

        location: "Ahmedabad",

        duration: "3 Months",

        type: "Hybrid",

        description:
            "Design simple and user-friendly interfaces for web and mobile apps.",

        skills: [
            "Figma",
            "UI Design",
            "UX Research"
        ]
    },


    {
        id: 7,

        title: "Cloud Computing Intern",

        company: "CloudNova Systems",

        domain: "Cloud Computing",

        location: "Remote",

        duration: "6 Months",

        type: "Full-time",

        description:
            "Learn cloud services, virtual machines and basic cloud deployment.",

        skills: [
            "AWS",
            "Cloud",
            "Linux"
        ]
    },


    {
        id: 8,

        title: "JavaScript Developer Intern",

        company: "WebWorks India",

        domain: "Web Development",

        location: "Surat",

        duration: "3 Months",

        type: "Full-time",

        description:
            "Create interactive websites using JavaScript and browser APIs.",

        skills: [
            "JavaScript",
            "HTML",
            "CSS"
        ]
    }

];


/* -----------------------------------------
   GET INITIALS
----------------------------------------- */

function getCompanyInitials(company) {

    const words = company.split(" ");

    return words
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}


/* -----------------------------------------
   CREATE INTERNSHIP CARD
----------------------------------------- */

function createInternshipCard(internship) {

    const card = document.createElement("article");

    card.className = "internship-card";

    card.setAttribute(
        "aria-labelledby",
        `internship-title-${internship.id}`
    );


    card.innerHTML = `

        <div class="card-top">

            <div
                class="company-logo"
                aria-hidden="true"
            >
                ${getCompanyInitials(internship.company)}
            </div>

            <span class="domain-badge">
                ${internship.domain}
            </span>

        </div>


        <h3 id="internship-title-${internship.id}">
            ${internship.title}
        </h3>


        <p class="company-name">
            ${internship.company}
        </p>


        <div
            class="card-info"
            aria-label="Internship information"
        >

            <span class="info-item">
                📍 ${internship.location}
            </span>

            <span class="info-item">
                ⏱ ${internship.duration}
            </span>

            <span class="info-item">
                💼 ${internship.type}
            </span>

        </div>


        <p class="description">
            ${internship.description}
        </p>


        <div
            class="skills"
            aria-label="Required skills"
        >

            ${internship.skills
                .map(
                    skill =>
                        `<span class="skill">${skill}</span>`
                )
                .join("")
            }

        </div>


        <button
            type="button"
            class="view-button"
            data-id="${internship.id}"
            aria-label="View details for ${internship.title}"
        >
            View Details
        </button>

    `;


    return card;

}


/* -----------------------------------------
   RENDER INTERNSHIPS
----------------------------------------- */

function renderInternships(list) {

    internshipList.innerHTML = "";

    emptyMessage.hidden = list.length !== 0;


    if (list.length === 0) {

        resultCount.textContent =
            "0 internships found";

        return;
    }


    resultCount.textContent =
        `${list.length} internship${list.length === 1 ? "" : "s"} found`;


    const fragment = document.createDocumentFragment();


    list.forEach(internship => {

        const card =
            createInternshipCard(internship);

        fragment.appendChild(card);

    });


    internshipList.appendChild(fragment);

}


/* -----------------------------------------
   FILTER INTERNSHIPS
----------------------------------------- */

function filterInternships() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedDomain =
        domainFilter.value;


    const filtered =
        internships.filter(internship => {

            const searchableText = [

                internship.title,

                internship.company,

                internship.domain,

                internship.location,

                internship.description,

                ...internship.skills

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                searchableText.includes(searchText);


            const matchesDomain =
                selectedDomain === "all" ||
                internship.domain === selectedDomain;


            return matchesSearch && matchesDomain;

        });


    renderInternships(filtered);

}


/* -----------------------------------------
   CLEAR FILTERS
----------------------------------------- */

function clearFilters() {

    searchInput.value = "";

    domainFilter.value = "all";

    filterInternships();

    searchInput.focus();

}


/* -----------------------------------------
   VIEW DETAILS
----------------------------------------- */

function handleViewDetails(event) {

    const button =
        event.target.closest(".view-button");


    if (!button) {
        return;
    }


    const internshipId =
        Number(button.dataset.id);


    const internship =
        internships.find(
            item => item.id === internshipId
        );


    if (!internship) {

        showError();

        return;
    }


    alert(
        `${internship.title}\n\n` +
        `Company: ${internship.company}\n` +
        `Domain: ${internship.domain}\n` +
        `Location: ${internship.location}\n` +
        `Duration: ${internship.duration}\n\n` +
        `Skills: ${internship.skills.join(", ")}`
    );

}


/* -----------------------------------------
   ERROR STATE
----------------------------------------- */

function showError() {

    errorMessage.hidden = false;

    internshipList.innerHTML = "";

    emptyMessage.hidden = true;

    resultCount.textContent =
        "Unable to load internships";

}


/* -----------------------------------------
   EVENT LISTENERS
----------------------------------------- */

searchInput.addEventListener(
    "input",
    filterInternships
);


domainFilter.addEventListener(
    "change",
    filterInternships
);


clearButton.addEventListener(
    "click",
    clearFilters
);


emptyClearButton.addEventListener(
    "click",
    clearFilters
);


internshipList.addEventListener(
    "click",
    handleViewDetails
);


/* -----------------------------------------
   KEYBOARD SUPPORT
----------------------------------------- */

document.addEventListener(
    "keydown",
    event => {

        /*
         Press "/" to quickly move to search.
         Ignore it if the user is already typing.
        */

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.tagName === "SELECT";


        if (
            event.key === "/" &&
            !isTyping
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        /*
         Press Escape to clear search.
        */

        if (
            event.key === "Escape" &&
            isTyping
        ) {

            clearFilters();

        }

    }
);


/* -----------------------------------------
   INITIAL RENDER
----------------------------------------- */

function initializeApp() {

    try {

        if (!Array.isArray(internships)) {

            throw new Error(
                "Internship data is not available."
            );

        }


        errorMessage.hidden = true;

        renderInternships(internships);

    }

    catch (error) {

        console.error(error);

        showError();

    }

}


initializeApp();