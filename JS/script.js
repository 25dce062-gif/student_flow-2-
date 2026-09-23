function loginCheck(event) {
    event.preventDefault();

    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    
    if (!usernameInput || !passwordInput) return;

    let username = usernameInput.value;
    let password = passwordInput.value;

    let usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernameRegex.test(username)) {
        alert("Login Failed! Username must be 3-15 alphanumeric characters.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Login Failed! Password must be at least 8 characters long and contain at least one letter and one number.");
        return;
    }

    window.location.href = "home.html";
}

function validateProfileForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let enrollment = document.getElementById("enrollment").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;

    let nameRegex = /^[a-zA-Z\s]+$/;
    let enrollmentRegex = /^\d+$/; 
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let mobileRegex = /^\d{10}$/; 

    if (!nameRegex.test(name)) {
        alert("Invalid Name: Only letters and spaces are allowed.");
        return false;
    }
    
    if (!enrollmentRegex.test(enrollment)) {
        alert("Invalid Enrollment No: Only numbers are allowed.");
        return false;
    }
    
    if (!emailRegex.test(email)) {
        alert("Invalid Email Address.");
        return false;
    }
    
    if (!mobileRegex.test(mobile)) {
        alert("Invalid Mobile Number: Must be exactly 10 digits.");
        return false;
    }

    alert("Profile updated successfully!");
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Switcher (localStorage)
    const themeBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");
    
    function updateThemeButtonText() {
        if (themeBtn) {
            themeBtn.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀";
        }
    }

    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    updateThemeButtonText();

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            let theme = "light";
            if (document.body.classList.contains("dark-theme")) {
                theme = "dark";
            }
            localStorage.setItem("theme", theme);
            updateThemeButtonText();
        });
    }

    // 2. Hamburger Menu
    const hamburger = document.getElementById("hamburger-btn");
    const navTable = document.querySelector(".nav-table");
    if (hamburger && navTable) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navTable.classList.toggle("show");
            let expanded = navTable.classList.contains("show");
            hamburger.setAttribute("aria-expanded", expanded);
        });

        document.addEventListener("click", (e) => {
            if (!navTable.contains(e.target) && !hamburger.contains(e.target)) {
                navTable.classList.remove("show");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        navTable.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navTable.classList.remove("show");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 3. Notification Banner
    const bannerCloseBtn = document.getElementById("close-banner-btn");
    const banner = document.getElementById("notification-banner");
    if (bannerCloseBtn && banner) {
        if (sessionStorage.getItem("bannerClosed") === "true") {
            banner.style.display = "none";
        }
        
        bannerCloseBtn.addEventListener("click", () => {
            banner.style.display = "none";
            sessionStorage.setItem("bannerClosed", "true");
        });
    }

    // 4. Slider
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const slides = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const dotsContainer = document.querySelector(".slider-dots");
    
    if (slides && slideElements.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        let slideInterval;

        // Create dots
        if (dotsContainer) {
            slideElements.forEach((_, index) => {
                const dot = document.createElement("div");
                dot.classList.add("dot");
                if (index === 0) dot.classList.add("active");
                dot.addEventListener("click", () => {
                    currentIndex = index;
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateSlider() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll(".dot");
                dots.forEach(dot => dot.classList.remove("active"));
                if(dots[currentIndex]) dots[currentIndex].classList.add("active");
            }
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideElements.length;
            updateSlider();
        }

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
            updateSlider();
        });

        // Autoplay
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 3000);
        }
        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        startSlideShow();
        
        if (sliderWrapper) {
            sliderWrapper.addEventListener("mouseenter", stopSlideShow);
            sliderWrapper.addEventListener("mouseleave", startSlideShow);
        }
    }

    // 5. Modal
    const modal = document.getElementById("details-modal");
    const openModalBtn = document.getElementById("open-modal-btn");
    const closeModalBtn = document.querySelector(".close-modal");
    if (modal && openModalBtn && closeModalBtn) {
        openModalBtn.addEventListener("click", () => {
            modal.style.display = "block";
            openModalBtn.setAttribute("aria-expanded", "true");
        });
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
            openModalBtn.setAttribute("aria-expanded", "false");
        });
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                openModalBtn.setAttribute("aria-expanded", "false");
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
                openModalBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 6. FAQ Accordion
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const isActive = this.classList.contains("active");

            // Close all others
            faqQuestions.forEach(q => {
                q.classList.remove("active");
                q.setAttribute("aria-expanded", "false");
                if (q.nextElementSibling) {
                    q.nextElementSibling.style.maxHeight = null;
                }
            });

            if (!isActive) {
                this.classList.add("active");
                this.setAttribute("aria-expanded", "true");
                let answer = this.nextElementSibling;
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    });
});

// ==========================================
// Weather Feature Implementation
// ==========================================

const weatherCodes = {
    0: { condition: "Clear sky", icon: "\u2600\uFE0F" },
    1: { condition: "Mainly clear", icon: "\uD83C\uDF24\uFE0F" },
    2: { condition: "Partly cloudy", icon: "\u26C5" },
    3: { condition: "Overcast", icon: "\u2601\uFE0F" },
    45: { condition: "Fog", icon: "\uD83C\uDF2B\uFE0F" },
    48: { condition: "Depositing rime fog", icon: "\uD83C\uDF2B\uFE0F" },
    51: { condition: "Drizzle: Light", icon: "\uD83C\uDF26\uFE0F" },
    53: { condition: "Drizzle: Moderate", icon: "\uD83C\uDF26\uFE0F" },
    55: { condition: "Drizzle: Dense", icon: "\uD83C\uDF27\uFE0F" },
    56: { condition: "Freezing Drizzle: Light", icon: "\uD83C\uDF27\uFE0F" },
    57: { condition: "Freezing Drizzle: Dense", icon: "\uD83C\uDF27\uFE0F" },
    61: { condition: "Rain: Slight", icon: "\uD83C\uDF26\uFE0F" },
    63: { condition: "Rain: Moderate", icon: "\uD83C\uDF27\uFE0F" },
    65: { condition: "Rain: Heavy", icon: "\uD83C\uDF27\uFE0F" },
    66: { condition: "Freezing Rain: Light", icon: "\uD83C\uDF27\uFE0F" },
    67: { condition: "Freezing Rain: Heavy", icon: "\uD83C\uDF27\uFE0F" },
    71: { condition: "Snow fall: Slight", icon: "\uD83C\uDF28\uFE0F" },
    73: { condition: "Snow fall: Moderate", icon: "\uD83C\uDF28\uFE0F" },
    75: { condition: "Snow fall: Heavy", icon: "\u2744\uFE0F" },
    77: { condition: "Snow grains", icon: "\u2744\uFE0F" },
    80: { condition: "Rain showers: Slight", icon: "\uD83C\uDF26\uFE0F" },
    81: { condition: "Rain showers: Moderate", icon: "\uD83C\uDF27\uFE0F" },
    82: { condition: "Rain showers: Violent", icon: "\uD83C\uDF27\uFE0F" },
    85: { condition: "Snow showers slight", icon: "\uD83C\uDF28\uFE0F" },
    86: { condition: "Snow showers heavy", icon: "\u2744\uFE0F" },
    95: { condition: "Thunderstorm: Slight or mod", icon: "\u26C8\uFE0F" },
    96: { condition: "Thunderstorm with slight hail", icon: "\u26C8\uFE0F" },
    99: { condition: "Thunderstorm with heavy hail", icon: "\u26C8\uFE0F" }
};

function getWeatherInfo(code) {
    return weatherCodes[code] || { condition: "Unknown", icon: "\uD83C\uDF21\uFE0F" };
}

function getWeatherMessage(code, windSpeed, temp) {
    if (temp > 35) return "Hot day — stay hydrated!";
    if (temp < 15) return "It's quite cold — wear warm clothes!";
    if (windSpeed > 30) return "Strong winds expected — be careful outside.";
    if ([61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "Carry an umbrella today!";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy day — drive safely!";
    if (code === 0 || code === 1) return "Good weather for outdoor activities!";
    return "Have a productive day at campus!";
}

async function fetchWeather(lat, lon) {
    const weatherSection = document.getElementById("weather-section");
    if (!weatherSection) return;

    const loadingElem = document.getElementById("weather-loading");
    const errorElem = document.getElementById("weather-error");
    const dataElem = document.getElementById("weather-data");
    
    loadingElem.style.display = "block";
    errorElem.style.display = "none";
    dataElem.style.display = "none";

    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,sunrise,sunset,uv_index_max&hourly=temperature_2m,precipitation_probability,weather_code&timezone=auto`;
        
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();
        renderWeather(data);
        
        loadingElem.style.display = "none";
        dataElem.style.display = "block";
        
        const now = new Date();
        document.getElementById("weather-last-updated").textContent = `Last updated: ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } catch (error) {
        console.error("Weather fetch error:", error);
        loadingElem.style.display = "none";
        errorElem.style.display = "block";
    }
}

function renderWeather(data) {
    // Current Weather
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code);
    
    document.getElementById("current-temp").textContent = `${Math.round(current.temperature_2m)}\u00B0C`;
    document.getElementById("current-condition").textContent = weatherInfo.condition;
    document.getElementById("current-weather-icon").textContent = weatherInfo.icon;
    document.getElementById("current-humidity").textContent = `${current.relative_humidity_2m}%`;
    document.getElementById("current-wind").textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById("current-rain").textContent = `${current.precipitation} mm`;
    
    document.getElementById("weather-message").textContent = getWeatherMessage(current.weather_code, current.wind_speed_10m, current.temperature_2m);

    // Extended Daily Info
    const daily = data.daily;
    const sunriseSpan = document.getElementById("current-sunrise");
    if (sunriseSpan) {
        const sunriseDate = new Date(daily.sunrise[0]);
        sunriseSpan.textContent = sunriseDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const sunsetDate = new Date(daily.sunset[0]);
        document.getElementById("current-sunset").textContent = sunsetDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        document.getElementById("current-uv").textContent = Math.round(daily.uv_index_max[0]);
    }

    // Hourly Forecast (Next 24h)
    const hourly = data.hourly;
    const hourlyContainer = document.getElementById("hourly-forecast");
    if (hourlyContainer) {
        hourlyContainer.innerHTML = "";
        const now = new Date();
        const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()).getTime();
        
        let hoursAdded = 0;
        for (let i = 0; i < hourly.time.length; i++) {
            const timeDate = new Date(hourly.time[i]);
            if (timeDate.getTime() >= currentHour && hoursAdded < 24) {
                const info = getWeatherInfo(hourly.weather_code[i]);
                const timeStr = timeDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                const item = document.createElement("div");
                item.className = "forecast-item";
                item.innerHTML = `
                    <div class="hourly-time">${timeStr}</div>
                    <div class="forecast-icon">${info.icon}</div>
                    <div class="forecast-temps">
                        <strong>${Math.round(hourly.temperature_2m[i])}\u00B0</strong>
                    </div>
                    <div class="forecast-rain">${hourly.precipitation_probability[i]}% rain</div>
                `;
                hourlyContainer.appendChild(item);
                hoursAdded++;
            }
        }
    }

    // 7-Day Forecast
    const forecastContainer = document.getElementById("weather-forecast");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: 'short' });
        const info = getWeatherInfo(daily.weather_code[i]);
        
        const item = document.createElement("div");
        item.className = "forecast-item";
        item.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon">${info.icon}</div>
            <div class="forecast-temps">
                <strong>${Math.round(daily.temperature_2m_max[i])}\u00B0</strong> 
                <span>${Math.round(daily.temperature_2m_min[i])}\u00B0</span>
            </div>
            <div class="forecast-rain">${daily.precipitation_probability_max[i]}% rain</div>
        `;
        forecastContainer.appendChild(item);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const citySelect = document.getElementById("weather-city");
    const refreshBtn = document.getElementById("weather-refresh");
    const cityLabel = document.getElementById("current-city-name");
    
    if (citySelect && refreshBtn) {
        try {
            const res = await fetch("../DATA/cities.json");
            if (res.ok) {
                const cities = await res.json();
                cities.forEach(city => {
                    const opt = document.createElement("option");
                    opt.value = city.value;
                    opt.textContent = city.name;
                    citySelect.appendChild(opt);
                });
            }
        } catch (e) {
            console.error("Failed to load cities.json", e);
        }
        const updateWeather = () => {
            if (citySelect.value === "auto") {
                if (navigator.geolocation) {
                    if (cityLabel) cityLabel.textContent = "Locating...";
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const lat = position.coords.latitude;
                            const lon = position.coords.longitude;
                            if (cityLabel) cityLabel.textContent = "Current Location";
                            fetchWeather(lat, lon);
                        },
                        (error) => {
                            console.warn("Geolocation failed:", error);
                            alert("Location access denied or unavailable. Showing default city.");
                            citySelect.value = "22.3072,73.1812";
                            if (cityLabel) cityLabel.textContent = "Vadodara";
                            fetchWeather(22.3072, 73.1812);
                        }
                    );
                } else {
                    alert("Geolocation is not supported by your browser.");
                    citySelect.value = "22.3072,73.1812";
                    if (cityLabel) cityLabel.textContent = "Vadodara";
                    fetchWeather(22.3072, 73.1812);
                }
            } else {
                const [lat, lon] = citySelect.value.split(",");
                const cityName = citySelect.options[citySelect.selectedIndex].text.replace("\uD83D\uDCCD ", "");
                if (cityLabel) cityLabel.textContent = cityName;
                fetchWeather(lat, lon);
            }
        };

        citySelect.addEventListener("change", updateWeather);
        refreshBtn.addEventListener("click", updateWeather);

        // Initial fetch
        updateWeather();
    }
});

// ==========================================
// Dynamic Table Enhancements (Search, Filter, Sort, Pagination)
// ==========================================

async function enhanceDataTables() {
    const tables = document.querySelectorAll(".data-table");
    
    for (let table of tables) {
        const tbody = table.querySelector("tbody") || table;
        
        const dataSource = table.getAttribute("data-source");
        if (dataSource) {
            try {
                const res = await fetch(dataSource);
                if (res.ok) {
                    const jsonData = await res.json();
                    const headersRow = tbody.querySelector("tr");
                    tbody.innerHTML = "";
                    if (headersRow) tbody.appendChild(headersRow);
                    
                    jsonData.forEach(item => {
                        const tr = document.createElement("tr");
                        Object.values(item).forEach(val => {
                            const td = document.createElement("td");
                            td.innerHTML = val;
                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });
                }
            } catch(e) {
                console.error("Failed to fetch data-source", e);
            }
        }

        const allRows = Array.from(tbody.querySelectorAll("tr"));
        
        if (allRows.length <= 1) continue; // No data or just header
        
        const headerRow = allRows[0];
        const dataRows = allRows.slice(1);
        const headers = Array.from(headerRow.querySelectorAll("th, td"));
        
        // State
        let currentPage = 1;
        let rowsPerPage = 5;
        let currentSearch = "";
        let currentFilterCol = "all";
        let sortColIndex = -1;
        let sortAsc = true;
        
        // 1. Create Controls (Search & Filter)
        const controlsWrapper = document.createElement("div");
        controlsWrapper.className = "table-controls-wrapper";
        
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search...";
        searchInput.className = "table-search-input";
        
        const filterSelect = document.createElement("select");
        filterSelect.className = "table-filter-select";
        filterSelect.innerHTML = `<option value="all">All Columns</option>`;
        headers.forEach((th, i) => {
            const thText = th.textContent.trim();
            if (thText) {
                filterSelect.innerHTML += `<option value="${i}">${thText}</option>`;
            }
        });
        
        controlsWrapper.appendChild(searchInput);
        controlsWrapper.appendChild(filterSelect);
        
        table.parentNode.insertBefore(controlsWrapper, table);
        
        // 2. Create Pagination
        const paginationWrapper = document.createElement("div");
        paginationWrapper.className = "pagination-wrapper";
        
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Previous";
        prevBtn.className = "pagination-btn";
        
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next";
        nextBtn.className = "pagination-btn";
        
        const pageInfo = document.createElement("span");
        pageInfo.className = "pagination-info";
        
        paginationWrapper.appendChild(prevBtn);
        paginationWrapper.appendChild(pageInfo);
        paginationWrapper.appendChild(nextBtn);
        
        table.parentNode.insertBefore(paginationWrapper, table.nextSibling);
        
        // 3. Make Headers Sortable
        headers.forEach((th, i) => {
            if (th.textContent.trim() === "Actions") return; // Don't sort action buttons

            th.classList.add("sortable-header");
            const span = document.createElement("span");
            span.className = "sort-icon";
            span.innerHTML = "&#9660;"; 
            th.appendChild(span);
            
            th.addEventListener("click", () => {
                if (sortColIndex === i) {
                    sortAsc = !sortAsc;
                } else {
                    sortColIndex = i;
                    sortAsc = true;
                }
                
                headers.forEach(h => {
                    const icon = h.querySelector(".sort-icon");
                    if (icon) {
                        icon.classList.remove("active");
                        icon.innerHTML = "&#9660;";
                    }
                });
                
                const currentIcon = th.querySelector(".sort-icon");
                currentIcon.classList.add("active");
                currentIcon.innerHTML = sortAsc ? "&#9650;" : "&#9660;";
                
                renderTable();
            });
        });
        
        // 4. Render Function
        const renderTable = () => {
            let filteredRows = dataRows.filter(row => {
                const cells = Array.from(row.children);
                if (currentSearch === "") return true;
                
                if (currentFilterCol === "all") {
                    return cells.some(cell => cell.textContent.toLowerCase().includes(currentSearch));
                } else {
                    const colIndex = parseInt(currentFilterCol);
                    return cells[colIndex] && cells[colIndex].textContent.toLowerCase().includes(currentSearch);
                }
            });
            
            if (sortColIndex !== -1) {
                filteredRows.sort((a, b) => {
                    const cellA = a.children[sortColIndex]?.textContent.trim() || "";
                    const cellB = b.children[sortColIndex]?.textContent.trim() || "";
                    
                    const numA = parseFloat(cellA);
                    const numB = parseFloat(cellB);
                    
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return sortAsc ? numA - numB : numB - numA;
                    }
                    
                    return sortAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
                });
            }
            
            const totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;
            
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            const rowsToShow = filteredRows.slice(startIndex, endIndex);
            
            while (tbody.children.length > 1) {
                tbody.removeChild(tbody.lastChild);
            }
            
            rowsToShow.forEach(row => tbody.appendChild(row));
            
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        };
        
        // Event Listeners
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value.toLowerCase();
            currentPage = 1;
            renderTable();
        });
        
        filterSelect.addEventListener("change", (e) => {
            currentFilterCol = e.target.value;
            currentPage = 1;
            renderTable();
        });
        
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        
        nextBtn.addEventListener("click", () => {
            currentPage++;
            renderTable();
        });
        
        // Initial Render
        renderTable();
    }
}

document.addEventListener("DOMContentLoaded", enhanceDataTables);

