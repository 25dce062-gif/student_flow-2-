document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");
    const searchInput = document.getElementById("event-search");
    const filterSelect = document.getElementById("event-filter");
    const sortSelect = document.getElementById("event-sort");
    const prevBtn = document.getElementById("events-prev");
    const nextBtn = document.getElementById("events-next");
    const pageInfo = document.getElementById("events-page-info");
    const messageBox = document.getElementById("events-message");

    if (!eventsContainer) return; // Only run on Events page

    let allEvents = [];
    let filteredEvents = [];
    let currentPage = 1;
    const eventsPerPage = 6;

    // Fetch Events using Fetch API
    async function fetchEvents() {
        try {
            messageBox.style.display = "block";
            messageBox.textContent = "Loading events...";
            eventsContainer.style.display = "none";

            const response = await fetch("../DATA/events.json");
            if (!response.ok) {
                throw new Error("Failed to load events");
            }

            allEvents = await response.json();
            filteredEvents = [...allEvents];
            
            messageBox.style.display = "none";
            eventsContainer.style.display = "grid";
            
            applyFiltersAndSort();
        } catch (error) {
            console.error(error);
            messageBox.style.display = "block";
            messageBox.textContent = "Unable to load events. Please try again.";
            eventsContainer.style.display = "none";
        }
    }

    // Dynamic Rendering
    function renderEvents() {
        eventsContainer.innerHTML = "";
        
        if (filteredEvents.length === 0) {
            messageBox.style.display = "block";
            messageBox.textContent = "No events found.";
            eventsContainer.style.display = "none";
            
            // Disable pagination
            if(prevBtn) prevBtn.disabled = true;
            if(nextBtn) nextBtn.disabled = true;
            if(pageInfo) pageInfo.textContent = "Page 1 of 1";
            return;
        }

        messageBox.style.display = "none";
        eventsContainer.style.display = "grid";

        const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        const eventsToShow = filteredEvents.slice(startIndex, endIndex);

        eventsToShow.forEach(event => {
            const card = document.createElement("div");
            card.className = "event-card";
            
            let statusClass = "status-open";
            if (event.registrationStatus.toLowerCase() === "closed") statusClass = "status-closed";
            if (event.registrationStatus.toLowerCase() === "full") statusClass = "status-full";

            card.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-img">
                <div class="event-content">
                    <span class="event-category">${event.category}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-desc">${event.description}</p>
                    <div class="event-details">
                        <span>&#128197; ${event.date}</span>
                        <span>&#9200; ${event.time}</span>
                        <span>&#128205; ${event.venue}</span>
                        <span>&#128100; ${event.organizer}</span>
                    </div>
                    <div class="event-footer">
                        <span class="event-status ${statusClass}">${event.registrationStatus}</span>
                    </div>
                </div>
            `;
            eventsContainer.appendChild(card);
        });

        // Pagination
        if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    // Search, Filter, Sorting
    function applyFiltersAndSort() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const categoryFilter = filterSelect ? filterSelect.value : "All";
        const sortValue = sortSelect ? sortSelect.value : "date-desc";

        // Filter
        filteredEvents = allEvents.filter(event => {
            const matchesSearch = 
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm) ||
                event.organizer.toLowerCase().includes(searchTerm);
            
            const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        // Sort
        filteredEvents.sort((a, b) => {
            if (sortValue === "date-desc") {
                return new Date(b.date) - new Date(a.date);
            } else if (sortValue === "date-asc") {
                return new Date(a.date) - new Date(b.date);
            } else if (sortValue === "title-asc") {
                return a.title.localeCompare(b.title);
            } else if (sortValue === "title-desc") {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

        currentPage = 1;
        renderEvents();
    }

    if (searchInput) searchInput.addEventListener("input", applyFiltersAndSort);
    if (filterSelect) filterSelect.addEventListener("change", applyFiltersAndSort);
    if (sortSelect) sortSelect.addEventListener("change", applyFiltersAndSort);

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderEvents();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderEvents();
            }
        });
    }

    fetchEvents();
});
